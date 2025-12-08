import { analyzeCodebase, generateFileTreeMarkdown } from './codebaseAnalyzer';
import { detectGaps, formatGapsAsMarkdown } from './gapDetector';
import { scanDocumentation, formatDocumentationSummary } from './documentationScanner';

export interface GenerationOptions {
  includeTechnicalArchitecture: boolean;
  includeCMSGuide: boolean;
  includeDatabaseDocs: boolean;
  includeAPIReference: boolean;
  includeDeploymentGuide: boolean;
  includeCustomFeatures: boolean;
  includeScreenshots: boolean;
  includeAnalytics: boolean;
  customNotes?: string;
}

export interface HandoffDocument {
  title: string;
  version: string;
  generatedAt: Date;
  content: string;
  wordCount: number;
  sections: string[];
}

export async function generateHandoffDocument(
  title: string,
  version: string,
  options: GenerationOptions
): Promise<HandoffDocument> {
  const generatedAt = new Date();
  const sections: string[] = [];
  let content = '';

  // Header
  content += `# ${title}\n\n`;
  content += `**Version:** ${version}  \n`;
  content += `**Generated:** ${generatedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}  \n`;
  content += `**Website:** [mangolaw.com](https://mangolaw.com)\n\n`;
  content += `---\n\n`;

  // Table of Contents
  content += `## Table of Contents\n\n`;
  const tocItems: string[] = [];

  if (options.includeTechnicalArchitecture) tocItems.push('1. [Executive Summary](#executive-summary)');
  if (options.includeTechnicalArchitecture) tocItems.push('2. [Quick Start Guide](#quick-start-guide)');
  if (options.includeTechnicalArchitecture) tocItems.push('3. [Technology Stack](#technology-stack)');
  if (options.includeTechnicalArchitecture) tocItems.push('4. [Website Architecture](#website-architecture)');
  if (options.includeCMSGuide) tocItems.push('5. [Content Management System](#content-management-system)');
  if (options.includeDatabaseDocs) tocItems.push('6. [Database Schema](#database-schema)');
  if (options.includeAPIReference) tocItems.push('7. [API & Edge Functions](#api-edge-functions)');
  if (options.includeDeploymentGuide) tocItems.push('8. [Deployment & Hosting](#deployment-hosting)');
  if (options.includeCustomFeatures) tocItems.push('9. [Custom Features](#custom-features)');
  tocItems.push('10. [Maintenance & Support](#maintenance-support)');
  tocItems.push('11. [Documentation Gaps](#documentation-gaps)');
  if (options.customNotes) tocItems.push('12. [Additional Notes](#additional-notes)');

  content += tocItems.join('\n') + '\n\n';
  content += `---\n\n`;

  // Executive Summary
  sections.push('Executive Summary');
  content += `## Executive Summary\n\n`;
  content += `This document provides comprehensive technical documentation for the Mango Law LLC website. `;
  content += `It serves as a complete handoff guide for developers, administrators, and stakeholders.\n\n`;
  content += `**Purpose:** Enable seamless transition of website ownership and maintenance.\n\n`;
  content += `**Audience:** Developers, system administrators, content managers, and business stakeholders.\n\n`;
  content += `**Scope:** Complete website architecture, features, and operational procedures.\n\n`;

  // Analyze codebase
  const codebaseStats = await analyzeCodebase();
  const docsSummary = await scanDocumentation();
  const gapAnalysis = await detectGaps();

  // Quick Start Guide
  if (options.includeTechnicalArchitecture) {
    sections.push('Quick Start Guide');
    content += `## Quick Start Guide\n\n`;
    content += `### For Developers\n\n`;
    content += `1. **Clone the repository**\n`;
    content += `   \`\`\`bash\n   git clone [repository-url]\n   cd mango-law-website\n   \`\`\`\n\n`;
    content += `2. **Install dependencies**\n`;
    content += `   \`\`\`bash\n   npm install\n   \`\`\`\n\n`;
    content += `3. **Set up environment variables**\n`;
    content += `   - Copy \`.env.example\` to \`.env\`\n`;
    content += `   - Fill in required values:\n`;
    for (const envVar of codebaseStats.environmentVariables) {
      content += `     - \`${envVar}\`\n`;
    }
    content += `\n`;
    content += `4. **Run development server**\n`;
    content += `   \`\`\`bash\n   npm run dev\n   \`\`\`\n`;
    content += `   Open [http://localhost:5173](http://localhost:5173)\n\n`;
    content += `5. **Build for production**\n`;
    content += `   \`\`\`bash\n   npm run build\n   \`\`\`\n\n`;
  }

  // Technology Stack
  if (options.includeTechnicalArchitecture) {
    sections.push('Technology Stack');
    content += `## Technology Stack\n\n`;
    content += `### Core Technologies\n\n`;
    for (const tech of codebaseStats.technologies) {
      content += `- **${tech}**\n`;
    }
    content += `\n`;

    content += `### Key Dependencies\n\n`;
    content += `| Package | Version | Purpose |\n`;
    content += `|---------|---------|----------|\n`;
    const keyDeps = [
      { name: 'react', purpose: 'UI framework' },
      { name: 'react-router-dom', purpose: 'Client-side routing' },
      { name: '@supabase/supabase-js', purpose: 'Backend & database' },
      { name: 'tailwindcss', purpose: 'Styling framework' },
      { name: 'lucide-react', purpose: 'Icon library' },
      { name: 'mapbox-gl', purpose: 'Interactive maps' },
    ];
    for (const dep of keyDeps) {
      const version = codebaseStats.dependencies[dep.name] || 'N/A';
      content += `| ${dep.name} | ${version} | ${dep.purpose} |\n`;
    }
    content += `\n`;
  }

  // Website Architecture
  if (options.includeTechnicalArchitecture) {
    sections.push('Website Architecture');
    content += `## Website Architecture\n\n`;
    content += `### Project Statistics\n\n`;
    content += `- **Total Files:** ${codebaseStats.totalFiles}\n`;
    content += `- **React Components:** ${codebaseStats.components}\n`;
    content += `- **Pages:** ${codebaseStats.pages}\n`;
    content += `- **Utility Functions:** ${codebaseStats.utilities}\n\n`;

    content += `### Application Routes\n\n`;
    content += `| Route | Description |\n`;
    content += `|-------|-------------|\n`;
    const routeDescriptions: Record<string, string> = {
      '/': 'Homepage with hero and service overview',
      '/about': 'About the firm and attorneys',
      '/contact': 'Contact form and office information',
      '/blog': 'Blog post listing page',
      '/blog/:slug': 'Individual blog post page',
      '/practice-areas': 'Practice areas overview',
      '/practice-areas/criminal-defense': 'Criminal defense practice page',
      '/practice-areas/ovi-dui': 'OVI/DUI defense page',
      '/practice-areas/drug-crimes': 'Drug crimes defense page',
      '/practice-areas/sex-crimes': 'Sex crimes defense page',
      '/practice-areas/white-collar': 'White collar defense page',
      '/practice-areas/protection-orders': 'Protection orders page',
      '/practice-areas/personal-injury': 'Personal injury page',
      '/service-areas': 'Geographic service areas',
      '/dui-checkpoints': 'Interactive DUI checkpoint map',
      '/glossary': 'Legal terminology glossary',
      '/reviews': 'Client testimonials',
      '/admin': 'Admin dashboard',
      '/admin/login': 'Admin authentication',
    };
    for (const route of codebaseStats.routes) {
      const desc = routeDescriptions[route] || 'Page';
      content += `| \`${route}\` | ${desc} |\n`;
    }
    content += `\n`;

    content += generateFileTreeMarkdown();
  }

  // CMS Guide
  if (options.includeCMSGuide) {
    sections.push('Content Management System');
    content += `## Content Management System\n\n`;
    content += `The admin dashboard provides a user-friendly interface for managing website content.\n\n`;
    content += `### Accessing the Admin Panel\n\n`;
    content += `1. Navigate to \`/admin/login\`\n`;
    content += `2. Log in with your credentials\n`;
    content += `3. Access various management sections via the tabbed interface\n\n`;

    content += `### Available Management Tools\n\n`;
    content += `#### Blog Management\n`;
    content += `- Create, edit, and publish blog posts\n`;
    content += `- Manage categories and tags\n`;
    content += `- Draft mode for unpublished content\n`;
    content += `- Markdown support for rich content\n\n`;

    content += `#### Contact Lead Management\n`;
    content += `- View all incoming contact form submissions\n`;
    content += `- Track lead status (New, Contacted, Qualified, Closed)\n`;
    content += `- Add internal notes\n`;
    content += `- Filter and sort leads\n\n`;

    content += `#### DUI Checkpoint Management\n`;
    content += `- Add and update checkpoint locations\n`;
    content += `- Set dates and times\n`;
    content += `- Mark checkpoints as verified\n`;
    content += `- Automatic status updates (upcoming, active, completed)\n\n`;
  }

  // Database Schema
  if (options.includeDatabaseDocs) {
    sections.push('Database Schema');
    content += `## Database Schema\n\n`;
    content += `The website uses Supabase (PostgreSQL) for data persistence.\n\n`;
    content += `### Database Tables\n\n`;
    for (const table of codebaseStats.databaseTables) {
      content += `- \`${table}\`\n`;
    }
    content += `\n`;

    content += `### Key Tables Description\n\n`;
    content += `#### dui_checkpoints\n`;
    content += `Stores DUI/OVI checkpoint information with location data, dates, and verification status.\n\n`;

    content += `#### blog_posts\n`;
    content += `Contains all blog content including drafts and published posts with metadata.\n\n`;

    content += `#### contact_submissions\n`;
    content += `Tracks all contact form submissions with lead management fields.\n\n`;

    content += `#### handoff_documents\n`;
    content += `Stores generated handoff documentation with versioning support.\n\n`;

    content += `### Security (Row Level Security)\n\n`;
    content += `All tables implement Row Level Security (RLS) policies:\n`;
    content += `- Public data is readable by anyone\n`;
    content += `- Admin operations require authentication\n`;
    content += `- Sensitive data is restricted to authenticated users only\n\n`;
  }

  // API & Edge Functions
  if (options.includeAPIReference) {
    sections.push('API & Edge Functions');
    content += `## API & Edge Functions\n\n`;
    content += `The website uses Supabase Edge Functions for serverless backend operations.\n\n`;
    content += `### Deployed Functions\n\n`;
    for (const func of codebaseStats.edgeFunctions) {
      content += `- **${func}**\n`;
    }
    content += `\n`;

    content += `### Function Descriptions\n\n`;
    content += `#### checkpoint-scraper\n`;
    content += `Automatically scrapes DUI checkpoint information from official sources and updates the database.\n\n`;
    content += `**Trigger:** Scheduled via cron (pg_cron extension)  \n`;
    content += `**Frequency:** Daily  \n`;
    content += `**Features:** Geocoding, deduplication, status management\n\n`;

    content += `#### submit-contact\n`;
    content += `Handles contact form submissions with validation and rate limiting.\n\n`;
    content += `**Trigger:** Contact form submission  \n`;
    content += `**Features:** Email validation, spam prevention, database storage\n\n`;

    content += `#### chat-intake\n`;
    content += `Powers the conversational intake form for potential clients.\n\n`;
    content += `**Trigger:** Chat interface interactions  \n`;
    content += `**Features:** Multi-step form, SMS integration capability\n\n`;
  }

  // Deployment Guide
  if (options.includeDeploymentGuide) {
    sections.push('Deployment & Hosting');
    content += `## Deployment & Hosting\n\n`;
    content += `### Current Hosting\n\n`;
    content += `- **Platform:** Netlify / Vercel (or as configured)\n`;
    content += `- **Build Command:** \`npm run build\`\n`;
    content += `- **Publish Directory:** \`dist\`\n`;
    content += `- **Node Version:** 18.x or higher\n\n`;

    content += `### Deployment Process\n\n`;
    content += `1. **Automatic Deployment**\n`;
    content += `   - Push to main branch triggers automatic deployment\n`;
    content += `   - Preview deployments for pull requests\n\n`;

    content += `2. **Manual Deployment**\n`;
    content += `   \`\`\`bash\n`;
    content += `   npm run build\n`;
    content += `   # Upload dist/ folder to hosting provider\n`;
    content += `   \`\`\`\n\n`;

    content += `### Environment Variables Setup\n\n`;
    content += `Configure these in your hosting provider's dashboard:\n\n`;
    for (const envVar of codebaseStats.environmentVariables) {
      content += `- \`${envVar}\`\n`;
    }
    content += `\n`;
  }

  // Custom Features
  if (options.includeCustomFeatures) {
    sections.push('Custom Features');
    content += `## Custom Features\n\n`;
    content += `### Interactive DUI Checkpoint Map\n`;
    content += `Real-time map showing upcoming and active DUI checkpoints using Mapbox GL.\n\n`;
    content += `**Features:**\n`;
    content += `- Live checkpoint locations\n`;
    content += `- Filtering by status and date\n`;
    content += `- Detailed checkpoint information\n`;
    content += `- Mobile-responsive design\n\n`;

    content += `### Conversational Intake Form\n`;
    content += `Modern chat-based interface for initial client consultations.\n\n`;
    content += `**Features:**\n`;
    content += `- Multi-step conversation flow\n`;
    content += `- Form validation\n`;
    content += `- Mobile-optimized UI\n`;
    content += `- Smooth animations\n\n`;

    content += `### Admin Dashboard\n`;
    content += `Comprehensive content management system built with React.\n\n`;
    content += `**Features:**\n`;
    content += `- Blog post management\n`;
    content += `- Contact lead tracking\n`;
    content += `- Checkpoint management\n`;
    content += `- Handoff documentation generator\n`;
    content += `- User authentication\n\n`;

    content += `### Accessibility Features\n`;
    content += `Built-in accessibility enhancements for WCAG compliance.\n\n`;
    content += `**Features:**\n`;
    content += `- Keyboard navigation\n`;
    content += `- Screen reader support\n`;
    content += `- High contrast mode\n`;
    content += `- Focus indicators\n`;
    content += `- ARIA labels\n\n`;
  }

  // Maintenance & Support
  sections.push('Maintenance & Support');
  content += `## Maintenance & Support\n\n`;
  content += `### Regular Maintenance Tasks\n\n`;
  content += `#### Weekly\n`;
  content += `- Review contact form submissions\n`;
  content += `- Check DUI checkpoint accuracy\n`;
  content += `- Monitor website performance\n\n`;

  content += `#### Monthly\n`;
  content += `- Update dependencies (\`npm update\`)\n`;
  content += `- Review security vulnerabilities\n`;
  content += `- Backup database\n`;
  content += `- Audit analytics data\n\n`;

  content += `#### Quarterly\n`;
  content += `- Review and update content\n`;
  content += `- Test all forms and features\n`;
  content += `- Update legal information\n`;
  content += `- Performance optimization audit\n\n`;

  content += `### Troubleshooting Common Issues\n\n`;
  content += `#### Build Failures\n`;
  content += `- Check Node version (18.x required)\n`;
  content += `- Clear node_modules and reinstall\n`;
  content += `- Verify all environment variables are set\n\n`;

  content += `#### Database Connection Issues\n`;
  content += `- Verify Supabase credentials in .env\n`;
  content += `- Check Supabase project status\n`;
  content += `- Confirm RLS policies are correct\n\n`;

  content += `### Support Resources\n\n`;
  content += `- **Documentation:** See \`docs/\` folder\n`;
  content += `- **Issues:** Check \`docs/TROUBLE-TICKETS.md\`\n`;
  content += `- **Operations:** See \`docs/OPERATIONS.md\`\n\n`;

  // Documentation Gaps
  sections.push('Documentation Gaps');
  content += formatGapsAsMarkdown(gapAnalysis);

  // Existing Documentation
  content += formatDocumentationSummary(docsSummary);

  // Custom Notes
  if (options.customNotes) {
    sections.push('Additional Notes');
    content += `## Additional Notes\n\n`;
    content += options.customNotes + '\n\n';
  }

  // Footer
  content += `---\n\n`;
  content += `**Document Generated:** ${generatedAt.toISOString()}  \n`;
  content += `**Version:** ${version}  \n`;
  content += `**Website:** [mangolaw.com](https://mangolaw.com)  \n\n`;
  content += `*This document was automatically generated by the Mango Law Admin Dashboard.*\n`;

  // Calculate word count
  const wordCount = content.split(/\s+/).length;

  return {
    title,
    version,
    generatedAt,
    content,
    wordCount,
    sections,
  };
}
