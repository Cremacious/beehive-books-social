import NewPage from '@/components/layout/NewPage';
import CreatePromptForm from './CreatePromptForm';
import { getAllUserFriendsAction } from '@/actions/friend.actions';

const PromptsCreatePage = async () => {
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
          <CreatePromptForm friends={friends} />
        </div>
      </div>
    </NewPage>
  );
};

export default PromptsCreatePage;
