export interface DocumentationFile {
  name: string;
  path: string;
  content: string;
  lastModified?: Date;
}

export interface DocumentationSummary {
  files: DocumentationFile[];
  hasReadme: boolean;
  hasChangelog: boolean;
  hasContributing: boolean;
  hasOperations: boolean;
  customDocs: string[];
}

export async function scanDocumentation(): Promise<DocumentationSummary> {
  const summary: DocumentationSummary = {
    files: [],
    hasReadme: true,
    hasChangelog: true,
    hasContributing: true,
    hasOperations: true,
    customDocs: [
      'docs/TROUBLE-TICKETS.md',
      'docs/ASSET-CLEANUP.md',
      'docs/BLOG-VISUAL-COMPONENTS.md',
      'docs/CMS-SETUP-COMPLETE.md',
      'docs/brand/logo-usage-guide.md',
      'docs/brand/mango-law-assets.md',
    ],
  };

  // In a real implementation, we would read these files from the filesystem
  // For now, we'll note their existence

  summary.files.push({
    name: 'README.md',
    path: '/README.md',
    content: 'Main project README with setup instructions and overview',
  });

  summary.files.push({
    name: 'CHANGELOG.md',
    path: '/CHANGELOG.md',
    content: 'Version history and release notes',
  });

  summary.files.push({
    name: 'CONTRIBUTING.md',
    path: '/CONTRIBUTING.md',
    content: 'Guidelines for contributing to the project',
  });

  summary.files.push({
    name: 'OPERATIONS.md',
    path: '/docs/OPERATIONS.md',
    content: 'Operational procedures and deployment guide',
  });

  return summary;
}

export function formatDocumentationSummary(docs: DocumentationSummary): string {
  let markdown = `## Existing Documentation\n\n`;

  markdown += `The project includes comprehensive documentation:\n\n`;

  if (docs.hasReadme) {
    markdown += `- ✅ **README.md** - Project overview and setup instructions\n`;
  }
  if (docs.hasChangelog) {
    markdown += `- ✅ **CHANGELOG.md** - Version history and release notes\n`;
  }
  if (docs.hasContributing) {
    markdown += `- ✅ **CONTRIBUTING.md** - Contribution guidelines\n`;
  }
  if (docs.hasOperations) {
    markdown += `- ✅ **OPERATIONS.md** - Operational procedures\n`;
  }

  if (docs.customDocs.length > 0) {
    markdown += `\n### Additional Documentation\n\n`;
    for (const doc of docs.customDocs) {
      markdown += `- 📄 \`${doc}\`\n`;
    }
  }

  markdown += `\n`;

  return markdown;
}
