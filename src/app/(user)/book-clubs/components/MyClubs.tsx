'use client';

import { Crown, Plus, Shield, User, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import BookPagination from '../../my-books/components/BookPagination';

interface UserBookClubs {
  id: string;
  name: string;
  description: string;
  currentBook: string;
  cover: string;
  members: number;
  role: string;
  privacy: string;
}

const CLUBS_PER_PAGE = 9;

const MyClubs = ({ userClubs }: { userClubs: UserBookClubs[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(userClubs.length / CLUBS_PER_PAGE);
  const startIdx = (currentPage - 1) * CLUBS_PER_PAGE;
  const endIdx = startIdx + CLUBS_PER_PAGE;
  const clubsToShow = userClubs.slice(startIdx, endIdx);
  return (
    <div className="p-6 md:p-8 ">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 w-full">
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-xl font-bold text-white">My Clubs</h2>
            <span className="yellowBadge h-7 w-7">{userClubs.length}</span>
          </div>
          {userClubs.length !== 0 && (
            <div className="w-full  md:w-auto">
              <Link href={'/book-clubs/create/'}>
                <Button
                  variant={'beeYellow'}
                  size={'lg'}
                  className="flex items-center justify-center space-x-2 w-full md:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Club</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-2 border-yellow-500/30 rounded-2xl min-h-[500px] py-4 md:py-8 px-4 md:px-8">
        {userClubs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🐝</span>
            </div>
            <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
              No Clubs Yet
            </h3>
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              Join your first book club or create one to start discussing books
              with fellow readers!
            </p>
            <Link href={'/book-clubs/create/'}>
              <Button size={'lg'} variant={'beeYellow'}>
                <Plus className="w-5 h-5" />
                <span>Create Your First Club</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubsToShow.map((club) => (
                <div
                  key={club.id}
                  className="rounded-xl p-4 darkContainer2 cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0 flex flex-col justify-center mx-4">
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
                          className={`text-xs px-2 py-1 rounded-full backgroundYellow`}
                        >
                          {club.privacy}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-3 line-clamp-2 mx-2">
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
                        <User className="w-4 h-4 text-white" />
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          club.role === 'Owner'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : club.role === 'Moderator'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-white'
                        }`}
                      >
                        {club.role}
                      </span>
                    </div>
                    <Link href={`/book-clubs/${club.id}`}>
                      <Button size={'sm'} variant={'beeYellow'}>
                        View Club
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

              {/* Render placeholders to fill the grid */}
              {Array.from(
                { length: CLUBS_PER_PAGE - clubsToShow.length },
                (_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="rounded-xl p-4 darkContainer2 border-2 border-dashed border-yellow-500/30 flex flex-col items-center justify-center min-h-[200px]"
                  >
                    <div className="w-12 h-12 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-3">
                      <Plus className="w-6 h-6 text-[#FFC300]/50" />
                    </div>
                    <p className="text-[#FFC300]/50 text-sm font-medium text-center">
                      Create New Club
                    </p>
                  </div>
                )
              )}
            </div>

            {userClubs.length > CLUBS_PER_PAGE && (
              <div className="mt-8">
                <BookPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClubs;
