import NewPage from '@/components/layout/NewPage';
import CreateChapterForm from './CreateChapterForm';
import { PenTool } from 'lucide-react';

const CreateChapterPage = async ({params} : {params : Promise<{bookId: string}>}) => {

  const { bookId } = await params;

  return (
    <NewPage>
 
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-3xl shadow-2xl p-6 md:p-8 border ">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
              <PenTool className="w-6 h-6 text-[#FFC300]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                Create New Chapter
              </h1>
              <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                Share your story with the world, one chapter at a time
              </p>
            </div>
          </div>
        </div>

        <CreateChapterForm bookId={bookId} />
      </div>
    </NewPage>
  );
};

export default CreateChapterPage;
