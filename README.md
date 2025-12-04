<<<<<<< HEAD
# mango-law-website
Modern criminal defense website for Mango Law LLC (Delaware, Ohio), built on the Sistech Website 2025 reproducible framework. Includes React/Vite frontend, Supabase-powered forms, brand identity tokens, practice-area architecture, and Bolt/Windsurf-ready automation.
=======
# Mango Law Website (Law v1 Template Client Build)

This repository contains the full Mango Law LLC website implementation built on the Sistech Website 2025 framework. Modern criminal defense website for Mango Law LLC (Delaware, Ohio), with React/Vite frontend, Supabase-powered forms, brand identity tokens, practice-area architecture, and Bolt/Windsurf-ready automation.

**Repo settings description:** Official Mango Law LLC website built on Sistech Website 2025 — React/Vite, Supabase forms, full law-firm architecture, and Windsurf/Codex-ready automation.

## Features
- Modern React + Vite frontend
- Sistech Law v1 component library (PageHero, PracticeAreaCards, CTA sections, Testimonials, etc.)
- Supabase Edge Function integrations (`submit-contact`, environment-guarded secrets)
- Tailwind design tokens for the Mango Law brand
- Bolt.new / Windsurf agent compatibility (scaffolding, build, deploy)
- SEO-optimized practice-area and location pages for Delaware, OH
- Staging → production deploy pipeline with clean parity checks

## Brand Tokens Included
- brand.black: #000000
- brand.mango: #F4A300
- brand.gold:  #C78A00
- brand.offWhite: #F9F7F4
- brand.teal: #0F6E63 (secondary accent)

## Recommend Repo Topics (for GH SEO & Agent Discovery)
sistech  
law-firm-website  
react  
vite  
supabase  
website-template  
criminal-defense  
ohiolaw  
windsurf  
boltnew  
codex-agent  
automation-ready  

## Folder Structure Starter Template
```
mango-law-website/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── data/
  │   ├── assets/
  │   ├── styles/
  │   └── lib/
  ├── public/
  ├── supabase/
  │   └── functions/
  ├── .github/
  │   └── workflows/
  ├── package.json
  ├── vite.config.js
  ├── tailwind.config.js
  ├── README.md
  └── .env.example
```

## Recommended Initial Commit Message
```
feat: initialize Mango Law website repo with Sistech Website 2025 base structure, brand tokens, and law-template scaffolding
```

## Deployment Workflow
1. Windsurf / Codex scaffolds new components or pages.
2. Code merged into `staging` triggers Vite build + Supabase validation.
3. Bolt.new deploys staging for parity review.
4. PR from `staging` → `main` triggers full build + production deploy.
5. DNS routes mango.law → Bolt production environment.

### Secrets required
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- RESEND_API_KEY
- CONTACT_NOTIFY_TO
- FROM_EMAIL
>>>>>>> 9928ed5 (feat: initialize Mango Law website repo with Sistech Website 2025 base structure, brand tokens, and law-template scaffolding)
