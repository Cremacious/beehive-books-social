'use server';
import { getAuthenticatedUser } from '@/lib/auth-server';
import prisma from '@/lib/prisma';
import { bookSchema, chapterSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function getUserBooksAction() {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const books = await prisma.book.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return books;
  } catch (error) {
    console.error('Error fetching user books:', error);
    throw error;
  }
}

export async function getBookByIdAction(bookId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: user.id,
      },
      include: {
        chapters: true,
      },
    });

    if (!book) {
      throw new Error('Book not found or access denied');
    }

    return book;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
}

export async function createBookAction(data: z.infer<typeof bookSchema>) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const privacyEnum = data.privacy.toUpperCase() as
      | 'PUBLIC'
      | 'PRIVATE'
      | 'FRIENDS';

    const parsedData = bookSchema.parse(data);

    const book = await prisma.book.create({
      data: {
        title: parsedData.title,
        author: parsedData.author,
        category: parsedData.category,
        genre: parsedData.genre,
        description: parsedData.description,
        privacy: privacyEnum,
        cover: parsedData.cover || null,
        userId: user.id,
      },
    });

    return book;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
}

export async function editBookAction(
  bookId: string,
  data: z.infer<typeof bookSchema>
) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const privacyEnum = data.privacy.toUpperCase() as
      | 'PUBLIC'
      | 'PRIVATE'
      | 'FRIENDS';

    const parsedData = bookSchema.parse(data);

    const book = await prisma.book.updateMany({
      where: {
        id: bookId,
        userId: user.id,
      },
      data: {
        title: parsedData.title,
        author: parsedData.author,
        category: parsedData.category,
        genre: parsedData.genre,
        description: parsedData.description,
        privacy: privacyEnum,
        cover: parsedData.cover || null,
      },
    });

    return book;
  } catch (error) {
    console.error('Error editing book:', error);
    throw error;
  }
}

export async function deleteBookAction(bookId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const deleted = await prisma.book.deleteMany({
      where: {
        id: bookId,
        userId: user.id,
      },
    });

    return deleted;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
}

export async function addChapterToBookAction(
  bookId: string,
  chapterData: z.infer<typeof chapterSchema>
) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: user.id,
      },
    });

    if (!book) {
      throw new Error('Book not found or access denied');
    }

    const parsedData = chapterSchema.parse(chapterData);

    const chapter = await prisma.chapter.create({
      data: {
        title: parsedData.chapterTitle,
        authorNotes: parsedData.notes || null,
        content: parsedData.content,
        bookId: book.id,
      },
    });

    return chapter;
  } catch (error) {
    console.error('Error adding chapter to book:', error);
    throw error;
  }
}

export async function getChapterByIdAction(chapterId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }
    const chapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
      },
      include: {
        comments: {
          include: {
            replies: true,
          },
        },
      },
    });
    if (!chapter) {
      throw new Error('Chapter not found or access denied');
    }
    return chapter;
  } catch (error) {
    console.error('Error fetching chapter by ID:', error);
    throw error;
  }
}
