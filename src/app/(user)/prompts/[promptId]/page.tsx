'use client';

import { useState } from 'react';
import { User, MessageCircle, Plus, UserPlus, X, Search } from 'lucide-react';
import NewPage from '@/components/layout/NewPage';
import PromptEntryListItem from './PromptEntryListItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const prompt = {
  id: 1,
  title: 'A Door in the Forest',
  description:
    'Write a story or poem inspired by the idea of a mysterious door hidden deep in the forest. What lies beyond? Who finds it? Let your imagination run wild.',
  creator: {
    id: 2,
    name: 'Sarah Chen',
    avatar: null,
  },
  endDate: '2025-12-01',
};

const entries = [
  {
    id: 1,
    author: 'David Kim',
    avatar: null,
    content:
      'The door was ancient, covered in moss and secrets. When I stepped through, the world shimmered and changed...',
    submittedAt: '2025-11-22',
  },
  {
    id: 2,
    author: 'Emma Thompson',
    avatar: null,
    content:
      'Beyond the door, the forest sang with voices I had never heard. Each step was a memory, each breath a dream.',
    submittedAt: '2025-11-23',
  },
  {
    id: 3,
    author: 'Mike Rodriguez',
    avatar: null,
    content:
      'I found the door on a foggy morning. It led not to another place, but to another version of myself.',
    submittedAt: '2025-11-24',
  },
];

const friends = [
  { id: 4, name: 'Lisa Park' },
  { id: 5, name: 'James Wilson' },
  { id: 6, name: 'Rachel Green' },
];

const currentUserId = 2;

const participants = [
  { name: 'David Kim' },
  { name: 'Emma Thompson' },
  { name: 'Mike Rodriguez' },
];

const PromptPage = () => {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [entryText, setEntryText] = useState('');
  const [searchFriend, setSearchFriend] = useState('');
  const [invitedFriends, setInvitedFriends] = useState<number[]>([]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchFriend.toLowerCase())
  );

  const handleInvite = (id: number) => {
    if (!invitedFriends.includes(id)) {
      setInvitedFriends([...invitedFriends, id]);
    }
  };

  const handleRemoveInvite = (id: number) => {
    setInvitedFriends(invitedFriends.filter((fid) => fid !== id));
  };

  const handleSubmitEntry = (e: React.FormEvent) => {
    e.preventDefault();

    alert('Entry submitted!');
    setEntryText('');
    setShowEntryModal(false);
  };

  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
            {prompt.title}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-[#FFC300]" />
            <span className="text-white font-medium">
              {prompt.creator.name}
            </span>
            <span className="text-white/50 text-sm">
              • Ends {prompt.endDate}
            </span>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            {prompt.description}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-[#FFC300]" />
              Participants
              <span className="yellowBadge w-7 h-7">{participants.length}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {participants.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-2 bg-[#232323] border border-[#FFC300]/10 rounded-lg px-4 py-2"
                >
                  <div className="w-7 h-7 bg-[#FFC300]/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#FFC300]" />
                  </div>
                  <span className="text-white font-medium">{p.name}</span>
                </div>
              ))}
              {participants.length === 0 && (
                <span className="text-white/60">No participants yet</span>
              )}
            </div>
          </div>

          {currentUserId === prompt.creator.id && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#FFC300]" />
                Invite Friends
              </h3>
              <input
                type="text"
                value={searchFriend}
                onChange={(e) => setSearchFriend(e.target.value)}
                placeholder="Search friends..."
                className="w-full bg-[#232323] border border-[#FFC300]/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 mb-2"
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {filteredFriends.map((friend) => (
                  <button
                    type="button"
                    key={friend.id}
                    onClick={() => handleInvite(friend.id)}
                    disabled={invitedFriends.includes(friend.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all border border-[#FFC300]/20 text-white ${
                      invitedFriends.includes(friend.id)
                        ? 'bg-[#FFC300]/20 text-[#FFC300] cursor-not-allowed'
                        : 'bg-[#232323] hover:bg-[#FFC300]/10'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    {friend.name}
                  </button>
                ))}
              </div>
              {invitedFriends.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {invitedFriends.map((id) => {
                    const friend = friends.find((f) => f.id === id);
                    return (
                      <span
                        key={id}
                        className="px-3 py-1 bg-[#FFC300]/20 text-[#FFC300] rounded-lg flex items-center gap-2"
                      >
                        {friend?.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveInvite(id)}
                          className="ml-1 text-white/60 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2 mb-6">
              <div className="flex flex-row items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#FFC300]" />
                <h2 className="text-xl font-bold text-white">Entries</h2>
              </div>
              <span className="yellowBadge w-7 h-7">{entries.length}</span>
            </div>

            <Link href={`/prompts/44/create`}>
              <Button variant={'beeYellow'}>Create Reply</Button>
            </Link>
          </div>

          <div className="space-y-6">
            {entries.map((entry) => (
              <PromptEntryListItem key={entry.id} entry={entry} />
            ))}
          </div>
          {entries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <MessageCircle className="w-8 h-8 text-[#FFC300] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                No entries yet
              </h3>
              <p className="text-white/60">
                Be the first to submit your story or poem for this prompt!
              </p>
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default PromptPage;
