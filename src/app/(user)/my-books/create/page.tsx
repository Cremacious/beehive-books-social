import CreateBookForm from './components/CreateBookForm';
import NewPage from '@/components/layout/NewPage';
import { BookOpen } from 'lucide-react';

const CreateBookPage = () => {
  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="rounded-3xl shadow-2xl p-6 md:p-8 darkContainer2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#FFC300]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                Create Your Book
              </h1>
              <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                Start your writing journey and share your story with the world
              </p>
            </div>
          </div>
   
        </div>

        <CreateBookForm />
      </div>
    </NewPage>
  );
};

export default CreateBookPage;
