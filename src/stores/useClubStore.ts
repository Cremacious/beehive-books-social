import { create } from 'zustand';
import {
  createClubAction,
  editClubAction,
  deleteClubAction,
  getAllUserClubsAction,
  getClubByIdAction,
  createClubDiscussionAction,
} from '@/actions/club.actions';
import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

interface ClubStoreType {
  isLoading: boolean;
  createClub: (formData: FormData) => Promise<void>;
  editClub: (clubId: string, formData: FormData) => Promise<void>;
  deleteClub: (clubId: string) => Promise<void>;
  getAllUserClubs: () => Promise<void>;
  getClubById: (clubId: string) => Promise<void>;
  createClubDiscussion: (clubId: string, formData: FormData) => Promise<void>;
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
}));
