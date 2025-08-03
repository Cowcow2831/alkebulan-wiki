// Enhanced convert.js with folder-based organization and smart navigation
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const OBSIDIAN_FOLDER = './obsidian-notes';
const JEKYLL_FOLDER = './_posts';
const PAGES_FOLDER = './';
const ASSETS_FOLDER = './assets/images';

// View filtering - set via environment variable or command line
const VIEW_MODE = process.env.VIEW_MODE || process.argv[2] || 'dm'; // 'player' or 'dm'

// Access levels
const ACCESS_LEVELS = {
  PUBLIC: 'public',      // Available to everyone
  PLAYER: 'player',      // Player-safe content
  DM: 'dm',             // DM-only content
  SECRET: 'secret'       // Hidden from all views
};

console.log(`🎭 Building in ${VIEW_MODE.toUpperCase()} mode`);

// NEW: Helper function to check if content should show CLASSIFIED banner
function shouldShowClassifiedBanner(frontmatter) {
  const accessLevel = frontmatter.access_level || ACCESS_LEVELS.PUBLIC;

  // Always exclude secret content completely
  if (accessLevel === ACCESS_LEVELS.SECRET) {
    return false; // Don't include at all
  }

  // For player view, show banner if it's DM-only content
  if (VIEW_MODE === 'player') {
    return accessLevel === ACCESS_LEVELS.DM;
  }

  // DM view never shows classified banner
  return false;
}

// MODIFIED: Change shouldIncludeContent to always include (except secret)
function shouldIncludeContent(frontmatter, content) {
  const accessLevel = frontmatter.access_level || ACCESS_LEVELS.PUBLIC;

  // Only exclude secret content completely
  if (accessLevel === ACCESS_LEVELS.SECRET) {
    console.log(`🚫 Excluding SECRET content`);
    return false;
  }

  // Include everything else (we'll handle access control with banners)
  return true;
}
// Helper function to filter content sections
function filterContentSections(content, frontmatter) {
  if (VIEW_MODE === 'dm') {
    return content; // DMs see everything
  }

  // Remove DM-only sections for player view
  let filteredContent = content;

  // Remove content between DM-only markers
  filteredContent = filteredContent.replace(
    /<!-- DM_START -->([\s\S]*?)<!-- DM_END -->/g,
    ''
  );

  // Remove DM-only spoiler blocks
  filteredContent = filteredContent.replace(
    /> \*\*DM Note:.*?\*\*[\s\S]*?(?=\n\n|\n>|\n$)/g,
    ''
  );

  // Replace player-safe sections
  filteredContent = filteredContent.replace(
    /<!-- PLAYER_SAFE_START -->([\s\S]*?)<!-- PLAYER_SAFE_END -->/g,
    '$1'
  );

  return filteredContent.trim();
}
// NEW: Wrap content with CLASSIFIED banner if needed
function wrapWithClassifiedBanner(content, frontmatter) {
  if (shouldShowClassifiedBanner(frontmatter)) {
    return `<div class="classified-banner" style="background: linear-gradient(45deg, #ff3333, #ff6666); color: white; padding: 2rem; text-align: center; margin: 2rem 0; border: 3px solid #ff0000; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
  <h2 style="margin: 0; font-size: 2rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">⚠️ CLASSIFIED ⚠️</h2>
  <p style="margin: 0.5rem 0 0 0; font-size: 1.2rem;">This content requires DM clearance level access.</p>
  <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">Contact your Remnant Keeper for authorization.</p>
</div>

<!-- Original content hidden for player view -->
<div style="display: none;">
${content}
</div>`;
  }

  return content;
}
// Enhanced sanitizeFilename function
function sanitizeFilename(filename) {
  const nameWithoutExt = filename.replace(/\.md$/, '');
  const justFilename = nameWithoutExt.split('/').pop();

  return justFilename
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Enhanced WikiLink conversion with proper pipe handling
function convertWikiLinks(content, filename, allFiles) {
  const existingPages = allFiles
    .filter(f => {
      const filePath = path.join(OBSIDIAN_FOLDER, f);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      return shouldIncludeContent(data, fileContent);
    })
    .map(f => sanitizeFilename(path.basename(f, '.md')));

  // Convert [[link]] and [[link|display text]] format
  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, linkContent) => {
    // Check if there's a pipe character for display text
    const hasPipe = linkContent.includes('|');
    let linkTarget, displayText;

    if (hasPipe) {
      // Split on the pipe: [[page name|display text]]
      const parts = linkContent.split('|');
      linkTarget = parts[0].trim();
      displayText = parts[1].trim();
    } else {
      // No pipe: [[page name]]
      linkTarget = linkContent.trim();
      displayText = linkTarget;
    }

    const sanitizedLink = sanitizeFilename(linkTarget);

    if (existingPages.includes(sanitizedLink)) {
      // Page exists - create a proper Jekyll link
      return `[${displayText}]({{ site.baseurl }}/${sanitizedLink}/)`;
    } else {
      // Page doesn't exist - just show the display text without a link
      if (VIEW_MODE === 'dm') {
        console.log(`⚠️  Link to missing page: ${linkTarget} (displaying as: ${displayText})`);
      }
      return displayText;
    }
  });

  return content;
}

// Enhanced frontmatter generation with access control and navigation data
function generateFrontmatter(data, filename, originalPath) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const cleanData = { ...data };

  // Fix malformed dates
  if (cleanData.date && typeof cleanData.date === 'object') {
    console.log(`⚠️  Fixing malformed date in ${filename}`);
    delete cleanData.date;
  }

  // Remove template fields
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
    date: dateStr,
    permalink: `/${sanitizeFilename(path.basename(filename, '.md'))}/`,
    view_mode: VIEW_MODE,
    access_level: cleanData.access_level || ACCESS_LEVELS.PUBLIC,
    original_path: originalPath, // Store for navigation purposes
    ...cleanData
  };

  // Add view-specific styling
  if (VIEW_MODE === 'player') {
    frontmatter.player_safe = true;
  }

  if (cleanData.tags && Array.isArray(cleanData.tags)) {
    frontmatter.categories = cleanData.tags;
  }

  return frontmatter;
}

// Enhanced file processing with access control
function processObsidianFiles() {
  console.log(`🔄 Converting Obsidian notes to Jekyll format (${VIEW_MODE.toUpperCase()} view)...`);

  if (!fs.existsSync(OBSIDIAN_FOLDER)) {
    console.error(`❌ Obsidian folder not found at: ${OBSIDIAN_FOLDER}`);
    fs.mkdirSync(OBSIDIAN_FOLDER, { recursive: true });
    return [];
  }

  function findMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findMarkdownFiles(filePath, fileList);
      } else if (file.endsWith('.md')) {
        const relativePath = path.relative(OBSIDIAN_FOLDER, filePath);
        fileList.push(relativePath);
      }
    });
    return fileList;
  }

  const allFiles = findMarkdownFiles(OBSIDIAN_FOLDER);
  let processedCount = 0;
  let skippedCount = 0;
  const processedPages = [];

  allFiles.forEach(file => {
    const filePath = path.join(OBSIDIAN_FOLDER, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Check if file should be included in this view
    if (!shouldIncludeContent(data, fileContent)) {
      console.log(`🚫 Skipping ${file} (access level: ${data.access_level || 'default'}) - SECRET content`);
      skippedCount++;
      return;
    }

    // Log if we're showing a classified banner
    if (shouldShowClassifiedBanner(data)) {
      console.log(`🔒 Adding CLASSIFIED banner to ${file} (access level: ${data.access_level})`);
    }

    // Filter content based on view mode (preserve HTML comments functionality)
    const filteredContent = filterContentSections(content, data);

    // Add CLASSIFIED banner if access level doesn't match view mode
    const accessControlledContent = wrapWithClassifiedBanner(filteredContent, data);

    // Convert WikiLinks with access checking
    const convertedContent = convertWikiLinks(accessControlledContent, file, allFiles);

    // Generate frontmatter with access control and navigation data
    const jekyllFrontmatter = generateFrontmatter(data, file, file);

    const sanitizedFilename = sanitizeFilename(path.basename(file, '.md')) + '.md';
    const outputPath = path.join(PAGES_FOLDER, sanitizedFilename);

    const jekyllFile = matter.stringify(convertedContent, jekyllFrontmatter);
    fs.writeFileSync(outputPath, jekyllFile);

    // Store page info for navigation generation
    processedPages.push({
      sanitizedName: sanitizeFilename(path.basename(file, '.md')),
      originalPath: file,
      title: jekyllFrontmatter.title,
      permalink: jekyllFrontmatter.permalink,
      access_level: jekyllFrontmatter.access_level
    });

    console.log(`✅ Converted: ${file} → ${sanitizedFilename}`);
    processedCount++;
  });

  console.log(`🎉 Conversion complete! Processed: ${processedCount}, Skipped: ${skippedCount}`);
  return processedPages;
}

// Helper function to create folder hierarchy
function createFolderHierarchy(pages) {
  const hierarchy = {
    folders: {},
    files: []
  };

  pages.forEach(page => {
    const originalPath = page.originalPath || '';

    // Split the path and remove the filename
    const pathParts = originalPath.split('/').filter(part => part && !part.endsWith('.md'));

    if (pathParts.length === 0) {
      // Root level file
      hierarchy.files.push(page);
    } else {
      // Navigate/create the folder structure
      let current = hierarchy;

      pathParts.forEach((folderName, index) => {
        if (!current.folders[folderName]) {
          current.folders[folderName] = {
            folders: {},
            files: [],
            folderFile: null
          };
        }

        // If this is the last folder in the path, add the file here
        if (index === pathParts.length - 1) {
          // Check if this file represents the folder itself
          const sanitizedFolderName = sanitizeFilename(folderName);
          if (sanitizedFolderName === page.sanitizedName) {
            current.folders[folderName].folderFile = page;
          } else {
            current.folders[folderName].files.push(page);
          }
        } else {
          // Navigate deeper
          current = current.folders[folderName];
        }
      });
    }
  });

  return hierarchy;
}

// Recursive function to render folder structure
function renderFolderStructure(structure, depth = 0) {
  let html = '';

  // Sort folders alphabetically
  const folders = Object.keys(structure.folders).sort();

  folders.forEach(folderName => {
    const folder = structure.folders[folderName];
    const icon = VIEW_MODE === 'player' ? '📁' : '☢️';
    const folderTitle = folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Determine header level based on depth
    const headerLevel = Math.min(3 + depth, 6);
    const headerPrefix = '#'.repeat(headerLevel);

    // Check if this folder has a main file
    if (folder.folderFile) {
      html += `${headerPrefix} ${icon} [${folderTitle}]({{ site.baseurl }}${folder.folderFile.permalink})\n`;
    } else {
      html += `${headerPrefix} ${icon} ${folderTitle}\n`;
    }

    if (VIEW_MODE === 'dm') {
      html += `*Contamination Level: MODERATE*\n\n`;
    } else {
      html += `*Public Information*\n\n`;
    }

    // Render files in this folder
    if (folder.files && folder.files.length > 0) {
      folder.files.sort((a, b) => a.title.localeCompare(b.title)).forEach(file => {
        html += `- [${file.title}]({{ site.baseurl }}${file.permalink})\n`;
      });
      html += '\n';
    }

    // Recursively render subfolders
    if (Object.keys(folder.folders).length > 0) {
      html += renderFolderStructure(folder, depth + 1);
    }
  });

  return html;
}

// Enhanced index generation with folder-based organization
function generateIndex(pages) {
  console.log(`📋 Generating index page for ${VIEW_MODE.toUpperCase()} view...`);

  // Create folder hierarchy
  const folderStructure = createFolderHierarchy(pages);

  let indexContent = `---
layout: default
title: "Alkebulan: ${VIEW_MODE === 'player' ? 'Public' : 'Classified'} Archives"
permalink: /
view_mode: ${VIEW_MODE}
---

# Alkebulan: ${VIEW_MODE === 'player' ? 'Public' : 'Classified'} Archives
${VIEW_MODE === 'player'
  ? '*📖 Citizen-accessible information about the world of Alkebulan*'
  : '*⚠️ WARNING: Magical contamination detected in all archived materials*'
}

${VIEW_MODE === 'player'
  ? '*Welcome, citizen of Port Zephyr. This archive contains publicly available information about our world.*'
  : '*A dark fantasy D&D world recovering from magical apocalypse - Access restricted to authorized personnel only*'
}

---

## ${VIEW_MODE === 'player' ? '📚' : '☢️'} Archive Navigation System

`;

  // Render root level files first (files with no folder structure)
  if (folderStructure.files && folderStructure.files.length > 0) {
    // Filter out any files that match folder names at root level
    const rootFolderNames = Object.keys(folderStructure.folders).map(name =>
      name.toLowerCase().replace(/\s+/g, '-')
    );

    const rootFiles = folderStructure.files.filter(file => {
      const sanitizedFilename = file.sanitizedName.toLowerCase();
      return !rootFolderNames.includes(sanitizedFilename);
    });

    if (rootFiles.length > 0) {
      const icon = VIEW_MODE === 'player' ? '📁' : '☢️';
      indexContent += `### ${icon} General\n`;

      if (VIEW_MODE === 'dm') {
        indexContent += `*Contamination Level: MODERATE*\n\n`;
      } else {
        indexContent += `*Public Information*\n\n`;
      }

      rootFiles.sort((a, b) => a.title.localeCompare(b.title)).forEach(file => {
        indexContent += `- [${file.title}]({{ site.baseurl }}${file.permalink})\n`;
      });
      indexContent += '\n';
    }
  }

  // Render folder structure
  indexContent += renderFolderStructure(folderStructure);

  if (VIEW_MODE === 'player') {
    indexContent += `---

## 📋 About This Archive

This archive contains publicly available information about the world of Alkebulan. Some information may be restricted or classified for your safety.

*Questions? Contact your local Remnant Keeper or Port Authority representative.*`;
  } else {
    indexContent += `---

## ⚠️ Safety Protocols

- **All materials** may contain traces of Remnant Magic
- **Exercise caution** when accessing pre-Cataclysm records
- **Report anomalies** to your nearest Remnant Keeper
- **Decontamination required** after extended archive access

*This archive is maintained by the survivors of Port Zephyr for educational purposes.*`;
  }

  fs.writeFileSync('./index.md', indexContent);
  console.log(`✅ Index page generated for ${VIEW_MODE.toUpperCase()} view`);
}

// Helper function to copy images (unchanged)
function copyImages() {
  console.log('🖼️  Copying images...');
  const imageDirs = ['attachments', 'images', 'assets'];
  imageDirs.forEach(dir => {
    const sourceDir = path.join(OBSIDIAN_FOLDER, dir);
    if (fs.existsSync(sourceDir)) {
      const images = fs.readdirSync(sourceDir, { recursive: true })
        .filter(file => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file));
      images.forEach(image => {
        const sourcePath = path.join(sourceDir, image);
        const destPath = path.join(ASSETS_FOLDER, image);
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

// Main execution with view mode support
try {
  const processedPages = processObsidianFiles();
  copyImages();
  generateIndex(processedPages);

  if (!fs.existsSync('./index.md')) {
    console.log('📄 Creating fallback index...');
    const defaultIndex = `---
layout: default
title: "Alkebulan D&D Wiki (${VIEW_MODE.toUpperCase()})"
---

# Welcome to Alkebulan (${VIEW_MODE.toUpperCase()} View)

Your D&D world documentation will appear here.
`;
    fs.writeFileSync('./index.md', defaultIndex);
  }

  console.log(`🚀 ${VIEW_MODE.toUpperCase()} view generated successfully!`);
} catch (error) {
  console.error('❌ Conversion failed:', error);
  const errorIndex = `---
layout: default
title: "Setup in Progress"
---

# Site Setup in Progress

The site is being configured. Please check back soon!
`;
  fs.writeFileSync('./index.md', errorIndex);
}
