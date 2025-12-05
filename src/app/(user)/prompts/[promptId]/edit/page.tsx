import { getPromptAction } from '@/actions/prompt.actions';
import { getAllUserFriendsAction } from '@/actions/friend.actions';
import EditPromptForm from './EditPromptForm';
import NewPage from '@/components/layout/NewPage';

const EditPromptPage = async ({
  params,
}: {
  params: Promise<{ promptId: string }>;
}) => {
  const { promptId } = await params;
  const prompt = await getPromptAction(promptId);
  const friends = await getAllUserFriendsAction();

  return (
    <NewPage>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
            Create Writing Prompt
          </h1>
          <p className="text-white/70 mb-6">
            Set up a new writing prompt, invite friends, and inspire creativity!
          </p>
          <EditPromptForm prompt={prompt} friends={friends} />
        </div>
      </div>
    </NewPage>
  );
};
export default EditPromptPage;
