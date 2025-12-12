import NewPage from '@/components/layout/NewPage';
import { User, Calendar } from 'lucide-react';
import CreatePromptReplyForm from './CreatePromptReply';
import { getPromptAction } from '@/actions/prompt.actions';


const CreatePromptReplyPage = async ({
  params,
}: {
  params: Promise<{ promptId: string }>;
}) => {
  const { promptId } = await params;
  const prompt = await getPromptAction(promptId);
  return (
    <NewPage>
      <div className="w-full  space-y-8">
        <div className="darkContainer2 max-w-3xl mx-auto rounded-2xl shadow-xl p-8 md:p-10 mb-8">
          <h1 className="text-3xl md:text-4xl mainFont font-bold text-yellow-400 mb-3">
            {prompt.title}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#FFC300]" />
              <span className="text-white font-medium">{prompt.user.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FFC300]" />
              <span className="text-white/60 text-sm">
                Ends {prompt.endDate.toLocaleDateString()}
              </span>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed mb-2">
            {prompt.description}
          </p>
        </div>
        <div className="darkContainer2 max-w-4xl mx-auto rounded-2xl shadow-xl p-8 md:p-10">
          <h2 className="text-xl mainFont text-white mb-4">
            Submit Your Entry
          </h2>
          <CreatePromptReplyForm promptId={promptId} />
        </div>
      </div>
    </NewPage>
  );
};

export default CreatePromptReplyPage;
