'use client';

import { Crown, Shield, User, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ClubMemberType } from '@/lib/types';
import { useState } from 'react';

interface ClubMembersPreviewProps {
  members: ClubMemberType[];
  club: {
    id: string;
    userRole?: string;
  };
}

const ClubMembersPreview = ({ members, }: ClubMembersPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('recent');

  // const owner = members.find((member) => member.role === 'OWNER');

  const sortedMembers = [...members].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
    }
    return a.user.name.localeCompare(b.user.name);
  });

  const filteredMembers = sortedMembers.filter((member) =>
    member.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayMembers = isExpanded
    ? filteredMembers
    : sortedMembers.slice(0, 5);

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6">
      {/* {owner && (
        <div className="mb-4 p-3 bg-[#FFC300]/10 rounded-lg border border-[#FFC300]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#FFC300]" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Club Owner</div>
              <div className="text-[#FFC300] text-lg font-bold">
                {owner.user.name}
              </div>
            </div>
          </div>
        </div>
      )} */}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
       
          Members <span className="yellowBadge w-8">{members.length}</span>
        </h3>
        <div className="gap-2 flex flex-row">
          {/* {club.userRole === 'OWNER' && (
            <Button size={'sm'} variant={'beeYellow'}>
              Invite
            </Button>
          )} */}
          {!isExpanded ? (
            <Button
              size={'sm'}
              variant={'beeYellow'}
              onClick={() => setIsExpanded(true)}
            >
              View All
            </Button>
          ) : (
            <Button
              size={'sm'}
              variant={'beeDark'}
              onClick={() => {
                setIsExpanded(false);
                setSearchQuery('');
                setSortBy('recent');
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'recent')}
              className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-[#FFC300]/50"
            >
              <option value="recent">Recently Added</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {displayMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#FFC300]" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">
                  {member.user.name}
                </div>
                <div className="flex items-center gap-2">
                  {member.role === 'OWNER' && (
                    <Crown className="w-3 h-3 text-yellow-500" />
                  )}
                  {member.role === 'MEMBER' && (
                    <Shield className="w-3 h-3 text-blue-400" />
                  )}
                  <span
                    className={`text-xs ${
                      member.role === 'OWNER'
                        ? 'text-yellow-400'
                        : member.role === 'MEMBER'
                        ? 'text-blue-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {member.role}
                  </span>
                  <span className="text-white/50 text-xs">
                    • Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!isExpanded && members.length > 5 && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full text-center text-[#FFC300] hover:text-[#FFD700] transition-all text-sm py-2"
          >
            View all {members.length} members
          </button>
        )}
        {isExpanded && filteredMembers.length === 0 && searchQuery && (
          <div className="text-center text-white/60 py-4">
            No members found matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubMembersPreview;
