# Abdullah Khatri — Portfolio

A premium, dark-themed personal portfolio for a Full Stack Developer. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and GSAP.

**Live:** https://abdullahkhatri.vercel.app

---

## Highlights

- **12 full sections** — Hero, About, Skills, Projects, Experience, Certifications, Achievements, Testimonials, Services, Tech Stack, GitHub Stats, Contact
- **Motion everywhere** — Lenis smooth scroll, custom cursor, loading screen, scroll progress, magnetic buttons, ripple effects, tilt cards, spotlight glow, text reveals, animated counters, infinite marquee, canvas particle field
- **Working contact form** — React Hook Form + Zod validation, Resend delivery, honeypot and IP rate limiting
- **Complete SEO** — dynamic OG image, JSON-LD structured data, sitemap, robots, PWA manifest, generated favicons
- **Accessible** — semantic landmarks, ARIA labels, keyboard navigation, skip link, visible focus rings, full `prefers-reduced-motion` support
- **Production ready** — zero TypeScript errors, zero ESLint errors, code-split below-the-fold sections

---

## Tech Stack

| Layer      | Technologies                                              |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Server Components), React 19       |
| Language   | TypeScript (strict)                                        |
| Styling    | Tailwind CSS v4, CSS custom properties                     |
| Animation  | Motion (Framer Motion), GSAP + ScrollTrigger, Lenis        |
| Forms      | React Hook Form, Zod, `@hookform/resolvers`                |
| Email      | Resend                                                     |
| Icons      | Lucide React, React Icons                                  |
| Toasts     | Sonner                                                     |
| Deployment | Vercel                                                     |

---

## Getting Started

```bash
git clone <repository-url>
cd portfolio
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Start the development server                   |
| `npm run build`      | Create a production build                      |
| `npm run start`      | Serve the production build                     |
| `npm run lint`       | Run ESLint                                     |
| `npm run typecheck`  | Run the TypeScript compiler with no emit       |
| `npm run format`     | Format with Prettier                           |
| `npm run icons`      | Regenerate `favicon.ico` and `apple-icon.png`  |
| `npm run verify`     | typecheck → lint → build                       |

---

## Configuration

All personal details are driven by environment variables with sensible fallbacks, so nothing needs to be hard-coded. See `.env.example` for the full list.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
NEXT_PUBLIC_CONTACT_PHONE=+91 00000 00000
NEXT_PUBLIC_CONTACT_PHONE_HREF=+910000000000
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_LINKEDIN_USERNAME=yourusername
NEXT_PUBLIC_RESUME_URL=/resume/your-resume.pdf

# Optional — the form validates and logs enquiries without these
RESEND_API_KEY=re_xxxxxxxx
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
CONTACT_TO_EMAIL=you@example.com
```

### Adding your content

| What            | Where                                                    |
| --------------- | -------------------------------------------------------- |
| Name, role, bio | `src/constants/site.ts`, `src/data/about.ts`             |
| Skills          | `src/data/skills.ts`                                     |
| Projects        | `src/data/projects.ts`                                   |
| Experience      | `src/data/experience.ts`                                 |
| Certifications  | `src/data/certifications.ts`                             |
| Achievements    | `src/data/achievements.ts`                               |
| Testimonials    | `src/data/testimonials.ts`                               |
| Services        | `src/data/services.ts`                                   |
| Contact / FAQ   | `src/data/contact.ts`                                    |
| Resume PDF      | drop into `public/resume/`                               |
| Profile photo   | replace `public/profile.svg` (or point to a `.jpg/.png`) |
| Colours         | the `@theme` block in `src/app/globals.css`              |

---

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts     # Contact endpoint (validation, rate limit, Resend)
│   ├── globals.css              # Design tokens, keyframes, custom utilities
│   ├── layout.tsx               # Root layout, fonts, JSON-LD, skip link
│   ├── page.tsx                 # Section composition with code splitting
│   ├── opengraph-image.tsx      # Dynamic OG/Twitter card
│   ├── manifest.ts              # PWA manifest
│   ├── robots.ts                # robots.txt
│   └── sitemap.ts               # sitemap.xml
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── providers/               # Lenis, cursor, loader, scroll progress, toasts
│   ├── sections/                # One folder/file per page section
│   └── ui/                      # Reusable primitives
├── constants/                   # Site config, navigation
├── data/                        # All editable content
├── hooks/                       # Custom React hooks
├── lib/                         # Fonts, metadata, email, validation, rate limit
├── types/                       # Shared TypeScript types
└── utils/                       # Formatting and motion helpers
```

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is detected automatically.
3. Add the environment variables from `.env.example` in **Settings → Environment Variables**.
4. Deploy.

Set `NEXT_PUBLIC_SITE_URL` to the final production domain so canonical URLs, the sitemap and OG tags resolve correctly.

---

## Accessibility & Performance

- Semantic HTML with correct landmark and heading order
- Keyboard navigable throughout, with a skip-to-content link and visible focus rings
- Every animation is disabled under `prefers-reduced-motion`
- Below-the-fold sections are lazily loaded via `next/dynamic`
- Canvas particle animation pauses when scrolled out of view
- AVIF/WebP image optimisation and long-lived immutable caching for static assets

---

## License

MIT © Abdullah Khatri
