// ─────────────────────────────────────────────────────────────────────────────
// SyntaxHeist — shared event configuration
// Update this file when organizers confirm details.
// All placeholders are clearly marked with comments.
// ─────────────────────────────────────────────────────────────────────────────

import type { Track, ScheduleItem, FAQ, HighlightItem, PrizeItem, NavLink } from './types'

export const EVENT = {
  name: 'SyntaxHeist',
  fullName: 'SyntaxHeist 2027',
  tagline: 'BREAK THE CODE. BUILD THE FUTURE.',
  edition: '24-Hour Hackathon',
  organizer: 'IEEE FISAT Student Branch',

  date: {
    // 20 March 2027, 10:00 AM IST → 21 March 2027, 10:00 AM IST
    targetIso:    '2027-03-20T10:00:00+05:30',
    displayStart: '20 March 2027',
    displayEnd:   '21 March 2027',
    displayTime:  '10:00 AM IST',
    duration:     '24 Hours',
  },

  venue: {
    name:         'Federal Institute of Science and Technology',
    shortName:    'FISAT',
    city:         'Angamaly',
    district:     'Ernakulam',
    state:        'Kerala',
    country:      'India',
    pincode:      '683 577',
    addressLine:  'Hormis Nagar, Mookkannoor, Angamaly, Kerala 683577',
    mapsEmbedUrl: null as string | null,
    mapsUrl:      'https://maps.google.com/?q=Federal+Institute+of+Science+and+Technology+Angamaly+Kerala',
  },

  registration: {
    isOpen:      false,               // flip to true when form goes live
    deadline:    null as string | null, // [TBA — set when confirmed]
    fee:         'Free',
    teamSizeMin: 1,
    teamSizeMax: 4,
    eligibility: 'Open to engineering students across recognized colleges',
  },

  // [TBA — update when organizers provide official details]
  contact: {
    email:       null as string | null, // e.g. 'contact@syntaxheist.in'
    phone:       null as string | null,
    helpdesk:    'Helpdesk contact details will be announced prior to registration opening.',
    ieeeBranch:  'IEEE Student Branch FISAT (STB 64341)',
  },

  // [TBA — update when official accounts are announced]
  social: {
    instagram: null as string | null,
    linkedin:  null as string | null,
    twitter:   null as string | null,
    github:    null as string | null,
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Links (In-page anchor navigation + Event Guide)
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'About',       href: '/#about' },
  { label: 'Tracks',      href: '/#tracks' },
  { label: 'Highlights',  href: '/#highlights' },
  { label: 'Schedule',    href: '/#schedule' },
  { label: 'Prizes',      href: '/#prizes' },
  { label: 'Venue',       href: '/#venue' },
  { label: 'FAQ',         href: '/#faq' },
  { label: 'Contact',     href: '/#contact' },
  { label: 'Event Guide', href: '/guide' },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Highlights
// ─────────────────────────────────────────────────────────────────────────────

export const HIGHLIGHTS: readonly HighlightItem[] = [
  {
    number: '24',
    label: 'Hours Non-Stop',
    description: 'An intensive day-and-night hackathon pushing software engineering and rapid prototyping to its limits.',
  },
  {
    number: '06',
    label: 'Innovation Tracks',
    description: 'From Artificial Intelligence to Web3 and Cybersecurity, tackle challenges in modern cutting-edge tech.',
  },
  {
    number: '04',
    label: 'Max Team Size',
    description: 'Compete solo or build an agile squad of up to 4 innovators with cross-college collaboration allowed.',
  },
  {
    number: 'TBA',
    label: 'Prize Pool & Swag',
    description: 'Competitive cash prizes, partner tracks, badges and certificates for all qualifying participants.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Tracks — provisional 6 tracks
// ─────────────────────────────────────────────────────────────────────────────

export const TRACKS: readonly Track[] = [
  {
    id:          'ai-ml',
    name:        'AI & Machine Learning',
    description: 'Design intelligent architectures, generative AI models, computer vision agents, and predictive engines solving high-impact problems.',
    symbol:      '⬡',
    tags:        ['LLMs', 'Computer Vision', 'Predictive ML', 'Autonomous Agents'],
  },
  {
    id:          'web3',
    name:        'Web3 & Blockchain',
    description: 'Develop decentralized protocols, verifiable smart contracts, token economies, and zero-knowledge privacy infrastructure.',
    symbol:      '◈',
    tags:        ['DeFi', 'Smart Contracts', 'ZK Proofs', 'dApps'],
  },
  {
    id:          'cybersecurity',
    name:        'Cybersecurity',
    description: 'Defend, detect, and audit — engineer intrusion detection, cryptographic security, threat modeling, and defensive cyber tools.',
    symbol:      '◎',
    tags:        ['AppSec', 'Threat Intelligence', 'Cryptography', 'Audit Tools'],
  },
  {
    id:          'iot',
    name:        'Internet of Things',
    description: 'Bridge hardware and software with real-time telemetry, embedded edge computing, sensor meshes, and automation systems.',
    symbol:      '◉',
    tags:        ['Edge AI', 'Microcontrollers', 'Sensor Networks', 'Automation'],
  },
  {
    id:          'sustainability',
    name:        'Sustainability Tech',
    description: 'Create technologies accelerating energy efficiency, carbon footprint tracking, smart agriculture, and green circular solutions.',
    symbol:      '◇',
    tags:        ['CleanTech', 'AgriTech', 'Energy Analytics', 'Smart Grids'],
  },
  {
    id:          'open',
    name:        'Open Innovation',
    description: 'Unconstrained problem solving. Mix stacks, cross verticals, and execute the boldest ideas that defy traditional boundaries.',
    symbol:      '◆',
    tags:        ['Full-Stack', 'Creative Tech', 'DevTools', 'Social Impact'],
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// 24-hour schedule — provisional timeline
// ─────────────────────────────────────────────────────────────────────────────

export const SCHEDULE: readonly ScheduleItem[] = [
  {
    time: '10:00 AM',
    label: 'Registration & Check-in',
    description: 'Participant check-in, team badge allocation, and workspace setup.',
    day: 1,
    type: 'keynote',
  },
  {
    time: '11:00 AM',
    label: 'Opening Ceremony',
    description: 'Welcome address by IEEE FISAT, keynote speaker, and track briefing.',
    day: 1,
    type: 'keynote',
  },
  {
    time: '12:00 PM',
    label: 'Hacking Begins 🚀',
    description: '24-hour hacking clock officially starts. Repositories initialized.',
    day: 1,
    type: 'hack',
  },
  {
    time: '01:30 PM',
    label: 'Lunch Break & Networking',
    description: 'Buffet lunch provided for all registered participants.',
    day: 1,
    type: 'food',
  },
  {
    time: '04:30 PM',
    label: 'Mentor Check-in Round 1',
    description: 'Technical guidance, architecture validation, and feasibility reviews.',
    day: 1,
    type: 'review',
  },
  {
    time: '08:00 PM',
    label: 'Dinner & Recharge',
    description: 'Dinner served at the venue dining hall.',
    day: 1,
    type: 'food',
  },
  {
    time: '11:30 PM',
    label: 'Midnight Fuel & Mini Activities',
    description: 'Midnight snacks, coffee, and developer power-up chill session.',
    day: 1,
    type: 'food',
  },
  {
    time: '02:00 AM',
    label: 'Mid-Event Code Check',
    description: 'Progress checkpoint and mentor availability for late-night debugging.',
    day: 2,
    type: 'review',
  },
  {
    time: '05:00 AM',
    label: 'Sprint Phase',
    description: 'Final feature integration and UI polishing ahead of code freeze.',
    day: 2,
    type: 'hack',
  },
  {
    time: '07:30 AM',
    label: 'Breakfast',
    description: 'Morning refreshments and breakfast at the venue.',
    day: 2,
    type: 'food',
  },
  {
    time: '09:00 AM',
    label: 'Submissions Close & Code Freeze',
    description: 'Final commit deadline. Pull requests and video/deck submissions lock.',
    day: 2,
    type: 'deadline',
  },
  {
    time: '09:30 AM',
    label: 'Live Judging & Pitching',
    description: 'Teams present 3-minute demos to the jury panel followed by Q&A.',
    day: 2,
    type: 'review',
  },
  {
    time: '11:30 AM',
    label: 'Closing Ceremony & Awards 🏆',
    description: 'Announcement of winners, track awards, and closing remarks.',
    day: 2,
    type: 'keynote',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Prizes — All clearly marked as TBA placeholders
// ─────────────────────────────────────────────────────────────────────────────

export const PRIZES: readonly PrizeItem[] = [
  {
    rank: '01',
    title: 'Grand Champion',
    status: 'Prize TBA',
    description: 'Awarded to the overall most innovative, technically superior, and complete prototype developed during the 24 hours.',
    perks: ['Cash Prize Pool (TBA)', 'Winner Trophy & Gold Medallions', 'Winner Certificates', 'Featured Spotlight'],
  },
  {
    rank: '02',
    title: 'First Runner-Up',
    status: 'Prize TBA',
    description: 'Recognizing outstanding execution, technical complexity, and impactful real-world utility.',
    perks: ['Cash Prize (TBA)', 'Silver Medallions', 'Runner-up Certificates', 'Partner Swag'],
  },
  {
    rank: '03',
    title: 'Second Runner-Up',
    status: 'Prize TBA',
    description: 'Awarded to the team demonstrating exceptional problem-solving and rapid delivery.',
    perks: ['Cash Prize (TBA)', 'Bronze Medallions', 'Achievement Certificates', 'Partner Swag'],
  },
  {
    rank: '★',
    title: 'Track Excellence Awards',
    status: 'Prizes TBA',
    description: 'Special category honors for standout projects across individual technology tracks.',
    perks: ['Special Category Honors', 'Certificate of Merit', 'Sponsor & Track Mentions'],
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────────────────────

export const FAQS: readonly FAQ[] = [
  {
    question: 'Who can participate in SyntaxHeist?',
    answer:
      'SyntaxHeist is open to all engineering and technology students currently enrolled in recognized colleges or universities. Teams may consist of 1 to 4 members, and cross-college teams are fully permitted.',
  },
  {
    question: 'Is there any registration fee?',
    answer:
      'No. Registration for SyntaxHeist is completely free. Selected teams will be provided workspace access, internet, meals, snacks, and mentoring throughout the 24-hour period.',
  },
  {
    question: 'Can we start building our project before the event?',
    answer:
      'No. In the spirit of a fair hackathon, all project development, coding, and design must be initiated after the official hackathon start signal at 12:00 PM on 20 March 2027. You may explore ideas and familiarize yourself with APIs beforehand.',
  },
  {
    question: 'What should we bring with us to FISAT?',
    answer:
      'Bring your college ID card, personal laptop, chargers, extension cords if desired, and any specialized hardware/sensors your team plans to use. High-speed Wi-Fi, power outlets, meals, and designated rest spaces will be provided.',
  },
  {
    question: 'Will mentorship be available during the hackathon?',
    answer:
      'Yes. Mentors from academia and industry will conduct designated check-in rounds to help refine ideas, unblock technical hurdles, and provide constructive architectural feedback.',
  },
  {
    question: 'How will the projects be evaluated?',
    answer:
      'A panel of judges will score projects based on innovation & originality, technical complexity, functional completion, practical feasibility, and presentation clarity during the final demo pitch.',
  },
  {
    question: 'When will registration open?',
    answer:
      'Official registration will open soon. Keep an eye on this website and IEEE FISAT Student Branch announcements for the registration link and selection timeline.',
  },
] as const
