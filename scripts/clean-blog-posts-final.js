const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter and body
  const frontmatterMatch = content.match(/^(---\s*\n[\s\S]*?\n---\s*\n)/);
  if (!frontmatterMatch) return;
  
  const frontmatter = frontmatterMatch[1];
  let body = content.substring(frontmatterMatch[0].length);
  
  // Extract title from frontmatter
  const titleMatch = frontmatter.match(/^title:\s*["'](.+?)["']/m);
  const title = titleMatch ? titleMatch[1] : null;
  
  // Remove duplicate title from body (lines that match the title)
  if (title) {
    // Remove exact title matches (with various whitespace)
    const titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    body = body.replace(new RegExp(`^\\s*${titleEscaped}\\s*$`, 'gmi'), '');
    // Also remove if title appears with extra whitespace/formatting
    body = body.replace(new RegExp(`^\\s+${titleEscaped}\\s+$`, 'gmi'), '');
  }
  
  // Remove author links
  body = body.replace(/\[Robert Gourley\]\(\/blog\/author\/owner\)/g, '');
  
  // Remove "X min read"
  body = body.replace(/\d+\s+min read/gi, '');
  
  // Remove date lines (Apr 17, 2025 format)
  body = body.replace(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+,\s+\d{4}\s*$/gmi, '');
  
  // Remove Share sections
  body = body.replace(/\s*Share\s*.*?Copied.*?/gs, '');
  body = body.replace(/\s*Share\s*Share\s*/g, '');
  
  // Remove Next/Previous Post links
  body = body.replace(/\s*\[ Next Post.*?\]\([^)]+\)\s*/g, '');
  body = body.replace(/\s*\[ Previous Post.*?\]\([^)]+\)\s*/g, '');
  body = body.replace(/\s*\[  Previous Post.*?\]\([^)]+\)\s*/g, '');
  
  // Remove Comments sections
  body = body.replace(/\s*Comments\s*.*?Post Comments.*?Thank you!.*?/gs, '');
  
  // Remove Tags sections
  body = body.replace(/\s*Tags:.*?\[.*?\]\(tag\/[^)]+\)\s*/gs, '');
  body = body.replace(/\[[^\]]+\]\(tag\/[^)]+\)/g, '');
  
  // Remove URLs
  body = body.replace(/http:\/\/www\.robertcreative\.com\/blog\/[^\s]+/g, '');
  
  // Remove standalone words
  body = body.replace(/^\s*Copied\s*$/gmi, '');
  body = body.replace(/^\s*Thank you!\s*$/gmi, '');
  body = body.replace(/^\s*Share\s*$/gmi, '');
  body = body.replace(/^\s*Comments\s*$/gmi, '');
  
  // Remove HTML-like tags
  body = body.replace(/<[^>]+>/g, '');
  
  // Remove lines with only whitespace, dashes, dots, or special chars
  const lines = body.split('\n');
  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim();
    if (trimmed.length === 0) return true; // Keep empty lines
    if (/^[\s\-\.\*]+$/.test(trimmed)) return false;
    if (trimmed === 'Share' || trimmed === 'Comments' || trimmed === 'Post Comments') return false;
    return true;
  });
  
  body = cleanedLines.join('\n');
  
  // Remove excessive blank lines (more than 2 consecutive)
  body = body.replace(/\n{4,}/g, '\n\n\n');
  
  // Remove leading/trailing whitespace from body
  body = body.trim();
  
  // Reconstruct file
  content = frontmatter + '\n' + body + '\n';
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned: ${file}`);
});

console.log(`\nCleaned ${files.length} blog post files.`);

