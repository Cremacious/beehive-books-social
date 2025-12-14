'use server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { revalidatePath } from 'next/cache';

const createPromptSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  endDate: z.string().min(1, 'End date is required'),
});

export async function createPromptAction(formData: FormData) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const data = createPromptSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      endDate: formData.get('endDate'),
    });

    const invitedFriends: string[] = [];
    let index = 0;
    while (true) {
      const friendId = formData.get(`invitedFriends[${index}]`);
      if (!friendId) break;
      invitedFriends.push(friendId as string);
      index++;
    }

    const endDate = new Date(data.endDate);
    if (endDate <= new Date()) {
      throw new Error('End date must be in the future');
    }

    const prompt = await prisma.prompt.create({
      data: {
        title: data.title,
        description: data.description,
        endDate: endDate,
        userId: user.id,
        invitedUsers: {
          connect: invitedFriends.map((id) => ({ id })),
        },
      },
      include: {
        invitedUsers: {
          select: { id: true, name: true },
        },
        _count: {
          select: { entries: true },
        },
      },
    });

    revalidatePath('/prompts');
    return prompt;
  } catch (error) {
    console.log(error);
  }
}

export async function editPromptAction(promptId: string, formData: FormData) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const data = createPromptSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    endDate: formData.get('endDate'),
  });

  const invitedFriends: string[] = [];
  let index = 0;
  while (true) {
    const friendId = formData.get(`invitedFriends[${index}]`);
    if (!friendId) break;
    invitedFriends.push(friendId as string);
    index++;
  }

  const endDate = new Date(data.endDate);
  if (endDate <= new Date()) {
    throw new Error('End date must be in the future');
  }

  const prompt = await prisma.prompt.findUnique({
    where: { id: promptId },
  });

  if (!prompt || prompt.userId !== user.id) {
    throw new Error('Prompt not found');
  }

  const updatedPrompt = await prisma.prompt.update({
    where: { id: promptId },
    data: {
      title: data.title,
      description: data.description,
      endDate: endDate,
      invitedUsers: {
        set: invitedFriends.map((id) => ({ id })),
      },
    },
    include: {
      invitedUsers: {
        select: { id: true, name: true },
      },
      _count: {
        select: { entries: true },
      },
    },
  });

  revalidatePath('/prompts');
  revalidatePath(`/prompts/${promptId}`);
  return updatedPrompt;
}

export async function deletePromptAction(promptId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const prompt = await prisma.prompt.findUnique({
    where: { id: promptId },
  });

  if (!prompt || prompt.userId !== user.id) {
    throw new Error('Prompt not found');
  }

  await prisma.prompt.delete({
    where: { id: promptId },
  });

  revalidatePath('/prompts');
}

export async function getPromptsAction() {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const myPrompts = await prisma.prompt.findMany({
    where: { userId: user.id },
    include: {
      invitedUsers: {
        select: { id: true, name: true },
      },
      _count: {
        select: { entries: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const invitedPrompts = await prisma.prompt.findMany({
    where: {
      invitedUsers: {
        some: { id: user.id },
      },
    },
    include: {
      user: {
        select: { id: true, name: true },
      },
      invitedUsers: {
        select: { id: true, name: true },
      },
      _count: {
        select: { entries: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return { myPrompts, invitedPrompts };
}

export async function getPromptAction(promptId: string) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const prompt = await prisma.prompt.findUnique({
    where: { id: promptId },
    include: {
      user: {
        select: { id: true, name: true },
      },
      invitedUsers: {
        select: { id: true, name: true },
      },
      entries: {
        include: {
          user: {
            select: { id: true, name: true },
          },
          comments: {
            include: {
              user: {
                select: { id: true, name: true },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: { entries: true },
      },
    },
  });

  if (!prompt) {
    throw new Error('Prompt not found');
  }

  const hasAccess =
    prompt.userId === user.id ||
    prompt.invitedUsers.some((invited) => invited.id === user.id);

  if (!hasAccess) {
    throw new Error('Access denied');
  }

  const transformedPrompt = {
    ...prompt,
    entries: prompt.entries?.map((entry) => ({
      ...entry,
      comments: entry.comments.map((comment) => ({
        id: comment.id,
        author: comment.user.name,
        avatar: null,
        content: comment.content,
        timestamp: comment.createdAt.toISOString(),
        likes: 0,
        replies: [],
      })),
    })),
  };

  return transformedPrompt;
}

export async function inviteFriendToPromptAction(
  promptId: string,
  friendId: string
) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    });

    if (!prompt || prompt.userId !== user.id) {
      throw new Error('Prompt not found');
    }

    await prisma.prompt.update({
      where: { id: promptId },
      data: {
        invitedUsers: {
          connect: { id: friendId },
        },
      },
    });

    revalidatePath(`/prompts/${promptId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function uninviteFriendToPromptAction(
  promptId: string,
  friendId: string
) {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const prompt = await prisma.prompt.findUnique({
    where: { id: promptId },
  });

  if (!prompt || prompt.userId !== user.id) {
    throw new Error('Prompt not found');
  }

  await prisma.prompt.update({
    where: { id: promptId },
    data: {
      invitedUsers: {
        disconnect: { id: friendId },
      },
    },
  });

  revalidatePath(`/prompts/${promptId}`);
}

export async function submitPromptEntryAction(
  promptId: string,
  content: string
) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    });

    if (!prompt) {
      throw new Error('Prompt not found');
    }

    const hasAccess =
      prompt.userId === user.id ||
      (await prisma.prompt
        .findUnique({
          where: { id: promptId },
          include: {
            invitedUsers: {
              where: { id: user.id },
            },
          },
        })
        .then((p) => p?.invitedUsers && p.invitedUsers.length > 0));

    if (!hasAccess) {
      throw new Error('Access denied');
    }

    const entry = await prisma.promptEntry.create({
      data: {
        content,
        promptId,
        userId: user.id,
      },
      include: {
        user: {
          select: { id: true, name: true },
        },
        comments: {
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    revalidatePath(`/prompts/${promptId}`);

    const transformedEntry = {
      ...entry,
      comments: entry.comments.map((comment) => ({
        id: comment.id,
        author: comment.user.name,
        avatar: null,
        content: comment.content,
        timestamp: comment.createdAt.toISOString(),
        likes: 0,
        replies: [],
      })),
    };

    return transformedEntry;
  } catch (error) {
    console.log(error);
  }
}

export async function getPromptEntryByIdAction(entryId: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const entry = await prisma.promptEntry.findUnique({
      where: { id: entryId },
      include: {
        prompt: {
          include: {
            invitedUsers: {
              select: { id: true },
            },
          },
        },
        user: {
          select: { id: true, name: true },
        },
        comments: {
          where: { parentId: null },
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
            replies: {
              include: {
                user: {
                  select: { id: true, name: true, image: true },
                },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!entry) {
      throw new Error('Entry not found');
    }

    const hasAccess =
      entry.prompt.userId === user.id ||
      entry.userId === user.id ||
      entry.prompt.invitedUsers.some((invited) => invited.id === user.id);

    if (!hasAccess) {
      throw new Error('Access denied');
    }

    const transformedComments = entry.comments.map((comment) => ({
      id: comment.id,
      author: comment.user.name,
      avatar: comment.user.image,
      content: comment.content,
      timestamp: comment.createdAt.toISOString(),
      likes: 0,
      replies: comment.replies.map((reply) => ({
        id: reply.id,
        author: reply.user.name,
        avatar: reply.user.image,
        content: reply.content,
        timestamp: reply.createdAt.toISOString(),
        likes: 0,
      })),
    }));

    return {
      ...entry,
      comments: transformedComments,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function addPromptCommentAction(entryId: string, content: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const entry = await prisma.promptEntry.findUnique({
      where: { id: entryId },
      include: {
        prompt: {
          include: {
            invitedUsers: { select: { id: true } },
          },
        },
      },
    });

    if (!entry) throw new Error('Entry not found');

    const hasAccess =
      entry.prompt.userId === user.id ||
      entry.prompt.invitedUsers.some((invited) => invited.id === user.id);

    if (!hasAccess) throw new Error('Access denied');

    const comment = await prisma.promptComment.create({
      data: {
        content,
        entryId: entryId,
        userId: user.id,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    revalidatePath(`/prompts/${entry.promptId}/${entryId}`);

    if (entry.userId !== user.id) {
      await prisma.notification.create({
        data: {
          type: 'prompt',
          message: `${user.name} commented on your prompt entry`,
          userId: entry.userId,
          fromId: user.id,
        },
      });
    }

    return {
      id: comment.id,
      author: comment.user.name,
      avatar: comment.user.image,
      content: comment.content,
      timestamp: comment.createdAt.toISOString(),
      likes: 0,
      replies: [],
    };
  } catch (error) {
    console.log(error);
  }
}

export async function addPromptReplyAction(commentId: string, content: string) {
  try {
    const { user } = await getAuthenticatedUser();
    if (!user) throw new Error('Unauthorized');

    const parentComment = await prisma.promptComment.findUnique({
      where: { id: commentId },
      include: {
        entry: {
          include: {
            prompt: {
              include: {
                invitedUsers: { select: { id: true } },
              },
            },
          },
        },
      },
    });

    if (!parentComment) throw new Error('Comment not found');

    const hasAccess =
      parentComment.entry.prompt.userId === user.id ||
      parentComment.entry.prompt.invitedUsers.some(
        (invited) => invited.id === user.id
      );

    if (!hasAccess) throw new Error('Access denied');

    const reply = await prisma.promptComment.create({
      data: {
        content,
        entryId: parentComment.entryId,
        userId: user.id,
        parentId: commentId,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    revalidatePath(
      `/prompts/${parentComment.entry.promptId}/${parentComment.entryId}`
    );

   
    if (parentComment.userId !== user.id) {
      await prisma.notification.create({
        data: {
          type: 'reply',
          message: `${user.name} replied to your comment`,
          userId: parentComment.userId,
          fromId: user.id,
        },
      });
    }

    return {
      id: reply.id,
      author: reply.user.name,
      avatar: reply.user.image,
      content: reply.content,
      timestamp: reply.createdAt.toISOString(),
      likes: 0,
    };
  } catch (error) {
    console.log(error);
  }
}
