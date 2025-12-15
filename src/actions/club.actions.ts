'use server';
import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { z } from 'zod';
import { clubCreateSchema, clubEditSchema } from '@/lib/schemas';
// import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { deleteCloudinaryImage } from '@/lib/cloudinary-utils';

export async function createClubAction(formData: FormData) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const data = {
      clubName: formData.get('clubName') as string,
      description: formData.get('description') as string,
      currentBookTitle:
        (formData.get('currentBookTitle') as string) || undefined,
      currentBookAuthor:
        (formData.get('currentBookAuthor') as string) || undefined,
      currentBookChapters: formData.get('currentBookChapters')
        ? parseInt(formData.get('currentBookChapters') as string)
        : undefined,
      privacy: formData.get('privacy') as string,
      rules: formData.get('rules') as string,
      invites: formData.getAll('invites') as string[],
      tags: formData.getAll('tags') as string[],
    };

    const parsedData = clubCreateSchema.parse(data);

    let coverUrl: string | undefined;
    const coverUrlFromForm = formData.get('coverUrl') as string;
    if (coverUrlFromForm) {
      coverUrl = coverUrlFromForm;
    }

    const privacyEnum =
      parsedData.privacy === 'invite-only'
        ? 'PRIVATE'
        : (parsedData.privacy.toUpperCase() as
            | 'PUBLIC'
            | 'PRIVATE'
            | 'FRIENDS');

    const club = await prisma.club.create({
      data: {
        name: parsedData.clubName,
        description: parsedData.description,
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

    if (parsedData.currentBookTitle && parsedData.currentBookAuthor) {
      await prisma.clubReadingListItem.create({
        data: {
          clubId: club.id,
          title: parsedData.currentBookTitle,
          author: parsedData.currentBookAuthor,
          chapterCount: parsedData.currentBookChapters || 0,
          status: 'CURRENT',
          order: 1,
        },
      });

      await prisma.club.update({
        where: { id: club.id },
        data: {
          currentBookTitle: parsedData.currentBookTitle,
          currentBookAuthor: parsedData.currentBookAuthor,
          currentBookChapterCount: parsedData.currentBookChapters || 0,
        },
      });
    }

    if (parsedData.invites && parsedData.invites.length > 0) {
      for (const userId of parsedData.invites) {
        await prisma.clubMember.create({
          data: {
            userId,
            clubId: club.id,
            role: 'MEMBER',
          },
        });
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

    const currentClub = await prisma.club.findUnique({
      where: { id: clubId },
      select: { cover: true },
    });

    const data = {
      clubName: formData.get('clubName') as string,
      description: formData.get('description') as string,
      privacy: formData.get('privacy') as string,
      rules: formData.get('rules') as string,
      invites: formData.getAll('invites') as string[],
      tags: formData.getAll('tags') as string[],
    };

    const parsedData = clubEditSchema.parse(data);

    let coverUrl: undefined | string;
    const coverUrlFromForm = formData.get('coverUrl') as string;
    if (coverUrlFromForm) {
      coverUrl = coverUrlFromForm;
    }

    const privacyEnum =
      parsedData.privacy === 'invite-only'
        ? 'PRIVATE'
        : (parsedData.privacy.toUpperCase() as
            | 'PUBLIC'
            | 'PRIVATE'
            | 'FRIENDS');

    await prisma.club.update({
      where: { id: clubId },
      data: {
        name: parsedData.clubName,
        description: parsedData.description,
        privacy: privacyEnum,
        rules: parsedData.rules,
        tags: parsedData.tags || [],
        ...(coverUrl && { cover: coverUrl }),
      },
    });

    if (coverUrl && currentClub?.cover && coverUrl !== currentClub.cover) {
      await deleteCloudinaryImage(currentClub.cover);
    }

    if (parsedData.invites && parsedData.invites.length > 0) {
      for (const userId of parsedData.invites) {
        const existing = await prisma.clubMember.findFirst({
          where: { clubId, userId },
        });
        if (!existing) {
          await prisma.clubMember.create({
            data: {
              userId,
              clubId,
              role: 'MEMBER',
            },
          });
        }
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

export async function deleteClubAction(clubId: string) {
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
    if (!member) throw new Error('Only club owner can delete the club');

    const club = await prisma.club.findUnique({
      where: { id: clubId },
      select: { cover: true },
    });

    await prisma.club.delete({
      where: { id: clubId },
    });

    if (club?.cover) {
      await deleteCloudinaryImage(club.cover);
    }

    revalidatePath('/book-clubs');
    return { success: true, message: 'Club deleted successfully' };
  } catch (error) {
    console.error('Error deleting club:', error);
    return { success: false, message: 'Failed to delete club' };
  }
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
            _count: { select: { members: true } },
          },
        },
      },
    });

    const userClubs = clubMembers.map((member) => ({
      id: member.club.id,
      name: member.club.name,
      description: member.club.description,
      currentBook: member.club.currentBookTitle || '',
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
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!club) throw new Error('Club not found');

    return {
      id: club.id,
      clubName: club.name,
      description: club.description,
      currentBookTitle: club.currentBookTitle || '',
      currentBookAuthor: club.currentBookAuthor || '',
      currentBookChapters: club.currentBookChapterCount || 0,
      privacy: club.privacy.toLowerCase() as
        | 'public'
        | 'private'
        | 'invite-only',
      rules: club.rules,
      invites: null,
      tags: club.tags,
      cover: club.cover,
      members: club.members,
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
      const aIsCurrent =
        a.title === club.currentBookTitle &&
        a.author === club.currentBookAuthor;
      const bIsCurrent =
        b.title === club.currentBookTitle &&
        b.author === club.currentBookAuthor;
      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;
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
  chapterCount: z.number().min(1, 'Chapter count must be at least 1'),
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
      chapterCount: parseInt(formData.get('chapterCount') as string),
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
        bookId: null,
        title: data.title,
        author: data.author,
        chapterCount: data.chapterCount,
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

    await prisma.clubReadingListItem.update({
      where: { id: itemId },
      data: { status: 'CURRENT' },
    });

    await prisma.clubReadingListItem.updateMany({
      where: {
        clubId,
        id: { not: itemId },
        status: 'CURRENT',
      },
      data: { status: 'UPCOMING' },
    });

    await prisma.club.update({
      where: { id: clubId },
      data: {
        currentBookTitle: item.title,
        currentBookAuthor: item.author,
        currentBookChapterCount: item.chapterCount,
      },
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
          where: {
            parentId: null,
          },
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
                replies: {
                  include: {
                    author: {
                      include: {
                        user: true,
                      },
                    },
                  },
                  orderBy: { createdAt: 'asc' },
                },
              },
              orderBy: { createdAt: 'asc' },
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
    console.error('Error fetching club discussion by ID:', error);
    throw error;
  }
}

export async function removeClubMemberAction(clubId: string, memberId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const owner = await prisma.clubMember.findFirst({
      where: { clubId, userId: user.id, role: 'OWNER' },
    });
    if (!owner) throw new Error('Only club owners can remove members');

    const memberToRemove = await prisma.clubMember.findUnique({
      where: { id: memberId },
    });
    if (!memberToRemove || memberToRemove.clubId !== clubId) {
      throw new Error('Member not found in this club');
    }

    if (memberToRemove.role === 'OWNER') {
      throw new Error('Cannot remove the club owner');
    }

    await prisma.clubMember.delete({
      where: { id: memberId },
    });

    revalidatePath(`/book-clubs/${clubId}/settings`);
    return { success: true, message: 'Member removed successfully' };
  } catch (error) {
    console.error('Error removing club member:', error);
    return { success: false, message: 'Failed to remove member' };
  }
}

export async function inviteFriendToClubAction(
  clubId: string,
  friendId: string
) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) return { success: false, message: 'Unauthorized' };

    const ownerCheck = await prisma.clubMember.findFirst({
      where: {
        clubId,
        userId: user.id,
        role: 'OWNER',
      },
    });
    if (!ownerCheck)
      return { success: false, message: 'Only club owners can invite members' };

    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { fromId: user.id, toId: friendId, status: 'ACCEPTED' },
          { fromId: friendId, toId: user.id, status: 'ACCEPTED' },
        ],
      },
    });
    if (!friendRequest)
      return { success: false, message: 'User is not your friend' };

    const existingMember = await prisma.clubMember.findFirst({
      where: {
        clubId,
        userId: friendId,
      },
    });
    if (existingMember)
      return {
        success: false,
        message: 'Friend is already a member of this club',
      };

    await prisma.clubMember.create({
      data: {
        clubId,
        userId: friendId,
        role: 'MEMBER',
      },
    });

    revalidatePath(`/book-clubs/${clubId}`);
    revalidatePath('/book-clubs');
    return { success: true, message: 'Friend invited successfully' };
  } catch (error) {
    console.error('Error inviting friend to club:', error);
    return { success: false, message: 'Failed to invite friend' };
  }
}

export async function createDiscussionReplyAction(
  discussionId: string,
  content: string
) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const discussion = await prisma.discussion.findFirst({
      where: { id: discussionId },
      include: { club: true },
    });

    if (!discussion) {
      throw new Error('Discussion not found');
    }

    const clubMember = await prisma.clubMember.findFirst({
      where: {
        userId: user.id,
        clubId: discussion.clubId,
      },
    });

    if (!clubMember) {
      throw new Error('You must be a member of this club to comment');
    }

    const comment = await prisma.discussionComment.create({
      data: {
        content,
        authorId: clubMember.id,
        discussionId,
      },
      include: {
        author: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        replies: {
          include: {
            author: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    revalidatePath(
      `/book-clubs/${discussion.clubId}/discussions/${discussionId}`
    );

    return comment;
  } catch (error) {
    console.error('Error creating discussion reply:', error);
    throw error;
  }
}

export async function createNestedDiscussionReplyAction(
  parentCommentId: string,
  content: string
) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const parentComment = await prisma.discussionComment.findFirst({
      where: { id: parentCommentId },
      include: {
        discussion: {
          include: { club: true },
        },
      },
    });

    if (!parentComment) {
      throw new Error('Parent comment not found');
    }

    const clubMember = await prisma.clubMember.findFirst({
      where: {
        userId: user.id,
        clubId: parentComment.discussion.clubId,
      },
    });

    if (!clubMember) {
      throw new Error('You must be a member of this club to reply');
    }

    const reply = await prisma.discussionComment.create({
      data: {
        content,
        authorId: clubMember.id,
        discussionId: parentComment.discussionId,
        parentId: parentCommentId,
      },
      include: {
        author: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        replies: {
          include: {
            author: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    revalidatePath(
      `/book-clubs/${parentComment.discussion.clubId}/discussions/${parentComment.discussionId}`
    );

    return reply;
  } catch (error) {
    console.error('Error creating nested discussion reply:', error);
    throw error;
  }
}

export async function likeDiscussionReplyAction(commentId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const comment = await prisma.discussionComment.findFirst({
      where: { id: commentId },
      include: {
        author: {
          include: { user: true },
        },
        discussion: {
          include: { club: true },
        },
      },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    let canLike = comment.author.userId === user.id;
    if (!canLike) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              fromId: user.id,
              toId: comment.author.userId,
              status: 'ACCEPTED',
            },
            {
              fromId: comment.author.userId,
              toId: user.id,
              status: 'ACCEPTED',
            },
          ],
        },
      });
      canLike = !!friendship;
    }

    if (!canLike) {
      throw new Error('You must be friends with the author to like comments');
    }

    await prisma.discussionComment.update({
      where: { id: commentId },
      data: { likes: { increment: 1 } },
    });

    revalidatePath(
      `/book-clubs/${comment.discussion.clubId}/discussions/${comment.discussionId}`
    );

    return { success: true };
  } catch (error) {
    console.error('Error liking discussion comment:', error);
    throw error;
  }
}

export async function unlikeDiscussionReplyAction(commentId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const comment = await prisma.discussionComment.findFirst({
      where: { id: commentId },
      include: {
        author: {
          include: { user: true },
        },
        discussion: {
          include: { club: true },
        },
      },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    let canUnlike = comment.author.userId === user.id;
    if (!canUnlike) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              fromId: user.id,
              toId: comment.author.userId,
              status: 'ACCEPTED',
            },
            {
              fromId: comment.author.userId,
              toId: user.id,
              status: 'ACCEPTED',
            },
          ],
        },
      });
      canUnlike = !!friendship;
    }

    if (!canUnlike) {
      throw new Error('You must be friends with the author to unlike comments');
    }

    const currentComment = await prisma.discussionComment.findUnique({
      where: { id: commentId },
      select: { likes: true },
    });

    if (currentComment && currentComment.likes > 0) {
      await prisma.discussionComment.update({
        where: { id: commentId },
        data: { likes: { decrement: 1 } },
      });
    }

    revalidatePath(
      `/book-clubs/${comment.discussion.clubId}/discussions/${comment.discussionId}`
    );

    return { success: true };
  } catch (error) {
    console.error('Error unliking discussion comment:', error);
    throw error;
  }
}
