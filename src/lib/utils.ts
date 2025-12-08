import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DiscussionFullType, ClubMemberType } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'Owner':
      return 'text-red-400';
    case 'Moderator':
      return 'text-blue-400';
    default:
      return 'text-green-400';
  }
};

export const formatLastActivity = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffHours < 1) return 'Less than an hour ago';
  if (diffHours < 24) return `${Math.floor(diffHours)} hours ago`;
  return `${Math.floor(diffDays)} days ago`;
};

export const countTotalReplies = (
  comments: DiscussionFullType['comments']
): number => {
  return comments.reduce((total, comment) => {
    return total + 1 + countTotalReplies(comment.replies ?? []);
  }, 0);
};

export const getUserRoleInClub = (
  members: ClubMemberType[],
  userId: string
): string | null => {
  const member = members.find((member) => member.userId === userId);
  return member ? member.role : null;
};
