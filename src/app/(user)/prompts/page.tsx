import NewPage from '@/components/layout/NewPage';
import { Users, User } from 'lucide-react';
import Link from 'next/link';
import PromptsList from './components/PromptsList';
import { Button } from '@/components/ui/button';
import { getPromptsAction } from '@/actions/prompt.actions';

const PromptsPage = async () => {
  const { myPrompts, invitedPrompts } = await getPromptsAction();
  return (
    <NewPage>
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              Writing Prompts
            </h1>
            <p className="text-white/70">
              Explore, create, and join writing prompts to spark your
              creativity.
            </p>
          </div>
        </div>

        <div className=" p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 ">
              <User className="w-5 h-5 text-[#FFC300]" />
              My Prompts
            </h2>
            <Link href={'/prompts/create'}>
              <Button variant="beeYellow" size="sm" className="block md:hidden">
                Create Prompt
              </Button>
            </Link>
            <Link href={'/prompts/create'}>
              <Button variant="beeYellow" className="hidden md:block">
                Create Prompt
              </Button>
            </Link>
          </div>
          <PromptsList prompts={myPrompts} />
        </div>

        <div className=" p-6 md:p-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-[#FFC300]" />
            Invited &amp; Friends&apos; Prompts
          </h2>

          <PromptsList prompts={invitedPrompts} />
        </div>
      </div>
    </NewPage>
  );
};

export default PromptsPage;
