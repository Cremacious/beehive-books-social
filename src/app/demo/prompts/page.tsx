'use client';

import NewPage from '@/components/layout/NewPage';
import Link from 'next/link';
import PromptsList from '@/app/(user)/prompts/components/PromptsList';
import { Button } from '@/components/ui/button';

const mockPrompts = {
  myPrompts: [
    {
      id: 'prompt1',
      title: 'Write about a lost memory',
      description:
        'Explore the theme of forgotten memories and their impact on identity.',
      createdAt: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      status: 'OPEN' as const,
      userId: 'demo-user',
      user: {
        id: 'demo-user',
        name: 'Demo User',
      },
      invitedUsers: [],
      entries: [
        {
          id: 'entry1',
          content: 'Sample entry content...',
          createdAt: new Date('2024-01-02'),
          promptId: 'prompt1',
          userId: 'demo-user',
          user: {
            id: 'demo-user',
            name: 'Demo User',
          },
          comments: [],
        },
      ],
      _count: {
        entries: 1,
      },
    },
    {
      id: 'prompt2',
      title: 'A day in the life of a character',
      description:
        'Describe a single day from the perspective of an unusual character.',
      createdAt: new Date('2024-01-05'),
      endDate: new Date('2024-02-05'),
      status: 'OPEN' as const,
      userId: 'demo-user',
      user: {
        id: 'demo-user',
        name: 'Demo User',
      },
      invitedUsers: [],
      entries: [],
      _count: {
        entries: 0,
      },
    },
  ],
  invitedPrompts: [
    {
      id: 'prompt3',
      title: 'Sci-fi world building',
      description:
        'Create a unique alien world with its own culture and technology.',
      createdAt: new Date('2024-01-10'),
      endDate: new Date('2024-02-10'),
      status: 'OPEN' as const,
      userId: 'friend1',
      user: {
        id: 'friend1',
        name: 'Friend Writer',
      },
      invitedUsers: [{ id: 'demo-user', name: 'Demo User' }],
      entries: [],
      _count: {
        entries: 2,
      },
    },
  ],
};

const DemoPromptsPage = () => {
  return (
    <NewPage>
      <div className="w-full flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="">
          <div className="relative flex md:flex-row flex-col items-center justify-between mb-6 darkContainer2 rounded-2xl p-4 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mainFont text-white flex items-center ml-4">
              My Prompts
            </h2>
            <Link
              href={'/demo/prompts/create'}
              className="absolute right-4 hidden md:block"
            >
              <Button variant="beeYellow">Create Prompt</Button>
            </Link>
            <Link
              href={'/demo/prompts/create'}
              className="mt-4 w-full block md:hidden"
            >
              <Button variant="beeYellow" className="w-full">
                Create Prompt
              </Button>
            </Link>
          </div>
        </div>
        <PromptsList prompts={mockPrompts.myPrompts} />

        <div className=" p-6 md:p-8">
          <div className="relative flex md:flex-row flex-col items-center justify-between mb-6 darkContainer2 rounded-2xl p-4 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mainFont text-white flex items-center ml-4">
              Invited &amp; Friends&apos; Prompts
            </h2>
          </div>
          <PromptsList prompts={mockPrompts.invitedPrompts} />
        </div>
      </div>
    </NewPage>
  );
};

export default DemoPromptsPage;
