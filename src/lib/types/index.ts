export type ReadingListType = {
  id: number;
  title: string;
  author: string;
  votes: number;
  status: string;
};
export type MemberType = {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
  status: string;
  joinedDate: string;
};
export type DiscussionType = {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  likes: number;
};
export type ChapterType = {
  id: number;
  title: string;
  wordCount: number;
  commentCount: number;
  authorNotes: string;
  content: string;
};

export type CommentType = {
  id: number;
  author: string;
  avatar: string | null;
  content: string;
  timestamp: string;
  likes: number;
  replies?: CommentType[];
};

export type BookClubType = {
  id: number;
  name: string;
  description: string;
  currentBook: string;
  author: string;
  cover: string;
  clubCover: string;
  members: number;
  privacy: string;
  userRole: string;
  createdDate: string;
  rules: string;
  tags: string[];
  role: string;
};
