'use client'
import { useState } from 'react';
import { Lock } from 'lucide-react';

const PasswordChange = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassword('');
    setConfirmPassword('');
    alert('Password changed (placeholder)');
  };
  return (
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
  );
};
export default PasswordChange;
