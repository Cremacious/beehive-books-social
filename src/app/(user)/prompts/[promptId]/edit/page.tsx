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
       
          <EditPromptForm prompt={prompt} friends={friends} />
        
      </div>
    </NewPage>
  );
};
export default EditPromptPage;
