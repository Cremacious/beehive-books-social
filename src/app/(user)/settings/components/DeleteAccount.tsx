'use client';

import { Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useSettingStore } from '@/stores/useSettingStore';

const DeleteAccount = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteAccount } = useSettingStore();

  const handleDeleteAccount = async () => {
    const success = await deleteAccount();
    if (success) {

      window.location.href = '/';
    }
    setShowDeleteModal(false);
  };
  return (
    <div>
      {' '}
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
  );
};
export default DeleteAccount;
