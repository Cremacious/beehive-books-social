import { create } from 'zustand';
import { toast } from 'sonner';
import {
  createPromptAction,
  editPromptAction,
  deletePromptAction,
  getPromptsAction,
  getPromptAction,
  inviteFriendToPromptAction,
  uninviteFriendToPromptAction,
  submitPromptEntryAction,
  addPromptCommentAction,
  addPromptReplyAction,
} from '@/actions/prompt.actions';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  endDate: Date;
  status: 'OPEN' | 'CLOSED';
  userId: string;
  user?: {
    id: string;
    name: string;
  };
  invitedUsers: {
    id: string;
    name: string;
  }[];
  entries?: PromptEntry[];
  _count?: {
    entries: number;
  };
}

export interface PromptEntry {
  id: string;
  content: string;
  createdAt: Date;
  promptId: string;
  userId: string;
  user: {
    id: string;
    name: string;
  };
  comments: PromptComment[];
}

export interface PromptCommentReply {
  id: string;
  author: string;
  avatar: string | null;
  content: string;
  timestamp: string;
  likes: number;
}

export interface PromptComment {
  id: string;
  author: string;
  avatar: string | null;
  content: string;
  timestamp: string;
  likes: number;
  replies: PromptCommentReply[];
}

interface PromptStoreType {
  myPrompts: Prompt[];
  invitedPrompts: Prompt[];
  currentPrompt: Prompt | null;
  isLoading: boolean;
  isEditing: boolean;
  createPrompt: (formData: FormData) => Promise<void>;
  editPrompt: (formData: FormData, promptId: string) => Promise<void>;
  deletePrompt: (promptId: string) => Promise<void>;
  fetchPrompts: () => Promise<void>;
  fetchPrompt: (promptId: string) => Promise<void>;
  setCurrentPrompt: (prompt: Prompt | null) => void;
  setIsEditing: (editing: boolean) => void;
  inviteFriendToPrompt: (promptId: string, friendId: string) => Promise<void>;
  uninviteFriendToPrompt: (promptId: string, friendId: string) => Promise<void>;
  submitPromptEntry: (promptId: string, content: string) => Promise<void>;
  addPromptComment: (
    entryId: string,
    content: string
  ) => Promise<PromptComment>;
  addPromptReply: (
    commentId: string,
    content: string
  ) => Promise<PromptCommentReply>;
}

export const usePromptStore = create<PromptStoreType>((set) => ({
  myPrompts: [],
  invitedPrompts: [],
  currentPrompt: null,
  isLoading: false,
  isEditing: false,

  createPrompt: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const newPrompt = await createPromptAction(formData);
      if (!newPrompt) {
        throw new Error('Failed to create prompt');
      }
      set((state) => ({
        myPrompts: [newPrompt as Prompt, ...state.myPrompts],
      }));
      toast.success('Prompt created!');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      set({ isLoading: false });
    }
  },

  editPrompt: async (formData: FormData, promptId: string) => {
    set({ isLoading: true });
    try {
      const updatedPrompt = await editPromptAction(promptId, formData);

      set((state) => ({
        myPrompts: state.myPrompts.map((prompt) =>
          prompt.id === promptId
            ? {
                ...prompt,
                ...updatedPrompt,
                entries: prompt.entries,
              }
            : prompt
        ),
        currentPrompt:
          state.currentPrompt?.id === promptId
            ? {
                ...state.currentPrompt,
                ...updatedPrompt,
                entries: state.currentPrompt.entries,
              }
            : state.currentPrompt,
      }));
      toast.success('Prompt updated!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update prompt');
    } finally {
      set({ isLoading: false });
    }
  },

  deletePrompt: async (promptId: string) => {
    set({ isLoading: true });
    try {
      await deletePromptAction(promptId);
      set((state) => ({
        myPrompts: state.myPrompts.filter((prompt) => prompt.id !== promptId),
        invitedPrompts: state.invitedPrompts.filter(
          (prompt) => prompt.id !== promptId
        ),
        currentPrompt:
          state.currentPrompt?.id === promptId ? null : state.currentPrompt,
      }));
      toast.success('Prompt deleted!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to delete prompt');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPrompts: async () => {
    set({ isLoading: true });
    try {
      const { myPrompts, invitedPrompts } = await getPromptsAction();
      set({ myPrompts, invitedPrompts });
    } catch (error) {
      toast.error((error as Error).message || 'Failed to load prompts');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPrompt: async (promptId: string) => {
    set({ isLoading: true });
    try {
      const prompt = await getPromptAction(promptId);
      set({ currentPrompt: prompt });
    } catch (error) {
      toast.error((error as Error).message || 'Failed to load prompt');
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentPrompt: (prompt: Prompt | null) => set({ currentPrompt: prompt }),
  setIsEditing: (editing: boolean) => set({ isEditing: editing }),
  inviteFriendToPrompt: async (promptId: string, friendId: string) => {
    set({ isLoading: true });
    try {
      await inviteFriendToPromptAction(promptId, friendId);
      toast.success('Friend invited to prompt!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to invite friend');
    } finally {
      set({ isLoading: false });
    }
  },
  uninviteFriendToPrompt: async (promptId: string, friendId: string) => {
    set({ isLoading: true });
    try {
      await uninviteFriendToPromptAction(promptId, friendId);
      toast.success('Friend uninvited from prompt!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to uninvite friend');
    } finally {
      set({ isLoading: false });
    }
  },
  submitPromptEntry: async (promptId: string, content: string) => {
    set({ isLoading: true });
    try {
      await submitPromptEntryAction(promptId, content);
      toast.success('Entry submitted!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to submit entry');
    } finally {
      set({ isLoading: false });
    }
  },
  addPromptComment: async (entryId: string, content: string) => {
    const comment = await addPromptCommentAction(entryId, content);
    if (!comment) throw new Error('Failed to add comment');
    return comment as PromptComment;
  },
  addPromptReply: async (commentId: string, content: string) => {
    const reply = await addPromptReplyAction(commentId, content);
    if (!reply) throw new Error('Failed to add reply');
    return reply as PromptCommentReply;
  },
}));
