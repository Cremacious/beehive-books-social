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
  id: string;
  title: string;
  wordCount: number;
  commentCount: number;
  authorNotes: string;
  content: string;
};

export type CommentType = {
  id: string;
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

export type UserType = {
  id: string;
  name: string;
  image: string | null;
};

// New

export type ClubMemberType = {
  id: string;
  userId: string;
  user: UserType;
  role: string;
  joinedAt: Date;
  postCount: number;
};

export type DiscussionCommentType = {
  id: string;
  content: string;
  createdAt: Date;
  likes: number;
  author: ClubMemberType;
  parentId: string | null;
  replies?: DiscussionCommentType[];
};

export type DiscussionFullType = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
  author: ClubMemberType;
  comments: DiscussionCommentType[];
};

export type BookType = {
  id: string;
  title: string;
  author: string;
};

export type ClubReadingListItemType = {
  id: string;
  book: BookType;
  addedAt: string;
  status: string;
  order: number;
};
