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
      currentBookChapters: parseInt(
        formData.get('currentBookChapters') as string
      ),
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

    if (currentBookId) {
      await prisma.clubReadingListItem.create({
        data: {
          clubId: club.id,
          bookId: currentBookId,
          title: parsedData.currentBookTitle,
          author: parsedData.currentBookAuthor,
          order: 1,
          status: 'CURRENT',
        },
      });
    }

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

export async function editClubAction(clubId: string, formData: FormData) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const member = await prisma.clubMember.findFirst({
      where: {
        clubId,
        userId: user.id,
        role: 'OWNER',
      },
    });
    if (!member) throw new Error('Only club owners can edit clubs');

    const data = {
      clubName: formData.get('clubName') as string,
      description: formData.get('description') as string,
      currentBookTitle: formData.get('currentBookTitle') as string,
      currentBookAuthor: formData.get('currentBookAuthor') as string,
      currentBookChapters: parseInt(
        formData.get('currentBookChapters') as string
      ),
      privacy: formData.get('privacy') as string,
      rules: formData.get('rules') as string,
      invites: formData.get('invites') as string,
      tags: formData.getAll('tags') as string[],
    };

    const parsedData = clubCreateSchema.parse(data);

    let coverUrl: undefined | string;
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
      let book = await prisma.book.findFirst({
        where: {
          title: parsedData.currentBookTitle,
          author: parsedData.currentBookAuthor,
        },
      });

      if (!book) {
        book = await prisma.book.create({
          data: {
            title: parsedData.currentBookTitle,
            author: parsedData.currentBookAuthor,
            chapterCount: parsedData.currentBookChapters,
            genre: 'Fiction',
            category: 'Book Club',
            description: `Book for club: ${clubId}`,
            userId: user.id,
            privacy: 'PUBLIC',
          },
        });
      }
      currentBookId = book.id;
    }

    // Update the club
    const updatedClub = await prisma.club.update({
      where: { id: clubId },
      data: {
        name: parsedData.clubName,
        description: parsedData.description,
        currentBookId,
        privacy: privacyEnum,
        rules: parsedData.rules,
        tags: parsedData.tags || [],
        ...(coverUrl && { cover: coverUrl }),
      },
    });

    if (currentBookId) {
      await prisma.clubReadingListItem.updateMany({
        where: { clubId, status: 'CURRENT' },
        data: { status: 'UPCOMING' },
      });

      const existingItem = await prisma.clubReadingListItem.findFirst({
        where: { clubId, bookId: currentBookId },
      });

      if (existingItem) {
        await prisma.clubReadingListItem.update({
          where: { id: existingItem.id },
          data: { status: 'CURRENT' },
        });
      } else {
        await prisma.clubReadingListItem.create({
          data: {
            clubId,
            bookId: currentBookId,
            title: parsedData.currentBookTitle,
            author: parsedData.currentBookAuthor,
            order: 1,
            status: 'CURRENT',
          },
        });
      }
    }

    revalidatePath(`/book-clubs/${clubId}`);
    revalidatePath('/book-clubs');
    return {
      success: true,
      message: 'Club updated successfully',
    };
  } catch (error) {
    console.error('Error editing club:', error);
    return { success: false, message: 'Failed to update club' };
  }
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

export async function getClubForEditAction(clubId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id, role: 'OWNER' },
    });
    if (!member)
      throw new Error('Access denied: Only club owners can edit clubs');

    const club = await prisma.club.findUnique({
      where: { id: clubId },
      include: {
        currentBook: true,
      },
    });

    if (!club) throw new Error('Club not found');

    return {
      id: club.id,
      clubName: club.name,
      description: club.description,
      currentBookTitle: club.currentBook?.title || '',
      currentBookAuthor: club.currentBook?.author || '',
      currentBookChapters: club.currentBook?.chapterCount || 0,
      privacy: club.privacy.toLowerCase() as
        | 'public'
        | 'private'
        | 'invite-only',
      rules: club.rules,
      invites: null, // Not stored in current schema
      tags: club.tags,
      cover: club.cover,
    };
  } catch (error) {
    console.error('Error fetching club for edit:', error);
    throw error;
  }
}

export async function updateClubProgressAction(
  clubId: string,
  currentChapter: number
) {
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

export async function addBookToClubListAction(
  clubId: string,
  formData: FormData
) {
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

    let bookId = data.bookId;
    if (!bookId) {
      const book = await prisma.book.create({
        data: {
          title: data.title,
          author: data.author,
          chapterCount: 1,
          genre: 'Fiction',
          category: 'Book Club',
          description: `Book for club: ${clubId}`,
          userId: user.id,
          privacy: 'PUBLIC',
        },
      });
      bookId = book.id;
    }

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
        bookId,
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

export async function removeBookFromClubListAction(
  clubId: string,
  itemId: string
) {
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

export async function toggleClubBookReadStatusAction(
  clubId: string,
  itemId: string
) {
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

export async function setClubCurrentBookAction(clubId: string, itemId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id, role: 'OWNER' },
    });
    if (!member) throw new Error('Only club owner can set current book');

    const item = await prisma.clubReadingListItem.findFirst({
      where: { id: itemId, clubId },
    });
    if (!item) throw new Error('Book not found in reading list');

    await prisma.club.update({
      where: { id: clubId },
      data: { currentBookId: item.bookId },
    });

    revalidatePath(`/book-clubs/${clubId}`);
    revalidatePath(`/book-clubs/${clubId}/reading-list`);
    return { success: true, message: 'Current book updated successfully' };
  } catch (error) {
    console.error('Error setting current book:', error);
    return { success: false, message: 'Failed to set current book' };
  }
}

export async function createClubDiscussionAction(
  clubId: string,
  formData: FormData
) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const clubMember = await prisma.clubMember.findFirst({
      where: {
        clubId,
        userId: user.id,
      },
    });

    if (!clubMember) throw new Error('You are not a member of this club');

    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    };

    if (!data.title || !data.content) {
      throw new Error('Title and content are required');
    }

    const discussion = await prisma.discussion.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: clubMember.id,
        clubId,
      },
    });

    revalidatePath(`/book-clubs/${clubId}/discussions`);
    return {
      success: true,
      message: 'Discussion created successfully',
      discussionId: discussion.id,
    };
  } catch (error) {
    console.error('Error creating discussion:', error);
    return { success: false, message: 'Failed to create discussion' };
  }
}

export async function getClubDiscussionsAction(clubId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id },
    });
    if (!member) throw new Error('Access denied: Not a member of this club');

    const club = await prisma.club.findUnique({
      where: { id: clubId },
      select: { name: true },
    });

    if (!club) throw new Error('Club not found');

    const discussionsData = await prisma.discussion.findMany({
      where: { clubId },
      include: {
        author: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const discussions = discussionsData.map((discussion) => ({
      id: discussion.id,
      title: discussion.title,
      author: discussion.author.user.name,
      replies: discussion._count.comments,
      lastActivity: discussion.createdAt.toISOString(),
      likes: discussion.likes,
      createdAt: discussion.createdAt.toISOString(),
    }));

    return {
      club,
      discussions,
    };
  } catch (error) {
    console.error('Error fetching club discussions:', error);
    throw error;
  }
}

export async function getClubDiscussionByIdAction(
  clubId: string,
  discussionId: string
) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const member = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id },
    });
    if (!member) throw new Error('Access denied: Not a member of this club');

    const discussion = await prisma.discussion.findFirst({
      where: {
        id: discussionId,
        clubId: clubId,
      },
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
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!discussion) throw new Error('Discussion not found');

    return discussion;
  } catch (error) {
    console.error('Error fetching discussion by ID:', error);
    throw error;
  }
}
