'use client';
import { Calendar, UserPlus, X, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePromptStore } from '@/stores/usePromptStore';
import { useRouter } from 'next/navigation';

interface CreatePromptFormProps {
  friends: {
    id: string;
    name: string;
    bio?: string;
  }[];
}

const CreatePromptForm = ({ friends }: CreatePromptFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);
  const [searchFriend, setSearchFriend] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { createPrompt, isLoading } = usePromptStore();
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
    } else {
      const selectedDate = new Date(endDate);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 

      if (selectedDate < currentDate) {
        newErrors.endDate = 'End date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInvite = (id: string) => {
    if (!invitedFriends.includes(id)) {
      setInvitedFriends([...invitedFriends, id]);
    }
  };

  const handleRemoveInvite = (id: string) => {
    setInvitedFriends(invitedFriends.filter((fid) => fid !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('endDate', endDate);

    invitedFriends.forEach((friendId, index) => {
      formData.append(`invitedFriends[${index}]`, friendId);
    });

    await createPrompt(formData);

    setTitle('');
    setDescription('');
    setEndDate('');
    setInvitedFriends([]);
    setSearchFriend('');
    setErrors({});

    router.push('/prompts');
  };


  useEffect(() => {
    if (title || description || endDate) {
      validateForm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, endDate]);

  const isFormValid =
    title.trim() &&
    description.trim() &&
    endDate &&
    !errors.endDate &&
    !errors.title &&
    !errors.description;

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchFriend.toLowerCase())
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-white font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Prompt title..."
          className={`w-full bg-[#232323] border rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 ${
            errors.title ? 'border-red-500' : 'border-[#FFC300]/20'
          }`}
          required
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.title}
          </p>
        )}
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
          className={`w-full bg-[#232323] border rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-none ${
            errors.description ? 'border-red-500' : 'border-[#FFC300]/20'
          }`}
          required
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.description}
          </p>
        )}
      </div>
      <div>
        <label className="block text-white font-semibold mb-2">End Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={today}
            className={`w-full pl-12 pr-4 py-3 bg-[#232323] border rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 ${
              errors.endDate ? 'border-red-500' : 'border-[#FFC300]/20'
            }`}
            required
          />
        </div>
        {errors.endDate && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.endDate}
          </p>
        )}
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
          disabled={isLoading || !isFormValid}
          className="flex-1 px-4 py-3 bg-[#FFC300] hover:bg-[#FFD700] disabled:bg-[#FFC300]/50 disabled:cursor-not-allowed text-black rounded-lg font-bold transition-colors"
        >
          {isLoading ? 'Creating...' : 'Create Prompt'}
        </button>
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setDescription('');
            setEndDate('');
            setInvitedFriends([]);
            setSearchFriend('');
            setErrors({});
          }}
          className="flex-1 px-4 py-3 bg-[#232323] hover:bg-[#333333] text-white rounded-lg font-medium transition-colors"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default CreatePromptForm;
