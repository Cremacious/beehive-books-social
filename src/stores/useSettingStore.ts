import { create } from 'zustand';
import {
  updateUserProfileImageAction,
  deleteUserAccountAction,
} from '@/actions/user.actions';
import { toast } from 'sonner';

interface SettingStoreType {
  updateProfileImage: (formData: FormData) => Promise<boolean>;
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
