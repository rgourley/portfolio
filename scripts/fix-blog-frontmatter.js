const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if frontmatter already has --- delimiters
  if (content.startsWith('---\n')) {
    console.log(`Skipping ${file} - already has frontmatter delimiters`);
    return;
  }
  
  // Find where frontmatter ends (first empty line after YAML-like content)
  const lines = content.split('\n');
  let frontmatterEnd = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // If we hit an empty line after YAML content, that's the end
    if (line.trim() === '' && i > 0 && lines[i-1].includes(':')) {
      frontmatterEnd = i;
      break;
    }
    // If we hit content that doesn't look like YAML, stop
    if (i > 0 && !line.includes(':') && line.trim() !== '' && !line.match(/^\[/)) {
      frontmatterEnd = i;
      break;
    }
  }
  
  if (frontmatterEnd === 0) {
    console.log(`Warning: Could not find frontmatter end for ${file}`);
    return;
  }
  
  const frontmatter = lines.slice(0, frontmatterEnd).join('\n');
  const body = lines.slice(frontmatterEnd).join('\n');
  
  // Reconstruct with --- delimiters
  content = `---\n${frontmatter}\n---${body}`;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log(`\nFixed ${files.length} blog post files.`);



