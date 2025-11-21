import NewPage from '@/components/layout/NewPage';
import MyBooksDisplay from './components/MyBooksDisplay';
import { Plus, BookOpen } from 'lucide-react';

const MyBooksPage = () => {
  return (
    <NewPage>
      <div className="space-y-8 w-full">
        <div className="customDark2 rounded-3xl shadow-2xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#FFC300]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                  My Books
                </h1>
                <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                  Manage and continue writing your stories
                </p>
              </div>
            </div>
            <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-2xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
              <Plus className="w-5 h-5" />
              <span>New Book</span>
            </button>
          </div>
          <div className="absolute -bottom-px left-0 w-24 h-1 bg-linear-to-r from-[#FFC300] to-transparent rounded-bl-3xl" />
        </div>
        <MyBooksDisplay />
      </div>
    </NewPage>
  );
};

export default MyBooksPage;
