'use server';
import { getAuthenticatedUser } from '@/lib/auth-server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const sendFriendRequestSchema = z.object({
  email: z.string().email(),
});

export async function getAllUserFriendsAction() {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const friends = await prisma.friendRequest.findMany({
    where: {
      OR: [
        { fromId: user.id, status: 'ACCEPTED' },
        { toId: user.id, status: 'ACCEPTED' },
      ],
    },
    include: {
      from: {
        select: { id: true, name: true, email: true },
      },
      to: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  const friendList = friends.map((request) =>
    request.fromId === user.id ? request.to : request.from
  );

  return friendList;
}

export async function sendFriendRequestAction(formData: FormData) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const data = sendFriendRequestSchema.parse({
    email: formData.get('email'),
  });

  const targetUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!targetUser) {
    throw new Error('User not found');
  }

  if (targetUser.id === user.id) {
    throw new Error('Cannot send friend request to yourself');
  }

  const existingRequest = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { fromId: user.id, toId: targetUser.id },
        { fromId: targetUser.id, toId: user.id },
      ],
    },
  });

  if (existingRequest) {
    if (existingRequest.status === 'ACCEPTED') {
      throw new Error('Already friends');
    } else if (existingRequest.status === 'PENDING') {
      throw new Error('Friend request already pending');
    }
  }

  await prisma.friendRequest.create({
    data: {
      fromId: user.id,
      toId: targetUser.id,
    },
  });

  revalidatePath('/friends');
}

export async function acceptFriendRequestAction(requestId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
  });

  if (!request || request.toId !== user.id) {
    throw new Error('Friend request not found');
  }

  if (request.status !== 'PENDING') {
    throw new Error('Request already processed');
  }

  await prisma.friendRequest.update({
    where: { id: requestId },
    data: { status: 'ACCEPTED' },
  });

  revalidatePath('/friends');
}

export async function declineFriendRequestAction(requestId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
  });

  if (!request || request.toId !== user.id) {
    throw new Error('Friend request not found');
  }

  if (request.status !== 'PENDING') {
    throw new Error('Request already processed');
  }

  await prisma.friendRequest.update({
    where: { id: requestId },
    data: { status: 'DECLINED' },
  });

  revalidatePath('/friends');
}

export async function removeFriendAction(friendId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const request = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { fromId: user.id, toId: friendId, status: 'ACCEPTED' },
        { fromId: friendId, toId: user.id, status: 'ACCEPTED' },
      ],
    },
  });

  if (!request) {
    throw new Error('Friend not found');
  }

  await prisma.friendRequest.delete({
    where: { id: request.id },
  });

  revalidatePath('/friends');
}

export async function getPendingFriendRequestsAction() {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const requests = await prisma.friendRequest.findMany({
    where: {
      toId: user.id,
      status: 'PENDING',
    },
    include: {
      from: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return requests;
}
