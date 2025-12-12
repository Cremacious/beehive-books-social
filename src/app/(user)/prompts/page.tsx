import NewPage from '@/components/layout/NewPage';
import Link from 'next/link';
import PromptsList from './components/PromptsList';
import { Button } from '@/components/ui/button';
import { getPromptsAction } from '@/actions/prompt.actions';

const PromptsPage = async () => {
  const { myPrompts, invitedPrompts } = await getPromptsAction();
  return (
    <NewPage>
      <div className="w-full flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="">
          <div className="relative flex md:flex-row flex-col items-center justify-between mb-6 darkContainer2 rounded-2xl p-4 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mainFont text-white flex items-center ml-4">
              My Prompts
            </h2>
            <Link
              href={'/prompts/create'}
              className="absolute right-4 hidden md:block"
            >
              <Button variant="beeYellow">Create Prompt</Button>
            </Link>
            <Link
              href={'/prompts/create'}
              className="mt-4 w-full block md:hidden"
            >
              <Button variant="beeYellow" className="w-full">
                Create Prompt
              </Button>
            </Link>
          </div>
        </div>
        <PromptsList prompts={myPrompts} />

        <div className=" p-6 md:p-8">
          <div className="relative flex md:flex-row flex-col items-center justify-between mb-6 darkContainer2 rounded-2xl p-4 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mainFont text-white flex items-center ml-4">
              Invited &amp; Friends&apos; Prompts
            </h2>
          </div>
          <PromptsList prompts={invitedPrompts} />
        </div>
      </div>
    </NewPage>
  );
};

export default PromptsPage;
