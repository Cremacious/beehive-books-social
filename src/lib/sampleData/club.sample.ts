export const userClubsSample = [
  {
    id: 'club-1',
    name: 'Mystery Masters',
    description:
      'A club for mystery and thriller enthusiasts. We dive deep into psychological thrillers, classic whodunits, and modern suspense novels.',
    currentBook: 'The Silent Patient',
    cover: '/assets/stock/cover.jpeg',
    members: 12,
    role: 'OWNER',
    privacy: 'PRIVATE',
  },
  {
    id: 'club-2',
    name: 'Fantasy Fanatics',
    description:
      'Exploring worlds of magic and adventure in epic fantasy novels.',
    currentBook: 'The Name of the Wind',
    cover: '/assets/stock/cover.jpeg',
    members: 8,
    role: 'MEMBER',
    privacy: 'PUBLIC',
  },
  {
    id: 'club-3',
    name: 'Romance Writers Hive',
    description: 'For lovers of romance novels and heartfelt stories.',
    currentBook: 'Beach Read',
    cover: '/assets/stock/cover.jpeg',
    members: 15,
    role: 'MEMBER',
    privacy: 'PRIVATE',
  },
];

export const clubSample = {
  id: 'club-1',
  name: 'Mystery Masters',
  description:
    'A club for mystery and thriller enthusiasts. We dive deep into psychological thrillers, classic whodunits, and modern suspense novels. Join us for weekly discussions and monthly virtual meetups!',
  currentBook: {
    id: 'book-1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
  },
  cover: '/assets/stock/cover.jpeg',
  memberCount: 12,
  privacy: 'PRIVATE',
  createdAt: '2024-10-15T00:00:00.000Z',
  rules:
    'Post weekly discussion questions, respect all opinions, no spoilers in titles, be kind and constructive in feedback.',
  tags: ['Mystery', 'Thriller', 'Psychological'],
  members: [
    {
      id: 'member-1',
      user: {
        id: 'user-1',
        name: 'Anya Sharma',
        image: null,
      },
      role: 'OWNER',
      joinedAt: '2024-10-15T00:00:00.000Z',
      postCount: 25,
    },
    {
      id: 'member-2',
      user: {
        id: 'user-2',
        name: 'Sarah Chen',
        image: null,
      },
      role: 'OWNER',
      joinedAt: '2024-10-16T00:00:00.000Z',
      postCount: 18,
    },
    {
      id: 'member-3',
      user: {
        id: 'user-3',
        name: 'David Kim',
        image: null,
      },
      role: 'MEMBER',
      joinedAt: '2024-10-18T00:00:00.000Z',
      postCount: 12,
    },
    {
      id: 'member-4',
      user: {
        id: 'user-4',
        name: 'Mike Rodriguez',
        image: null,
      },
      role: 'MEMBER',
      joinedAt: '2024-10-20T00:00:00.000Z',
      postCount: 8,
    },
    {
      id: 'member-5',
      user: {
        id: 'user-5',
        name: 'Emma Thompson',
        image: null,
      },
      role: 'MEMBER',
      joinedAt: '2024-10-22T00:00:00.000Z',
      postCount: 5,
    },
  ],
  discussions: [
    {
      id: 'discussion-1',
      title: 'Chapter 5 Discussion - The Twist!!',
      content:
        'What did everyone think of the major twist in chapter 5? I was completely shocked!',
      createdAt: '2024-11-20T10:00:00.000Z',
      likes: 8,
      author: {
        id: 'member-2',
        user: {
          id: 'user-2',
          name: 'Sarah Chen',
          image: null,
        },
        role: 'MEMBER',
        joinedAt: '2024-10-16T00:00:00.000Z',
        postCount: 18,
      },
      comments: [
        {
          id: 'comment-1',
          content: 'I agree, it was unexpected! Did anyone see it coming?',
          createdAt: '2024-11-20T11:00:00.000Z',
          likes: 3,
          author: {
            id: 'member-3',
            user: {
              id: 'user-3',
              name: 'David Kim',
              image: null,
            },
            role: 'MEMBER',
            joinedAt: '2024-10-18T00:00:00.000Z',
            postCount: 12,
          },
          parentId: null,
          replies: [
            {
              id: 'comment-2',
              content:
                'Not at all! It completely changed my perspective on the story.',
              createdAt: '2024-11-20T12:00:00.000Z',
              likes: 2,
              author: {
                id: 'member-4',
                user: {
                  id: 'user-4',
                  name: 'Mike Rodriguez',
                  image: null,
                },
                role: 'MEMBER',
                joinedAt: '2024-10-20T00:00:00.000Z',
                postCount: 8,
              },
              parentId: 'comment-1',
              replies: [],
            },
          ],
        },
        {
          id: 'comment-3',
          content: 'The foreshadowing was subtle but there if you look back.',
          createdAt: '2024-11-20T13:00:00.000Z',
          likes: 5,
          author: {
            id: 'member-1',
            user: {
              id: 'user-1',
              name: 'Anya Sharma',
              image: null,
            },
            role: 'OWNER',
            joinedAt: '2024-10-15T00:00:00.000Z',
            postCount: 25,
          },
          parentId: null,
          replies: [],
        },
      ],
    },
    {
      id: 'discussion-2',
      title: 'Character Analysis: Alicia Berenson',
      content:
        "Let's discuss Alicia's character development throughout the book.",
      createdAt: '2024-11-18T09:00:00.000Z',
      likes: 6,
      author: {
        id: 'member-3',
        user: {
          id: 'user-3',
          name: 'David Kim',
          image: null,
        },
        role: 'MEMBER',
        joinedAt: '2024-10-18T00:00:00.000Z',
        postCount: 12,
      },
      comments: [
        {
          id: 'comment-4',
          content:
            "She's such a complex character. Her silence speaks volumes.",
          createdAt: '2024-11-18T10:00:00.000Z',
          likes: 4,
          author: {
            id: 'member-5',
            user: {
              id: 'user-5',
              name: 'Emma Thompson',
              image: null,
            },
            role: 'MEMBER',
            joinedAt: '2024-10-22T00:00:00.000Z',
            postCount: 5,
          },
          parentId: null,
          replies: [],
        },
      ],
    },
    {
      id: 'discussion-3',
      title: 'Themes of Mental Health in the Novel',
      content: 'How does the book handle themes of mental health and trauma?',
      createdAt: '2024-11-15T14:00:00.000Z',
      likes: 12,
      author: {
        id: 'member-4',
        user: {
          id: 'user-4',
          name: 'Mike Rodriguez',
          image: null,
        },
        role: 'MEMBER',
        joinedAt: '2024-10-20T00:00:00.000Z',
        postCount: 8,
      },
      comments: [
        {
          id: 'comment-5',
          content:
            "It's handled with sensitivity but also raises important questions.",
          createdAt: '2024-11-15T15:00:00.000Z',
          likes: 7,
          author: {
            id: 'member-2',
            user: {
              id: 'user-2',
              name: 'Sarah Chen',
              image: null,
            },
            role: 'MEMBER',
            joinedAt: '2024-10-16T00:00:00.000Z',
            postCount: 18,
          },
          parentId: null,
          replies: [
            {
              id: 'comment-6',
              content:
                'Agreed. It made me reflect on real-world mental health discussions.',
              createdAt: '2024-11-15T16:00:00.000Z',
              likes: 3,
              author: {
                id: 'member-1',
                user: {
                  id: 'user-1',
                  name: 'Anya Sharma',
                  image: null,
                },
                role: 'OWNER',
                joinedAt: '2024-10-15T00:00:00.000Z',
                postCount: 25,
              },
              parentId: 'comment-5',
              replies: [],
            },
          ],
        },
      ],
    },
  ],
  readingList: [
    {
      id: 'reading-1',
      book: {
        id: 'book-2',
        title: 'Gone Girl',
        author: 'Gillian Flynn',
      },
      addedAt: '2024-10-15T00:00:00.000Z',
      status: 'CURRENT',
      order: 1,
    },
    {
      id: 'reading-2',
      book: {
        id: 'book-3',
        title: 'The Girl on the Train',
        author: 'Paula Hawkins',
      },
      addedAt: '2024-10-20T00:00:00.000Z',
      status: 'UPCOMING',
      order: 2,
    },
    {
      id: 'reading-3',
      book: {
        id: 'book-4',
        title: 'Big Little Lies',
        author: 'Liane Moriarty',
      },
      addedAt: '2024-10-25T00:00:00.000Z',
      status: 'UPCOMING',
      order: 3,
    },
  ],
};

export const discussionSample = {
  id: 'discussion-1',
  title: 'Chapter 5 Discussion - The Twist!!',
  content:
    'What did everyone think of the major twist in chapter 5? I was completely shocked!',
  createdAt: '2024-11-20T10:00:00.000Z',
  likes: 8,
  author: {
    id: 'member-2',
    user: {
      id: 'user-2',
      name: 'Sarah Chen',
      image: null,
    },
    role: 'MEMBER',
    joinedAt: '2024-10-16T00:00:00.000Z',
    postCount: 18,
  },
  comments: [
    {
      id: 'comment-1',
      content: 'I agree, it was unexpected! Did anyone see it coming?',
      createdAt: '2024-11-20T11:00:00.000Z',
      likes: 3,
      author: {
        id: 'member-3',
        user: {
          id: 'user-3',
          name: 'David Kim',
          image: null,
        },
        role: 'MEMBER',
        joinedAt: '2024-10-18T00:00:00.000Z',
        postCount: 12,
      },
      parentId: null,
      replies: [
        {
          id: 'comment-2',
          content:
            'Not at all! It completely changed my perspective on the story.',
          createdAt: '2024-11-20T12:00:00.000Z',
          likes: 2,
          author: {
            id: 'member-4',
            user: {
              id: 'user-4',
              name: 'Mike Rodriguez',
              image: null,
            },
            role: 'MEMBER',
            joinedAt: '2024-10-20T00:00:00.000Z',
            postCount: 8,
          },
          parentId: 'comment-1',
          replies: [],
        },
      ],
    },
    {
      id: 'comment-3',
      content: 'The foreshadowing was subtle but there if you look back.',
      createdAt: '2024-11-20T13:00:00.000Z',
      likes: 5,
      author: {
        id: 'member-1',
        user: {
          id: 'user-1',
          name: 'Anya Sharma',
          image: null,
        },
        role: 'OWNER',
        joinedAt: '2024-10-15T00:00:00.000Z',
        postCount: 25,
      },
      parentId: null,
      replies: [],
    },
  ],
};
