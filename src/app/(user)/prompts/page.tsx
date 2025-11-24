'use client';
import { useState } from 'react';
import NewPage from '@/components/layout/NewPage';
import {
  Plus,
  Users,
  User,
  FileText,
  Calendar,
  BadgeCheck,
  Filter,
  Info,
} from 'lucide-react';

const myPrompts = [
  {
    id: 1,
    title: 'A Door in the Forest',
    created: '2025-11-01',
    endDate: '2025-12-01',
    responses: 8,
    status: 'open',
  },
  {
    id: 2,
    title: 'The Forgotten Letter',
    created: '2025-10-20',
    endDate: '2025-11-20',
    responses: 5,
    status: 'closed',
  },
  {
    id: 3,
    title: 'Midnight Train',
    created: '2025-09-15',
    endDate: '2025-10-15',
    responses: 12,
    status: 'closed',
  },
];

const invitedPrompts = [
  {
    id: 4,
    title: 'Lost in the City',
    author: 'Sarah Chen',
    endDate: '2025-12-10',
    responses: 6,
    status: 'open',
  },
  {
    id: 5,
    title: 'The Secret Garden',
    author: 'David Kim',
    endDate: '2025-11-30',
    responses: 9,
    status: 'closed',
  },
  {
    id: 6,
    title: 'Echoes in the Hallway',
    author: 'Emma Thompson',
    endDate: '2025-12-05',
    responses: 3,
    status: 'open',
  },
];

const PromptsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    description: '',
    endDate: '',
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('recent');

  const handleCreatePrompt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCreateModal(false);
    setNewPrompt({ title: '', description: '', endDate: '' });
    alert('Prompt created!');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openDetailsModal = (prompt: any) => {
    setSelectedPrompt(prompt);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedPrompt(null);
  };

  // Filter and sort logic (placeholder)
  const filteredMyPrompts = myPrompts.filter((p) =>
    filterStatus === 'all' ? true : p.status === filterStatus
  );
  const sortedMyPrompts = [...filteredMyPrompts].sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    } else {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    }
  });

  return (
    <NewPage>
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
              Writing Prompts
            </h1>
            <p className="text-white/70">
              Explore, create, and join writing prompts to spark your
              creativity.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#FFC300] text-black font-bold rounded-xl hover:bg-[#FFD700] transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Prompt
          </button>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#FFC300]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#232323] text-white px-3 py-2 rounded-lg border border-[#FFC300]/20 focus:border-[#FFC300]"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-[#232323] text-white px-3 py-2 rounded-lg border border-[#FFC300]/20 focus:border-[#FFC300]"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a] mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-[#FFC300]" />
            My Prompts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedMyPrompts.length > 0 ? (
              sortedMyPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="relative group bg-linear-to-br from-[#232323] to-[#1a1a1a] rounded-xl p-6 border border-[#FFC300]/10 hover:border-[#FFC300]/30 shadow-lg transition-all cursor-pointer"
                  onClick={() => openDetailsModal(prompt)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <BadgeCheck
                      className={`w-4 h-4 ${
                        prompt.status === 'open'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        prompt.status === 'open'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {prompt.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {prompt.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    Ends {prompt.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-[#FFC300] font-semibold">
                    <FileText className="w-4 h-4" />
                    {prompt.responses} entries
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info className="w-5 h-5 text-[#FFC300]" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white/70 py-8">
                You haven&apos;t created any prompts yet.
              </div>
            )}
          </div>
        </div>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-[#FFC300]" />
            Invited &amp; Friends&apos; Prompts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invitedPrompts.length > 0 ? (
              invitedPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="relative group bg-linear-to-br from-[#232323] to-[#1a1a1a] rounded-xl p-6 border border-[#FFC300]/10 hover:border-[#FFC300]/30 shadow-lg transition-all cursor-pointer"
                  onClick={() => openDetailsModal(prompt)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <BadgeCheck
                      className={`w-4 h-4 ${
                        prompt.status === 'open'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        prompt.status === 'open'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {prompt.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {prompt.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                    <span>By {prompt.author}</span>
                    <Calendar className="w-4 h-4" />
                    Ends {prompt.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-[#FFC300] font-semibold">
                    <FileText className="w-4 h-4" />
                    {prompt.responses} entries
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info className="w-5 h-5 text-[#FFC300]" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white/70 py-8">
                No invited prompts yet.
              </div>
            )}
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-[#FFC300]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Create New Prompt
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-white/50 hover:text-white"
                >
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <form onSubmit={handleCreatePrompt} className="space-y-4">
                <input
                  type="text"
                  value={newPrompt.title}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, title: e.target.value })
                  }
                  placeholder="Prompt title..."
                  className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
                  required
                />
                <textarea
                  value={newPrompt.description}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, description: e.target.value })
                  }
                  placeholder="Prompt description..."
                  rows={4}
                  className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-none"
                  required
                />
                <input
                  type="date"
                  value={newPrompt.endDate}
                  onChange={(e) =>
                    setNewPrompt({ ...newPrompt, endDate: e.target.value })
                  }
                  className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white focus:outline-none focus:border-[#FFC300]/50"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#FFC300] text-black font-bold rounded-xl hover:bg-[#FFD700] transition-all flex items-center gap-2 justify-center"
                >
                  <Plus className="w-5 h-5" />
                  Create Prompt
                </button>
              </form>
            </div>
          </div>
        )}

        {showDetailsModal && selectedPrompt && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-[#FFC300]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Prompt Details
                </h3>
                <button
                  onClick={closeDetailsModal}
                  className="text-white/50 hover:text-white"
                >
                  <Info className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-yellow-400">
                  {selectedPrompt.title}
                </h4>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  Ends {selectedPrompt.endDate}
                </div>
                <div className="flex items-center gap-2 text-[#FFC300] font-semibold">
                  <FileText className="w-4 h-4" />
                  {selectedPrompt.responses} entries
                </div>
                {selectedPrompt.author && (
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Users className="w-4 h-4" />
                    By {selectedPrompt.author}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <BadgeCheck
                    className={`w-4 h-4 ${
                      selectedPrompt.status === 'open'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      selectedPrompt.status === 'open'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {selectedPrompt.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                </div>
                <p className="text-white/80">
                  Prompt description goes here. (Placeholder)
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeDetailsModal}
                  className="flex-1 px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a2a] text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black rounded-lg font-medium transition-colors">
                  View Entries
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NewPage>
  );
};

export default PromptsPage;
