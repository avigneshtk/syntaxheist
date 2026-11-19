// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — shared event configuration
// Update this file when organizers confirm details.
// All placeholders are clearly marked with comments.
// ─────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  name: 'SyntaxHeist',
  fullName: 'SyntaxHeist 2027',
  tagline: 'BREAK THE CODE. BUILD THE FUTURE.',
  edition: '24-Hour Hackathon',
  organizer: 'IEEE FISAT Student Branch',

  date: {
    // 20 March 2027, 10:00 AM IST → 21 March 2027, 10:00 AM IST
    start: new Date('2027-03-20T10:00:00+05:30'),
    end:   new Date('2027-03-21T10:00:00+05:30'),
    displayStart: '20 March 2027',
    displayEnd:   '21 March 2027',
    displayTime:  '10:00 AM IST',
  },

  venue: {
    name:      'Federal Institute of Science and Technology',
    shortName: 'FISAT',
    city:      'Angamaly',
    state:     'Kerala',
    country:   'India',
    pincode:   '683 577',
    // Replace with an actual embed URL when confirmed
    mapsEmbedUrl: null as string | null,
    mapsUrl: 'https://maps.google.com/?q=Federal+Institute+of+Science+and+Technology+Angamaly+Kerala',
  },

  registration: {
    isOpen:      false,          // flip to true when form goes live
    deadline:    null as Date | null,  // [TBA — set when confirmed]
    fee:         'Free',
    teamSizeMin: 1,
    teamSizeMax: 4,
    eligibility: 'Open to engineering students',
  },

  // [TBA — update when organizers provide]
  contact: {
    email:   null as string | null,
    phone:   null as string | null,
    website: null as string | null,
  },

  // [TBA — update when accounts are created]
  social: {
    instagram: null as string | null,
    linkedin:  null as string | null,
    twitter:   null as string | null,
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Tracks — provisional. Update ids / descriptions when confirmed.
// ─────────────────────────────────────────────────────────────────────────────

export const TRACKS = [
  {
    id:          'ai-ml',
    name:        'AI & Machine Learning',
    description: 'Build intelligent systems, predictive models, and data-driven solutions that learn and adapt.',
    symbol:      '⬡',
  },
  {
    id:          'web3',
    name:        'Web3 & Blockchain',
    description: 'Decentralised apps, smart contracts, digital ownership, and the future of trustless systems.',
    symbol:      '◈',
  },
  {
    id:          'cybersecurity',
    name:        'Cybersecurity',
    description: 'Defend, detect, and disrupt — build tools that protect the digital world from modern threats.',
    symbol:      '◎',
  },
  {
    id:          'iot',
    name:        'Internet of Things',
    description: 'Connect the physical world with smart sensors, embedded systems, and real-time data.',
    symbol:      '◉',
  },
  {
    id:          'sustainability',
    name:        'Sustainability Tech',
    description: 'Technology that addresses climate, clean energy, agriculture, and environmental challenges.',
    symbol:      '◇',
  },
  {
    id:          'open',
    name:        'Open Innovation',
    description: 'No constraints. Any domain, any stack. The best ideas know no boundaries.',
    symbol:      '◆',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'Event Guide', href: '/guide' },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// 24-hour schedule — provisional skeleton
// ─────────────────────────────────────────────────────────────────────────────

export const SCHEDULE = [
  { time: '10:00 AM', label: 'Registration & Check-in',          day: 1 as const },
  { time: '11:00 AM', label: 'Opening Ceremony',                  day: 1 as const },
  { time: '12:00 PM', label: 'Hacking Begins 🚀',                 day: 1 as const },
  { time: '01:00 PM', label: 'Lunch Break',                       day: 1 as const },
  { time: '04:00 PM', label: 'Mentor Check-in Round 1',           day: 1 as const },
  { time: '07:00 PM', label: 'Dinner & Networking',               day: 1 as const },
  { time: '10:00 PM', label: 'Midnight Fuel — Snacks & Recharge', day: 1 as const },
  { time: '12:00 AM', label: 'Mid-event Progress Review',         day: 2 as const },
  { time: '03:00 AM', label: 'Mentor Check-in Round 2',           day: 2 as const },
  { time: '06:00 AM', label: 'Breakfast',                         day: 2 as const },
  { time: '08:00 AM', label: 'Final Hour — Code Freeze Warning',  day: 2 as const },
  { time: '09:00 AM', label: 'Project Submissions Close',         day: 2 as const },
  { time: '09:30 AM', label: 'Judging Begins',                    day: 2 as const },
  { time: '10:00 AM', label: 'Closing Ceremony & Prizes 🏆',      day: 2 as const },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    question: 'Who can participate in SyntaxHeist?',
    answer:
      'SyntaxHeist is open to all engineering students. Teams can have 1 to 4 members. Members from different colleges may form a team together.',
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'Registration is free. All registered participants will be provided meals, refreshments, and a dedicated hacking workspace for the full duration of the event.',
  },
  {
    question: 'Do I need to submit a project idea before the event?',
    answer:
      'No prior submission is required. All hacking begins on-site at the event start. You may arrive with ideas, but all code must be written during the hackathon.',
  },
  {
    question: 'What should I bring?',
    answer:
      'Bring your laptop, charger, any hardware you plan to use, a valid student ID, and your best ideas. Meals, snacks, and internet will be provided.',
  },
  {
    question: 'Will mentors be available during the hackathon?',
    answer:
      'Yes. Industry and academic mentors will be available throughout the event for technical guidance. Dedicated mentor check-in rounds are scheduled at key intervals.',
  },
  {
    question: 'How will projects be evaluated?',
    answer:
      'Projects will be evaluated on innovation, technical depth, real-world impact, and presentation quality. Detailed judging criteria will be published before the event.',
  },
  {
    question: 'Can I start coding before the hackathon?',
    answer:
      'All code must be written during the event. You may brainstorm, sketch, and prepare resources beforehand, but no pre-written code or prior implementations are allowed.',
  },
] as const
