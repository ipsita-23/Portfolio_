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

  // Get a free key from https://web3forms.com to enable direct API form submissions
  web3formsKey: 'YOUR_ACCESS_KEY_HERE',

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
      ],
      devTools: [
        { name: 'REST APIs', value: 84 },
        { name: 'Flask', value: 80 },
        { name: 'Django', value: 74 },
        { name: 'Git / GitHub', value: 88 },
        { name: 'Linux', value: 76 },
        { name: 'Node.js', value: 70 },
      ],
      dsa: [
        { name: 'DSA', value: 86 },
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
        github: 'https://github.com/ipsita-23/Dropout-prediction-model-for-traditional-and-e-learning-mode',
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
        github: 'https://github.com/ipsita-23/Binance-Future-Testnet',
        live: '#',
      },
    },
    {
      tag: '[ Jan’2026 - Feb’2026 ]',
      name: 'Low-Latency Limit Order Book & Matching Engine',
      description:
        'Engineered a high-performance in-memory exchange core implementing price-time priority matching, enabling deterministic order execution with microsecond-level latency. Designed cache-efficient data structures for bid/ask management with O(1) best price access and O(log n) order insertion; sustained ~1.17M+ orders/sec throughput. Integrated an embedded HTTP server and lightweight UI for real-time monitoring.',
      techStack: ['C++', 'STL', 'CMake', 'MSVC', 'HTTP', 'JSON', 'Benchmarking'],
      links: {
        github: 'https://github.com/ipsita-23/low-latency-matching-engine',
        live: '#',
      },
    },
  ],

  experience: [
    {
      role: 'AI/ML Engineer',
      company: 'Project-based Work',
      period: '2024 - Present',
      description:
        'Built practical ML systems for prediction and analytics, with a focus on model quality, explainability, and deployment readiness.',
    },
    {
      role: 'Full Stack Developer',
      company: 'Independent Builds',
      period: '2023 - Present',
      description:
        'Designed and shipped full-stack products using React and Python/Node ecosystems with an emphasis on responsive UI and clean architecture.',
    },
  ],

  education: [
    {
      degree: 'B.Tech CSE (AI & ML)',
      institution: 'Lovely Professional University',
      period: '2023 - Present',
      details: '7.79 CGPA',
    },
    {
      degree: '12th Grade',
      institution: 'Budding Buds Sr. Sec. School',
      period: '2022',
      details: '72.6%',
    },
    {
      degree: 'Matriculation',
      institution: 'Budding Buds Sr. Sec. School',
      period: '2020',
      details: '95.2%',
    },
  ],

  certifications: [
    {
      title: 'Machine Learning and NLP Basics',
      issuer: 'Coursera',
      date: "Feb'2026",
      credentialId: 'Verified',
      url: ''
    },
    {
      title: 'Supervised ML: Regression & Classification',
      issuer: 'Coursera',
      date: "Sept'2025",
      credentialId: 'Verified',
      url: ''
    },
    {
      title: 'LLM Engineering: Master AI & Agents',
      issuer: 'Udemy',
      date: "Sept'2025",
      credentialId: 'Verified',
      url: ''
    },
    {
      title: 'Computer Communications',
      issuer: 'Coursera',
      date: "Nov'2024",
      credentialId: 'Verified',
      url: ''
    },
    {
      title: 'AI ML For Real World Problem Solving',
      issuer: 'LPU Training',
      date: 'Completed',
      credentialId: 'Verified',
      url: ''
    }
  ]
}

