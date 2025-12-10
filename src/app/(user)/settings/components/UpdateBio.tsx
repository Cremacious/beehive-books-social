'use client';
import { FileText, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettingStore } from '@/stores/useSettingStore';
import { getUserByIdAction } from '@/actions/user.actions';

const UpdateBio = ({ userId }: { userId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bioValue, setBioValue] = useState('');
  const [currentBio, setCurrentBio] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateBio } = useSettingStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByIdAction(userId);
        setCurrentBio(data.user.bio);
        setBioValue(data.user.bio || '');
      } catch (error) {
        console.error('Error fetching user bio:', error);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleEdit = () => {
    setBioValue(currentBio || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await updateBio(bioValue);
      if (success) {
        setCurrentBio(bioValue.trim() || null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating bio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setBioValue(currentBio || '');
    setIsEditing(false);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-yellow-400" />
        Bio
      </h2>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="min-h-[100px] p-4 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl">
            <p className="text-white/80 italic">
              {currentBio || 'No bio yet. Tell others about yourself!'}
            </p>
          </div>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit Bio
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            placeholder="Tell others about yourself..."
            rows={6}
            className="w-full p-4 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all resize-none"
            disabled={isLoading}
          />
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBio;
