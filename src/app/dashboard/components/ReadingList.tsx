'use client';

import { Book, Star, User } from 'lucide-react';

const ReadingList = () => {
  const books = [
    {
      title: 'The Midnight Library',
      author: 'Matt Haig',
      rating: 4.5,
      status: 'Currently Reading',
      progress: 67,
      dueDate: 'Dec 15',
      recommendedBy: 'Sarah Chen',
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      rating: 4.8,
      status: 'Want to Read',
      progress: 0,
      recommendedBy: 'Book Club',
    },
    {
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      rating: 4.2,
      status: 'Finished',
      progress: 100,
      finishedDate: 'Nov 20',
      recommendedBy: 'Alex Rivera',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Currently Reading':
        return 'bg-blue-500/20 text-blue-400';
      case 'Want to Read':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Finished':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <section className="bg-[#1b1b1b] rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Reading List</h3>
            <p className="text-sm text-[#FFC300]/60">
              Discover amazing stories
            </p>
          </div>
        </div>
        <button className="text-sm text-[#FFC300] hover:text-white transition-colors">
          Browse Books
        </button>
      </div>

      <div className="space-y-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-[#252525] rounded-xl p-4 border border-[#3a3a3a] hover:border-[#FFC300]/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{book.title}</h4>
                <p className="text-sm text-gray-400 mb-2">by {book.author}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-400">{book.rating}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      book.status
                    )}`}
                  >
                    {book.status}
                  </span>
                </div>
                {book.progress > 0 && book.progress < 100 && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{book.progress}% complete</span>
                      <span>Due {book.dueDate}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#FFC300] h-2 rounded-full transition-all"
                        style={{ width: `${book.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <User size={12} />
                  <span>Recommended by {book.recommendedBy}</span>
                </div>
              </div>
              <Book size={24} className="text-[#FFC300] ml-4 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#FFC300]/10 hover:bg-[#FFC300]/20 text-[#FFC300] py-3 rounded-xl transition-colors font-medium">
        + Add to Reading List
      </button>
    </section>
  );
};

export default ReadingList;
