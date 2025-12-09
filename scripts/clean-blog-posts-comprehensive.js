const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^(---\s*\n[\s\S]*?\n---\s*\n)/);
  if (!frontmatterMatch) {
    console.log(`Warning: ${file} has no frontmatter`);
    return;
  }
  
  const frontmatter = frontmatterMatch[1];
  let body = content.substring(frontmatterMatch[0].length);
  
  // Extract title from frontmatter
  const titleMatch = frontmatter.match(/^title:\s*["'](.+?)["']/m);
  const title = titleMatch ? titleMatch[1] : null;
  
  // Remove duplicate title from body (with various formatting)
  if (title) {
    const titleEscaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Remove title with various whitespace patterns
    body = body.replace(new RegExp(`^\\s*${titleEscaped}\\s*$`, 'gmi'), '');
    body = body.replace(new RegExp(`^\\s+${titleEscaped}\\s+$`, 'gmi'), '');
    // Remove title that might be on a line by itself with extra spaces
    body = body.replace(new RegExp(`^\\s{4,}${titleEscaped}\\s{4,}$`, 'gmi'), '');
  }
  
  // Remove author links
  body = body.replace(/\[Robert Gourley\]\(\/blog\/author\/owner\)/g, '');
  body = body.replace(/\[Robert Gourley\]\([^)]+\)/g, '');
  
  // Remove "X min read"
  body = body.replace(/\d+\s+min read/gi, '');
  body = body.replace(/^\s*\d+\s+min read\s*$/gmi, '');
  
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
  
  // Fix broken image paths (remove com/large/ prefix if it exists)
  body = body.replace(/!\[\]\(com\/large\/[^)]+\)/g, '');
  body = body.replace(/!\[\]\(com\/[^)]+\)/g, '');
  
  // Remove lines with only whitespace, dashes, dots, or special chars
  const lines = body.split('\n');
  const cleanedLines = lines.filter(line => {
    const trimmed = line.trim();
    if (trimmed.length === 0) return true; // Keep empty lines for spacing
    if (/^[\s\-\.\*]+$/.test(trimmed)) return false;
    if (trimmed === 'Share' || trimmed === 'Comments' || trimmed === 'Post Comments') return false;
    if (trimmed.match(/^\s*\[Robert Gourley\]/)) return false;
    if (trimmed.match(/^\d+\s+min read$/i)) return false;
    // Remove lines that are just whitespace and special characters
    if (/^[\s\-\*\.]+$/.test(trimmed)) return false;
    return true;
  });
  
  body = cleanedLines.join('\n');
  
  // Remove excessive blank lines (more than 2 consecutive)
  body = body.replace(/\n{4,}/g, '\n\n\n');
  
  // Remove leading/trailing whitespace from body
  body = body.trim();
  
  // Remove any remaining lines that are just whitespace at the start
  body = body.replace(/^\s*\n+/, '');
  
  // Reconstruct file
  content = frontmatter + '\n' + body + '\n';
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned: ${file}`);
});

console.log(`\nCleaned ${files.length} blog post files.`);


