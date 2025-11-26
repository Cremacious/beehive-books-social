'use client'
import NewPage from '@/components/layout/NewPage';
import { Button } from '@/components/ui/button';
import { User, Calendar } from 'lucide-react';
import { useState } from 'react';


const prompt = {
  title: 'A Door in the Forest',
  creator: { name: 'Sarah Chen' },
  endDate: '2025-12-01',
  description:
    'Write a story or poem inspired by the idea of a mysterious door hidden deep in the forest. What lies beyond? Who finds it? Let your imagination run wild.',
};

const CreatePromptReplyPage = () => {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add submit logic
    alert('Reply submitted!');
    setReplyText('');
  };

  return (
    <NewPage>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3">
            {prompt.title}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#FFC300]" />
              <span className="text-white font-medium">
                {prompt.creator.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FFC300]" />
              <span className="text-white/60 text-sm">
                Ends {prompt.endDate}
              </span>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed mb-2">
            {prompt.description}
          </p>
        </div>
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Submit Your Entry
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white font-semibold mb-2">
                Your Writing
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your story or poem here..."
                rows={8}
                className="w-full bg-[#232323] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-none"
                required
              />
            </div>
            <div className="flex justify-end pt-4 border-t border-[#FFC300]/10">
              <Button
                variant="beeYellow"
                type="submit"
                className="font-bold px-6 py-3"
              >
                Submit Entry
              </Button>
            </div>
          </form>
        </div>
      </div>
    </NewPage>
  );
};

export default CreatePromptReplyPage;
