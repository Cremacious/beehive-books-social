'use server';
import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { z } from 'zod';
import { clubCreateSchema } from '@/lib/schemas';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export async function createClubAction(formData: FormData) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const data = {
      clubName: formData.get('clubName') as string,
      description: formData.get('description') as string,
      currentBookTitle: formData.get('currentBookTitle') as string,
      currentBookAuthor: formData.get('currentBookAuthor') as string,
      currentBookChapters: parseInt(formData.get('currentBookChapters') as string),
      privacy: formData.get('privacy') as string,
      rules: formData.get('rules') as string,
      invites: formData.get('invites') as string,
      tags: formData.getAll('tags') as string[],
    };

    const parsedData = clubCreateSchema.parse(data);

    let coverUrl: string | undefined;
    const coverFile = formData.get('cover') as File;
    if (coverFile && coverFile.size > 0) {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      interface CloudinaryUploadResult {
        secure_url: string;
        [key: string]: unknown;
      }

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'club-covers' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResult);
            }
          );
          uploadStream.end(buffer);
        }
      );
      coverUrl = result.secure_url;
    }

    const privacyEnum =
      parsedData.privacy === 'invite-only'
        ? 'PRIVATE'
        : (parsedData.privacy.toUpperCase() as
            | 'PUBLIC'
            | 'PRIVATE'
            | 'FRIENDS');

    let currentBookId: string | null = null;
    if (parsedData.currentBookTitle && parsedData.currentBookAuthor) {
      const book = await prisma.book.create({
        data: {
          title: parsedData.currentBookTitle,
          author: parsedData.currentBookAuthor,
          chapterCount: parsedData.currentBookChapters,
          genre: 'Fiction', 
          category: 'Book Club', 
          description: `Book for club: ${parsedData.clubName}`,
          userId: user.id,
          privacy: 'PUBLIC', 
        },
      });
      currentBookId = book.id;
    }

    const club = await prisma.club.create({
      data: {
        name: parsedData.clubName,
        description: parsedData.description,
        currentBookId,
        privacy: privacyEnum,
        rules: parsedData.rules,
        tags: parsedData.tags || [],
        cover: coverUrl,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
      },
    });

    if (parsedData.invites) {
      const inviteList = parsedData.invites
        .split(',')
        .map((email) => email.trim())
        .filter(Boolean);
      for (const invite of inviteList) {
        const invitedUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: invite }, { name: invite }],
          },
        });
        if (invitedUser) {
          await prisma.clubMember.create({
            data: {
              userId: invitedUser.id,
              clubId: club.id,
              role: 'MEMBER',
            },
          });
        }
      }
    }

    revalidatePath('/book-clubs');
    return {
      success: true,
      message: 'Club created successfully',
      clubId: club.id,
    };
  } catch (error) {
    console.error('Error creating club:', error);
    return { success: false, message: 'Failed to create club' };
  }
}

export async function editClubAction() {
  try {
  } catch (error) {}
}
export async function deleteClubAction() {
  try {
  } catch (error) {}
}

export async function getAllUserClubsAction() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const clubMembers = await prisma.clubMember.findMany({
      where: { userId: user.id },
      include: {
        club: {
          include: {
            currentBook: true,
            _count: { select: { members: true } },
          },
        },
      },
    });

    const userClubs = clubMembers.map((member) => ({
      id: member.club.id,
      name: member.club.name,
      description: member.club.description,
      currentBook: member.club.currentBook?.title || '',
      cover: member.club.cover || '',
      members: member.club._count.members,
      role: member.role === 'OWNER' ? 'Owner' : 'Member',
      privacy: member.club.privacy.toLowerCase(),
    }));

    return userClubs;
  } catch (error) {
    console.error('Error fetching user clubs:', error);
    return [];
  }
}

export async function getClubByIdAction(clubId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

 
    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id },
    });
    if (!member) throw new Error('Access denied: Not a member of this club');

    const club = await prisma.club.findUnique({
      where: { id: clubId },
      include: {
        currentBook: true,
        members: {
          include: {
            user: true,
          },
        },
        discussions: {
          include: {
            author: {
              include: {
                user: true,
              },
            },
            comments: {
              include: {
                author: {
                  include: {
                    user: true,
                  },
                },
                replies: {
                  include: {
                    author: {
                      include: {
                        user: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        readingList: {
          include: {
            book: true,
          },
        },
        _count: { select: { members: true } },
      },
    });

    if (!club) throw new Error('Club not found');

    return club;
  } catch (error) {
    console.error('Error fetching club by ID:', error);
    throw error;
  }
}

export async function updateClubProgressAction(clubId: string, currentChapter: number) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id, role: 'OWNER' },
    });
    if (!member) throw new Error('Only club owner can update progress');

    await prisma.club.update({
      where: { id: clubId },
      data: { currentChapter },
    });

    revalidatePath(`/book-clubs/${clubId}`);
    return { success: true, message: 'Progress updated successfully' };
  } catch (error) {
    console.error('Error updating club progress:', error);
    return { success: false, message: 'Failed to update progress' };
  }
}

export async function getClubReadingListAction(clubId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');


    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id },
    });
    if (!member) throw new Error('Not a member of this club');

    const club = await prisma.club.findUnique({
      where: { id: clubId },
      include: {
        currentBook: true,
        readingList: {
          include: {
            book: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        members: {
          where: { userId: user.id },
        },
      },
    });

    if (!club) throw new Error('Club not found');


    const sortedReadingList = club.readingList.sort((a, b) => {
      if (a.bookId === club.currentBookId) return -1;
      if (b.bookId === club.currentBookId) return 1;
      return a.order - b.order;
    });

    return {
      ...club,
      readingList: sortedReadingList,
      userRole: member.role,
    };
  } catch (error) {
    console.error('Error fetching club reading list:', error);
    throw error;
  }
}

const addBookToClubListSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  bookId: z.string().nullable(),
});

export async function addBookToClubListAction(clubId: string, formData: FormData) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    
    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id, role: 'OWNER' },
    });
    if (!member) throw new Error('Only club owner can add books');

    const data = addBookToClubListSchema.parse({
      title: formData.get('title'),
      author: formData.get('author'),
      bookId: formData.get('bookId'),
    });

    const club = await prisma.club.findUnique({
      where: { id: clubId },
    });

    if (!club) throw new Error('Club not found');

 
    const maxOrder = await prisma.clubReadingListItem.findFirst({
      where: { clubId },
      orderBy: { order: 'desc' },
    });

    const nextOrder = (maxOrder?.order || 0) + 1;

    await prisma.clubReadingListItem.create({
      data: {
        clubId,
        bookId: data.bookId || undefined,
        title: data.title,
        author: data.author,
        order: nextOrder,
        status: 'UPCOMING',
      },
    });

    revalidatePath(`/book-clubs/${clubId}/reading-list`);
    return { success: true, message: 'Book added successfully' };
  } catch (error) {
    console.error('Error adding book to club list:', error);
    return { success: false, message: 'Failed to add book' };
  }
}

export async function removeBookFromClubListAction(clubId: string, itemId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');


    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id, role: 'OWNER' },
    });
    if (!member) throw new Error('Only club owner can remove books');

    const item = await prisma.clubReadingListItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.clubId !== clubId) {
      throw new Error('Book not found in club list');
    }

    await prisma.clubReadingListItem.delete({
      where: { id: itemId },
    });

    revalidatePath(`/book-clubs/${clubId}/reading-list`);
    return { success: true, message: 'Book removed successfully' };
  } catch (error) {
    console.error('Error removing book from club list:', error);
    return { success: false, message: 'Failed to remove book' };
  }
}

export async function toggleClubBookReadStatusAction(clubId: string, itemId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');


    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id, role: 'OWNER' },
    });
    if (!member) throw new Error('Only club owner can update read status');

    const item = await prisma.clubReadingListItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.clubId !== clubId) {
      throw new Error('Book not found in club list');
    }

    await prisma.clubReadingListItem.update({
      where: { id: itemId },
      data: {
        isRead: !item.isRead,
      },
    });

    revalidatePath(`/book-clubs/${clubId}/reading-list`);
    return { success: true, message: 'Read status updated successfully' };
  } catch (error) {
    console.error('Error updating club book read status:', error);
    return { success: false, message: 'Failed to update read status' };
  }
}