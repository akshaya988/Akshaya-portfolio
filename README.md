# 🚀 Alex Rivera — Developer Portfolio

A modern, professional, fully responsive personal portfolio website built with React + Vite.

**Live Demo:** https://alexrivera.dev

---

## ✨ Features

- **Dark/Light mode** toggle with localStorage persistence
- **Smooth scroll navigation** with active section highlighting
- **Animated skill bars** triggered on scroll
- **Project filtering** by technology tag
- **Contact form** with full validation + EmailJS integration
- **Loading animation** on first visit
- **Scroll-to-top** floating button
- **Fully responsive** — mobile, tablet, desktop
- **SEO optimized** with proper meta tags and semantic HTML
- **Accessible** — ARIA labels, keyboard navigation, roles

---

## 📁 Folder Structure

```
portfolio/
├── public/
│   └── resume.pdf              ← Drop your resume here
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.css
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   └── Projects.css
│   │   ├── Skills/
│   │   │   ├── Skills.jsx
│   │   │   └── Skills.css
│   │   ├── Resume/
│   │   │   ├── Resume.jsx
│   │   │   └── Resume.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   └── UI/
│   │       ├── LoadingScreen.jsx
│   │       ├── LoadingScreen.css
│   │       ├── ScrollToTop.jsx
│   │       └── ScrollToTop.css
│   ├── data/
│   │   └── portfolioData.js    ← Edit your info here
│   ├── hooks/
│   │   └── index.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Setup & Run Locally

### Prerequisites
- **Node.js** v18+ — [Download here](https://nodejs.org)
- **npm** v9+ (comes with Node.js)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build      # Builds to /dist folder
npm run preview    # Preview the production build locally
```

---

## 🎨 Customizing Your Portfolio

All your personal data lives in **one file**:

```
src/data/portfolioData.js
```

Edit these fields:

```js
export const personalInfo = {
  name: "Your Name",
  role: "Your Role",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  resumeUrl: "/resume.pdf",   // place your PDF in /public folder
  // ...
};

export const projects = [
  {
    title: "My Project",
    description: "What it does",
    tags: ["React", "Node.js"],
    github: "https://github.com/...",
    live: "https://...",
    featured: true,
    year: "2024",
  },
  // Add more...
];
```

---

## 📧 Setting Up the Contact Form (EmailJS)

The contact form is ready to wire up to EmailJS (free, no backend needed):

1. **Sign up** at [emailjs.com](https://emailjs.com)
2. Create an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** with variables: `{{name}}`, `{{email}}`, `{{message}}`
4. In `src/components/Contact/Contact.jsx`, replace the simulated send:

```js
// Install: npm install @emailjs/browser
import emailjs from '@emailjs/browser';

// Inside handleSubmit, replace the Promise.resolve() with:
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  {
    from_name: values.name,
    from_email: values.email,
    subject: values.subject,
    message: values.message,
  },
  'YOUR_PUBLIC_KEY'
);
```

---

## 🌐 Deploy to Vercel (Recommended)

### Option A — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts — your site will be live in ~60 seconds
```

### Option B — Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy**

**Build settings** (auto-detected):
- Build Command: `npm run build`
- Output Directory: `dist`

---

## 🌐 Deploy to Netlify

### Option A — Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Option B — Netlify Dashboard

1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → Add new site → Import from Git
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Click **Deploy site**

Add a `netlify.toml` in root for SPA routing:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Pure CSS with CSS Variables |
| Icons | Lucide React |
| Fonts | DM Serif Display + DM Mono + DM Sans |
| Email | EmailJS (optional) |
| Hosting | Vercel / Netlify |

---

## 🔒 Environment Variables

If using a backend for the contact form, create `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Access in code: `import.meta.env.VITE_EMAILJS_SERVICE_ID`

---

## 📄 License

MIT — free to use and modify for your own portfolio.

---

*Designed & developed with ♥ by Alex Rivera*
