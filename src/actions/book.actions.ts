'use server';
import { getAuthenticatedUser } from '@/lib/auth-server';
import prisma from '@/lib/prisma';
import { bookSchema, chapterSchema } from '@/lib/schemas';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/lib/cloudinary';

async function deleteCloudinaryImage(imageUrl: string) {
  try {
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.findIndex((part) => part === 'upload');
    if (uploadIndex === -1) return;

    const publicIdWithVersion = urlParts.slice(uploadIndex + 1).join('/');

    const publicId = publicIdWithVersion
      .replace(/^v\d+\//, '')
      .replace(/\.[^/.]+$/, '');

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
}

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

    const currentBook = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: user.id,
      },
    });

    if (!currentBook) {
      return { success: false, message: 'Book not found' };
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

    if (coverUrl && currentBook.cover && coverUrl !== currentBook.cover) {
      await deleteCloudinaryImage(currentBook.cover);
    }

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

    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: user.id,
      },
    });

    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    if (book.cover) {
      await deleteCloudinaryImage(book.cover);
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

export async function getPublicBookByIdAction(bookId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
      include: {
        chapters: true,
      },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.privacy === 'PRIVATE' && book.userId !== user.id) {
      throw new Error('Book not found');
    }

    if (book.privacy === 'FRIENDS' && book.userId !== user.id) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            { fromId: user.id, toId: book.userId, status: 'ACCEPTED' },
            { fromId: book.userId, toId: user.id, status: 'ACCEPTED' },
          ],
        },
      });

      if (!friendship) {
        throw new Error('Book not found');
      }
    }

    return book;
  } catch (error) {
    console.error('Error fetching public book by ID:', error);
    throw error;
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
        book: {
          select: {
            userId: true,
            privacy: true,
          },
        },
        comments: {
          where: { parentId: null },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            replies: {
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
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    if (!chapter) {
      throw new Error('Chapter not found or access denied');
    }

    let isFriend = false;
    if (chapter.book.userId !== user.id) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            { fromId: user.id, toId: chapter.book.userId, status: 'ACCEPTED' },
            { fromId: chapter.book.userId, toId: user.id, status: 'ACCEPTED' },
          ],
        },
      });
      isFriend = !!friendship;
    }

    if (
      chapter.book.privacy === 'FRIENDS' &&
      chapter.book.userId !== user.id &&
      !isFriend
    ) {
      throw new Error('Access denied: This chapter is only visible to friends');
    }

    return {
      id: chapter.id,
      title: chapter.title,
      commentCount: chapter.commentCount,
      authorNotes: chapter.authorNotes,
      content: chapter.content,
      wordCount: chapter.wordCount,
      bookId: chapter.bookId,
      book: chapter.book,
      comments: chapter.comments,
      isFriend: chapter.book.userId === user.id || isFriend,
      bookUserId: chapter.book.userId,
    };
  } catch (error) {
    console.error('Error fetching chapter by ID:', error);
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

    const wordCount = parsedData.content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    await prisma.chapter.create({
      data: {
        title: parsedData.chapterTitle,
        authorNotes: parsedData.notes || null,
        content: parsedData.content,
        wordCount: wordCount,
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
      chapter.bookId !== bookId ||
      chapter.book.userId !== user.id
    ) {
      console.log('Debug: chapter exists?', !!chapter);
      if (chapter) {
        console.log(
          'Debug: chapter.bookId === bookId?',
          chapter.bookId === bookId
        );
        console.log(
          'Debug: chapter.book.userId === user.id?',
          chapter.book.userId === user.id
        );
        console.log('Debug: user.id:', user.id);
      }
      throw new Error('Chapter not found or access denied');
    }

    return {
      title: chapter.title,
      content: chapter.content,
      notes: chapter.authorNotes,
      bookId: chapter.bookId,
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
        wordCount: newWordCount,
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

export async function addCommentToChapterAction(
  chapterId: string,
  content: string
) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const chapter = await prisma.chapter.findFirst({
      where: { id: chapterId },
      include: { book: true },
    });

    if (!chapter) {
      throw new Error('Chapter not found');
    }

    let canComment = chapter.book.userId === user.id;
    if (
      !canComment &&
      (chapter.book.privacy === 'FRIENDS' || chapter.book.privacy === 'PUBLIC')
    ) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            { fromId: user.id, toId: chapter.book.userId, status: 'ACCEPTED' },
            { fromId: chapter.book.userId, toId: user.id, status: 'ACCEPTED' },
          ],
        },
      });
      canComment = !!friendship;
    }

    if (!canComment) {
      throw new Error('You must be friends with the author to comment');
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        chapterId,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
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
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: { commentCount: { increment: 1 } },
    });

 
    if (chapter.book.userId !== user.id) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            { fromId: user.id, toId: chapter.book.userId, status: 'ACCEPTED' },
            { fromId: chapter.book.userId, toId: user.id, status: 'ACCEPTED' },
          ],
        },
      });

      if (friendship) {
        await prisma.notification.create({
          data: {
            type: 'book',
            message: `${user.name} commented on your chapter`,
            userId: chapter.book.userId,
            fromId: user.id,
          },
        });
      }
    }

    return comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function addReplyToCommentAction(
  commentId: string,
  content: string
) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const comment = await prisma.comment.findFirst({
      where: { id: commentId },
      include: {
        chapter: {
          include: { book: true },
        },
      },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    let canReply = comment.chapter.book.userId === user.id;
    if (
      !canReply &&
      (comment.chapter.book.privacy === 'FRIENDS' ||
        comment.chapter.book.privacy === 'PUBLIC')
    ) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              fromId: user.id,
              toId: comment.chapter.book.userId,
              status: 'ACCEPTED',
            },
            {
              fromId: comment.chapter.book.userId,
              toId: user.id,
              status: 'ACCEPTED',
            },
          ],
        },
      });
      canReply = !!friendship;
    }

    if (!canReply) {
      throw new Error('You must be friends with the author to reply');
    }

    const reply = await prisma.comment.create({
      data: {
        content: content.trim(),
        chapterId: comment.chapterId,
        parentId: commentId,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    await prisma.chapter.update({
      where: { id: comment.chapterId },
      data: { commentCount: { increment: 1 } },
    });

    // Create notification for comment author if replier is a friend
    if (comment.userId !== user.id) {
      // Check if the replier is friends with the comment author
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            { fromId: user.id, toId: comment.userId, status: 'ACCEPTED' },
            { fromId: comment.userId, toId: user.id, status: 'ACCEPTED' },
          ],
        },
      });

      if (friendship) {
        await prisma.notification.create({
          data: {
            type: 'reply',
            message: `${user.name} replied to your comment`,
            userId: comment.userId,
            fromId: user.id,
          },
        });
      }
    }

    return reply;
  } catch (error) {
    console.error('Error adding reply:', error);
    throw error;
  }
}

export async function likeChapterCommentAction(commentId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const comment = await prisma.comment.findFirst({
      where: { id: commentId },
      include: {
        chapter: {
          include: { book: true },
        },
      },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    let canLike = comment.chapter.book.userId === user.id;
    if (
      !canLike &&
      (comment.chapter.book.privacy === 'FRIENDS' ||
        comment.chapter.book.privacy === 'PUBLIC')
    ) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              fromId: user.id,
              toId: comment.chapter.book.userId,
              status: 'ACCEPTED',
            },
            {
              fromId: comment.chapter.book.userId,
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

    await prisma.comment.update({
      where: { id: commentId },
      data: { likes: { increment: 1 } },
    });

    return { success: true };
  } catch (error) {
    console.error('Error liking comment:', error);
    throw error;
  }
}

export async function unlikeChapterCommentAction(commentId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error(error || 'User not authenticated');
    }

    const comment = await prisma.comment.findFirst({
      where: { id: commentId },
      include: {
        chapter: {
          include: { book: true },
        },
      },
    });

    if (!comment) {
      throw new Error('Comment not found');
    }

    let canUnlike = comment.chapter.book.userId === user.id;
    if (
      !canUnlike &&
      (comment.chapter.book.privacy === 'FRIENDS' ||
        comment.chapter.book.privacy === 'PUBLIC')
    ) {
      const friendship = await prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              fromId: user.id,
              toId: comment.chapter.book.userId,
              status: 'ACCEPTED',
            },
            {
              fromId: comment.chapter.book.userId,
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

    const currentComment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { likes: true },
    });

    if (currentComment && currentComment.likes > 0) {
      await prisma.comment.update({
        where: { id: commentId },
        data: { likes: { decrement: 1 } },
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error unliking comment:', error);
    throw error;
  }
}
