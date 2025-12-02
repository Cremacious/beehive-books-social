'use server';
import { getAuthenticatedUser } from '@/lib/auth-server';
import prisma from '@/lib/prisma';

export async function createBookAction(data: {
  title: string;
  author: string;
  category: string;
  genre: string;
  description: string;
  privacy: string;
  coverImage?: File;
}) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const privacyEnum = data.privacy.toUpperCase() as
      | 'PUBLIC'
      | 'PRIVATE'
      | 'FRIENDS';

    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        category: data.category,
        genre: data.genre,
        description: data.description,
        privacy: privacyEnum,
        cover: null,
        userId: user.id,
      },
    });

    return book;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
}
