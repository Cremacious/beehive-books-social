'use server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { revalidatePath } from 'next/cache';

const createReadingListSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export async function createReadingListAction(formData: FormData) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const data = createReadingListSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  const books: { title: string; author: string }[] = [];
  let index = 0;
  while (true) {
    const title = formData.get(`books[${index}][title]`);
    const author = formData.get(`books[${index}][author]`);
    if (!title || !author) break;
    books.push({ title: title as string, author: author as string });
    index++;
  }

  const readingList = await prisma.readingList.create({
    data: {
      title: data.title,
      description: data.description,
      userId: user.id,
      items: {
        create: books.map((book) => ({
          title: book.title,
          author: book.author,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  revalidatePath('/reading-lists');
  return readingList;
}

const editReadingListSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export async function editReadingListAction(
  listId: string,
  formData: FormData
) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const data = editReadingListSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  const readingList = await prisma.readingList.findUnique({
    where: { id: listId },
  });

  if (!readingList || readingList.userId !== user.id) {
    throw new Error('Reading list not found');
  }

  const updatedList = await prisma.readingList.update({
    where: { id: listId },
    data: {
      title: data.title,
      description: data.description,
    },
  });

  revalidatePath('/reading-lists');
  revalidatePath(`/reading-lists/${listId}/edit`);
  return updatedList;
}

export async function deleteReadingListAction(listId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const readingList = await prisma.readingList.findUnique({
    where: { id: listId },
  });

  if (!readingList || readingList.userId !== user.id) {
    throw new Error('Reading list not found');
  }

  await prisma.readingList.delete({
    where: { id: listId },
  });

  revalidatePath('/reading-lists');
}

const addBookToListSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  bookId: z.string().nullable(),
});

export async function addBookToListAction(listId: string, formData: FormData) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const data = addBookToListSchema.parse({
    title: formData.get('title'),
    author: formData.get('author'),
    bookId: formData.get('bookId'),
  });

  const readingList = await prisma.readingList.findUnique({
    where: { id: listId },
  });

  if (!readingList || readingList.userId !== user.id) {
    throw new Error('Reading list not found');
  }

  await prisma.readingListItem.create({
    data: {
      readingListId: listId,
      bookId: data.bookId || null,
      title: data.title,
      author: data.author,
    },
  });

  revalidatePath(`/reading-lists/${listId}/edit`);
}

export async function removeBookFromListAction(listId: string, itemId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const readingList = await prisma.readingList.findUnique({
    where: { id: listId },
  });

  if (!readingList || readingList.userId !== user.id) {
    throw new Error('Reading list not found');
  }

  await prisma.readingListItem.delete({
    where: { id: itemId },
  });

  revalidatePath(`/reading-lists/${listId}/edit`);
}

export async function toggleBookReadStatusAction(
  listId: string,
  itemId: string
) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const readingList = await prisma.readingList.findUnique({
    where: { id: listId },
  });

  if (!readingList || readingList.userId !== user.id) {
    throw new Error('Reading list not found');
  }

  const item = await prisma.readingListItem.findUnique({
    where: { id: itemId },
  });

  if (!item || item.readingListId !== listId) {
    throw new Error('Book not found in list');
  }

  await prisma.readingListItem.update({
    where: { id: itemId },
    data: {
      isRead: !item.isRead,
    },
  });

  revalidatePath(`/reading-lists/${listId}/edit`);
}

export async function getReadingListsAction() {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const readingLists = await prisma.readingList.findMany({
    where: { userId: user.id },
    include: {
      items: {
        orderBy: { addedAt: 'desc' },
      },
      _count: {
        select: { items: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return readingLists;
}

export async function getReadingListAction(listId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const readingList = await prisma.readingList.findUnique({
    where: { id: listId },
    include: {
      items: {
        orderBy: { addedAt: 'desc' },
      },
    },
  });

  if (!readingList || readingList.userId !== user.id) {
    throw new Error('Reading list not found');
  }

  return readingList;
}
