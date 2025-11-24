import NewPage from '@/components/layout/NewPage';
import Image from 'next/image';
import {
  Users,
  Plus,
  Search,
  BookOpen,
  Crown,
  Shield,
  User,
} from 'lucide-react';
import CreateClubButton from './components/CreateClubButton';
import Link from 'next/link';


const userClubs = [
  {
    id: 1,
    name: 'Mystery Masters',
    description: 'A club for mystery and thriller enthusiasts',
    currentBook: 'The Silent Patient',
    cover: '/assets/stock/cover.jpeg',
    members: 12,
    role: 'Owner',
    privacy: 'Private',
  },
  {
    id: 2,
    name: 'Fantasy Fanatics',
    description: 'Exploring worlds of magic and adventure',
    currentBook: 'The Name of the Wind',
    cover: '/assets/stock/cover.jpeg',
    members: 8,
    role: 'Member',
    privacy: 'Public',
  },
  {
    id: 3,
    name: 'Romance Writers Hive',
    description: 'For lovers of romance novels and heartfelt stories',
    currentBook: 'Beach Read',
    cover: '/assets/stock/cover.jpeg',
    members: 15,
    role: 'Moderator',
    privacy: 'Private',
  },
];

const BookClubsPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="customDark2 rounded-3xl shadow-2xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#FFC300]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                  Book Clubs
                </h1>
                <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                  Connect with fellow readers and discuss your favorite books
                </p>
              </div>
            </div>
            <CreateClubButton />
          </div>
          <div className="absolute -bottom-px left-0 w-24 h-1 bg-linear-to-r from-[#FFC300] to-transparent rounded-bl-3xl" />
        </div>
        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-[#FFC300]" />
            </div>
            <h2 className="text-xl font-bold text-white">Find Book Clubs</h2>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for book clubs..."
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all">
                Mystery
              </button>
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all">
                Fantasy
              </button>
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all">
                Romance
              </button>
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all">
                Sci-Fi
              </button>
              <button className="px-4 py-2 bg-[#FFC300]/10 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/20 transition-all">
                Public Clubs
              </button>
            </div>
          </div>
        </div>
        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#FFC300]" />
            </div>
            <h2 className="text-xl font-bold text-white">
              My Clubs ({userClubs.length})
            </h2>
          </div>

          {userClubs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🐝</span>
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Clubs Yet
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Join your first book club or create one to start discussing
                books with fellow readers!
              </p>
              <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
                <Plus className="w-5 h-5" />
                <span>Create Your First Club</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userClubs.map((club) => (
                <div
                  key={club.id}
                  className="bg-[#1a1a1a] rounded-xl p-4 border border-[#FFC300]/20 hover:border-[#FFC300]/40 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={club.cover}
                        alt={club.name}
                        width={48}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Link href={`/book-clubs/${club.id}`}>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">
                          {club.name}
                        </h3>
                        <p className="text-[#FFC300]/60 text-sm truncate">
                          {club.currentBook}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="w-3 h-3 text-[#FFC300]/60" />
                          <span className="text-xs text-white/70">
                            {club.members} members
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              club.privacy === 'Private'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            {club.privacy}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {club.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {club.role === 'Owner' && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                      {club.role === 'Moderator' && (
                        <Shield className="w-4 h-4 text-blue-400" />
                      )}
                      {club.role === 'Member' && (
                        <User className="w-4 h-4 text-gray-400" />
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          club.role === 'Owner'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : club.role === 'Moderator'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {club.role}
                      </span>
                    </div>
                    <button className="px-3 py-1 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all text-sm">
                      View Club
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default BookClubsPage;
