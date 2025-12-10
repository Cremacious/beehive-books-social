'use client';

import { Button } from '@/components/ui/button';
import { Earth, Search } from 'lucide-react';
import { useState } from 'react';
import { useFriendStore } from '@/stores/useFriendStore';

const SearchFriends = () => {
  const [email, setEmail] = useState('');
  const { sendFriendRequest } = useFriendStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const formData = new FormData();
    formData.append('email', email.trim());

    await sendFriendRequest(formData);
    setEmail('');
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <Earth className="w-5 h-5" />
        Find Friends
      </h2>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter an email to add friend..."
          className="w-full bg-[#1a1a1a] border border-yellow-500/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
          required
        />
        <Button variant={'beeYellow'} type="submit" className="mt-2 w-full">
          Send Friend Request
        </Button>
      </form>
    </div>
  );
};
export default SearchFriends;
