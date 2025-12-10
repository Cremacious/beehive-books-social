import { create } from 'zustand';
import {
  updateUserProfileImageAction,
  deleteUserAccountAction,
  updateBioAction,
} from '@/actions/user.actions';
import { toast } from 'sonner';

interface SettingStoreType {
  updateProfileImage: (formData: FormData) => Promise<boolean>;
  updateBio: (bio: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

export const useSettingStore = create<SettingStoreType>(() => ({
  updateProfileImage: async (formData: FormData) => {
    try {
      await updateUserProfileImageAction(formData);
      toast.success('Profile image updated successfully!');
      return true;
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update profile image');
      return false;
    }
  },
  updateBio: async (bio: string) => {
    try {
      await updateBioAction(bio);
      toast.success('Bio updated successfully!');
      return true;
    } catch (error) {
      toast.error((error as Error).message || 'Failed to update bio');
      return false;
    }
  },
  deleteAccount: async () => {
    try {
      await deleteUserAccountAction();
      toast.success('Account deleted successfully!');
      return true;
    } catch (error) {
      toast.error((error as Error).message || 'Failed to delete account');
      return false;
    }
  },
}));
