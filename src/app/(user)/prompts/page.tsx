import NewPage from '@/components/layout/NewPage';
import { Plus, Users, User } from 'lucide-react';
import Link from 'next/link';
import PromptsList from './components/PromptsList';
import { Button } from '@/components/ui/button';

const myPrompts = [
  {
    id: 1,
    title: 'A Door in the Forest',
    created: '2025-11-01',
    endDate: '2025-12-01',
    responses: 8,
    status: 'open',
  },
  {
    id: 2,
    title: 'The Forgotten Letter',
    created: '2025-10-20',
    endDate: '2025-11-20',
    responses: 5,
    status: 'closed',
  },
  {
    id: 3,
    title: 'Midnight Train',
    created: '2025-09-15',
    endDate: '2025-10-15',
    responses: 12,
    status: 'closed',
  },
  {
    id: 4,
    title: 'Sunrise Over the Lake',
    created: '2025-08-10',
    endDate: '2025-09-10',
    responses: 7,
    status: 'open',
  },
  {
    id: 5,
    title: 'The Last Page',
    created: '2025-07-05',
    endDate: '2025-08-05',
    responses: 3,
    status: 'closed',
  },
  {
    id: 6,
    title: 'Whispers in the Wind',
    created: '2025-06-15',
    endDate: '2025-07-15',
    responses: 10,
    status: 'open',
  },
  {
    id: 7,
    title: 'The Hidden Path',
    created: '2025-05-20',
    endDate: '2025-06-20',
    responses: 6,
    status: 'closed',
  },
  {
    id: 8,
    title: 'Echoes of the Past',
    created: '2025-04-25',
    endDate: '2025-05-25',
    responses: 9,
    status: 'open',
  },
  {
    id: 9,
    title: 'The Silver Key',
    created: '2025-03-30',
    endDate: '2025-04-30',
    responses: 4,
    status: 'closed',
  },
  {
    id: 10,
    title: 'Nightfall',
    created: '2025-02-14',
    endDate: '2025-03-14',
    responses: 11,
    status: 'open',
  },
  {
    id: 11,
    title: 'The Long Journey',
    created: '2025-01-10',
    endDate: '2025-02-10',
    responses: 2,
    status: 'closed',
  },
  {
    id: 12,
    title: 'Beneath the Stars',
    created: '2024-12-01',
    endDate: '2025-01-01',
    responses: 13,
    status: 'open',
  },
];

const invitedPrompts = [
  {
    id: 1,
    title: 'A Door in the Forest',
    created: '2025-11-01',
    endDate: '2025-12-01',
    responses: 8,
    status: 'open',
  },
  {
    id: 2,
    title: 'The Forgotten Letter',
    created: '2025-10-20',
    endDate: '2025-11-20',
    responses: 5,
    status: 'closed',
  },
  {
    id: 3,
    title: 'Midnight Train',
    created: '2025-09-15',
    endDate: '2025-10-15',
    responses: 12,
    status: 'closed',
  },
  {
    id: 4,
    title: 'Sunrise Over the Lake',
    created: '2025-08-10',
    endDate: '2025-09-10',
    responses: 7,
    status: 'open',
  },
  {
    id: 5,
    title: 'The Last Page',
    created: '2025-07-05',
    endDate: '2025-08-05',
    responses: 3,
    status: 'closed',
  },
  {
    id: 6,
    title: 'Whispers in the Wind',
    created: '2025-06-15',
    endDate: '2025-07-15',
    responses: 10,
    status: 'open',
  },
  {
    id: 7,
    title: 'The Hidden Path',
    created: '2025-05-20',
    endDate: '2025-06-20',
    responses: 6,
    status: 'closed',
  },
  {
    id: 8,
    title: 'Echoes of the Past',
    created: '2025-04-25',
    endDate: '2025-05-25',
    responses: 9,
    status: 'open',
  },
  {
    id: 9,
    title: 'The Silver Key',
    created: '2025-03-30',
    endDate: '2025-04-30',
    responses: 4,
    status: 'closed',
  },
  {
    id: 10,
    title: 'Nightfall',
    created: '2025-02-14',
    endDate: '2025-03-14',
    responses: 11,
    status: 'open',
  },
  {
    id: 11,
    title: 'The Long Journey',
    created: '2025-01-10',
    endDate: '2025-02-10',
    responses: 2,
    status: 'closed',
  },
  {
    id: 12,
    title: 'Beneath the Stars',
    created: '2024-12-01',
    endDate: '2025-01-01',
    responses: 13,
    status: 'open',
  },
];

const PromptsPage = () => {
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

        <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
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

        <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8">
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
