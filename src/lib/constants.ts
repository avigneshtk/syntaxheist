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
    // [TBA — registration fee will be announced by organizers]
    fee:         'TBA' as string,
    feeNote:     'Registration fee and participation details will be announced by the organizers.',
    // [TBA — team size to be announced]
    teamSize:    'To be announced',
    teamSizeNotice: 'Team size: To be announced.',
    // [TBA — eligibility rules to be confirmed by organizers]
    eligibility: 'Eligibility and team formation guidelines will be announced in the official event rules.',
  },

  // [TBA — update when organizers provide official details]
  contact: {
    email:       null as string | null, // e.g. 'contact@syntaxheist.in'
    phone:       null as string | null,
    helpdesk:    'Helpdesk contact details will be announced prior to registration opening.',
    ieeeBranch:  'IEEE FISAT Student Branch',
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
    // [PROVISIONAL — team size pending organizer confirmation]
    number: 'TBA',
    label: 'Team Size',
    description: 'Team size: To be announced. Official guidelines will be published in the event rules.',
  },
  {
    number: 'TBA',
    label: 'Prize Pool',
    description: 'Prize pool, cash awards, and sponsor tracks are being finalized and will be published once officially confirmed.',
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
    label: 'Event Launch & Hacking Begins 🚀',
    // [CONFIRMED — 24-hour event starts at 10:00 AM]
    description: 'Official event launch. The 24-hour hacking window starts and repositories are initialized.',
    day: 1,
    type: 'hack',
  },
  {
    time: '01:30 PM',
    label: 'Lunch Break',
    // [PROVISIONAL — meal arrangements subject to organizer confirmation]
    description: 'Midday break. Meal arrangements: To be announced.',
    day: 1,
    type: 'food',
  },
  {
    time: '04:30 PM',
    label: 'Progress Checkpoint',
    // [TBA — mentorship arrangements to be announced]
    description: 'Milestone checkpoint. Mentorship arrangements: To be announced.',
    day: 1,
    type: 'review',
  },
  {
    time: '08:00 PM',
    label: 'Dinner Break',
    // [PROVISIONAL — meal arrangements subject to organizer confirmation]
    description: 'Evening break. Refreshment arrangements: To be announced.',
    day: 1,
    type: 'food',
  },
  {
    time: '11:30 PM',
    label: 'Midnight Break',
    // [PROVISIONAL — mid-event arrangements subject to organizer confirmation]
    description: 'Mid-event break. Activity and refreshment arrangements: To be announced.',
    day: 1,
    type: 'food',
  },
  {
    time: '02:00 AM',
    label: 'Mid-Event Code Check',
    description: 'Late-night milestone review. Mentorship arrangements: To be announced.',
    day: 2,
    type: 'review',
  },
  {
    time: '05:00 AM',
    label: 'Sprint Phase',
    description: 'Final development sprint and feature integration ahead of code freeze.',
    day: 2,
    type: 'hack',
  },
  {
    time: '07:30 AM',
    label: 'Morning Break',
    // [PROVISIONAL — meal arrangements subject to organizer confirmation]
    description: 'Morning break. Refreshment arrangements: To be announced.',
    day: 2,
    type: 'food',
  },
  {
    time: '09:00 AM',
    label: 'Submissions Close & Code Freeze',
    description: 'Final commit deadline. Project submissions format: To be announced.',
    day: 2,
    type: 'deadline',
  },
  {
    time: '09:30 AM',
    label: 'Project Evaluations',
    // [PROVISIONAL — demo format and judging details subject to organizer confirmation]
    description: 'Project review and evaluations. Judging format and demo details: To be announced.',
    day: 2,
    type: 'review',
  },
  {
    // [CONFIRMED — 24-hour event concludes at 10:00 AM]
    time: '10:00 AM',
    label: 'Closing & Event Conclusion 🏆',
    description: 'Announcement of results and official event conclusion at 24 hours.',
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
    perks: [
      'Prize details: To be announced.',
      'Awards and recognition: To be announced.',
      'Participant benefits: Subject to organizer confirmation.',
    ],
  },
  {
    rank: '02',
    title: 'First Runner-Up',
    status: 'Prize TBA',
    description: 'Recognizing outstanding execution, technical complexity, and impactful real-world utility.',
    perks: [
      'Prize details: To be announced.',
      'Awards and recognition: To be announced.',
      'Participant benefits: Subject to organizer confirmation.',
    ],
  },
  {
    rank: '03',
    title: 'Second Runner-Up',
    status: 'Prize TBA',
    description: 'Awarded to the team demonstrating exceptional problem-solving and rapid delivery.',
    perks: [
      'Prize details: To be announced.',
      'Awards and recognition: To be announced.',
      'Participant benefits: Subject to organizer confirmation.',
    ],
  },
  {
    rank: '★',
    title: 'Track Excellence Awards',
    status: 'Prizes TBA',
    description: 'Special category honors for standout projects across individual technology tracks.',
    perks: [
      'Prize details: To be announced.',
      'Awards and recognition: To be announced.',
      'Participant benefits: Subject to organizer confirmation.',
    ],
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────────────────────

export const FAQS: readonly FAQ[] = [
  {
    question: 'Who can participate in SyntaxHeist?',
    answer:
      'SyntaxHeist is planned for engineering and technology students. Team size: To be announced. Official eligibility criteria and team formation guidelines will be confirmed in the published event rules by IEEE FISAT Student Branch.',
  },
  {
    question: 'Is there any registration fee?',
    answer:
      'Registration fee and participation details are To Be Announced (TBA). Official fee structures and participant provisions will be confirmed by the organizers prior to registration opening.',
  },
  {
    question: 'Can we start building our project before the event?',
    answer:
      'The 24-hour hackathon begins at 10:00 AM IST on 20 March 2027. Official guidelines regarding pre-event preparation and project development will be announced by the organizing committee.',
  },
  {
    question: 'What should we bring with us to FISAT?',
    answer:
      'Participants are generally expected to bring their college ID, personal laptops, and chargers. Venue facilities, permitted equipment, and participant arrangements will be confirmed by the organizing committee.',
  },
  {
    question: 'Will mentorship be available during the hackathon?',
    answer:
      'Mentorship arrangements: To be announced. Confirmed details regarding mentor availability and guidance will be communicated by the organizing committee prior to the event.',
  },
  {
    question: 'How will the projects be evaluated?',
    answer:
      'Evaluation criteria, judging format, and demo details will be officially confirmed by the organizing committee prior to the event.',
  },
  {
    question: 'When will registration open?',
    answer:
      'Official registration timeline will be announced soon. Keep an eye on this website and IEEE FISAT Student Branch announcements for the registration link and selection timeline.',
  },
] as const
