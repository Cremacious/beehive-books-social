import NewPage from '@/components/layout/NewPage';
import FriendCard from '@/components/shared/FriendCard';
import {
  Users,
  Plus,
  Search,
  Crown,
  Shield,
  User,
  MoreVertical,
  UserMinus,
  UserPlus,
  Mail,
} from 'lucide-react';

// Placeholder data for club members
const clubMembers = [
  {
    id: 1,
    name: 'Anya Sharma',
    bio: 'Passionate mystery reader and aspiring author. Love discussing psychological thrillers and character development.',
    role: 'Owner',
    joinedDate: '2024-10-15',
    status: 'online',
    readingProgress: 85,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    bio: 'Book blogger and literary critic. Specializes in contemporary fiction and mystery genres.',
    role: 'Moderator',
    joinedDate: '2024-10-16',
    status: 'away',
    readingProgress: 92,
  },
  {
    id: 3,
    name: 'David Kim',
    bio: 'Avid reader of thrillers and suspense novels. Always up for deep literary discussions.',
    role: 'Member',
    joinedDate: '2024-10-18',
    status: 'offline',
    readingProgress: 78,
  },
  {
    id: 4,
    name: 'Mike Rodriguez',
    bio: 'Mystery enthusiast and beta reader. Loves analyzing plot twists and character motivations.',
    role: 'Member',
    joinedDate: '2024-10-20',
    status: 'online',
    readingProgress: 65,
  },
  {
    id: 5,
    name: 'Emma Thompson',
    bio: 'Romance and mystery crossover reader. Enjoys books with complex relationships and suspense.',
    role: 'Member',
    joinedDate: '2024-10-22',
    status: 'offline',
    readingProgress: 88,
  },
  {
    id: 6,
    name: 'James Wilson',
    bio: 'Literary fiction and mystery lover. Former librarian with extensive knowledge of classic mysteries.',
    role: 'Member',
    joinedDate: '2024-10-25',
    status: 'online',
    readingProgress: 95,
  },
];

// Placeholder club data
const clubData = {
  id: 1,
  name: 'Mystery Masters',
  memberCount: clubMembers.length,
  userRole: 'Owner', // Owner, Moderator, Member
};

const ClubMembersPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="customDark2 rounded-3xl shadow-2xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#FFC300]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                  {clubData.name} Members
                </h1>
                <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                  {clubData.memberCount} members in this club
                </p>
              </div>
            </div>
            {(clubData.userRole === 'Owner' ||
              clubData.userRole === 'Moderator') && (
              <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-2xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
                <Plus className="w-5 h-5" />
                <span>Invite Members</span>
              </button>
            )}
          </div>
          <div className="absolute -bottom-px left-0 w-24 h-1 bg-linear-to-r from-[#FFC300] to-transparent rounded-bl-3xl" />
        </div>

        {/* Search and Filter */}
        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-[#FFC300]" />
            </div>
            <h2 className="text-xl font-bold text-white">Find Members</h2>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search members by name..."
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Owners
              </button>
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Moderators
              </button>
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all flex items-center gap-2">
                <User className="w-4 h-4" />
                Members
              </button>
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all">
                Online Now
              </button>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-[#FFC300]" />
              </div>
              <h2 className="text-xl font-bold text-white">Club Members</h2>
            </div>
            <div className="text-[#FFC300]/60 text-sm">
              {clubMembers.length} total members
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clubMembers.map((member) => (
              <div key={member.id} className="relative group">
                <FriendCard
                  id={member.id}
                  name={member.name}
                  bio={member.bio}
                />

                {/* Member Status and Role Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      member.status === 'online'
                        ? 'bg-green-400'
                        : member.status === 'away'
                        ? 'bg-yellow-400'
                        : 'bg-gray-400'
                    }`}
                  />
                  {member.role === 'Owner' && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                  {member.role === 'Moderator' && (
                    <Shield className="w-4 h-4 text-blue-400" />
                  )}
                </div>

                {/* Reading Progress */}
                <div className="absolute bottom-20 left-4 right-4">
                  <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex justify-between text-xs text-white/70 mb-1">
                      <span>Reading Progress</span>
                      <span>{member.readingProgress}%</span>
                    </div>
                    <div className="w-full bg-[#2a2a2a] rounded-full h-1.5">
                      <div
                        className="bg-[#FFC300] h-1.5 rounded-full transition-all"
                        style={{ width: `${member.readingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Management Actions (for owners/mods) */}
                {(clubData.userRole === 'Owner' ||
                  clubData.userRole === 'Moderator') &&
                  member.role !== 'Owner' && (
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all">
                      <div className="relative">
                        <button className="w-8 h-8 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-[#FFC300]/20 transition-all">
                          <MoreVertical className="w-4 h-4 text-white" />
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          <div className="py-2">
                            {clubData.userRole === 'Owner' &&
                              member.role === 'Member' && (
                                <button className="w-full px-4 py-2 text-left text-white hover:bg-[#FFC300]/10 transition-all flex items-center gap-2">
                                  <Shield className="w-4 h-4" />
                                  Make Moderator
                                </button>
                              )}
                            {clubData.userRole === 'Owner' &&
                              member.role === 'Moderator' && (
                                <button className="w-full px-4 py-2 text-left text-white hover:bg-[#FFC300]/10 transition-all flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  Remove Moderator
                                </button>
                              )}
                            <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2">
                              <UserMinus className="w-4 h-4" />
                              Remove from Club
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {clubMembers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🐝</span>
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Members Yet
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Start building your community by inviting fellow readers to join
                your club!
              </p>
              <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
                <UserPlus className="w-5 h-5" />
                <span>Invite First Members</span>
              </button>
            </div>
          )}
        </div>

        {/* Invite Section (for owners/mods) */}
        {(clubData.userRole === 'Owner' ||
          clubData.userRole === 'Moderator') && (
          <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#FFC300]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Invite New Members
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Send Invitations
                </h3>
                <textarea
                  placeholder="Enter email addresses or usernames, separated by commas..."
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
                />
                <button className="px-6 py-3 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send Invites
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Shareable Link
                </h3>
                <div className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4">
                  <p className="text-white/70 text-sm mb-3">
                    Share this link with anyone you&apos;d like to invite to the
                    club:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`https://beehive-books.com/book-clubs/${clubData.id}/join`}
                      readOnly
                      className="flex-1 bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all text-sm">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </NewPage>
  );
};

export default ClubMembersPage;
