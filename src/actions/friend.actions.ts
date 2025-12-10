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
        select: { id: true, name: true, email: true, bio: true },
      },
      to: {
        select: { id: true, name: true, email: true, bio: true },
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

export async function getRecommendedFriendsAction() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const friends = await prisma.friendRequest.findMany({
      where: {
        OR: [
          { fromId: user.id, status: 'ACCEPTED' },
          { toId: user.id, status: 'ACCEPTED' },
        ],
      },
      select: {
        fromId: true,
        toId: true,
      },
    });

    const friendIds = friends.map((f) =>
      f.fromId === user.id ? f.toId : f.fromId
    );

    const pending = await prisma.friendRequest.findMany({
      where: {
        OR: [
          { fromId: user.id, status: 'PENDING' },
          { toId: user.id, status: 'PENDING' },
        ],
      },
      select: {
        fromId: true,
        toId: true,
      },
    });

    const pendingIds = pending.map((p) =>
      p.fromId === user.id ? p.toId : p.fromId
    );

    const excludeIds = [user.id, ...friendIds, ...pendingIds];

    const recommendations = await prisma.friendRequest.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [
          { fromId: { in: friendIds }, toId: { notIn: excludeIds } },
          { toId: { in: friendIds }, fromId: { notIn: excludeIds } },
        ],
      },
      select: {
        fromId: true,
        toId: true,
      },
    });

    const mutualMap = new Map<string, number>();
    recommendations.forEach((r) => {
      const recId = friendIds.includes(r.fromId) ? r.toId : r.fromId;
      mutualMap.set(recId, (mutualMap.get(recId) || 0) + 1);
    });

    const recIds = Array.from(mutualMap.keys());
    const users = await prisma.user.findMany({
      where: {
        id: { in: recIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const result = users
      .map((u) => ({
        id: u.id,
        name: u.name,
        mutualFriendsCount: mutualMap.get(u.id) || 0,
      }))
      .sort((a, b) => b.mutualFriendsCount - a.mutualFriendsCount)
      .slice(0, 10);

    return result;
  } catch (error) {
    console.error('Error getting recommended friends:', error);
    throw error;
  }
}

export async function getFriendActivitiesAction() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const friends = await prisma.friendRequest.findMany({
      where: {
        OR: [
          { fromId: user.id, status: 'ACCEPTED' },
          { toId: user.id, status: 'ACCEPTED' },
        ],
      },
      select: {
        fromId: true,
        toId: true,
      },
    });

    const friendIds = friends.map((f) =>
      f.fromId === user.id ? f.toId : f.fromId
    );

    if (friendIds.length === 0) {
      return [];
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentBooks = await prisma.book.findMany({
      where: {
        userId: { in: friendIds },
        createdAt: { gte: thirtyDaysAgo },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const recentChapters = await prisma.chapter.findMany({
      where: {
        book: {
          userId: { in: friendIds },
        },
        createdAt: { gte: thirtyDaysAgo },
      },
      include: {
        book: {
          select: { title: true, user: { select: { name: true } } },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const activities: {
      id: string;
      name: string;
      activityTime: string;
      recentActivity: string;
    }[] = [];

    recentBooks.forEach((book) => {
      activities.push({
        id: `book-${book.id}`,
        name: book.user.name,
        activityTime: book.createdAt.toLocaleDateString(),
        recentActivity: `Created a new book: "${book.title}"`,
      });
    });

    recentChapters.forEach((chapter) => {
      activities.push({
        id: `chapter-${chapter.id}`,
        name: chapter.book.user.name,
        activityTime: chapter.createdAt.toLocaleDateString(),
        recentActivity: `Added a chapter "${chapter.title}" to "${chapter.book.title}"`,
      });
    });

    activities.sort(
      (a, b) =>
        new Date(b.activityTime).getTime() - new Date(a.activityTime).getTime()
    );

    return activities.slice(0, 20);
  } catch (error) {
    console.error('Error getting friend activities:', error);
    throw error;
  }
}
