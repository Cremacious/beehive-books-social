import { Crown, Settings, Shield, User, Users } from 'lucide-react';
import { MemberType, BookClubType } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ClubMembersPreview = ({
  members,
  club,
}: {
  members: MemberType[];
  club: BookClubType;
}) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[#FFC300]" />
          Members <span className="yellowBadge w-8">{members.length}</span>
        </h3>
        <div className="gap-2 flex flex-row">
          {(club.userRole === 'Owner' || club.userRole === 'Moderator') && (
            <Button size={'sm'} variant={'beeYellow'}>
              Invite
            </Button>
          )}
          <Link href={`/book-clubs/${club.id}/members`}>
            <Button size={'sm'} variant={'beeYellow'}>
              View All
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {members.slice(0, 5).map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#FFC300]" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">
                  {member.name}
                </div>
                <div className="flex items-center gap-2">
                  {member.role === 'Owner' && (
                    <Crown className="w-3 h-3 text-yellow-500" />
                  )}
                  {member.role === 'Moderator' && (
                    <Shield className="w-3 h-3 text-blue-400" />
                  )}
                  <span
                    className={`text-xs ${
                      member.role === 'Owner'
                        ? 'text-yellow-400'
                        : member.role === 'Moderator'
                        ? 'text-blue-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {members.length > 5 && (
          <button className="w-full text-center text-[#FFC300] hover:text-[#FFD700] transition-all text-sm py-2">
            View all {members.length} members
          </button>
        )}
      </div>
    </div>
  );
};

export default ClubMembersPreview;
