import CreateBookForm from './components/CreateBookForm';
import NewPage from '@/components/layout/NewPage';

const CreateBookPage = () => {
  return (
    <NewPage>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="p-8 md:p-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
              Create Your New Book
            </h1>
            <p className="text-white text-lg md:text-xl">
              Start your writing journey! Fill in the details below to bring
              your story to life.
            </p>
          </div>
        </div>

        <div className=" p-2 md:p-6 max-w-4xl mx-auto">
          <CreateBookForm />
        </div>
      </div>
    </NewPage>
  );
};

export default CreateBookPage;
