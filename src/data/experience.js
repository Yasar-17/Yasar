/**
 * Central Experience Data
 * Verified internship, professional, and hackathon information
 */

export const EXPERIENCES = [
  {
    id: 'hackulus',
    role: 'Hackathon Winner',
    organization: "Hackulus '26 (Conducted by VIT)",
    period: '2026',
    type: 'Hackathon Win',
    badgeColor: 'text-[#7CF2C9] bg-[#1a2330] border-[#263447]',
    highlights: [
      'Secured 1st Place / Hackathon Winner among competitive engineering teams.',
      'Engineered CARDIA: an experimental cardiovascular digital twin simulating real-time physiological perturbations.',
      'Modeled counterfactual hemodynamic interventions with interactive parameter control and telemetry visualization.',
    ],
    technologies: ['Python', 'Machine Learning', 'Physiological Modeling', 'FastAPI', 'Streamlit'],
  },
  {
    id: 'sih-2024',
    role: 'National Finalist',
    organization: 'Smart India Hackathon 2024 (SIH-26)',
    period: 'Aug 2024 — Dec 2024',
    type: 'National Hackathon',
    badgeColor: 'text-[#FFB86B] bg-[#2b2116] border-[#3d2f1f]',
    highlights: [
      'Selected as National Finalist for AI-based industrial thermal anomaly and wildfire detection.',
      'Constructed ingestion pipeline pulling streaming thermal telemetry from NASA FIRMS MODIS/VIIRS satellite sensors.',
      'Implemented spatial classification against OpenStreetMap infrastructure to filter industrial flares from true wildfires, achieving 84.6% false-positive reduction.',
    ],
    technologies: ['Python', 'NASA FIRMS API', 'OpenStreetMap', 'Scikit-Learn', 'Pandas', 'GIS'],
  },
  {
    id: 'jyam',
    role: 'Co-Founder & Developer',
    organization: 'JYAM Digital Agency',
    period: '2024 — Present',
    type: 'Agency & Production',
    badgeColor: 'text-[#7CF2C9] bg-[#1a2330] border-[#263447]',
    highlights: [
      'Co-founded independent digital agency delivering fast, responsive web products with zero framework bloat.',
      'Shipped complete production client websites including Zenny Studios with bespoke typography and responsive layouts.',
      'Implemented automated inquiry handling pipelines and performance-optimized deployments on Vercel.',
    ],
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Vercel', 'UI/UX'],
  },
  {
    id: 'codealpha',
    role: 'Data Science Intern',
    organization: 'CodeAlpha',
    period: '2024',
    type: 'Internship',
    badgeColor: 'text-[#8AB4FF] bg-[#1a2133] border-[#25314d]',
    highlights: [
      'Completed practical machine learning curriculum focusing on data exploration and predictive modeling.',
      'Engineered multi-class classification and regression models for Iris species, sales forecasting, and car valuation.',
      'Authored reproducible data science notebooks using Pandas, NumPy, and Scikit-Learn.',
    ],
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Jupyter Notebooks'],
  },
  {
    id: 'sgc',
    role: 'Open Source Contributor & Core Team',
    organization: 'Student Guidance Cell (CAHCET)',
    period: '2024 — Present',
    type: 'Campus Community',
    badgeColor: 'text-[#A78BFA] bg-[#221b33] border-[#342750]',
    highlights: [
      'Contributed to the development and maintenance of the official teamsgc.in college community platform.',
      'Built announcement systems and achievement showcases with Next.js, TypeScript, and Supabase.',
      'Maintained internal administrative workflows for student workshops and community initiatives.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  },
];

export default EXPERIENCES;
