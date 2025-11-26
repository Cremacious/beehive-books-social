import NewPage from '@/components/layout/NewPage';
import { BookOpen, Plus, Trash2, Edit, List, Star } from 'lucide-react';
import ReadingListCard from './ReadingListCard';

const readingLists = [
  {
    id: 1,
    name: 'Mystery & Thriller Favorites',
    description:
      'My all-time favorite mystery and thriller novels that keep me up at night',
    bookCount: 12,
    createdDate: '2024-10-15',
    isPublic: true,
    books: [
      { id: 1, title: 'Gone Girl', author: 'Gillian Flynn' },
      { id: 2, title: 'The Girl on the Train', author: 'Paula Hawkins' },
      { id: 3, title: 'The Silent Patient', author: 'Alex Michaelides' },
    ],
  },
  {
    id: 2,
    name: 'Books to Read This Winter',
    description: 'Cozy mysteries and thrillers perfect for winter reading',
    bookCount: 8,
    createdDate: '2024-11-01',
    isPublic: false,
    books: [
      { id: 4, title: 'The Thursday Murder Club', author: 'Richard Osman' },
      { id: 5, title: 'Arsenic and Adobo', author: 'Mia P. Manansala' },
    ],
  },
  {
    id: 3,
    name: 'Classic Mysteries',
    description: 'Timeless mystery novels that defined the genre',
    bookCount: 15,
    createdDate: '2024-09-20',
    isPublic: true,
    books: [
      {
        id: 6,
        title: 'The Hound of the Baskervilles',
        author: 'Arthur Conan Doyle',
      },
      { id: 7, title: 'And Then There Were None', author: 'Agatha Christie' },
    ],
  },
];

const ReadingListsPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                My Reading Lists
              </h1>
              <p className="text-white/70">
                Organize your favorite books and plan your reading journey
              </p>
            </div>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <List className="w-4 h-4 text-[#FFC300]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Your Reading Lists
              </h2>
            </div>
            <div className="text-[#FFC300]/60 text-sm">
              {readingLists.length} lists
            </div>
          </div>

          {readingLists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readingLists.map((list) => (
                <ReadingListCard key={list.id} list={list} />
                // <div key={list.id} className="darkContainer3 rounded-xl p-6 ">
                //   <div className="flex justify-between items-start mb-4">
                //     <div className="flex-1">
                //       <h3 className="text-lg font-bold text-white mb-2">
                //         {list.name}
                //       </h3>
                //       <p className="text-white/70 text-sm mb-3 line-clamp-2">
                //         {list.description}
                //       </p>
                //       <div className="flex items-center gap-4 text-white/60 text-sm">
                //         <div className="flex items-center gap-1">
                //           <BookOpen className="w-3 h-3" />
                //           {list.bookCount} books
                //         </div>
                //         {list.isPublic && (
                //           <div className="flex items-center gap-1">
                //             <Star className="w-3 h-3 text-yellow-400" />
                //             Public
                //           </div>
                //         )}
                //       </div>
                //     </div>
                //   </div>

                //   {list.books.length > 0 && (
                //     <div className="space-y-2">
                //       <h4 className="text-sm font-medium text-white/80">
                //         Recent Books:
                //       </h4>
                //       {list.books.slice(0, 3).map((book) => (
                //         <div key={book.id} className="text-sm text-white/60">
                //           <span className="font-medium">{book.title}</span> by{' '}
                //           {book.author}
                //         </div>
                //       ))}
                //       {list.books.length > 3 && (
                //         <div className="text-sm text-[#FFC300]/60">
                //           +{list.books.length - 3} more books
                //         </div>
                //       )}
                //     </div>
                //   )}

                //   <div className="mt-4 pt-4 border-t border-[#FFC300]/10">
                //     <p className="text-white/50 text-xs">
                //       Created {list.createdDate}
                //     </p>
                //   </div>
                // </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <List className="w-12 h-12 text-[#FFC300]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Reading Lists Yet
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Create your first reading list to organize your favorite books
                and plan your reading journey.
              </p>
              <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
                <Plus className="w-5 h-5" />
                Create Your First List
              </button>
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default ReadingListsPage;
