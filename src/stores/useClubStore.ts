import { create } from 'zustand';
import {
  createClubAction,
  editClubAction,
  deleteClubAction,
  getAllUserClubsAction,
  getClubByIdAction,
  createClubDiscussionAction,
  removeClubMemberAction,
  inviteFriendToClubAction,
} from '@/actions/club.actions';
import { toast } from 'sonner';

interface ClubStoreType {
  isLoading: boolean;
  createClub: (formData: FormData) => Promise<void>;
  editClub: (clubId: string, formData: FormData) => Promise<void>;
  deleteClub: (clubId: string) => Promise<void>;
  getAllUserClubs: () => Promise<void>;
  getClubById: (clubId: string) => Promise<void>;
  createClubDiscussion: (clubId: string, formData: FormData) => Promise<void>;
  removeClubMember: (clubId: string, memberId: string) => Promise<void>;
  inviteFriend: (clubId: string, friendId: string) => Promise<void>;
}

export const useClubStore = create<ClubStoreType>((set) => ({
  isLoading: false,
  createClub: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const result = await createClubAction(formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        console.log(result);
      }
    } catch (error) {
      toast.error('Failed to create club');
      console.log(error);
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
    // Implement later
  },
  getAllUserClubs: async () => {
    // Implement later
  },
  getClubById: async (clubId: string) => {
    // Implement later
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
}));
