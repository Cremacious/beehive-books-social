'use client';

import { Crown, Search, Shield, User, UserPlus, X } from 'lucide-react';
import { useState } from 'react';

const initialMembers = [
  {
    id: 1,
    name: 'Anya Sharma',
    role: 'Owner',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-15',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Moderator',
    avatar: null,
    status: 'away',
    joinedDate: '2024-10-16',
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'Member',
    avatar: null,
    status: 'offline',
    joinedDate: '2024-10-18',
  },
  {
    id: 4,
    name: 'Mike Rodriguez',
    role: 'Member',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-20',
  },
  {
    id: 5,
    name: 'Emma Thompson',
    role: 'Member',
    avatar: null,
    status: 'offline',
    joinedDate: '2024-10-22',
  },
  {
    id: 6,
    name: 'Lisa Park',
    role: 'Member',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-24',
  },
];

const EditClubMembers = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');

  const [newMemberEmail, setNewMemberEmail] = useState('');

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((m) => m.id !== memberId));
  };

  const handleChangeMemberRole = (memberId: number, newRole: string) => {
    setMembers(
      members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
  };

  const handleAddMember = () => {
    if (newMemberEmail.trim()) {
      setNewMemberEmail('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-[#FFC300]" />
          Invite Member
        </h3>
        <div className="space-y-3">
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter email or username..."
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
          />
          <button
            onClick={handleAddMember}
            className="w-full bg-[#FFC300] hover:bg-[#FFD700] text-[#1E3A4B] py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Send Invitation
          </button>
        </div>
      </div>

      <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#FFC300]" />
            Members ({members.length})
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
          {filteredMembers.map((member) => (
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
                      {member.role === 'Owner' && (
                        <Crown className="w-3 h-3 text-yellow-500" />
                      )}
                      {member.role === 'Moderator' && (
                        <Shield className="w-3 h-3 text-blue-400" />
                      )}
                    </div>
                    <div className="text-white/60 text-xs">
                      Joined {member.joinedDate}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    member.status === 'online'
                      ? 'bg-green-400'
                      : member.status === 'away'
                      ? 'bg-yellow-400'
                      : 'bg-gray-400'
                  }`}
                />
              </div>

              {member.role !== 'Owner' && (
                <div className="flex gap-2">
                  <select
                    value={member.role}
                    onChange={(e) =>
                      handleChangeMemberRole(member.id, e.target.value)
                    }
                    className="flex-1 bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:border-[#FFC300]/50"
                  >
                    <option value="Member">Member</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Remove member"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {member.role === 'Owner' && (
                <div className="text-center text-yellow-400 text-xs font-medium py-1">
                  Club Owner
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EditClubMembers;
