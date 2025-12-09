'use server';

import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-server';

export async function getUserByIdAction(userId: string) {
  try {
    const { user: currentUser } = await getAuthenticatedUser();

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    if (!targetUser) {
      throw new Error('User not found');
    }

    let isFriend = false;
    if (currentUser) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            { fromId: currentUser.id, toId: userId, status: 'ACCEPTED' },
            { fromId: userId, toId: currentUser.id, status: 'ACCEPTED' },
          ],
        },
      });
      isFriend = !!friendship;
    }

    const books = await prisma.book.findMany({
      where: {
        userId: userId,
        OR: [
          { privacy: 'PUBLIC' },
          ...(isFriend ? [{ privacy: 'FRIENDS' as const }] : []),
          ...(currentUser?.id === userId
            ? [{ privacy: 'PRIVATE' as const }]
            : []),
        ],
      },
      select: {
        id: true,
        title: true,
        author: true,
        genre: true,
        category: true,
        description: true,
        chapterCount: true,
        wordCount: true,
        commentCount: true,
        cover: true,
        createdAt: true,
        privacy: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      user: targetUser,
      books: books,
      bookCount: books.length,
      isOwnProfile: currentUser?.id === userId,
      isFriend: isFriend,
    };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}
