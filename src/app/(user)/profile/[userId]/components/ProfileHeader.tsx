'use client';
import Image from 'next/image';
import { Calendar, BookOpen, Edit, Camera } from 'lucide-react';
import { useState, useRef } from 'react';
import { useSettingStore } from '@/stores/useSettingStore';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    bio: string | null;
    createdAt: Date;
  };
  bookCount: number;
  isOwnProfile: boolean;
}

export default function ProfileHeader({
  user,
  bookCount,
  isOwnProfile,
}: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState(user.bio || '');
  const [isSavingBio, setIsSavingBio] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateProfileImage, updateBio } = useSettingStore();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await updateProfileImage(formData);

      window.location.reload();
    } catch (error) {
      console.error('Failed to update profile image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditBio = () => {
    setBioValue(user.bio || '');
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    setIsSavingBio(true);
    try {
      await updateBio(bioValue);
      setIsEditingBio(false);
      user.bio = bioValue.trim() || null;
    } catch (error) {
      console.error('Failed to update bio:', error);
    } finally {
      setIsSavingBio(false);
    }
  };

  const handleCancelBio = () => {
    setBioValue(user.bio || '');
    setIsEditingBio(false);
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0">
          <div className="relative group mr-6 ">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FFC300]/10 rounded-full flex items-center justify-center overflow-hidden">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl md:text-5xl text-[#FFC300] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {isOwnProfile && (
              <button
                onClick={handleFileSelect}
                disabled={isUploading}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Change profile picture"
              >
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              {user.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FFC300]" />
              <span className="text-white font-medium">
                {bookCount} {bookCount === 1 ? 'Book' : 'Books'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FFC300]" />
              <span className="text-white/70">
                Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </div>

          <div className="text-white/80 max-w-4xl ">
            {isEditingBio ? (
              <div className="space-y-3">
                <textarea
                  value={bioValue}
                  onChange={(e) => setBioValue(e.target.value)}
                  placeholder="Tell others about yourself..."
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
                  disabled={isSavingBio}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveBio}
                    disabled={isSavingBio}
                    variant={'beeYellow'}
                  >
                    {isSavingBio ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                  <Button
                    onClick={handleCancelBio}
                    disabled={isSavingBio}
                    variant={'beeDark'}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                {isOwnProfile && (
                  <button
                    onClick={handleEditBio}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors p-1"
                    title="Edit bio"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                <p className="italic flex-1">{user.bio || 'No bio yet.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
