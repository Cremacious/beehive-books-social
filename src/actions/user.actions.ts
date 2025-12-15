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
        bio: true,
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
          ...(isFriend || currentUser?.id === userId
            ? [{ privacy: 'FRIENDS' as const }]
            : []),
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

export async function updateUserProfileImageAction(formData: FormData) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const oldImageUrl = user.image;

    const buffer = Buffer.from(await file.arrayBuffer());

    const cloudinary = (await import('@/lib/cloudinary')).default;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'profile-images',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { image: result.secure_url },
    });

    if (oldImageUrl && oldImageUrl.includes('cloudinary.com')) {
      try {
        const urlParts = oldImageUrl.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
          const publicIdParts = urlParts.slice(uploadIndex + 2);
          const publicIdWithExtension = publicIdParts.join('/');
          const publicId = publicIdWithExtension.split('.')[0];

          await new Promise<void>((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
              if (error) {
                console.warn(
                  'Failed to delete old profile image from Cloudinary:',
                  error
                );
                reject(error);
              } else {
                console.log(
                  'Old profile image deleted from Cloudinary:',
                  result
                );
                resolve();
              }
            });
          });
        }
      } catch (deleteError) {
        console.warn('Error deleting old profile image:', deleteError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating profile image:', error);
    throw error;
  }
}

export async function changeUserPasswordAction() {}

export async function deleteUserAccountAction() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    if (user.image && user.image.includes('cloudinary.com')) {
      try {
        const cloudinary = (await import('@/lib/cloudinary')).default;
        const urlParts = user.image.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
          const publicIdParts = urlParts.slice(uploadIndex + 2);
          const publicIdWithExtension = publicIdParts.join('/');
          const publicId = publicIdWithExtension.split('.')[0];

          await new Promise<void>((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
              if (error) {
                console.warn(
                  'Failed to delete profile image from Cloudinary:',
                  error
                );
                reject(error);
              } else {
                console.log('Profile image deleted from Cloudinary:', result);
                resolve();
              }
            });
          });
        }
      } catch (deleteError) {
        console.warn('Error deleting profile image:', deleteError);
      }
    }

    const userBooks = await prisma.book.findMany({
      where: { userId: user.id },
      select: { id: true, cover: true },
    });

    for (const book of userBooks) {
      if (book.cover && book.cover.includes('cloudinary.com')) {
        try {
          const cloudinary = (await import('@/lib/cloudinary')).default;
          const urlParts = book.cover.split('/');
          const uploadIndex = urlParts.indexOf('upload');
          if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
            const publicIdParts = urlParts.slice(uploadIndex + 2);
            const publicIdWithExtension = publicIdParts.join('/');
            const publicId = publicIdWithExtension.split('.')[0];

            await new Promise<void>((resolve) => {
              cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                  console.warn(
                    `Failed to delete book cover from Cloudinary for book ${book.id}:`,
                    error
                  );
                } else {
                  console.log(
                    `Book cover deleted from Cloudinary for book ${book.id}:`,
                    result
                  );
                }
                resolve();
              });
            });
          }
        } catch (deleteError) {
          console.warn(
            `Error deleting book cover for book ${book.id}:`,
            deleteError
          );
        }
      }
    }

    await prisma.user.delete({
      where: { id: user.id },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
}

export async function updateBioAction(bio: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { bio: bio.trim() || null },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating bio:', error);
    throw error;
  }
}

export async function getNotificationsAction() {
  interface Notification {
    id: string;
    type: 'friend' | 'book' | 'club' | 'prompt' | 'reply';
    message: string;
    createdAt: Date;
    from?: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
    fromUserId?: string;
    fromUserName?: string;
  }

  try {
    const { user } = await getAuthenticatedUser();
    if (!user) return { notifications: [] };

    const notifications: Notification[] = [];

    const friendRequests = await prisma.friendRequest.findMany({
      where: { toId: user.id, status: 'PENDING' },
      include: { from: true },
      orderBy: { createdAt: 'desc' },
    });
    friendRequests.forEach((req) => {
      notifications.push({
        id: `friend-${req.id}`,
        type: 'friend',
        message: `${req.from.name} sent you a friend request`,
        createdAt: req.createdAt,
        from: req.from,
        fromUserId: req.from.id,
        fromUserName: req.from.name,
      });
    });

    const bookComments = await prisma.comment.findMany({
      where: {
        chapter: {
          book: {
            userId: user.id,
          },
        },
        userId: {
          not: user.id,
        },
      },
      include: {
        user: { select: { id: true, name: true } },
        chapter: { select: { title: true, book: { select: { title: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    bookComments.forEach((comment) => {
      notifications.push({
        id: `book-${comment.id}`,
        type: 'book',
        message: `${comment.user.name} commented on "${comment.chapter.book.title}" - "${comment.chapter.title}"`,
        createdAt: comment.createdAt,
        fromUserId: comment.user.id,
        fromUserName: comment.user.name,
      });
    });

    const clubDiscussions = await prisma.discussion.findMany({
      where: {
        club: {
          members: {
            some: { userId: user.id },
          },
        },
        author: {
          userId: {
            not: user.id,
          },
        },
      },
      include: {
        author: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
        club: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    clubDiscussions.forEach((disc) => {
      notifications.push({
        id: `club-${disc.id}`,
        type: 'club',
        message: `${disc.author.user.name} started a discussion in "${disc.club.name}"`,
        createdAt: disc.createdAt,
        fromUserId: disc.author.user.id,
        fromUserName: disc.author.user.name,
      });
    });

    const clubMemberships = await prisma.clubMember.findMany({
      where: {
        userId: user.id,
        role: 'MEMBER',
      },
      include: {
        club: {
          select: {
            name: true,
            members: {
              where: { role: 'OWNER' },
              select: {
                user: {
                  select: { id: true, name: true, email: true, image: true },
                },
              },
            },
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });
    clubMemberships.forEach((membership) => {
      const owner = membership.club.members[0]?.user;
      notifications.push({
        id: `club-invite-${membership.id}`,
        type: 'club',
        message: owner
          ? `${owner.name} added you to "${membership.club.name}"`
          : `You have been added to "${membership.club.name}"`,
        createdAt: membership.joinedAt,
        from: owner,
        fromUserId: owner?.id,
        fromUserName: owner?.name,
      });
    });

    const promptComments = await prisma.promptComment.findMany({
      where: {
        entry: {
          userId: user.id,
        },
      },
      include: {
        user: { select: { id: true, name: true } },
        entry: { select: { prompt: { select: { title: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    promptComments.forEach((comment) => {
      notifications.push({
        id: `prompt-${comment.id}`,
        type: 'prompt',
        message: `${comment.user.name} commented on your entry for "${comment.entry.prompt.title}"`,
        createdAt: comment.createdAt,
        fromUserId: comment.user.id,
        fromUserName: comment.user.name,
      });
    });

    const commentReplies = await prisma.comment.findMany({
      where: {
        parentId: { not: null },
        parent: { userId: user.id },
      },
      include: {
        user: { select: { id: true, name: true } },
        parent: {
          select: {
            chapter: {
              select: { title: true, book: { select: { title: true } } },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    commentReplies.forEach((reply) => {
      notifications.push({
        id: `reply-${reply.id}`,
        type: 'reply',
        message: `${reply.user.name} replied to your comment on "${
          reply.parent?.chapter?.book?.title ?? 'your book'
        }"`,
        createdAt: reply.createdAt,
        fromUserId: reply.user.id,
        fromUserName: reply.user.name,
      });
    });

    const promptInvitations = await prisma.prompt.findMany({
      where: {
        invitedUsers: {
          some: { id: user.id },
        },
      },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    promptInvitations.forEach((prompt) => {
      notifications.push({
        id: `prompt-invite-${prompt.id}`,
        type: 'prompt',
        message: `${prompt.user.name} invited you to respond to "${prompt.title}"`,
        createdAt: prompt.createdAt,
        from: prompt.user,
        fromUserId: prompt.user.id,
        fromUserName: prompt.user.name,
      });
    });

    notifications.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { notifications: notifications.slice(0, 20) };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { notifications: [] };
  }
}

export async function getNotificationsCountAction() {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) return { total: 0 };

    const friendRequests = await prisma.friendRequest.count({
      where: { toId: user.id, status: 'PENDING' },
    });

    const bookComments = await prisma.comment.count({
      where: {
        chapter: {
          book: {
            userId: user.id,
          },
        },
      },
    });

    const clubDiscussions = await prisma.discussion.count({
      where: {
        club: {
          members: {
            some: { userId: user.id },
          },
        },
      },
    });

    const promptComments = await prisma.promptComment.count({
      where: {
        entry: {
          userId: user.id,
        },
      },
    });

    const commentReplies = await prisma.comment.count({
      where: {
        parentId: {
          not: null,
        },
        parent: {
          userId: user.id,
        },
      },
    });

    const clubInvites = await prisma.clubMember.count({
      where: {
        userId: user.id,
        role: 'MEMBER',
      },
    });

    const promptInvites = await prisma.prompt.count({
      where: {
        invitedUsers: {
          some: { id: user.id },
        },
      },
    });

    const total =
      friendRequests +
      bookComments +
      clubDiscussions +
      promptComments +
      commentReplies +
      clubInvites +
      promptInvites;

    return { total };
  } catch (error) {
    console.error('Error fetching notifications count:', error);
    return { total: 0 };
  }
}
