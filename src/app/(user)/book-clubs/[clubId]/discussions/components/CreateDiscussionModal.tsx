'use client';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const CreateDiscussionModal = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
  });

  const handleCreateDiscussion = () => {
    setShowCreateModal(false);
    setNewDiscussion({ title: '', content: '' });
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowCreateModal(true);
        }}
        variant={'beeYellow'}
      >
        <Plus className="w-5 h-5" />
        New Discussion
      </Button>
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="darkContainer2 rounded-2xl p-2 md:p-8 max-w-2xl w-full ">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white text-center p-2">
                Create New Discussion
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/50 hover:text-white mr-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newDiscussion.title}
                onChange={(e) =>
                  setNewDiscussion({ ...newDiscussion, title: e.target.value })
                }
                placeholder="Discussion title..."
                className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
              />
              <textarea
                value={newDiscussion.content}
                onChange={(e) =>
                  setNewDiscussion({
                    ...newDiscussion,
                    content: e.target.value,
                  })
                }
                placeholder="Start the conversation..."
                rows={6}
                className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-y"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant={'beeDark'}
                onClick={() => setShowCreateModal(false)}
                className="flex-1 "
              >
                Cancel
              </Button>
              <Button
                variant={'beeYellow'}
                onClick={handleCreateDiscussion}
                className="flex-1 "
              >
                Create Discussion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDiscussionModal;
