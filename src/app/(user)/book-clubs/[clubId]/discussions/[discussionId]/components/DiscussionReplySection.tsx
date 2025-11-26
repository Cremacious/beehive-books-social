'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

const DiscussionReplySection = () => {
  const [newReply, setNewReply] = useState('');

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      console.log('Submitting reply:', newReply);
      setNewReply('');
    }
  };

  return (
    <div className="darkContainer2 rounded-lg shadow-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[#FFC300]" />
        Post a Reply
      </h3>
      <div className="space-y-4">
        <textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Share your thoughts about this discussion..."
          className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 resize-vertical min-h-[120px]"
          rows={4}
        />
        <div className="flex justify-end">
          <Button
            variant={'beeYellow'}
            onClick={handleSubmitReply}
            disabled={!newReply.trim()}
            className=" flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Post Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DiscussionReplySection;
