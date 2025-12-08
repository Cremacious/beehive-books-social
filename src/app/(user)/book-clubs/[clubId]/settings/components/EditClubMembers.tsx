'use client';

import { Search, Shield, User, UserPlus, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useClubStore } from '@/stores/useClubStore';
import { getAllUserFriendsAction } from '@/actions/friend.actions';

interface EditClubMembersProps {
  club: {
    id: string;
    members: Array<{
      id: string;
      user: {
        id: string;
        name: string;
        image: string | null;
      };
      role: string;
      joinedAt: Date;
    }>;
  };
}

const EditClubMembers = ({ club }: EditClubMembersProps) => {
  const { removeClubMember, inviteFriend, isLoading } = useClubStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [friendsSearchQuery, setFriendsSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('name');
  const [friends, setFriends] = useState<
    Array<{ id: string; name: string; email: string }>
  >([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userFriends = await getAllUserFriendsAction();
        setFriends(userFriends);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      } finally {
        setLoadingFriends(false);
      }
    };
    fetchFriends();
  }, []);

  const members = club.members.map((member) => ({
    id: member.id,
    name: member.user.name,
    role:
      member.role === 'OWNER'
        ? 'Owner'
        : member.role === 'MEMBER'
        ? 'Member'
        : 'Moderator',
    avatar: member.user.image,
    joinedDate: member.joinedAt.toISOString().split('T')[0],
  }));

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const availableFriends = friends.filter(
    (friend) => !club.members.some((member) => member.user.id === friend.id)
  );


  const sortedAndFilteredFriends = availableFriends
    .filter(
      (friend) =>
        friend.name.toLowerCase().includes(friendsSearchQuery.toLowerCase()) ||
        friend.email.toLowerCase().includes(friendsSearchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
    
      return 0;
    });

  const handleRemoveMember = async (memberId: string) => {
    await removeClubMember(club.id, memberId);
  };

  const handleInviteFriend = async (friendId: string) => {
    await inviteFriend(club.id, friendId);
  };

  return (
    <div className="space-y-6">
      <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-[#FFC300]" />
          Invite Friends
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={friendsSearchQuery}
                onChange={(e) => setFriendsSearchQuery(e.target.value)}
                placeholder="Search friends..."
                className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'recent')}
              className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50"
            >
              <option value="name">Sort by Name</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {loadingFriends ? (
              <div className="text-white/60 text-center py-4">
                Loading friends...
              </div>
            ) : sortedAndFilteredFriends.length === 0 ? (
              <div className="text-white/60 text-center py-4">
                {friendsSearchQuery
                  ? 'No friends found matching your search'
                  : 'No friends available to invite'}
              </div>
            ) : (
              sortedAndFilteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-[#1a1a1a] rounded-lg p-3 border border-[#FFC300]/10 flex items-center justify-between hover:border-[#FFC300]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[#FFC300]" />
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {friend.name}
                      </div>
                      <div className="text-white/60 text-xs">
                        {friend.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInviteFriend(friend.id)}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-[#FFC300] hover:bg-[#FFD700] text-[#1E3A4B] px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 text-sm"
                  >
                    <Check className="w-3 h-3" />
                    Invite
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#FFC300]" />
            Members (
            {filteredMembers.filter((member) => member.role !== 'Owner').length}
            )
          </h3>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members..."
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
          />
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredMembers
            .filter((member) => member.role !== 'Owner')
            .map((member) => (
              <div
                key={member.id}
                className="bg-[#1a1a1a] rounded-lg p-4 border border-[#FFC300]/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[#FFC300]" />
                    </div>
                    <div>
                      <div className="text-white font-medium flex items-center gap-2">
                        {member.name}
                        {member.role === 'Moderator' && (
                          <Shield className="w-3 h-3 text-blue-400" />
                        )}
                      </div>
                      <div className="text-white/60 text-xs">
                        Joined {member.joinedDate}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    disabled={isLoading}
                    className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                    title="Remove member"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default EditClubMembers;
