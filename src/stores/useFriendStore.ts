import { create } from 'zustand';
import { toast } from 'sonner';
import {
  sendFriendRequestAction,
  acceptFriendRequestAction,
  declineFriendRequestAction,
  removeFriendAction,
  getPendingFriendRequestsAction,
} from '@/actions/friend.actions';

interface PendingFriendRequest {
  id: string;
  from: {
    id: string;
    name: string;
    email: string;
  };
}

interface FriendStoreType {
  sendFriendRequest: (formData: FormData) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  declineFriendRequest: (requestId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
  getPendingRequests: () => Promise<PendingFriendRequest[]>;
}

export const useFriendStore = create<FriendStoreType>(() => ({
  sendFriendRequest: async (formData: FormData) => {
    try {
      await sendFriendRequestAction(formData);
      toast.success('Friend request sent!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to send friend request');
    }
  },
  acceptFriendRequest: async (requestId: string) => {
    try {
      await acceptFriendRequestAction(requestId);
      toast.success('Friend request accepted!');
    } catch (error) {
      toast.error(
        (error as Error).message || 'Failed to accept friend request'
      );
    }
  },
  declineFriendRequest: async (requestId: string) => {
    try {
      await declineFriendRequestAction(requestId);
      toast.success('Friend request declined!');
    } catch (error) {
      toast.error(
        (error as Error).message || 'Failed to decline friend request'
      );
    }
  },
  removeFriend: async (friendId: string) => {
    try {
      await removeFriendAction(friendId);
      toast.success('Friend removed!');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to remove friend');
    }
  },
  getPendingRequests: async () => {
    try {
      return await getPendingFriendRequestsAction();
    } catch (error) {
      toast.error(
        (error as Error).message || 'Failed to load pending requests'
      );
      return [];
    }
  },
}));
