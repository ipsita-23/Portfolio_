export const CONFIG = {
  name: 'Ipsita Umang',
  initials: 'IU',
  tagline: 'AI/ML Engineer × Competitive Programmer × Full Stack Developer',

  github: 'ipsita-23',

  // CV didn’t include exact usernames/handles for these platforms.
  // We keep placeholders and the app will disable fetches until you update them.
  leetcode: {
    username: 'Ipsita2307',
  },
  codeforces: {
    handle: 'Ipsita2307',
  },
  codechef: {
    handle: 'ipsita2',
  },

  email: 'ipsita23umang@gmail.com',

  socials: {
    github: 'https://github.com/ipsita-23',
    linkedin: 'https://www.linkedin.com/in/ipsita23/',
    twitterX: 'https://x.com/ipsita_23',
    leetcode: 'https://leetcode.com/u/Ipsita2307/',
    codeforces: 'https://codeforces.com/profile/Ipsita2307',
    codechef: 'https://www.codechef.com/users/ipsita2',
  },

  skills: {
    percentages: {
      mlAi: 45,
      languagesCp: 35,
      devTools: 20,
    },
    columns: {
      mlAi: [
        { name: 'PyTorch', value: 92 },
        { name: 'TensorFlow', value: 84 },
        { name: 'Scikit-learn', value: 90 },
        { name: 'Computer Vision', value: 88 },
        { name: 'Data Visualization', value: 80 },
        { name: 'Model Deployment', value: 76 },
      ],
      languagesCp: [
        { name: 'C++ (CP)', value: 90 },
        { name: 'Python', value: 88 },
        { name: 'Java', value: 78 },
        { name: 'JavaScript', value: 82 },
        { name: 'SQL', value: 74 },
        { name: 'Algorithms (Practice)', value: 86 },
      ],
      devTools: [
        { name: 'REST APIs', value: 84 },
        { name: 'Flask', value: 80 },
        { name: 'Django', value: 74 },
        { name: 'Git / GitHub', value: 88 },
        { name: 'Linux', value: 76 },
        { name: 'Node.js', value: 70 },
      ],
    },
  },

  about: {
    problemsSolved: 0, // filled by LeetCode fetch when enabled
    cfRating: 1176,
    githubCommits: 0, // filled by GitHub heatmap totals
    projectsShipped: 2,
  },

  projects: [
    {
      tag: '[ ML ]',
      name: 'Dropout Prediction System',
      description:
        'Machine-learning risk evaluation for dropout detection across conventional + online learning.',
      techStack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Random Forest', 'Matplotlib', 'Seaborn'],
      links: {
        github: 'https://github.com/ipsita-23',
        live: '#',
      },
    },
    {
      tag: '[ CP Tool ]',
      name: 'Binance Futures Testnet Trading Bot',
      description:
        'Algorithmic trading simulator with secure HMAC auth, multiple order types, and execution logs.',
      techStack: ['Python', 'REST API', 'Binance API', 'HMAC', 'Streamlit'],
      links: {
        github: 'https://github.com/ipsita-23',
        live: '#',
      },
    },
    {
      tag: '[ Research ]',
      name: 'Multimodal Mental Health AI',
      description:
        'Emotion/mental health prediction using text (BERT), images (ViT), and audio (Wav2Vec) with feature fusion.',
      techStack: ['BERT', 'ViT', 'Wav2Vec', 'OpenCV', 'Librosa', 'Multimodal Fusion'],
      links: {
        github: 'https://github.com/ipsita-23',
        live: '#',
      },
    },
  ],
}

