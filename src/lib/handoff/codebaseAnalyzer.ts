interface CodebaseStats {
  totalFiles: number;
  components: number;
  pages: number;
  utilities: number;
  routes: string[];
  technologies: string[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  environmentVariables: string[];
  databaseTables: string[];
  edgeFunctions: string[];
}

export async function analyzeCodebase(): Promise<CodebaseStats> {
  const stats: CodebaseStats = {
    totalFiles: 0,
    components: 0,
    pages: 0,
    utilities: 0,
    routes: [],
    technologies: [],
    dependencies: {},
    devDependencies: {},
    scripts: {},
    environmentVariables: [],
    databaseTables: [],
    edgeFunctions: [],
  };

  try {
    // Analyze package.json
    const packageJson = await import('../../../package.json');
    stats.dependencies = packageJson.dependencies || {};
    stats.devDependencies = packageJson.devDependencies || {};
    stats.scripts = packageJson.scripts || {};

    // Extract technologies from dependencies
    const techs = new Set<string>();
    const deps = packageJson.dependencies as Record<string, string> || {};
    const devDeps = packageJson.devDependencies as Record<string, string> || {};

    if (deps['next']) techs.add('Next.js ' + deps['next']);
    if (deps['react']) techs.add('React ' + deps['react']);
    if (deps['@supabase/supabase-js']) techs.add('Supabase');
    if (deps['tailwindcss'] || devDeps['tailwindcss']) {
      techs.add('Tailwind CSS');
    }
    if (deps['typescript'] || devDeps['typescript']) {
      techs.add('TypeScript');
    }
    if (deps['mapbox-gl']) techs.add('Mapbox GL');

    stats.technologies = Array.from(techs);

    // Note: In a real implementation, we would use the file system to scan
    // For now, we'll use known values from the project structure
    stats.totalFiles = 150; // Approximate based on project_files list
    stats.components = 35;
    stats.pages = 20;
    stats.utilities = 10;

    // Known routes from the application
    stats.routes = [
      '/',
      '/about',
      '/contact',
      '/blog',
      '/blog/:slug',
      '/practice-areas',
      '/practice-areas/criminal-defense',
      '/practice-areas/ovi-dui',
      '/practice-areas/drug-crimes',
      '/practice-areas/sex-crimes',
      '/practice-areas/white-collar',
      '/practice-areas/protection-orders',
      '/practice-areas/personal-injury',
      '/service-areas',
      '/dui-checkpoints',
      '/glossary',
      '/reviews',
      '/admin',
      '/admin/login',
    ];

    // Known database tables
    stats.databaseTables = [
      'dui_checkpoints',
      'scraper_logs',
      'checkpoint_increment_id',
      'brand_assets',
      'contact_submissions',
      'blog_posts',
      'handoff_documents',
      'handoff_document_versions',
      'handoff_shares',
      'handoff_gaps',
    ];

    // Known Edge Functions
    stats.edgeFunctions = [
      'checkpoint-scraper',
      'submit-contact',
      'chat-intake',
    ];

    // Known environment variables
    stats.environmentVariables = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN',
      'NEXT_PUBLIC_MAPBOX_STYLE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'RESEND_API_KEY',
    ];

  } catch (error) {
    console.error('Error analyzing codebase:', error);
  }

  return stats;
}

export function generateFileTreeMarkdown(): string {
  return `
## Project Structure

\`\`\`
mango-law-website/
├── public/
│   ├── images/
│   │   ├── brand/
│   │   ├── generated/
│   │   └── headshots/
│   ├── generated/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── BlogManager.tsx
│   │   │   ├── CheckpointManager.tsx
│   │   │   ├── ContactManager.tsx
│   │   │   └── Tooltip.tsx
│   │   ├── blog/
│   │   ├── chat/
│   │   └── [35+ shared components]
│   ├── views/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   └── [15+ other pages]
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── AccessibilityContext.tsx
│   ├── data/
│   │   ├── blogPosts.ts
│   │   ├── practiceAreas.ts
│   │   ├── serviceAreas.ts
│   │   └── [other data files]
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   ├── seo.tsx
│   │   └── checkpointService.ts
│   ├── styles/
│   │   └── tailwind.css
│   ├── app/
│   │   ├── (site)/
│   │   └── (internal)/
│   └── views/
├── supabase/
│   ├── functions/
│   │   ├── checkpoint-scraper/
│   │   ├── submit-contact/
│   │   └── chat-intake/
│   └── migrations/
│       └── [13 migration files]
├── docs/
│   ├── OPERATIONS.md
│   ├── TROUBLE-TICKETS.md
│   └── brand/
├── design/
│   └── reference/
├── .next/
│   └── [build output]
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.js
└── README.md
\`\`\`
`;
}
