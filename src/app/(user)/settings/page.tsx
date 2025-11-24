'use client';
import { useState } from 'react';
import { User, Lock, Trash2, Image as ImageIcon, X } from 'lucide-react';
import NewPage from '@/components/layout/NewPage';

const mockUser = {
  name: 'Chris Bee',
  email: 'chrisbee@example.com',
  avatar: null,
};

const UserSettingsPage = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassword('');
    setConfirmPassword('');
    alert('Password changed (placeholder)');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    alert('Account deleted (placeholder)');
  };

  return (
    <NewPage>
      <div className="w-full max-w-2xl mx-auto space-y-10">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 flex items-center gap-3">
            <User className="w-7 h-7" />
            User Settings
          </h1>
          <p className="text-white/70 mb-6">
            Manage your profile, password, and account preferences
          </p>

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
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-yellow-400" />
              Change Password
            </h2>
            <form className="space-y-4" onSubmit={handleChangePassword}>
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-[#232323] border border-yellow-500/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full bg-[#232323] border border-yellow-500/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-all"
              >
                Update Password
              </button>
            </form>
          </div>

          <div className="mb-2">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              Delete Account
            </h2>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all"
            >
              Delete My Account
            </button>
          </div>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Delete Account</h3>
              </div>
              <p className="text-white/70 mb-6">
                Are you sure you want to permanently delete your account? This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 bg-[#232323] text-white rounded-lg hover:bg-[#333] transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NewPage>
  );
};

export default UserSettingsPage;
