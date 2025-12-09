const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'content', 'blog');

// Get all markdown files
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove share sections (everything from "Share" to end of share block)
  // Pattern: "Share" followed by various share buttons and URLs
  content = content.replace(/\s*Share\s*.*?Copied.*?/gs, '');
  
  // Remove "Next Post" and "Previous Post" sections
  content = content.replace(/\s*\[ Next Post.*?\]\([^)]+\)\s*/g, '');
  content = content.replace(/\s*\[ Previous Post.*?\]\([^)]+\)\s*/g, '');
  content = content.replace(/\s*\[  Previous Post.*?\]\([^)]+\)\s*/g, '');
  
  // Remove Tags sections (including tag links)
  content = content.replace(/\s*Tags:.*?\[.*?\]\(tag\/[^)]+\)\s*/gs, '');
  content = content.replace(/\s*Tags:\s*/g, '');
  content = content.replace(/\[[^\]]+\]\(tag\/[^)]+\)/g, '');
  
  // Remove Comments sections
  content = content.replace(/\s*Comments\s*.*?Post Comments.*?Thank you!.*?/gs, '');
  
  // Remove any remaining share button patterns
  content = content.replace(/\s*Share\s*Share\s*/g, '');
  
  // Remove empty lines with just whitespace and special characters
  content = content.replace(/\n\s*\n\s*\n\s*\n+/g, '\n\n');
  
  // Remove any remaining HTML-like tags or empty divs
  content = content.replace(/<[^>]+>/g, '');
  
  // Clean up any remaining artifacts
  content = content.replace(/http:\/\/www\.robertcreative\.com\/blog\/[^\s]+/g, '');
  content = content.replace(/Copied/g, '');
  content = content.replace(/Thank you!/g, '');
  
  // Remove author links and metadata
  content = content.replace(/\[Robert Gourley\]\(\/blog\/author\/owner\)/g, '');
  content = content.replace(/\d+\s+min read/g, '');
  
  // Remove date formatting artifacts
  content = content.replace(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+,\s+\d{4}\s+$/gm, '');
  
  // Remove duplicate titles (title appears in frontmatter and body)
  // Keep only the frontmatter title, remove duplicate in body
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/^title:\s*["'](.+?)["']/m);
    if (titleMatch) {
      const title = titleMatch[1];
      // Remove duplicate title from body (after frontmatter)
      const bodyStart = content.indexOf('---', content.indexOf('---') + 3) + 3;
      const body = content.substring(bodyStart);
      // Remove lines that are just the title (with various formatting)
      const titleVariations = [
        new RegExp(`^\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'gmi'),
        new RegExp(`^\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+')}\\s*$`, 'gmi'),
      ];
      let cleanedBody = body;
      titleVariations.forEach(regex => {
        cleanedBody = cleanedBody.replace(regex, '');
      });
      content = content.substring(0, bodyStart) + cleanedBody;
    }
  }
  
  // Remove lines with just whitespace and special characters
  content = content.replace(/^\s+$/gm, '');
  
  // Remove any lines that are just whitespace, dashes, or special characters
  const lines = content.split('\n');
  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim();
    // Keep lines that have actual content
    if (trimmed.length === 0) return true; // Keep empty lines for spacing
    if (/^[\s\-\.\*]+$/.test(trimmed)) return false; // Remove lines with only dashes, dots, asterisks
    if (trimmed === 'Share' || trimmed === 'Comments' || trimmed === 'Post Comments') return false;
    if (trimmed.startsWith('[') && trimmed.includes('Next Post')) return false;
    return true;
  });
  
  content = cleanedLines.join('\n');
  
  // Final cleanup - remove excessive blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned: ${file}`);
});

console.log(`\nCleaned ${files.length} blog post files.`);

