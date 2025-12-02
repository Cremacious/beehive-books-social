export const bookDisplayData = [
  {
    id: 1,
    title: 'The Last Spire',
    author: 'Anya Sharma',
    genre: 'Mystery',
  },
  {
    id: 2,
    title: 'Fantasy Fanatics',
    author: 'Anya Sharma',
    genre: 'Fantasy',
  },
  {
    id: 3,
    title: 'Novel User Title',
    author: 'Anya Sharma',
    genre: 'Romance',
  },
  {
    id: 4,
    title: 'Another Draft',
    author: 'Anya Sharma',
    genre: 'Sci-Fi',
  },
  {
    id: 5,
    title: 'Novel Last Tpine',
    author: 'Anya Sharma',
    genre: 'Thriller',
  },
  {
    id: 6,
    title: 'Novel Mar Trine',
    author: 'Anya Sharma',
    genre: 'Historical',
  },
  {
    id: 7,
    title: 'Shadows of the Past',
    author: 'Anya Sharma',
    genre: 'Drama',
  },
  {
    id: 8,
    title: 'Echoes in the Wind',
    author: 'Anya Sharma',
    genre: 'Adventure',
  },
  {
    id: 9,
    title: 'Whispers of Tomorrow',
    author: 'Anya Sharma',
    genre: 'Dystopian',
  },
  {
    id: 10,
    title: 'Beyond the Horizon',
    author: 'Anya Sharma',
    genre: 'Sci-Fi',
  },
  {
    id: 11,
    title: 'The Forgotten Realm',
    author: 'Anya Sharma',
    genre: 'Fantasy',
  },
];

export const bookDetailData = {
  id: '111',
  title: 'The Last Spire',
  author: 'Anya Sharma',
  genre: 'Mystery',
  category: 'Fiction',
  description:
    'In the shadowed valleys of Eldoria, where ancient secrets whisper through the mist, a young archaeologist uncovers a forbidden artifact that awakens forces long dormant. As alliances fracture and betrayals unfold, she must navigate a web of intrigue to prevent catastrophe. A thrilling mystery that blends historical lore with modern suspense.',
  chaptersCount: 12,
  wordCount: 45230,
  commentCount: 47,
  cover: '/assets/stock/cover.jpeg',
  createdAt: '2024-03-15',
  lastUpdated: '2024-11-10',
  privacy: 'public',
  chapters: [
    { id: '1', title: 'The Discovery', wordCount: 3200 },
    { id: '2', title: 'Whispers in the Dark', wordCount: 4100 },
    { id: '3', title: 'The Ancient Map', wordCount: 3800 },
    { id: '4', title: 'Shadows of the Past', wordCount: 4200 },
    { id: '5', title: 'The Hidden Chamber', wordCount: 3600 },
    { id: '6', title: 'Betrayal', wordCount: 3900 },
    { id: '7', title: 'The Ritual', wordCount: 4300 },
    { id: '8', title: 'Awakening', wordCount: 4100 },
    { id: '9', title: 'The Chase', wordCount: 3800 },
    { id: '10', title: 'Confrontation', wordCount: 4500 },
    { id: '11', title: 'Revelation', wordCount: 4200 },
    { id: '12', title: 'The Final Stand', wordCount: 4800 },
  ],
};

export const chapterDetailData = {
  id: '11222',
  title: 'The Discovery',
  wordCount: 3200,
  commentCount: 12,
  authorNotes:
    "This chapter introduces the main character and sets up the mystery. I wanted to create a sense of wonder mixed with subtle tension. The archaeological site is inspired by real locations I've visited.",
  content: `The morning mist clung to the ancient stones like a shroud, obscuring the true majesty of the ruins that had stood silent for centuries. Dr. Elena Vasquez adjusted her wide-brimmed hat against the rising sun, her boots crunching softly on the gravel path that wound through the Peruvian highlands.

Her team had been excavating for three weeks now, but today felt different. There was an electricity in the air, a palpable sense of anticipation that made her pulse quicken. The local legends spoke of a temple hidden within these mountains—a place of power and secrets that predated even the Incas.

"Doctor Vasquez!" called Marco, her lead excavator, his voice echoing off the stone walls. "You need to see this."

She hurried to the excavation site, her heart pounding. What they had uncovered wasn't just another artifact—it was the entrance to something far more significant. The stone door, perfectly preserved despite centuries of exposure, bore markings that none of them could immediately identify.

As Elena traced her fingers over the intricate carvings, she felt a strange vibration beneath her touch. The ground seemed to hum with ancient energy, and for a moment, she wondered if they had awakened something that should have remained dormant.

"Careful, Doctor," Marco warned, his eyes wide. "This place... it feels alive."

Elena nodded, but her mind was already racing ahead. Whatever secrets lay beyond this door, she was determined to uncover them. The world of archaeology was about to change forever.`,
  comments: [
    {
      id: '1111223445',
      author: 'Sarah Chen',
      avatar: null,
      content:
        "This opening really draws you in! The description of the mist and ancient stones creates such an atmospheric setting. I love how you're building tension right from the start.",
      timestamp: '2 hours ago',
      likes: 8,
      replies: [
        {
          id: '424466453',
          author: 'Anya Sharma',
          avatar: null,
          content:
            'Thanks Sarah! I spent a lot of time on that opening scene. The Peruvian highlands are so visually striking - I wanted readers to feel like they were really there.',
          timestamp: '1 hour ago',
          likes: 3,
        },
        {
          id: '42446336454',
          author: 'Mike Rodriguez',
          avatar: null,
          content:
            'The archaeological details feel authentic. Have you done fieldwork in Peru?',
          timestamp: '45 minutes ago',
          likes: 2,
        },
      ],
    },
    {
      id: '3333345565',
      author: 'David Kim',
      avatar: null,
      content:
        "The character of Dr. Vasquez is intriguing. I'm curious about her background - is she based on anyone you know?",
      timestamp: '1 hour ago',
      likes: 5,
      replies: [],
    },
    {
      id: '3565959483',
      author: 'Emma Thompson',
      avatar: null,
      content:
        "Love the pacing! You're not rushing the reveal, which makes the mystery more compelling. Can't wait for the next chapter.",
      timestamp: '30 minutes ago',
      likes: 12,
      replies: [],
    },
  ],
};
