'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import NewPage from '@/components/layout/NewPage';
import {
  BookOpen,
  User,
  FileText,
  Tag,
  Eye,
  Upload,
  Save,
  Image as ImageIcon,
  Trash2,
  Shield,
  Crown,
  Search,
  UserPlus,
  X,
  AlertTriangle,
} from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Club name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().min(1, 'At least one tag is required'),
  rules: z.string().optional(),
  privacy: z.string().min(1, 'Privacy setting is required'),
});

const categories = [
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Contemporary',
  'Literary Fiction',
  'Young Adult',
  'Children',
  'Non-Fiction',
  'Poetry',
  'Other',
];

const privacyOptions = [
  {
    value: 'public',
    label: 'Public',
    description: 'Anyone can join',
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Invite only',
  },
];

const initialMembers = [
  {
    id: 1,
    name: 'Anya Sharma',
    role: 'Owner',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-15',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Moderator',
    avatar: null,
    status: 'away',
    joinedDate: '2024-10-16',
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'Member',
    avatar: null,
    status: 'offline',
    joinedDate: '2024-10-18',
  },
  {
    id: 4,
    name: 'Mike Rodriguez',
    role: 'Member',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-20',
  },
  {
    id: 5,
    name: 'Emma Thompson',
    role: 'Member',
    avatar: null,
    status: 'offline',
    joinedDate: '2024-10-22',
  },
  {
    id: 6,
    name: 'Lisa Park',
    role: 'Member',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-24',
  },
];

const ClubSettingsPage = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    '/assets/stock/cover.jpeg'
  );
  const [members, setMembers] = useState(initialMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Mystery Masters',
      description:
        'A club for mystery and thriller enthusiasts. We dive deep into psychological thrillers, classic whodunits, and modern suspense novels.',
      category: 'Mystery',
      tags: 'Mystery, Thriller, Psychological',
      rules:
        'Post weekly discussion questions, respect all opinions, no spoilers in titles, be kind and constructive in feedback.',
      privacy: 'private',
    },
  });

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((m) => m.id !== memberId));
    toast.success('Member removed from club');
  };

  const handleChangeMemberRole = (memberId: number, newRole: string) => {
    setMembers(
      members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
    toast.success(`Member role updated to ${newRole}`);
  };

  const handleAddMember = () => {
    if (newMemberEmail.trim()) {
      toast.success(`Invitation sent to ${newMemberEmail}`);
      setNewMemberEmail('');
    }
  };

  const handleDeleteClub = () => {
    toast.success('Club deleted successfully');
    setShowDeleteModal(false);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log({ ...values, coverImage });
      toast.success('Club settings updated successfully! 🐝', {
        description: 'All changes have been saved.',
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to update club settings. Please try again.');
    }
  }

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                Club Settings
              </h1>
              <p className="text-white/70">
                Manage your book club details and members
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 border border-[#2a2a2a]">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-[#FFC300]" />
                    </div>
                    <label className="text-lg font-semibold text-white">
                      Club Name
                    </label>
                  </div>
                  <input
                    {...form.register('name')}
                    type="text"
                    placeholder="Enter club name..."
                    className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <span className="text-xs">⚠️</span>
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#FFC300]" />
                    </div>
                    <label className="text-lg font-semibold text-white">
                      Category
                    </label>
                  </div>
                  <select
                    {...form.register('category')}
                    className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
                  >
                    <option value="" className="bg-[#1a1a1a] text-white">
                      Select a category...
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-[#1a1a1a] text-white"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.category && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <span className="text-xs">⚠️</span>
                      {form.formState.errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                      <Tag className="w-4 h-4 text-[#FFC300]" />
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-white">
                        Tags
                      </label>
                      <p className="text-[#FFC300]/60 text-sm">
                        Separate multiple tags with commas
                      </p>
                    </div>
                  </div>
                  <input
                    {...form.register('tags')}
                    type="text"
                    placeholder="Mystery, Thriller, Psychological..."
                    className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
                  />
                  {form.formState.errors.tags && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <span className="text-xs">⚠️</span>
                      {form.formState.errors.tags.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📝</span>
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-white">
                        Club Description
                      </label>
                      <p className="text-[#FFC300]/60 text-sm">
                        Describe what your club is about
                      </p>
                    </div>
                  </div>
                  <textarea
                    {...form.register('description')}
                    placeholder="Tell members what this club is about..."
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
                      <Shield className="w-4 h-4 text-[#FFC300]" />
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-white">
                        Club Rules
                      </label>
                      <p className="text-[#FFC300]/60 text-sm">
                        Optional: Set guidelines for club members
                      </p>
                    </div>
                  </div>
                  <textarea
                    {...form.register('rules')}
                    placeholder="e.g., Be respectful, no spoilers in titles..."
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-[#FFC300]" />
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-white">
                        Privacy Settings
                      </label>
                      <p className="text-[#FFC300]/60 text-sm">
                        Choose who can join your club
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {privacyOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          form.watch('privacy') === option.value
                            ? 'border-[#FFC300] bg-[#FFC300]/10'
                            : 'border-[#FFC300]/20 bg-[#1a1a1a] hover:border-[#FFC300]/40'
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
                      <ImageIcon className="w-4 h-4 text-[#FFC300]" />
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-white">
                        Club Cover Image
                      </label>
                      <p className="text-[#FFC300]/60 text-sm">
                        Upload a cover image for your club
                      </p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-[#FFC300]/20 rounded-xl p-8 text-center hover:border-[#FFC300]/40 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer block"
                    >
                      {coverPreview ? (
                        <div className="space-y-4">
                          <div className="w-full h-48 mx-auto rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={coverPreview}
                              alt="Cover preview"
                              width={400}
                              height={192}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-[#FFC300] font-medium">
                            Click to change cover image
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-[#FFC300]/10 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-8 h-8 text-[#FFC300]" />
                          </div>
                          <div>
                            <div className="text-white font-medium mb-2">
                              Upload Cover Image
                            </div>
                            <div className="text-[#FFC300]/60 text-sm">
                              Click to select an image (PNG, JPG, GIF) • Max 5MB
                            </div>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-[#FFC300]/10">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="px-8 py-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold rounded-xl transition-all duration-200 flex items-center gap-3"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete Club</span>
                  </button>

                  <button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Save className="w-5 h-5" />
                    <span>
                      {form.formState.isSubmitting
                        ? 'Saving...'
                        : 'Save Changes'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#FFC300]" />
                Invite Member
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="Enter email or username..."
                  className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
                />
                <button
                  onClick={handleAddMember}
                  className="w-full bg-[#FFC300] hover:bg-[#FFD700] text-[#1E3A4B] py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </div>

            <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-[#FFC300]" />
                  Members ({members.length})
                </h3>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members..."
                  className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
                />
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#1a1a1a] rounded-lg p-4 border border-[#FFC300]/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-[#FFC300]" />
                        </div>
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {member.name}
                            {member.role === 'Owner' && (
                              <Crown className="w-3 h-3 text-yellow-500" />
                            )}
                            {member.role === 'Moderator' && (
                              <Shield className="w-3 h-3 text-blue-400" />
                            )}
                          </div>
                          <div className="text-white/60 text-xs">
                            Joined {member.joinedDate}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          member.status === 'online'
                            ? 'bg-green-400'
                            : member.status === 'away'
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'
                        }`}
                      />
                    </div>

                    {member.role !== 'Owner' && (
                      <div className="flex gap-2">
                        <select
                          value={member.role}
                          onChange={(e) =>
                            handleChangeMemberRole(member.id, e.target.value)
                          }
                          className="flex-1 bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:border-[#FFC300]/50"
                        >
                          <option value="Member">Member</option>
                          <option value="Moderator">Moderator</option>
                        </select>
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Remove member"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {member.role === 'Owner' && (
                      <div className="text-center text-yellow-400 text-xs font-medium py-1">
                        Club Owner
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-red-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Delete Club?</h3>
            </div>
            <p className="text-white/70 mb-6">
              Are you sure you want to permanently delete this club? This action
              cannot be undone. All discussions, members, and data will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteClub}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Delete Club
              </button>
            </div>
          </div>
        </div>
      )}
    </NewPage>
  );
};

export default ClubSettingsPage;
