// Enhanced convert.js with folder-based organization
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

// Helper function to check if content should be included
function shouldIncludeContent(frontmatter, content) {
  const accessLevel = frontmatter.access_level || ACCESS_LEVELS.PUBLIC;

  // Always exclude secret content
  if (accessLevel === ACCESS_LEVELS.SECRET) {
    return false;
  }

  // For player view, only include public and player content
  if (VIEW_MODE === 'player') {
    return accessLevel === ACCESS_LEVELS.PUBLIC || accessLevel === ACCESS_LEVELS.PLAYER;
  }

  // For DM view, include everything except secret
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

// Enhanced WikiLink conversion with access checking
function convertWikiLinks(content, filename, allFiles) {
  const existingPages = allFiles
    .filter(f => {
      const filePath = path.join(OBSIDIAN_FOLDER, f);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      return shouldIncludeContent(data, fileContent);
    })
    .map(f => sanitizeFilename(path.basename(f, '.md')));

  content = content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    const sanitizedLink = sanitizeFilename(linkText);

    if (existingPages.includes(sanitizedLink)) {
      return `[${linkText}]({{ site.baseurl }}/${sanitizedLink}/)`;
    } else {
      if (VIEW_MODE === 'player') {
        return `**${linkText}** *(classified)*`;
      } else {
        console.log(`⚠️  Link to restricted/missing page: ${linkText}`);
        return `**${linkText}** *(page restricted or coming soon)*`;
      }
    }
  });

  // Convert image links
  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (!src.startsWith('http')) {
      return `![${alt}]({{ site.baseurl }}/assets/images/${src})`;
    }
    return match;
  });

  return content;
}

// Enhanced frontmatter generation with access control
function generateFrontmatter(data, filename) {
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
    return;
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

  allFiles.forEach(file => {
    const filePath = path.join(OBSIDIAN_FOLDER, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Check if file should be included in this view
    if (!shouldIncludeContent(data, fileContent)) {
      console.log(`🚫 Skipping ${file} (access level: ${data.access_level || 'default'})`);
      skippedCount++;
      return;
    }

    // Filter content based on view mode
    const filteredContent = filterContentSections(content, data);

    // Convert WikiLinks with access checking
    const convertedContent = convertWikiLinks(filteredContent, file, allFiles);

    // Generate frontmatter with access control
    const jekyllFrontmatter = generateFrontmatter(data, file);

    const sanitizedFilename = sanitizeFilename(path.basename(file, '.md')) + '.md';
    const outputPath = path.join(PAGES_FOLDER, sanitizedFilename);

    const jekyllFile = matter.stringify(convertedContent, jekyllFrontmatter);
    fs.writeFileSync(outputPath, jekyllFile);

    console.log(`✅ Converted: ${file} → ${sanitizedFilename}`);
    processedCount++;
  });

  console.log(`🎉 Conversion complete! Processed: ${processedCount}, Skipped: ${skippedCount}`);
}

// NEW: Helper function to create folder hierarchy
function createFolderHierarchy(files) {
  const hierarchy = {
    folders: {},
    files: []
  };

  files.forEach(file => {
    const folderPath = file.originalPath || '';

    // Split the path and remove the filename
    const pathParts = folderPath.split('/').filter(part => part && !part.endsWith('.md'));

    if (pathParts.length === 0) {
      // Root level file
      hierarchy.files.push(file);
    } else {
      // Navigate/create the folder structure
      let current = hierarchy;

      pathParts.forEach((folderName, index) => {
        if (!current.folders[folderName]) {
          current.folders[folderName] = {
            folders: {},
            files: []
          };
        }

        // If this is the last folder in the path, add the file here
        if (index === pathParts.length - 1) {
          current.folders[folderName].files.push(file);
        } else {
          // Navigate deeper
          current = current.folders[folderName];
        }
      });
    }
  });

  return hierarchy;
}

// NEW: Recursive function to render folder structure
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

    html += `${headerPrefix} ${icon} ${folderTitle}\n`;

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
function generateIndex() {
  console.log(`📋 Generating index page for ${VIEW_MODE.toUpperCase()} view...`);

  const generatedFiles = fs.readdirSync('./')
    .filter(file => file.endsWith('.md') &&
                   file !== 'index.md' &&
                   file !== 'README.md');

  // Create enhanced file objects with original path information
  const pages = generatedFiles
    .map(file => {
      const filePath = path.join('./', file);
      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      const baseName = path.basename(file, '.md');

      // Try to find original path from obsidian-notes structure
      let originalPath = '';
      try {
        if (fs.existsSync(OBSIDIAN_FOLDER)) {
          const allObsidianFiles = findMarkdownFilesWithPath(OBSIDIAN_FOLDER);
          const originalFile = allObsidianFiles.find(f => {
            const originalBaseName = sanitizeFilename(path.basename(f, '.md'));
            return originalBaseName === baseName;
          });
          if (originalFile) {
            originalPath = originalFile;
          }
        }
      } catch (error) {
        console.log(`⚠️  Could not find original path for ${file}: ${error.message}`);
      }

      return {
        title: data.title || baseName.replace(/-/g, ' '),
        filename: file,
        permalink: data.permalink || `/${baseName}/`,
        tags: data.tags || [],
        access_level: data.access_level || ACCESS_LEVELS.PUBLIC,
        originalPath: originalPath
      };
    });

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
    const icon = VIEW_MODE === 'player' ? '📁' : '☢️';
    indexContent += `### ${icon} General\n`;

    if (VIEW_MODE === 'dm') {
      indexContent += `*Contamination Level: MODERATE*\n\n`;
    } else {
      indexContent += `*Public Information*\n\n`;
    }

    folderStructure.files.sort((a, b) => a.title.localeCompare(b.title)).forEach(file => {
      indexContent += `- [${file.title}]({{ site.baseurl }}${file.permalink})\n`;
    });
    indexContent += '\n';
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

// Helper function to find markdown files with their full paths
function findMarkdownFilesWithPath(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findMarkdownFilesWithPath(filePath, fileList);
    } else if (file.endsWith('.md')) {
      const relativePath = path.relative(OBSIDIAN_FOLDER, filePath);
      fileList.push(relativePath);
    }
  });
  return fileList;
}

// Main execution with view mode support
try {
  processObsidianFiles();
  copyImages(); // This function remains the same
  generateIndex();

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

// Helper function to create folder hierarchy from Obsidian structure
function createFolderHierarchy(pages) {
  const hierarchy = {
    folders: {},
    files: []
  };

  pages.forEach(page => {
    const originalPath = page.originalPath || '';

    if (!originalPath) {
      // No folder structure found, put in root
      hierarchy.files.push(page);
      return;
    }

    // Split path into folders (remove the filename)
    const pathParts = originalPath.split('/').filter(part => part && !part.endsWith('.md'));

    if (pathParts.length === 0) {
      // Root level file
      hierarchy.files.push(page);
    } else {
      // Navigate through folder structure
      let current = hierarchy;

      pathParts.forEach((folderName, index) => {
        // Ensure this folder exists
        if (!current.folders[folderName]) {
          current.folders[folderName] = {
            folders: {},
            files: []
          };
        }

        // If this is the last part of the path, this is where the file belongs
        if (index === pathParts.length - 1) {
          current.folders[folderName].files.push(page);
        } else {
          // Move deeper into the hierarchy
          current = current.folders[folderName];
        }
      });
    }
  });

  return hierarchy;
}

// Recursive function to render folder structure
function renderFolderStructure(structure, depth = 0) {
  let content = '';

  // Get sorted folder names
  const folderNames = Object.keys(structure.folders).sort();

  folderNames.forEach(folderName => {
    const folder = structure.folders[folderName];
    const icon = VIEW_MODE === 'player' ? '📁' : '☢️';

    // Create clean folder title
    const folderTitle = folderName
      .replace(/-/g, ' ')
      .replace(/\b\w/g, letter => letter.toUpperCase());

    // Use appropriate header level based on depth
    const headerLevel = Math.min(3 + depth, 6);
    const headers = '#'.repeat(headerLevel);

    content += `${headers} ${icon} ${folderTitle}\n`;

    if (VIEW_MODE === 'dm') {
      content += `*Contamination Level: MODERATE*\n\n`;
    } else {
      content += `*Public Information*\n\n`;
    }

    // Add files in this folder
    if (folder.files && folder.files.length > 0) {
      folder.files
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach(file => {
          content += `- [${file.title}]({{ site.baseurl }}${file.permalink})\n`;
        });
      content += '\n';
    }

    // Recursively add subfolders
    if (Object.keys(folder.folders).length > 0) {
      content += renderFolderStructure(folder, depth + 1);
    }
  });

  return content;
}

// Helper function to find markdown files with their full paths
function findMarkdownFilesWithPath(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findMarkdownFilesWithPath(filePath, fileList);
    } else if (file.endsWith('.md')) {
      const relativePath = path.relative(OBSIDIAN_FOLDER, filePath);
      fileList.push(relativePath);
    }
  });

  return fileList;
}

// Helper function for copying images (unchanged)
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
