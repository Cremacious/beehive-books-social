'use client';
import { useState } from 'react';
import { Calendar, UserPlus, X } from 'lucide-react';
import NewPage from '@/components/layout/NewPage';

const friends = [
  { id: 1, name: 'Sarah Chen' },
  { id: 2, name: 'David Kim' },
  { id: 3, name: 'Emma Thompson' },
  { id: 4, name: 'Mike Rodriguez' },
  { id: 5, name: 'Lisa Park' },
];

const PromptsCreatePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [invitedFriends, setInvitedFriends] = useState<number[]>([]);
  const [searchFriend, setSearchFriend] = useState('');

  const handleInvite = (id: number) => {
    if (!invitedFriends.includes(id)) {
      setInvitedFriends([...invitedFriends, id]);
    }
  };

  const handleRemoveInvite = (id: number) => {
    setInvitedFriends(invitedFriends.filter((fid) => fid !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert('Prompt created!');
    setTitle('');
    setDescription('');
    setEndDate('');
    setInvitedFriends([]);
    setSearchFriend('');
  };

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchFriend.toLowerCase())
  );

  return (
    <NewPage>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
            Create Writing Prompt
          </h1>
          <p className="text-white/70 mb-6">
            Set up a new writing prompt, invite friends, and inspire creativity!
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Prompt title..."
                className="w-full bg-[#232323] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
                required
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your prompt..."
                rows={4}
                className="w-full bg-[#232323] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#232323] border border-[#FFC300]/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                Invite Friends
              </label>
              <div className="mb-2">
                <input
                  type="text"
                  value={searchFriend}
                  onChange={(e) => setSearchFriend(e.target.value)}
                  placeholder="Search friends..."
                  className="w-full bg-[#232323] border border-[#FFC300]/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 mb-2"
                />
              </div>
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
            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black rounded-lg font-bold transition-colors"
              >
                Create Prompt
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setDescription('');
                  setEndDate('');
                  setInvitedFriends([]);
                  setSearchFriend('');
                }}
                className="flex-1 px-4 py-3 bg-[#232323] hover:bg-[#333333] text-white rounded-lg font-medium transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </NewPage>
  );
};

export default PromptsCreatePage;
