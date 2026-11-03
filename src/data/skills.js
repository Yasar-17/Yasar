/**
 * Central Skills Data
 * Verified technical capabilities and toolbelt
 */

export const SKILL_CATEGORIES = [
  {
    category: 'data',
    id: 'data',
    title: 'AI & Data Science',
    description: 'Statistical modeling, telemetry parsing, predictive anomaly classification, and exploratory data analysis.',
    skills: [
      { name: 'Python', level: 'Advanced', tags: ['NumPy', 'Pandas', 'Scikit-Learn'] },
      { name: 'Machine Learning', level: 'Intermediate', tags: ['Classification', 'Regression', 'Feature Engineering'] },
      { name: 'Data Analysis & EDA', level: 'Advanced', tags: ['Matplotlib', 'Data Cleaning', 'Aggregation'] },
      { name: 'Geospatial Telemetry', level: 'Intermediate', tags: ['NASA FIRMS', 'OpenStreetMap', 'GIS Data'] },
      { name: 'Deep Learning Basics', level: 'Intermediate', tags: ['DCGANs', 'RNNs', 'PyTorch / Colab'] },
    ],
  },
  {
    category: 'frontend',
    id: 'frontend',
    title: 'Frontend & Modern Web',
    description: 'Building clean, high-performance web products, responsive interfaces, and interactive 3D web graphics.',
    skills: [
      { name: 'JavaScript & TypeScript', level: 'Advanced', tags: ['ES6+', 'Async/Await', 'Modern Tooling'] },
      { name: 'React', level: 'Advanced', tags: ['Hooks', 'Context API', 'State Architecture'] },
      { name: 'Tailwind CSS', level: 'Advanced', tags: ['Responsive Design', 'Custom Systems', 'Typography'] },
      { name: 'HTML5 & CSS3', level: 'Advanced', tags: ['Semantic Markup', 'Flexbox', 'Grid', 'Accessibility'] },
      { name: 'Three.js & 3D Web', level: 'Intermediate', tags: ['WebGL', 'CSS3D', 'React Three Fiber', 'PBR Shaders'] },
    ],
  },
  {
    category: 'backend',
    id: 'backend',
    title: 'Databases, Systems & Tools',
    description: 'Relational data management, developer tooling, deployment platforms, and workflow automation.',
    skills: [
      { name: 'SQL', level: 'Intermediate', tags: ['Complex Queries', 'PostgreSQL', 'Relational Schemas'] },
      { name: 'Git & GitHub', level: 'Advanced', tags: ['Version Control', 'Pull Requests', 'Open Source'] },
      { name: 'Jupyter & Colab', level: 'Advanced', tags: ['Google Colab T4 GPU', 'Reproducible Notebooks'] },
      { name: 'Vercel & Cloudflare', level: 'Intermediate', tags: ['Production Deployments', 'Pages', 'DNS'] },
      { name: 'Linux / Bash', level: 'Intermediate', tags: ['CLI Workflows', 'Shell Scripting', 'Environment Config'] },
    ],
  },
];

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.skills);

export default SKILL_CATEGORIES;

