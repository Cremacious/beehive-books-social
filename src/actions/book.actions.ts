'use server';
import { getAuthenticatedUser } from '@/lib/auth-server';
import prisma from '@/lib/prisma';
import { bookSchema, chapterSchema } from '@/lib/schemas';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

//Books

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

export async function createBookAction(
  data: z.infer<typeof bookSchema>,
  coverUrl?: string
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

    await prisma.book.create({
      data: {
        title: parsedData.title,
        author: parsedData.author,
        category: parsedData.category,
        genre: parsedData.genre,
        description: parsedData.description,
        privacy: privacyEnum,
        cover: coverUrl || null,
        userId: user.id,
      },
    });

    revalidatePath('/my-books');

    return { success: true, message: 'Book created successfully' };
  } catch (error) {
    console.error('Error creating book:', error);
    return { success: false, message: 'Failed to create book' };
  }
}

export async function editBookAction(
  bookId: string,
  data: z.infer<typeof bookSchema>,
  coverUrl?: string
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

    await prisma.book.updateMany({
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
        cover: coverUrl || null,
      },
    });
    revalidatePath(`/my-books/${bookId}`);
    return { success: true, message: 'Book updated successfully' };
  } catch (error) {
    console.error('Error editing book:', error);
    return { success: false, message: 'Failed to update bookXXX' };
  }
}

export async function deleteBookAction(bookId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    await prisma.book.deleteMany({
      where: {
        id: bookId,
        userId: user.id,
      },
    });

    return { success: true, message: 'Book deleted successfully' };
  } catch (error) {
    console.error('Error deleting book:', error);
    return { success: false, message: 'Failed to delete book' };
  }
}

//Chapters

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
    throw Error('Error fetching chapter');
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

    const wordCount = parsedData.content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    await prisma.chapter.create({
      data: {
        title: parsedData.chapterTitle,
        authorNotes: parsedData.notes || null,
        content: parsedData.content,
        bookId: book.id,
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: {
        chapterCount: { increment: 1 },
        wordCount: { increment: wordCount },
      },
    });

    return { success: true, message: 'Chapter added successfully' };
  } catch (error) {
    console.error('Error adding chapter to book:', error);
    return { success: false, message: 'Failed to add chapter' };
  }
}

export async function getChapterForEditAction(
  bookId: string,
  chapterId: string
) {
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
        book: true,
      },
    });

    if (
      !chapter ||
      chapter.book.userId !== user.id ||
      chapter.bookId !== bookId
    ) {
      throw new Error('Chapter not found or access denied');
    }

    return {
      title: chapter.title,
      content: chapter.content,
      notes: chapter.authorNotes,
    };
  } catch (error) {
    console.error('Error fetching chapter for edit:', error);
    throw error;
  }
}

export async function editChapterAction(
  bookId: string,
  chapterId: string,
  chapterData: z.infer<typeof chapterSchema>
) {
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
        book: true,
      },
    });

    if (
      !chapter ||
      chapter.book.userId !== user.id ||
      chapter.bookId !== bookId
    ) {
      throw new Error('Chapter not found or access denied');
    }

    const parsedData = chapterSchema.parse(chapterData);

    const oldWordCount = chapter.content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const newWordCount = parsedData.content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const wordCountDiff = newWordCount - oldWordCount;

    await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        title: parsedData.chapterTitle,
        authorNotes: parsedData.notes || null,
        content: parsedData.content,
      },
    });

    if (wordCountDiff !== 0) {
      await prisma.book.update({
        where: { id: bookId },
        data: { wordCount: { increment: wordCountDiff } },
      });
    }

    return { success: true, message: 'Chapter edited successfully' };
  } catch (error) {
    console.error('Error editing chapter:', error);
    return { success: false, message: 'Failed to edit chapter' };
  }
}

export async function deleteChapterAction(bookId: string, chapterId: string) {
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
        book: true,
      },
    });

    if (
      !chapter ||
      chapter.book.userId !== user.id ||
      chapter.bookId !== bookId
    ) {
      throw new Error('Chapter not found or access denied');
    }

    const wordCount = chapter.content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    await prisma.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: {
        chapterCount: { decrement: 1 },
        wordCount: { decrement: wordCount },
      },
    });

    revalidatePath(`/my-books/${bookId}`);

    return { success: true, message: 'Chapter deleted successfully' };
  } catch (error) {
    console.error('Error deleting chapter:', error);
    return { success: false, message: 'Failed to delete chapter' };
  }
}
