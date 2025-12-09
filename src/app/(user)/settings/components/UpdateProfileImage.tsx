'use client';

import { ImageIcon, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useSettingStore } from '@/stores/useSettingStore';
import { getUserByIdAction } from '@/actions/user.actions';

const UpdateProfileImage = ({ userId }: { userId: string }) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    image?: string | null;
  } | null>(null);
  const { updateProfileImage } = useSettingStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByIdAction(userId);
        setCurrentUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!profileImage) return;
    const formData = new FormData();
    formData.append('file', profileImage);
    const success = await updateProfileImage(formData);
    if (success) {

      try {
        const data = await getUserByIdAction(userId);
        setCurrentUser(data.user);
        setProfileImage(null);
        setProfilePreview(null);
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-yellow-400" />
        Profile Image
      </h2>
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center overflow-hidden border-2 border-yellow-400">
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : currentUser?.image ? (
            <Image
              src={currentUser.image}
              alt="Current Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User className="w-10 h-10 text-yellow-400" />
          )}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            id="profile-upload"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="profile-upload"
            className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg cursor-pointer hover:bg-yellow-500 transition-all"
          >
            Change Image
          </label>
          {profileImage && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all"
            >
              Upload Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UpdateProfileImage;
