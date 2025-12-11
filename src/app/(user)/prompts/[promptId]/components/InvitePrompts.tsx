'use client';

import { useState } from 'react';

import { usePromptStore } from '@/stores/usePromptStore';

interface InvitePromptsProps {
  friends: { email: string; name: string; id: string }[];
  prompt: {
    id: string;
    title: string;
    description: string;
    userId: string;
    invitedUsers: { id: string; name: string }[];
    endDate: Date;
    user: { id: string; name: string };
  };
  currentUserId?: string;
}

const InvitePrompts = ({
  friends,
  prompt,
  currentUserId,
}: InvitePromptsProps) => {
  const [searchFriend, setSearchFriend] = useState('');
  const [invitedFriends, setInvitedFriends] = useState<string[]>(
    prompt.invitedUsers.map((u) => u.id)
  );
  const { inviteFriendToPrompt, uninviteFriendToPrompt, isLoading } =
    usePromptStore();

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchFriend.toLowerCase())
  );

  const handleToggleInvite = async (friendId: string) => {
    if (invitedFriends.includes(friendId)) {
      await uninviteFriendToPrompt(prompt.id, friendId);
      setInvitedFriends(invitedFriends.filter((id) => id !== friendId));
    } else {
      await inviteFriendToPrompt(prompt.id, friendId);
      setInvitedFriends([...invitedFriends, friendId]);
    }
  };

  return (
    <div className="">
      {currentUserId === prompt.userId ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
            Invite Friends
          </h3>
          <input
            type="text"
            value={searchFriend}
            onChange={(e) => setSearchFriend(e.target.value)}
            placeholder="Search friends..."
            className="w-full bg-[#232323] border border-[#FFC300]/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 mb-2"
          />
          <div className="flex flex-wrap gap-2 mb-2">
            {filteredFriends.map((friend) => (
              <button
                type="button"
                key={friend.id}
                onClick={() => handleToggleInvite(friend.id)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all border border-[#FFC300]/20 text-white ${
                  isLoading
                    ? 'bg-[#FFC300]/20 text-[#FFC300] cursor-not-allowed'
                    : 'bg-[#232323] hover:bg-[#FFC300]/10'
                }`}
              >
              
                {invitedFriends.includes(friend.id)
                  ? 'Uninvite'
                  : 'Invite'}{' '}
                {friend.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default InvitePrompts;
