'use client';
import { useState } from 'react';
import { toast } from 'sonner';
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
  Globe,
  Lock,
  Tag,
  Mail,
  Link as LinkIcon,
} from 'lucide-react';

const formSchema = z.object({
  clubName: z.string().min(1, 'Club name is required'),
  description: z.string().min(1, 'Club description is required'),
  currentBook: z.string().min(1, 'Current book is required'),
  privacy: z.enum(['public', 'private', 'invite-only']),
  rules: z.string().optional(),
  invites: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

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

export default function CreateClubForm() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = {
        ...values,
        coverImage,
        tags: selectedTags,
      };
      console.log(formData);
      toast.success('Book club created successfully! 🐝', {
        description: 'Your new club is ready for members to join.',
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to create club. Please try again.');
    }
  }

  return (
    <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 border border-[#2a2a2a] max-w-3xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Club Name Section */}
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

        {/* Club Description Section */}
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

        {/* Current Book Section */}
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
          <input
            {...form.register('currentBook')}
            type="text"
            placeholder="Enter the book title and author..."
            className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
          />
          {form.formState.errors.currentBook && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.currentBook.message}
            </p>
          )}
        </div>

        {/* Club Cover Image Section */}
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
            <label className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl cursor-pointer hover:border-[#FFC300]/40 transition-all">
              <Upload className="w-4 h-4 text-[#FFC300]" />
              <span className="text-white">Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
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

        {/* Privacy Setting Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Privacy Setting
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Control who can find and join your club
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl cursor-pointer hover:border-[#FFC300]/40 transition-all">
              <input
                {...form.register('privacy')}
                type="radio"
                value="public"
                className="w-4 h-4 text-[#FFC300] bg-[#1a1a1a] border-[#FFC300]/20 focus:ring-[#FFC300]/50"
              />
              <Globe className="w-5 h-5 text-[#FFC300]" />
              <div>
                <div className="text-white font-medium">Public</div>
                <div className="text-[#FFC300]/60 text-sm">
                  Anyone can find and join
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl cursor-pointer hover:border-[#FFC300]/40 transition-all">
              <input
                {...form.register('privacy')}
                type="radio"
                value="private"
                className="w-4 h-4 text-[#FFC300] bg-[#1a1a1a] border-[#FFC300]/20 focus:ring-[#FFC300]/50"
              />
              <Lock className="w-5 h-5 text-[#FFC300]" />
              <div>
                <div className="text-white font-medium">Private</div>
                <div className="text-[#FFC300]/60 text-sm">
                  Invite-only, visible to members only
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl cursor-pointer hover:border-[#FFC300]/40 transition-all">
              <input
                {...form.register('privacy')}
                type="radio"
                value="invite-only"
                className="w-4 h-4 text-[#FFC300] bg-[#1a1a1a] border-[#FFC300]/20 focus:ring-[#FFC300]/50"
              />
              <Shield className="w-5 h-5 text-[#FFC300]" />
              <div>
                <div className="text-white font-medium">Invite-Only</div>
                <div className="text-[#FFC300]/60 text-sm">
                  Hidden from searches, requires direct invitation
                </div>
              </div>
            </label>
          </div>

          {form.formState.errors.privacy && (
            <p className="text-red-400 text-sm flex items-center gap-2">
              <span className="text-xs">⚠️</span>
              {form.formState.errors.privacy.message}
            </p>
          )}
        </div>

        {/* Club Rules Section */}
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

        {/* Initial Member Invites Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#FFC300]" />
            </div>
            <div>
              <label className="text-lg font-semibold text-white">
                Initial Member Invites
              </label>
              <p className="text-[#FFC300]/60 text-sm">
                Invite friends to join immediately (optional)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              {...form.register('invites')}
              placeholder="Enter email addresses or usernames, separated by commas..."
              rows={3}
              className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
            />

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg hover:border-[#FFC300]/40 transition-all text-[#FFC300]"
              >
                <LinkIcon className="w-4 h-4" />
                Generate Shareable Link
              </button>
              <span className="text-[#FFC300]/60 text-sm">
                Or invite via link
              </span>
            </div>
          </div>
        </div>

        {/* Club Categories/Tags Section */}
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

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-[#FFC300]/10">
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Users className="w-5 h-5" />
            <span>
              {form.formState.isSubmitting
                ? 'Creating Club...'
                : 'Create Book Club'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
