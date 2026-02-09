/**
 * Mock AI Service - Free Alternative for Testing
 * This generates realistic portfolio data without requiring OpenAI API credits
 */

/**
 * Generate a complete portfolio from a user prompt using mock AI
 */
export const generateMockPortfolio = async (userPrompt, progressCallback) => {
  // Simulate progress
  if (progressCallback) progressCallback('Analyzing your profile...');
  await sleep(800);
  
  if (progressCallback) progressCallback('Generating experience details...');
  await sleep(800);
  
  if (progressCallback) progressCallback('Creating project descriptions...');
  await sleep(800);
  
  if (progressCallback) progressCallback('Finalizing your portfolio...');
  await sleep(600);

  // Extract basic info from prompt
  const prompt = userPrompt.toLowerCase();
  
  // Determine profession
  let profession = 'Professional';
  let skills = [];
  let experience = [];
  let projects = [];
  
  if (prompt.includes('software') || prompt.includes('developer') || prompt.includes('engineer')) {
    profession = 'Software Engineer';
    skills = ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'Docker', 'AWS', 'Git', 'MongoDB', 'REST APIs', 'GraphQL', 'CI/CD'];
    experience = [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        startDate: '2021-03',
        endDate: 'Present',
        current: true,
        description: 'Led development of scalable microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews.',
        achievements: [
          'Reduced API response time by 40% through optimization',
          'Successfully migrated monolith to microservices',
          'Implemented automated testing increasing coverage to 85%'
        ]
      },
      {
        title: 'Software Engineer',
        company: 'Digital Solutions Ltd.',
        location: 'Remote',
        startDate: '2019-01',
        endDate: '2021-02',
        current: false,
        description: 'Developed full-stack web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on time. Optimized database queries and improved application performance.',
        achievements: [
          'Built 15+ production-ready features',
          'Improved page load time by 50%',
          'Implemented real-time chat functionality'
        ]
      }
    ];
    projects = [
      {
        name: 'E-Commerce Platform',
        description: 'Built a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Implemented responsive design and optimized for performance.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS S3'],
        link: 'https://github.com/yourusername/ecommerce',
        achievements: [
          'Handles 10K+ concurrent users',
          'Integrated with multiple payment gateways',
          'Implemented advanced search and filtering'
        ]
      },
      {
        name: 'Real-Time Analytics Dashboard',
        description: 'Created a real-time analytics dashboard for monitoring application metrics and user behavior. Implemented WebSocket connections for live data updates and interactive visualizations.',
        technologies: ['React', 'D3.js', 'WebSocket', 'Redis', 'Express'],
        link: 'https://github.com/yourusername/analytics',
        achievements: [
          'Real-time data visualization',
          'Custom metric tracking',
          'Exportable reports in PDF/CSV'
        ]
      },
      {
        name: 'AI-Powered Chatbot',
        description: 'Developed an intelligent chatbot using natural language processing to provide customer support. Integrated with company knowledge base and ticketing system.',
        technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'Docker'],
        link: 'https://github.com/yourusername/chatbot',
        achievements: [
          'Reduced support tickets by 35%',
          'Natural language understanding',
          'Multi-language support'
        ]
      }
    ];
  } else if (prompt.includes('data') || prompt.includes('analyst') || prompt.includes('scientist')) {
    profession = 'Data Scientist';
    skills = ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'Tableau', 'Power BI', 'Statistics', 'Data Visualization', 'Big Data'];
    experience = [
      {
        title: 'Senior Data Scientist',
        company: 'Analytics Pro',
        location: 'New York, NY',
        startDate: '2020-06',
        endDate: 'Present',
        current: true,
        description: 'Lead data science initiatives and develop predictive models. Built machine learning pipelines processing millions of records daily. Presented insights to C-level executives.',
        achievements: [
          'Developed predictive model with 92% accuracy',
          'Increased revenue by $2M through data-driven insights',
          'Led team of 5 data analysts'
        ]
      },
      {
        title: 'Data Analyst',
        company: 'Business Intelligence Corp',
        location: 'Boston, MA',
        startDate: '2018-03',
        endDate: '2020-05',
        current: false,
        description: 'Analyzed business data to identify trends and opportunities. Created dashboards and reports for stakeholders. Performed A/B testing and statistical analysis.',
        achievements: [
          'Built 30+ interactive dashboards',
          'Automated reporting saving 20 hours/week',
          'Improved data quality by 40%'
        ]
      }
    ];
    projects = [
      {
        name: 'Customer Churn Prediction',
        description: 'Built machine learning model to predict customer churn with 90% accuracy. Implemented feature engineering and hyperparameter tuning to optimize model performance.',
        technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Jupyter'],
        link: 'https://github.com/yourusername/churn-prediction',
        achievements: [
          '90% prediction accuracy',
          'Identified key churn indicators',
          'Saved $500K in customer retention'
        ]
      },
      {
        name: 'Sales Forecasting System',
        description: 'Developed time series forecasting model for sales prediction. Integrated with business intelligence tools for automated reporting and visualization.',
        technologies: ['Python', 'Prophet', 'LSTM', 'Tableau', 'SQL'],
        link: 'https://github.com/yourusername/sales-forecast',
        achievements: [
          'Improved forecast accuracy by 35%',
          'Automated monthly reporting',
          'Real-time predictions'
        ]
      },
      {
        name: 'Sentiment Analysis Tool',
        description: 'Created NLP-based sentiment analysis tool for social media monitoring. Processed millions of tweets and reviews to extract customer insights.',
        technologies: ['Python', 'NLTK', 'spaCy', 'MongoDB', 'Flask'],
        link: 'https://github.com/yourusername/sentiment-analysis',
        achievements: [
          'Analyzed 10M+ social media posts',
          'Multi-language support',
          'Real-time sentiment tracking'
        ]
      }
    ];
  } else if (prompt.includes('design') || prompt.includes('ui') || prompt.includes('ux')) {
    profession = 'UI/UX Designer';
    skills = ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'HTML/CSS', 'React', 'Accessibility'];
    experience = [
      {
        title: 'Senior UI/UX Designer',
        company: 'Creative Studio',
        location: 'Los Angeles, CA',
        startDate: '2020-01',
        endDate: 'Present',
        current: true,
        description: 'Lead design projects from concept to delivery. Conduct user research and usability testing. Create design systems and component libraries. Collaborate with developers and product managers.',
        achievements: [
          'Redesigned app increasing user engagement by 45%',
          'Created design system used across 15+ products',
          'Improved conversion rate by 30%'
        ]
      },
      {
        title: 'UI Designer',
        company: 'Digital Agency',
        location: 'Remote',
        startDate: '2018-06',
        endDate: '2019-12',
        current: false,
        description: 'Designed user interfaces for web and mobile applications. Created mockups, prototypes, and design specifications. Worked closely with clients to understand requirements.',
        achievements: [
          'Delivered 20+ client projects',
          'Increased client satisfaction by 40%',
          'Won design award for mobile app'
        ]
      }
    ];
    projects = [
      {
        name: 'Mobile Banking App Redesign',
        description: 'Complete redesign of mobile banking application focusing on user experience and accessibility. Conducted user research and iterative testing to validate design decisions.',
        technologies: ['Figma', 'Principle', 'User Testing', 'Design System'],
        link: 'https://dribbble.com/yourusername/banking-app',
        achievements: [
          'Increased user satisfaction by 50%',
          'Reduced task completion time by 35%',
          'Won UX Design Award 2023'
        ]
      },
      {
        name: 'E-Learning Platform UI',
        description: 'Designed intuitive interface for online learning platform. Created interactive prototypes and design system to ensure consistency across all features.',
        technologies: ['Adobe XD', 'InVision', 'Illustrator'],
        link: 'https://behance.net/yourusername/elearning',
        achievements: [
          'Improved course completion by 40%',
          'Accessibility compliant (WCAG 2.1)',
          'Featured in Design Magazine'
        ]
      },
      {
        name: 'Design System Library',
        description: 'Built comprehensive design system with reusable components, patterns, and guidelines. Improved design-to-development workflow efficiency.',
        technologies: ['Figma', 'Storybook', 'React', 'Styled Components'],
        link: 'https://github.com/yourusername/design-system',
        achievements: [
          'Reduced design time by 60%',
          'Used across 10+ products',
          'Comprehensive documentation'
        ]
      }
    ];
  } else {
    // Generic professional
    profession = 'Professional';
    skills = ['Project Management', 'Communication', 'Leadership', 'Problem Solving', 'Team Collaboration', 'Strategic Planning', 'Data Analysis', 'Microsoft Office', 'Agile', 'Budgeting'];
    experience = [
      {
        title: 'Senior Professional',
        company: 'Industry Leader Inc.',
        location: 'Your City',
        startDate: '2019-01',
        endDate: 'Present',
        current: true,
        description: 'Lead key initiatives and manage cross-functional teams. Drive strategic projects and deliver results aligned with business objectives. Mentor team members and foster collaboration.',
        achievements: [
          'Successfully delivered 15+ major projects',
          'Improved team efficiency by 40%',
          'Recognized for outstanding leadership'
        ]
      }
    ];
    projects = [
      {
        name: 'Strategic Initiative Project',
        description: 'Led strategic initiative that transformed business processes and improved operational efficiency. Coordinated with multiple stakeholders and managed project timeline and budget.',
        technologies: ['Project Management', 'Agile', 'Data Analysis'],
        link: '',
        achievements: [
          'Completed under budget',
          'Improved efficiency by 35%',
          'Stakeholder satisfaction: 95%'
        ]
      }
    ];
  }

  // Extract name from prompt or use default
  const nameMatch = prompt.match(/(?:my name is|i am|i'm)\s+([a-z]+(?:\s+[a-z]+)?)/i);
  const name = nameMatch ? nameMatch[1].split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Your Name';

  // Extract location
  const locationMatch = prompt.match(/(?:from|in|based in|located in)\s+([a-z\s,]+?)(?:\.|,|\s+with|\s+i|\s+and|$)/i);
  const location = locationMatch ? locationMatch[1].trim() : 'Your Location';

  // Extract email pattern or generate
  const emailMatch = prompt.match(/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i);
  const email = emailMatch ? emailMatch[1] : 'your.email@example.com';

  // Generate portfolio data
  const portfolioData = {
    personalInfo: {
      fullName: name,
      email: email,
      phone: '+1 (555) 123-4567',
      location: location,
      title: profession,
      bio: generateBio(profession, userPrompt),
      linkedin: 'https://linkedin.com/in/yourprofile',
      github: 'https://github.com/yourusername',
      website: 'https://yourportfolio.com'
    },
    experience: experience,
    education: [
      {
        degree: 'Bachelor of Science',
        field: getFieldOfStudy(profession),
        institution: 'University Name',
        location: 'City, State',
        startDate: '2014-09',
        endDate: '2018-05',
        gpa: '3.8/4.0',
        achievements: [
          'Dean\'s List - All semesters',
          'President, Tech Club',
          'Academic Excellence Award'
        ]
      }
    ],
    skills: skills,
    projects: projects,
    certifications: [
      {
        name: getCertification(profession),
        issuer: getCertificationIssuer(profession),
        date: '2023-06',
        credentialId: 'CERT-123456',
        link: 'https://certification-link.com'
      }
    ],
    theme: 'modern'
  };

  return portfolioData;
};

// Helper function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate bio
const generateBio = (profession, prompt) => {
  const experience = prompt.match(/(\d+)\s*(?:\+)?\s*years?/i)?.[1] || '5+';
  
  const bios = {
    'Software Engineer': `Passionate ${profession} with ${experience} years of experience building scalable web applications. Expert in modern JavaScript frameworks and cloud technologies. Dedicated to writing clean, maintainable code and delivering exceptional user experiences. Proven track record of leading successful projects and mentoring junior developers.`,
    'Data Scientist': `Results-driven ${profession} with ${experience} years of experience in machine learning and data analytics. Skilled in extracting actionable insights from complex datasets and building predictive models. Strong background in statistical analysis and data visualization. Passionate about using data to solve real-world business problems.`,
    'UI/UX Designer': `Creative ${profession} with ${experience} years of experience designing intuitive and beautiful digital experiences. Expert in user research, prototyping, and design systems. Passionate about creating accessible, user-centered designs that drive business results. Strong collaboration skills working with cross-functional teams.`,
    'Professional': `Experienced professional with ${experience} years in the industry. Proven track record of delivering high-quality results and driving business success. Strong leadership and communication skills. Passionate about continuous learning and professional development.`
  };
  
  return bios[profession] || bios['Professional'];
};

// Helper function to get field of study
const getFieldOfStudy = (profession) => {
  const fields = {
    'Software Engineer': 'Computer Science',
    'Data Scientist': 'Data Science',
    'UI/UX Designer': 'Design & Interaction',
    'Professional': 'Business Administration'
  };
  return fields[profession] || 'Computer Science';
};

// Helper function to get certification
const getCertification = (profession) => {
  const certs = {
    'Software Engineer': 'AWS Certified Solutions Architect',
    'Data Scientist': 'Google Cloud Professional Data Engineer',
    'UI/UX Designer': 'Google UX Design Professional Certificate',
    'Professional': 'Project Management Professional (PMP)'
  };
  return certs[profession] || 'Professional Certification';
};

// Helper function to get certification issuer
const getCertificationIssuer = (profession) => {
  const issuers = {
    'Software Engineer': 'Amazon Web Services',
    'Data Scientist': 'Google Cloud',
    'UI/UX Designer': 'Google',
    'Professional': 'Project Management Institute'
  };
  return issuers[profession] || 'Industry Body';
};
