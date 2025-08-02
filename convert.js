// convert.js - Converts Obsidian markdown to Jekyll format
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const OBSIDIAN_FOLDER = './obsidian-notes';
const JEKYLL_FOLDER = './_posts';
const PAGES_FOLDER = './'; // Put pages in root directory
const ASSETS_FOLDER = './assets/images';

// Ensure output directories exist
[JEKYLL_FOLDER, ASSETS_FOLDER].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper function to convert filename to Jekyll-friendly format
function sanitizeFilename(filename) {
  // Remove file extension if present
  const nameWithoutExt = filename.replace(/\.md$/, '');

  // Extract just the final filename from any path
  const justFilename = nameWithoutExt.split('/').pop();

  return justFilename
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .trim();
}

// Helper function to convert WikiLinks to Jekyll links
function convertWikiLinks(content, filename, allFiles) {
  // Get list of existing files (without .md extension, just final filename)
  const existingPages = allFiles.map(f => sanitizeFilename(path.basename(f, '.md')));

  // Convert [[Link]] to simple relative links
  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    const sanitizedLink = sanitizeFilename(linkText);

    // Check if target page exists
    if (existingPages.includes(sanitizedLink)) {
      return `[${linkText}]({{ site.baseurl }}/${sanitizedLink}/)`;
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

  // Clean up problematic frontmatter
  const cleanData = { ...data };

  // Fix malformed date fields
  if (cleanData.date && typeof cleanData.date === 'object') {
    console.log(`⚠️  Fixing malformed date in ${filename}`);
    delete cleanData.date; // Remove the problematic date object
  }

  // Remove any fields with template syntax that aren't filled in
  Object.keys(cleanData).forEach(key => {
    const value = cleanData[key];
    if (typeof value === 'string' && (value.includes('{{') || value.includes('{ '))) {
      console.log(`⚠️  Removing template field '${key}' in ${filename}`);
      delete cleanData[key];
    }
  });

  const frontmatter = {
    layout: 'default',
    title: cleanData.title || path.basename(filename, '.md').replace(/-/g, ' '),
    date: dateStr, // Always use a valid date
    permalink: `/${sanitizeFilename(path.basename(filename, '.md'))}/`,
    ...cleanData // Preserve cleaned frontmatter
  };

  // Add categories based on tags if they exist
  if (cleanData.tags && Array.isArray(cleanData.tags)) {
    frontmatter.categories = cleanData.tags;
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

  // Recursively find all markdown files
  function findMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findMarkdownFiles(filePath, fileList);
      } else if (file.endsWith('.md')) {
        // Store relative path from obsidian-notes folder
        const relativePath = path.relative(OBSIDIAN_FOLDER, filePath);
        fileList.push(relativePath);
      }
    });

    return fileList;
  }

  const allFiles = findMarkdownFiles(OBSIDIAN_FOLDER);
  console.log(`📋 All files found:`, allFiles);

  const files = allFiles;

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

    // Create the Jekyll file using just the basename
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

  // Look for generated .md files in root directory (exclude certain files)
  const generatedFiles = fs.readdirSync('./')
    .filter(file => file.endsWith('.md') &&
                   file !== 'index.md' &&
                   file !== 'README.md');
  const pages = generatedFiles
    .map(file => {
      const filePath = path.join('./', file);
      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      const baseName = path.basename(file, '.md');
      return {
        title: data.title || baseName.replace(/-/g, ' '),
        filename: file,
        permalink: data.permalink || `/${baseName}/`,
        tags: data.tags || []
      };
    });

  // Group pages by their original folder structure
  const pagesByCategory = {};
  pages.forEach(page => {
    // Find the original file path to extract folder structure
    const originalFile = files.find(f => sanitizeFilename(path.basename(f, '.md')) === path.basename(page.filename, '.md'));

    if (originalFile) {
      const pathParts = originalFile.split('/');
      if (pathParts.length >= 2) {
        // Use the first meaningful folder as category (skip 'Alkebulan')
        let category = pathParts[1];
        if (pathParts.length >= 3 && pathParts[1].startsWith('0')) {
          // For numbered folders, include subfolder for better organization
          category = `${pathParts[1]} - ${pathParts[2]}`;
        }
        category = category.replace(/^\d+\s*-?\s*/, '').trim(); // Remove leading numbers

        if (!pagesByCategory[category]) {
          pagesByCategory[category] = [];
        }
        pagesByCategory[category].push(page);
      } else {
        // Fallback for files without clear folder structure
        const category = page.tags[0] || 'General';
        if (!pagesByCategory[category]) {
          pagesByCategory[category] = [];
        }
        pagesByCategory[category].push(page);
      }
    }
  });

  // Generate index content with better organization
  let indexContent = `---
layout: default
title: "Alkebulan: Contaminated Archives"
permalink: /
---

# Alkebulan: Contaminated Archives
*⚠️ WARNING: Magical contamination detected in all archived materials*

*A dark fantasy D&D world recovering from magical apocalypse - Access restricted to authorized personnel only*

---

## ☢️ Archive Navigation System

*Navigate contaminated data with extreme caution. All information may contain traces of Remnant Magic.*

`;

  // Sort categories for better organization
  const categoryOrder = [
    'Campaign Overview',
    'World Building',
    'Locations',
    'Factions & Organizations',
    'NPCs',
    'Adventures & Sessions',
    'Player Resources',
    'Game Mechanics',
    'Reference Materials',
    'Other',
    'Templates'
  ];

  // Add organized categories
  categoryOrder.forEach(expectedCategory => {
    const matchingCategories = Object.keys(pagesByCategory).filter(cat =>
      cat.includes(expectedCategory) || expectedCategory.includes(cat.split(' - ')[0])
    );

    matchingCategories.forEach(category => {
      const icon = getCategoryIcon(category);
      indexContent += `### ${icon} ${category}\n`;
      indexContent += `*Contamination Level: ${getContaminationLevel(category)}*\n\n`;

      // Sort pages within category
      pagesByCategory[category].sort((a, b) => a.title.localeCompare(b.title));

      pagesByCategory[category].forEach(page => {
        indexContent += `- [${page.title}]({{ site.baseurl }}${page.permalink})\n`;
      });
      indexContent += '\n';
      delete pagesByCategory[category];
    });
  });

  // Add any remaining categories
  Object.keys(pagesByCategory).sort().forEach(category => {
    const icon = getCategoryIcon(category);
    indexContent += `### ${icon} ${category}\n`;
    indexContent += `*Contamination Level: ${getContaminationLevel(category)}*\n\n`;
    pagesByCategory[category].forEach(page => {
      indexContent += `- [${page.title}]({{ site.baseurl }}${page.permalink})\n`;
    });
    indexContent += '\n';
  });

  indexContent += `---

## ⚠️ Safety Protocols

- **All materials** may contain traces of Remnant Magic
- **Exercise caution** when accessing pre-Cataclysm records
- **Report anomalies** to your nearest Remnant Keeper
- **Decontamination required** after extended archive access

*This archive is maintained by the survivors of Port Zephyr for educational purposes. The Council of Merchant Princes assumes no responsibility for magical contamination exposure.*`;

  fs.writeFileSync('./index.md', indexContent);
  console.log('✅ Index page generated with folder organization');
}

// Helper function to get category icons
function getCategoryIcon(category) {
  if (category.includes('World Building')) return '🌍';
  if (category.includes('Location')) return '📍';
  if (category.includes('NPC')) return '👥';
  if (category.includes('Adventure')) return '⚔️';
  if (category.includes('Player')) return '📖';
  if (category.includes('Game Mechanic')) return '⚙️';
  if (category.includes('Faction')) return '🏛️';
  if (category.includes('Reference')) return '📚';
  if (category.includes('Template')) return '📋';
  if (category.includes('Campaign')) return '🎲';
  return '☢️';
}

// Helper function to get contamination level
function getContaminationLevel(category) {
  if (category.includes('Template')) return 'MINIMAL';
  if (category.includes('Player')) return 'LOW';
  if (category.includes('World Building')) return 'MODERATE';
  if (category.includes('Adventure')) return 'HIGH';
  if (category.includes('Game Mechanic')) return 'EXTREME';
  return 'MODERATE';

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
