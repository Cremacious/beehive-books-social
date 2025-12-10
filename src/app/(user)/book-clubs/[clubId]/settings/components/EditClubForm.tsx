'use client';
import { useClubStore } from '@/stores/useClubStore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import {
  Upload,
  X,
  Users,
  BookOpen,
  Shield,
  Tag,
  Search,
  UserPlus,
  Check,
} from 'lucide-react';
import { clubCreateSchema } from '@/lib/schemas';
import { useState, useEffect } from 'react';
import { getAllUserFriendsAction } from '@/actions/friend.actions';
import { Button } from '@/components/ui/button';

const availableTags = [
  'Mystery',
  'Fantasy',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Historical',
  'Contemporary',
  'YA',
  'Literary Fiction',
  'Non-Fiction',
];

const privacyOptions = [
  {
    value: 'public',
    label: 'Public',
    description: 'Anyone can find and join',
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Invite-only, visible to members only',
  },
  {
    value: 'invite-only',
    label: 'Invite-Only',
    description: 'Hidden from searches, requires direct invitation',
  },
];

interface EditClubFormProps {
  club: {
    id: string;
    clubName: string;
    description: string;
    currentBookTitle: string;
    currentBookAuthor: string;
    currentBookChapters: number;
    privacy: 'public' | 'private' | 'invite-only';
    rules?: string | null;
    invites?: string | null;
    tags?: string[];
    cover?: string | null;
  };
}

export default function EditClubForm({ club }: EditClubFormProps) {
  const router = useRouter();
  const { editClub } = useClubStore();
  const [coverImage, setCoverImage] = useState<string | null>(
    club.cover || null
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(club.tags || []);
  const [friendsSearchQuery, setFriendsSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('name');
  const [friends, setFriends] = useState<
    Array<{ id: string; name: string; email: string }>
  >([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const form = useForm<z.infer<typeof clubCreateSchema>>({
    resolver: zodResolver(clubCreateSchema),
    defaultValues: {
      clubName: club.clubName,
      description: club.description,
      currentBookTitle: club.currentBookTitle,
      currentBookAuthor: club.currentBookAuthor,
      currentBookChapters: club.currentBookChapters,
      privacy: club.privacy,
      rules: club.rules || '',
      invites: club.invites || '',
      tags: club.tags || [],
    },
  });

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userFriends = await getAllUserFriendsAction();
        setFriends(userFriends);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      } finally {
        setLoadingFriends(false);
      }
    };
    fetchFriends();
  }, []);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'club-covers');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        setCoverImage(data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const removeImage = () => {
    setCoverImage(null);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleFriendInvite = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const sortedAndFilteredFriends = friends
    .filter(
      (friend) =>
        friend.name.toLowerCase().includes(friendsSearchQuery.toLowerCase()) ||
        friend.email.toLowerCase().includes(friendsSearchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  async function onSubmit(values: z.infer<typeof clubCreateSchema>) {
    const formData = new FormData();

    formData.append('clubName', values.clubName);
    formData.append('description', values.description);
    formData.append('currentBookTitle', values.currentBookTitle);
    formData.append('currentBookAuthor', values.currentBookAuthor);
    formData.append(
      'currentBookChapters',
      values.currentBookChapters.toString()
    );
    formData.append('privacy', values.privacy);
    if (values.rules) formData.append('rules', values.rules);

    selectedFriends.forEach((friendId) => formData.append('invites', friendId));

    selectedTags.forEach((tag) => formData.append('tags', tag));

    if (coverImage && coverImage !== club.cover) {
      formData.append('coverUrl', coverImage);
    }

    await editClub(club.id, formData);
    router.push(`/book-clubs/${club.id}`);
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-[#FFC300]" />
            </div>
            <label className="text-lg font-semibold text-white">
              Club Name
            </label>
          </div>
          <input
            {...form.register('clubName')}
            type="text"
            placeholder="Enter your club name..."
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
          />
          {form.formState.errors.clubName && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.clubName.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Club Description
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Tell others what your club is about
              </p>
            </div>
          </div>
          <textarea
            {...form.register('description')}
            placeholder="Describe your club's focus, theme, or goals..."
            rows={4}
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
          />
          {form.formState.errors.description && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Current Book
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                The book your club will start reading together
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...form.register('currentBookTitle')}
                type="text"
                placeholder="Book title..."
                className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
              />
              {form.formState.errors.currentBookTitle && (
                <p className="text-red-400 text-sm flex items-center gap-2 mt-1">
                  <span className="text-xs">⚠️</span>
                  {form.formState.errors.currentBookTitle.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...form.register('currentBookAuthor')}
                type="text"
                placeholder="Author name..."
                className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
              />
              {form.formState.errors.currentBookAuthor && (
                <p className="text-red-400 text-sm flex items-center gap-2 mt-1">
                  <span className="text-xs">⚠️</span>
                  {form.formState.errors.currentBookAuthor.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              {...form.register('currentBookChapters', { valueAsNumber: true })}
              type="number"
              placeholder="Number of chapters..."
              className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
            />
            {form.formState.errors.currentBookChapters && (
              <p className="text-red-400 text-sm flex items-center gap-2 mt-1">
                <span className="text-xs">⚠️</span>
                {form.formState.errors.currentBookChapters.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Upload className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Club Cover Image
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Upload a custom image or choose from defaults (optional)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label
              className={`flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl cursor-pointer hover:border-[#FFC300]/40 transition-all ${
                uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Upload className="w-4 h-4 text-[#FFC300]" />
              <span className="text-white">
                {uploadingImage ? 'Uploading...' : 'Choose Image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>

            {coverImage && (
              <div className="relative">
                <div className="w-16 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={coverImage}
                    alt="Club cover preview"
                    width={64}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-yellow-400" />
            <div>
              <label className="text-lg font-semibold text-white">
                Privacy Settings
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Control who can find and join your club
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {privacyOptions.map((option) => (
              <label
                key={option.value}
                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                  form.watch('privacy') === option.value
                    ? 'border-[#FFC300] bg-[#FFC300]/10'
                    : 'bg-[#1a1a1a] border-[#FFC300]/20 hover:border-[#FFC300]/40'
                }`}
              >
                <input
                  {...form.register('privacy')}
                  type="radio"
                  value={option.value}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="font-semibold text-white mb-1">
                    {option.label}
                  </div>
                  <div className="text-sm text-[#FFC300]/60">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
          {form.formState.errors.privacy && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.privacy.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Club Rules & Guidelines
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Set expectations for your club members (optional)
              </p>
            </div>
          </div>
          <textarea
            {...form.register('rules')}
            placeholder="Define expectations, discussion norms, reading pace, or behavioral guidelines..."
            rows={4}
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserPlus className="w-5 h-5 text-[#FFC300]" />
            <div>
              <label className="text-lg font-semibold text-white">
                Invite Friends
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Invite friends to join your club immediately (optional)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={friendsSearchQuery}
                  onChange={(e) => setFriendsSearchQuery(e.target.value)}
                  placeholder="Search friends..."
                  className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'recent')}
                className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50"
              >
                <option value="name">Sort by Name</option>
                <option value="recent">Recently Added</option>
              </select>
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {loadingFriends ? (
                <div className="text-white/60 text-center py-4">
                  Loading friends...
                </div>
              ) : sortedAndFilteredFriends.length === 0 ? (
                <div className="text-white/60 text-center py-4">
                  {friendsSearchQuery
                    ? 'No friends found matching your search'
                    : 'No friends available to invite'}
                </div>
              ) : (
                sortedAndFilteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className={`bg-[#1a1a1a] rounded-lg p-3 border transition-colors cursor-pointer ${
                      selectedFriends.includes(friend.id)
                        ? 'border-[#FFC300] bg-[#FFC300]/5'
                        : 'border-[#FFC300]/10 hover:border-[#FFC300]/30'
                    }`}
                    onClick={() => toggleFriendInvite(friend.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-[#FFC300]">
                            {friend.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {friend.name}
                          </div>
                          <div className="text-white/60 text-xs">
                            {friend.email}
                          </div>
                        </div>
                      </div>
                      {selectedFriends.includes(friend.id) && (
                        <Check className="w-5 h-5 text-[#FFC300]" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedFriends.length > 0 && (
              <div className="text-[#FFC300]/60 text-sm">
                {selectedFriends.length} friend
                {selectedFriends.length !== 1 ? 's' : ''} selected for
                invitation
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Club Categories & Tags
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Help others discover your club (optional)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-[#FFC300]/20 border-[#FFC300] text-[#FFC300]'
                    : 'bg-[#1a1a1a] border-[#FFC300]/20 text-white hover:border-[#FFC300]/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-[#FFC300]/10">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
           variant="beeYellow"
          >
            <Users className="w-5 h-5" />
            <span>
              {form.formState.isSubmitting ? 'Updating Club...' : 'Update Club'}
            </span>
          </Button>
        </div>
      </form>
    </>
  );
}
