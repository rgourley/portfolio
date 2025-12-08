const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Track downloaded images to avoid duplicates
const downloadedImages = new Map();

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    // Check if already downloaded
    const localPath = path.join(imagesDir, filename);
    if (fs.existsSync(localPath)) {
      console.log(`  ✓ Already exists: ${filename}`);
      resolve(`/images/${filename}`);
      return;
    }

    const client = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.robertcreative.com/',
      }
    };

    const req = client.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirects
        return downloadImage(res.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(localPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`  ✓ Downloaded: ${filename}`);
        resolve(`/images/${filename}`);
      });

      fileStream.on('error', (err) => {
        fs.unlinkSync(localPath);
        reject(err);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

function generateFilename(url, context = '') {
  // Create a short hash from the URL for uniqueness
  const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
  
  // Try to extract a meaningful name from context or URL
  let baseName = '';
  
  // If context provided (like from alt text or surrounding text), use it
  if (context && context.length > 2 && context.length < 30) {
    baseName = context.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().substring(0, 30);
  }
  
  // Try to extract from URL path
  if (!baseName) {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    for (let i = pathParts.length - 1; i >= 0; i--) {
      const part = pathParts[i];
      if (part && part.length > 5 && part.length < 30 && !part.includes('=') && !part.includes('rs:fit')) {
        baseName = part.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().substring(0, 30);
        break;
      }
    }
  }
  
  // If still no good name, use a generic prefix
  if (!baseName || baseName.length < 3) {
    baseName = 'image';
  }
  
  // Determine extension from URL
  let ext = 'jpg';
  if (url.includes('.png') || url.includes('png')) ext = 'png';
  else if (url.includes('.webp') || url.includes('webp')) ext = 'webp';
  else if (url.includes('.gif') || url.includes('gif')) ext = 'gif';
  else if (url.includes('.jpeg') || url.includes('jpeg')) ext = 'jpg';
  
  // Ensure filename is not too long (max 100 chars total)
  const filename = `${baseName}-${hash}.${ext}`;
  return filename.length > 100 ? `img-${hash}.${ext}` : filename;
}

async function processMarkdownFile(filePath) {
  console.log(`\nProcessing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Find all Pixpa image URLs with context (alt text, etc.)
  // Match markdown image syntax: ![alt](url) or just url
  const markdownImageRegex = /!\[([^\]]*)\]\(([^\)]+)\)/g;
  const inlineUrlRegex = /https?:\/\/px-web-images[\d]*\.pixpa\.com\/[^\s\)\"]+/g;
  
  const replacements = [];
  const processedUrls = new Set();
  
  // First, process markdown image syntax
  let match;
  while ((match = markdownImageRegex.exec(content)) !== null) {
    const altText = match[1];
    const url = match[2];
    
    if (!url.includes('pixpa.com')) continue;
    
    // Skip if already processed
    if (downloadedImages.has(url)) {
      replacements.push({
        url,
        localPath: downloadedImages.get(url),
        index: match.index,
        length: match[0].length,
        fullMatch: match[0]
      });
      processedUrls.add(url);
      continue;
    }
    
    // Generate filename with context from alt text
    let filename = generateFilename(url, altText);
    
    // Ensure unique filename
    let counter = 0;
    while (fs.existsSync(path.join(imagesDir, filename)) || Array.from(downloadedImages.values()).includes(`/images/${filename}`)) {
      const hash = crypto.createHash('md5').update(url + counter).digest('hex').substring(0, 8);
      filename = `img-${hash}.jpg`;
      counter++;
    }
    
    try {
      const localPath = await downloadImage(url, filename);
      downloadedImages.set(url, localPath);
      
      const newMarkdown = `![${altText}](${localPath})`;
      replacements.push({
        url,
        localPath,
        index: match.index,
        length: match[0].length,
        fullMatch: match[0],
        newMarkdown
      });
      
      modified = true;
      processedUrls.add(url);
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`  ✗ Failed to download ${url}:`, error.message);
    }
  }
  
  // Then process inline URLs (not in markdown syntax)
  const inlineMatches = content.matchAll(inlineUrlRegex);
  for (const match of inlineMatches) {
    const url = match[0];
    
    // Skip if already processed or if it's part of a markdown image
    if (processedUrls.has(url) || content.substring(Math.max(0, match.index - 2), match.index).includes('![')) {
      continue;
    }
    
    // Skip if already downloaded
    if (downloadedImages.has(url)) {
      replacements.push({
        url,
        localPath: downloadedImages.get(url),
        index: match.index,
        length: match[0].length
      });
      continue;
    }
    
    // Generate filename
    let filename = generateFilename(url);
    
    // Ensure unique filename
    let counter = 0;
    while (fs.existsSync(path.join(imagesDir, filename)) || Array.from(downloadedImages.values()).includes(`/images/${filename}`)) {
      const hash = crypto.createHash('md5').update(url + counter).digest('hex').substring(0, 8);
      filename = `img-${hash}.jpg`;
      counter++;
    }
    
    try {
      const localPath = await downloadImage(url, filename);
      downloadedImages.set(url, localPath);
      
      replacements.push({
        url,
        localPath,
        index: match.index,
        length: match[0].length
      });
      
      modified = true;
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`  ✗ Failed to download ${url}:`, error.message);
    }
  }
  
  // Replace URLs in reverse order to maintain indices
  if (replacements.length > 0) {
    replacements.sort((a, b) => b.index - a.index);
    
    for (const replacement of replacements) {
      const before = content.substring(0, replacement.index);
      const after = content.substring(replacement.index + replacement.length);
      // Use newMarkdown if available (for markdown images), otherwise just the path
      const replacementText = replacement.newMarkdown || replacement.localPath;
      content = before + replacementText + after;
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✓ Updated file with ${replacements.length} image(s)`);
    }
  }
}

async function main() {
  const contentDir = path.join(process.cwd(), 'content');
  
  // Process all markdown files
  const workDir = path.join(contentDir, 'work');
  const blogDir = path.join(contentDir, 'blog');
  
  const files = [];
  
  if (fs.existsSync(workDir)) {
    const workFiles = fs.readdirSync(workDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(workDir, file));
    files.push(...workFiles);
  }
  
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(blogDir, file));
    files.push(...blogFiles);
  }
  
  console.log(`Found ${files.length} markdown files to process\n`);
  
  for (const file of files) {
    await processMarkdownFile(file);
  }
  
  console.log(`\n✓ Complete! Downloaded ${downloadedImages.size} unique images.`);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { downloadImage, processMarkdownFile };

