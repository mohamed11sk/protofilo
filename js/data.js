const PORTFOLIO = {
  site: {
    name: 'Alex Morgan',
    firstName: 'Alex',
    lastName: 'Morgan',
    title: 'Senior Full-Stack Engineer',
    email: 'hello@alexmorgan.dev',
    location: 'San Francisco, CA',
    availability: 'Open to opportunities',
    resumeUrl: '#',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      dribbble: 'https://dribbble.com',
    },
    heroImage: 'images/home.png',
    aboutImage: 'images/about.png',
  },
  typingRoles: [
    'Full-Stack Engineer',
    'UI/UX Enthusiast',
    'System Architect',
    'Open Source Contributor',
  ],
  nav: [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#services', label: 'Services' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ],
  about: {
    summary:
      'I craft high-performance digital products that blend engineering excellence with thoughtful design. With 8+ years shipping production systems, I help teams turn ambitious ideas into reliable, scalable software.',
    highlights: [
      { label: 'Years Experience', value: '8+' },
      { label: 'Projects Delivered', value: '60+' },
      { label: 'Teams Led', value: '12' },
    ],
    strengths: [
      'System design & scalable architecture',
      'Performance optimization & Core Web Vitals',
      'Design systems & component libraries',
      'Mentorship & technical leadership',
      'CI/CD & cloud-native deployments',
      'Accessible, inclusive interfaces',
    ],
  },
  skills: [
    {
      name: 'Frontend',
      items: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 92 },
        { name: 'CSS / Tailwind', level: 90 },
        { name: 'Vue.js', level: 78 },
      ],
    },
    {
      name: 'Backend',
      items: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'GraphQL', level: 82 },
      ],
    },
    {
      name: 'DevOps & Tools',
      items: [
        { name: 'AWS / GCP', level: 84 },
        { name: 'Docker / K8s', level: 80 },
        { name: 'Git / CI/CD', level: 92 },
        { name: 'Figma', level: 75 },
      ],
    },
  ],
  skillsTicker: [
    { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
    { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
    { name: 'React', slug: 'react', color: '61DAFB' },
    { name: 'Next.js', slug: 'nextdotjs', color: 'FFFFFF' },
    { name: 'Tailwind', slug: 'tailwindcss', color: '06B6D4' },
    { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
    { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
    { name: 'MySQL', slug: 'mysql', color: '4479A1' },
    { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1' },
    { name: 'GraphQL', slug: 'graphql', color: 'E10098' },
    { name: 'Docker', slug: 'docker', color: '2496ED' },
    { name: 'Git', slug: 'git', color: 'F05032' },
    { name: 'Python', slug: 'python', color: '3776AB' },
    { name: 'Figma', slug: 'figma', color: 'F24E1E' },
  ],
  projects: [
    {
      id: '1',
      title: 'Amazone — E-Commerce Store',
      description:
        'Full e-commerce site with product catalog, cart, favorites, user profiles, and order submission via PHPMailer.',
      image: 'images/flowpoint.png',
      category: 'ecommerce',
      tags: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'PHPMailer'],
      liveUrl: 'https://flowpoint.42web.io/?i=1',
      githubUrl: 'https://github.com/mohamed11sk/flowpoint-ecommerce',
    },
    {
      id: '2',
      title: 'Zaton E-Commerce',
      description:
        'E-commerce demo with product pages, user login/signup, and a ready-to-import MySQL database.',
      image: 'images/zaton.png',
      category: 'ecommerce',
      tags: ['PHP', 'MySQL', 'HTML', 'CSS'],
      liveUrl: 'https://zaton.42web.io/index.php',
      githubUrl: 'https://github.com/mohamed11sk/zaton-ecommerce',
    },
    {
      id: '3',
      title: 'All Green — Fresh Produce Export',
      description:
        'Responsive export platform for fresh fruits and vegetables with WCAG AA accessibility and 7 breakpoints from 320px to 4K.',
      image: 'images/allgreen.png',
      category: 'ecommerce',
      tags: ['PHP', 'CSS3', 'JavaScript', 'PHPMailer', 'Responsive'],
      liveUrl: 'https://freash-grean.42web.io/index.php',
      githubUrl: 'https://github.com/mohamed11sk/freash_grean-ecommerce',
    },
    {
      id: '4',
      title: 'AL-Zakhrof Iron Factory',
      description:
        'Bilingual (Arabic/English) factory website with an interactive flipbook for showcasing catalogs and documentation.',
      image: 'images/zakhrof.png',
      category: 'frontend',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'StPageFlip', 'RTL/LTR'],
      liveUrl: 'https://mohamed11sk.github.io/Zakhrof-factory/',
      githubUrl: 'https://github.com/mohamed11sk/Zakhrof-factory',
    },
    {
      id: '5',
      title: 'Crowdfunding Platform',
      description:
        'Responsive crowdfunding app with campaign creation, donations, user dashboards, and an admin moderation panel.',
      image: 'images/crowdfunding.png',
      category: 'web',
      tags: ['HTML5', 'CSS3', 'Vanilla JS (ES6+)', 'JSON Server', 'REST API'],
      liveUrl: '',
      githubUrl: 'https://github.com/mohamed11sk/Crowdfunding-project',
    },
    {
      id: '6',
      title: 'Smart Traffic & Parking System',
      description:
        'IoT system using Arduino Nano and ESP32 to detect vehicles, control barriers via servos, and stream live lane data to Firebase.',
      image: 'images/parking-system.png',
      category: 'iot',
      tags: ['Arduino', 'ESP32', 'Firebase', 'I2C', 'PHP', 'MySQL'],
      liveUrl: 'https://parking-trafic.42web.io/',
      githubUrl: 'https://github.com/mohamed11sk/Parking-System',
    },
    {
      id: '7',
      title: 'IoT Gas Detection with AI',
      description:
        'Graduation project: MQ gas sensors with ESP32, Flask AI for hazard prediction, Firebase, web dashboard, and a Flutter mobile app.',
      image: 'images/iot-gas-detection.jpeg',
      category: 'iot',
      tags: ['Flutter', 'Python', 'Flask', 'ESP32', 'Firebase', 'PHP'],
      liveUrl: '',
      githubUrl: 'https://github.com/mohamed11sk/Graduation-project',
    },
    {
      id: '8',
      title: 'Email Marketing Platform',
      description:
        'PHP platform for subscriber lists, HTML templates, SMTP campaigns via PHPMailer, and open-rate tracking with Chart.js analytics.',
      image: 'images/email-marketing.jpg',
      category: 'web',
      tags: ['PHP', 'MySQL', 'PHPMailer', 'SMTP', 'Chart.js'],
      liveUrl: '',
      githubUrl: 'https://github.com/mohamed11sk/Email-markting',
    },
    {
      id: '9',
      title: 'TestNG Selenium Automation Framework',
      description:
        'End-to-end QA framework: Java + Selenium + TestNG automates e-commerce flows, stores pass/fail results in MySQL, and exposes a PHP dashboard with search, delete, and Excel export via PhpSpreadsheet.',
      image: 'images/testng-selenium.jpeg',
      category: 'qa',
      tags: ['Java', 'Selenium', 'TestNG', 'Maven', 'MySQL', 'PHP', 'PhpSpreadsheet'],
      liveUrl: '',
      githubUrl: 'https://github.com/mohamed11sk/testng-framework-in-selenium-project',
    },
  ],
  projectFilters: [
    { id: 'all', label: 'All' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'web', label: 'Web Apps' },
    { id: 'iot', label: 'IoT / Embedded' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'qa', label: 'QA / Testing' },
  ],
  /* Carousel settings — supports unlimited projects in data.js */
  projectsCarousel: {
    autoplay: true,
    autoplayInterval: 4500,
    pauseOnHover: true,
  },
  experience: [
    {
      year: '2023 — Present',
      role: 'Staff Software Engineer',
      company: 'TechVision Inc.',
      description:
        'Leading platform modernization, mentoring 6 engineers, and reducing deployment time by 70%.',
    },
    {
      year: '2020 — 2023',
      role: 'Senior Full-Stack Developer',
      company: 'CloudScale Labs',
      description:
        'Built customer-facing dashboards serving 500k+ users. Introduced design system adopted company-wide.',
    },
    {
      year: '2018 — 2020',
      role: 'Full-Stack Developer',
      company: 'StartupForge',
      description:
        'Shipped MVP to Series A. Owned frontend architecture and API integrations with Stripe and Twilio.',
    },
    {
      year: '2016 — 2018',
      role: 'Frontend Developer',
      company: 'Digital Craft Agency',
      description:
        'Delivered 20+ client websites with focus on accessibility, SEO, and animation-rich experiences.',
    },
  ],
  services: [
    {
      icon: 'code-2',
      title: 'Web Development',
      description:
        'Production-grade SPAs and SSR apps with React, Next.js, and modern tooling — built for scale and maintainability.',
    },
    {
      icon: 'layers',
      title: 'UI/UX Engineering',
      description:
        'Pixel-perfect implementations from Figma, design systems, micro-interactions, and responsive layouts.',
    },
    {
      icon: 'server',
      title: 'Backend & APIs',
      description:
        'RESTful and GraphQL APIs, database design, authentication, and cloud infrastructure on AWS/GCP.',
    },
    {
      icon: 'zap',
      title: 'Performance Audit',
      description:
        'Core Web Vitals optimization, bundle analysis, caching strategies, and lighthouse score improvements.',
    },
    {
      icon: 'users',
      title: 'Technical Consulting',
      description:
        'Architecture reviews, tech stack decisions, code quality standards, and team workflow optimization.',
    },
    {
      icon: 'rocket',
      title: 'MVP Development',
      description:
        'Rapid prototyping from idea to launch — validated MVPs with clean code ready for investor demos.',
    },
  ],
  testimonials: [
    {
      name: 'Sarah Chen',
      role: 'VP Engineering, TechVision',
      avatar: 'images/testimonial1.jpg',
      quote:
        'Alex transformed our legacy frontend into a modern, blazing-fast platform. Their technical leadership and attention to detail are exceptional.',
      rating: 5,
    },
    {
      name: 'Marcus Rivera',
      role: 'Founder, StartupForge',
      avatar: 'images/testimonial2.jpg',
      quote:
        'We went from concept to funded product in 4 months. Alex is the engineer you want when stakes are high and quality cannot slip.',
      rating: 5,
    },
    {
      name: 'Elena Kowalski',
      role: 'Product Director, CloudScale',
      avatar: 'images/testimonial3.jpg',
      quote:
        'The design system Alex built cut our feature delivery time in half. A rare blend of engineering depth and design sensibility.',
      rating: 5,
    },
  ],
  statistics: [
    { label: 'Projects Completed', value: 60, suffix: '+' },
    { label: 'Happy Clients', value: 45, suffix: '+' },
    { label: 'Technologies', value: 35, suffix: '+' },
    { label: 'Code Commits', value: 12, suffix: 'k+' },
  ],
};
