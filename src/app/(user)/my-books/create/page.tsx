import CreateBookForm from './components/CreateBookForm';
import NewPage from '@/components/layout/NewPage';
import { BookOpen } from 'lucide-react';

const CreateBookPage = () => {
  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
      

        <CreateBookForm />
      </div>
    </NewPage>
  );
};

export default CreateBookPage;
