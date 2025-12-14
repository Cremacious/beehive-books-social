import { create } from 'zustand';
import {
  createClubAction,
  editClubAction,
  deleteClubAction,
  createClubDiscussionAction,
  removeClubMemberAction,
  inviteFriendToClubAction,
  createDiscussionReplyAction,
  createNestedDiscussionReplyAction,
  unlikeDiscussionReplyAction,
  likeDiscussionReplyAction,
} from '@/actions/club.actions';
import { DiscussionCommentType } from '@/lib/types';
import { toast } from 'sonner';

interface ClubStoreType {
  isLoading: boolean;
  createClub: (
    formData: FormData
  ) => Promise<{ success: boolean; message: string; clubId?: string }>;
  editClub: (clubId: string, formData: FormData) => Promise<void>;
  deleteClub: (clubId: string) => Promise<void>;

  createClubDiscussion: (clubId: string, formData: FormData) => Promise<void>;
  removeClubMember: (clubId: string, memberId: string) => Promise<void>;
  inviteFriend: (clubId: string, friendId: string) => Promise<void>;

  addDiscussionReply: (
    discussionId: string,
    content: string
  ) => Promise<DiscussionCommentType>;
  addNestedDiscussionReply: (
    parentCommentId: string,
    content: string
  ) => Promise<DiscussionCommentType>;
  likeDiscussionReply: (commentId: string) => Promise<void>;
  unlikeDiscussionReply: (commentId: string) => Promise<void>;
}

export const useClubStore = create<ClubStoreType>((set) => ({
  isLoading: false,
  createClub: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const result = await createClubAction(formData);
      if (result.success) {
        toast.success(result.message);
        return result;
      } else {
        toast.error(result.message);
        console.log(result);
        return result;
      }
    } catch (error) {
      toast.error('Failed to create club');
      console.log(error);
      return { success: false, message: 'Failed to create club' };
    } finally {
      set({ isLoading: false });
    }
  },
  editClub: async (clubId: string, formData: FormData) => {
    set({ isLoading: true });
    try {
      const result = await editClubAction(clubId, formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        console.log(result);
      }
    } catch (error) {
      toast.error('Failed to update club');
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteClub: async (clubId: string) => {
    set({ isLoading: true });
    try {
      const result = await deleteClubAction(clubId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        console.log(result);
      }
    } catch (error) {
      toast.error('Failed to delete club');
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  createClubDiscussion: async (clubId: string, formData: FormData) => {
    set({ isLoading: true });
    try {
      const result = await createClubDiscussionAction(clubId, formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        console.log(result);
      }
    } catch (error) {
      toast.error('Failed to create discussion');
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  removeClubMember: async (clubId: string, memberId: string) => {
    set({ isLoading: true });
    try {
      const result = await removeClubMemberAction(clubId, memberId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        console.log(result);
      }
    } catch (error) {
      toast.error('Failed to remove member');
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  inviteFriend: async (clubId: string, friendId: string) => {
    set({ isLoading: true });
    try {
      const result = await inviteFriendToClubAction(clubId, friendId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        console.log(result);
      }
    } catch (error) {
      toast.error('Failed to invite friend');
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addDiscussionReply: async (discussionId: string, content: string) => {
    try {
      const comment = await createDiscussionReplyAction(discussionId, content);
      return comment;
    } catch (error) {
      toast.error('Failed to post reply');
      throw error;
    }
  },

  addNestedDiscussionReply: async (
    parentCommentId: string,
    content: string
  ) => {
    try {
      const reply = await createNestedDiscussionReplyAction(
        parentCommentId,
        content
      );
      return reply;
    } catch (error) {
      toast.error('Failed to post reply');
      throw error;
    }
  },

  likeDiscussionReply: async (commentId: string) => {
    try {
      await likeDiscussionReplyAction(commentId);
    } catch (error) {
      toast.error('Failed to like reply');
      throw error;
    }
  },

  unlikeDiscussionReply: async (commentId: string) => {
    try {
      await unlikeDiscussionReplyAction(commentId);
    } catch (error) {
      toast.error('Failed to unlike reply');
      throw error;
    }
  },
}));
