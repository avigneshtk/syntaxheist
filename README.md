# ⚡ SyntaxHeist — 24-Hour Hackathon

**A modern, technology-focused event website for SyntaxHeist, a hypothetical 24-hour hackathon organized by IEEE FISAT Student Branch.**

<p align="center">
  <a href="https://syntaxheist.vercel.app/"><strong>🌐 Visit Live Website</strong></a>
</p>

---

## 📌 About the Project

SyntaxHeist is a responsive hackathon website designed to introduce the event, communicate essential information to participants, and provide a registration interface.

Built with a modern black-and-green visual identity, the website focuses on clear navigation, engaging presentation, and a consistent user experience across desktop, tablet, and mobile devices.

**Event:** SyntaxHeist — 24-Hour Hackathon

**Organizer:** IEEE FISAT Student Branch

**Date:** 20 March 2027, 10:00 AM – 21 March 2027, 10:00 AM

**Duration:** 24 Hours

**Venue:** Federal Institute of Science and Technology (FISAT), Angamaly, Kerala

**Theme:** Open Technology / Innovation Hackathon

*Note: The event details above are sample information provided for the website development assignment and are subject to organizer confirmation.*

## ✨ Features

- Modern black-and-green technology-inspired design.
- Responsive layouts for desktop, tablet, and mobile.
- Dedicated pages for event information and registration.
- Event overview, tracks, prizes, and highlights.
- 24-hour event schedule and timeline.
- Venue information and FAQs.
- Registration form with Zod-based validation.
- Team-size checks and duplicate-email detection.
- Honeypot field for basic bot-submission protection.
- Clear registration submission feedback.
- Reusable UI components and consistent styling.
- Public deployment through Vercel.

## 📄 Website Pages

| Route | Description |
|---|---|
| `/` | Home page with event introduction, highlights, tracks, prizes, schedule, venue, and FAQs. |
| `/guide` | Event guide and additional participant information. |
| `/register` | Registration interface for participant details. |

## 🛠️ Technology Stack

| Technology | Version / Purpose |
|---|---|
| Next.js | 16.4.6 |
| React | 19.3.0 |
| TypeScript | Type safety |
| Tailwind CSS | 4.3.3 |
| Supabase JS | 2.119.2 — database integration |
| Zod | 4.6.7 — schema validation |
| Lucide React | 1.76.0 — interface icons |
| Vercel | Hosting and deployment |

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/avigneshtk/syntaxheist.git
```

### 2. Navigate to the project directory

```bash
cd syntaxheist
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_key
```

Replace the placeholder values with your own Supabase project credentials.

**Security:** Keep your Supabase secret key private. Never commit `.env.local` or expose the secret key in client-side code.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Runs ESLint checks. |

## 🗄️ Registration Integration

The project includes Supabase integration for registration data and Zod-based validation for participant information.

The registration workflow is currently configured in **preview mode**. Actual database insertion is intentionally disabled until the event information and registration rules are confirmed.

The registration interface includes input validation and submission feedback.

## 🌍 Deployment

The website is deployed using Vercel.

**Live Website:**

https://syntaxheist.vercel.app/

**Source Code:**

https://github.com/avigneshtk/syntaxheist

## 🎯 Project Objective

The objective of this project is to develop a complete, accessible, responsive, and user-friendly event website that communicates the identity of SyntaxHeist and makes event information easy to explore.

## 👨‍💻 Developer

**Developed by Avignesh T K**

GitHub: [@avigneshtk](https://github.com/avigneshtk)

---

<p align="center">
  <strong>SYNTAXHEIST</strong><br/>
  <em>Hack. Build. Innovate.</em>
</p>
