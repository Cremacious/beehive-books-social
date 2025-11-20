import NewPage from '@/components/layout/NewPage';
import MyBooksDisplay from './components/MyBooksDisplay';

const MyBooksPage = () => {
  return (
    <NewPage>
      <div className="space-y-8 w-full">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                📚 My Books
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Manage and continue writing your stories
              </p>
            </div>
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-full shadow-lg text-base transition-all hover:scale-105">
              ✍️ New Book
            </button>
          </div>
        </div>
        <MyBooksDisplay />
      </div>
    </NewPage>
  );
};

export default MyBooksPage;
