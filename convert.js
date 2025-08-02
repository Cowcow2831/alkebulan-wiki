// convert.js - Converts Obsidian markdown to Jekyll format
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const OBSIDIAN_FOLDER = './obsidian-notes';
const JEKYLL_FOLDER = './_posts';
const PAGES_FOLDER = './pages';
const ASSETS_FOLDER = './assets/images';

// Ensure output directories exist
[JEKYLL_FOLDER, PAGES_FOLDER, ASSETS_FOLDER].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper function to convert filename to Jekyll-friendly format
function sanitizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .trim();
}

// Helper function to convert WikiLinks to Jekyll links
function convertWikiLinks(content, filename, allFiles) {
  // Get list of existing files (without .md extension)
  const existingPages = allFiles.map(f => sanitizeFilename(path.basename(f, '.md')));

  // Convert [[Link]] to Jekyll links, but only if the target exists
  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    const sanitizedLink = sanitizeFilename(linkText);

    // Check if target page exists
    if (existingPages.includes(sanitizedLink)) {
      return `[${linkText}]({% link pages/${sanitizedLink}.md %})`;
    } else {
      // Keep as plain text with a note that it's not ready yet
      console.log(`⚠️  Link to missing page: ${linkText} (will be plain text)`);
      return `**${linkText}** *(page coming soon)*`;
    }
  });

  // Convert ![Image](image.png) to proper Jekyll asset links
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    // If it's a relative path, convert to Jekyll asset path
    if (!src.startsWith('http')) {
      return `![${alt}]({{ site.baseurl }}/assets/images/${src})`;
    }
    return match;
  });

  return content;
}

// Helper function to generate proper Jekyll frontmatter
function generateFrontmatter(data, filename) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const frontmatter = {
    layout: 'default',
    title: data.title || filename.replace('.md', '').replace(/-/g, ' '),
    permalink: `/${sanitizeFilename(filename.replace('.md', ''))}/`,
    ...data // Preserve any existing frontmatter
  };

  // Only add date if it doesn't already exist and is valid
  if (!frontmatter.date) {
    frontmatter.date = dateStr;
  }

  // Add categories based on tags if they exist
  if (data.tags) {
    frontmatter.categories = Array.isArray(data.tags) ? data.tags : [data.tags];
  }

  return frontmatter;
}

// Process all markdown files in the obsidian folder
function processObsidianFiles() {
  console.log('🔄 Converting Obsidian notes to Jekyll format...');

  // Check if obsidian folder exists
  if (!fs.existsSync(OBSIDIAN_FOLDER)) {
    console.error(`❌ Obsidian folder not found at: ${OBSIDIAN_FOLDER}`);
    console.log('Creating empty obsidian-notes folder...');
    fs.mkdirSync(OBSIDIAN_FOLDER, { recursive: true });
    return;
  }

  console.log(`📁 Looking for files in: ${OBSIDIAN_FOLDER}`);
  const allFiles = fs.readdirSync(OBSIDIAN_FOLDER, { recursive: true });
  console.log(`📋 All files found:`, allFiles);

  const files = allFiles.filter(file => file.endsWith('.md'));

  if (files.length === 0) {
    console.log('⚠️  No markdown files found. Creating a sample index page...');
    // Create a basic index page so Jekyll has something to build
    const sampleContent = `---
layout: default
title: "Welcome to Alkebulan"
permalink: /
---

# Welcome to Alkebulan

Your D&D world wiki will appear here once you add markdown files to the \`obsidian-notes/\` folder.

## Getting Started

1. Add your Obsidian markdown files to the \`obsidian-notes/\` folder
2. Commit and push your changes
3. GitHub will automatically convert them to this website

## Sample Pages

- Add your campaign notes
- Create location descriptions
- Document NPCs and factions
- Track player progress

---

*This site is automatically generated from your Obsidian notes.*`;

    fs.writeFileSync('./index.md', sampleContent);
    console.log('✅ Created sample index page');
    return;
  }

  files.forEach(file => {
    const filePath = path.join(OBSIDIAN_FOLDER, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(fileContent);

    // Convert WikiLinks and image paths (pass all files for link checking)
    const convertedContent = convertWikiLinks(content, file, files);

    // Generate Jekyll frontmatter
    const jekyllFrontmatter = generateFrontmatter(data, file);

    // Create the Jekyll file
    const sanitizedFilename = sanitizeFilename(path.basename(file, '.md')) + '.md';
    const outputPath = path.join(PAGES_FOLDER, sanitizedFilename);

    // Construct the final Jekyll file
    const jekyllFile = matter.stringify(convertedContent, jekyllFrontmatter);

    // Write the converted file
    fs.writeFileSync(outputPath, jekyllFile);
    console.log(`✅ Converted: ${file} → ${sanitizedFilename}`);
  });

  console.log('🎉 Conversion complete!');
}

// Copy images from obsidian to Jekyll assets
function copyImages() {
  console.log('🖼️  Copying images...');

  // Look for common image directories in Obsidian folder
  const imageDirs = ['attachments', 'images', 'assets'];

  imageDirs.forEach(dir => {
    const sourceDir = path.join(OBSIDIAN_FOLDER, dir);
    if (fs.existsSync(sourceDir)) {
      const images = fs.readdirSync(sourceDir, { recursive: true })
        .filter(file => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file));

      images.forEach(image => {
        const sourcePath = path.join(sourceDir, image);
        const destPath = path.join(ASSETS_FOLDER, image);

        // Create subdirectories if needed
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        fs.copyFileSync(sourcePath, destPath);
        console.log(`📁 Copied image: ${image}`);
      });
    }
  });
}

// Generate an index page with all pages listed
function generateIndex() {
  console.log('📋 Generating index page...');

  const pages = fs.readdirSync(PAGES_FOLDER)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(PAGES_FOLDER, file);
      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      return {
        title: data.title,
        filename: file,
        permalink: data.permalink,
        tags: data.tags || []
      };
    });

  // Group pages by tag/category
  const pagesByCategory = {};
  pages.forEach(page => {
    const category = page.tags[0] || 'General';
    if (!pagesByCategory[category]) {
      pagesByCategory[category] = [];
    }
    pagesByCategory[category].push(page);
  });

  // Generate index content
  let indexContent = `---
layout: default
title: "Welcome to Alkebulan"
permalink: /
---

# Welcome to Alkebulan
*A dark fantasy D&D world recovering from magical apocalypse*

## Explore the World

`;

  // Add categorized links
  Object.keys(pagesByCategory).sort().forEach(category => {
    indexContent += `### ${category}\n\n`;
    pagesByCategory[category].forEach(page => {
      indexContent += `- [${page.title}](${page.permalink})\n`;
    });
    indexContent += '\n';
  });

  fs.writeFileSync('./index.md', indexContent);
  console.log('✅ Index page generated');
}

// Main execution
try {
  processObsidianFiles();
  copyImages();
  generateIndex();

  // Always ensure we have an index.md file for Jekyll
  if (!fs.existsSync('./index.md')) {
    console.log('📄 No index.md found, creating default...');
    const defaultIndex = `---
layout: default
title: "Alkebulan D&D Wiki"
---

# Welcome to Alkebulan

Your D&D world documentation will appear here.
`;
    fs.writeFileSync('./index.md', defaultIndex);
  }

  console.log('🚀 All files converted successfully!');
} catch (error) {
  console.error('❌ Conversion failed:', error);

  // Create minimal index so Jekyll can still build
  const errorIndex = `---
layout: default
title: "Setup in Progress"
---

# Site Setup in Progress

The site is being configured. Please check back soon!
`;
  fs.writeFileSync('./index.md', errorIndex);
  console.log('📄 Created fallback index page');
}
