const fs = require('fs');
const path = require('path');

// Try to use puppeteer if available
let puppeteer = null;
try {
  puppeteer = require('puppeteer');
} catch (e) {
  console.log('Puppeteer not available, using basic fetch (content may be limited)');
}

// Simple HTML to Markdown converter (basic implementation)
function htmlToMarkdown(html) {
  if (!html) return '';
  
  // Remove script and style tags
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Convert headings
  html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  html = html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  html = html.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  html = html.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  
  // Convert paragraphs
  html = html.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Convert links
  html = html.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert images
  html = html.replace(/<img[^>]*src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?[^>]*>/gi, (match, src, alt) => {
    return `![${alt || ''}](${src})`;
  });
  
  // Convert lists
  html = html.replace(/<ul[^>]*>/gi, '');
  html = html.replace(/<\/ul>/gi, '\n');
  html = html.replace(/<ol[^>]*>/gi, '');
  html = html.replace(/<\/ol>/gi, '\n');
  html = html.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  
  // Convert strong and em
  html = html.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  html = html.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  html = html.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  html = html.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Convert code blocks
  html = html.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n');
  html = html.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // Convert blockquotes
  html = html.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '> $1\n\n');
  
  // Remove remaining HTML tags
  html = html.replace(/<[^>]+>/g, '');
  
  // Clean up whitespace
  html = html.replace(/\n{3,}/g, '\n\n');
  html = html.trim();
  
  return html;
}

function extractContent(html, url) {
  // Extract title - try multiple patterns
  let title = 'Untitled';
  
  // Try Open Graph title first
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  if (ogTitleMatch) {
    title = ogTitleMatch[1].trim();
    // Clean up common title suffixes
    title = title.replace(/\s*[-|]\s*Robert.*$/i, '').trim();
  }
  
  // If still not good, try regular title tag
  if (!title || title === 'Untitled' || title.toLowerCase().includes('robert gourley')) {
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      // Clean up common title suffixes
      title = title.replace(/\s*[-|]\s*Robert.*$/i, '').trim();
      // If title is just "Robert Gourley", skip it
      if (title.toLowerCase().includes('robert gourley') && title.length < 30) {
        title = 'Untitled';
      }
    }
  }
  
  // Try h1 tags in article or main
  if (!title || title === 'Untitled' || title.toLowerCase().includes('robert gourley')) {
    const h1Match = html.match(/<article[^>]*>[\s\S]*?<h1[^>]*>(.*?)<\/h1>/i) ||
                    html.match(/<main[^>]*>[\s\S]*?<h1[^>]*>(.*?)<\/h1>/i) ||
                    html.match(/<h1[^>]*class=["'][^"']*title[^"']*["'][^>]*>(.*?)<\/h1>/i) ||
                    html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      const h1Title = h1Match[1].replace(/<[^>]+>/g, '').trim();
      // Only use if it's not just "Robert Gourley"
      if (h1Title && !h1Title.toLowerCase().includes('robert gourley') && h1Title.length > 5) {
        title = h1Title;
      }
    }
  }
  
  // Extract date from various formats
  let date = '';
  const dateMatch = html.match(/<time[^>]*datetime=["']([^"']+)["'][^>]*>/i) ||
                    html.match(/<time[^>]*>(.*?)<\/time>/i) ||
                    html.match(/<meta[^>]*property=["']article:published_time["'][^>]*content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]*name=["']date["'][^>]*content=["']([^"']+)["']/i);
  
  if (dateMatch) {
    date = dateMatch[1] || dateMatch[2];
    // Try to parse and format date
    try {
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        date = d.toISOString().split('T')[0];
      }
    } catch (e) {
      // Keep original date string
    }
  }
  
  // Extract hero image
  let image = '';
  const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                     html.match(/<img[^>]*class=["'][^"']*hero[^"']*["'][^>]*src=["']([^"']+)["']/i) ||
                     html.match(/<img[^>]*class=["'][^"']*featured[^"']*["'][^>]*src=["']([^"']+)["']/i) ||
                     html.match(/<img[^>]*src=["']([^"']+)["'][^>]*class=["'][^"']*hero[^"']*["']/i);
  
  if (imageMatch) {
    image = imageMatch[1];
    // Convert relative URLs to absolute
    if (image.startsWith('/')) {
      const urlObj = new URL(url);
      image = `${urlObj.origin}${image}`;
    }
  }
  
  // Extract main content - try to find article or main content area
  let content = '';
  
  // Try multiple content selectors
  const contentSelectors = [
    /<article[^>]*>(.*?)<\/article>/is,
    /<main[^>]*>(.*?)<\/main>/is,
    /<div[^>]*class=["'][^"']*post-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*entry-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*blog-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*article-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>(.*?)<\/div>/is,
  ];
  
  for (const selector of contentSelectors) {
    const match = html.match(selector);
    if (match && match[1]) {
      const textContent = match[1].replace(/<[^>]+>/g, '').trim();
      // Check if content is substantial
      if (textContent.length > 200) {
        content = match[1];
        break;
      }
    }
  }
  
  // Extract description
  let description = '';
  const descMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  
  if (descMatch) {
    description = descMatch[1];
  }
  
  // Extract tags
  const tags = [];
  const tagMatches = html.matchAll(/<meta[^>]*property=["']article:tag["'][^>]*content=["']([^"']+)["']/gi);
  for (const match of tagMatches) {
    tags.push(match[1]);
  }
  
  return {
    title,
    date: date || new Date().toISOString().split('T')[0],
    image,
    content,
    description,
    tags,
  };
}

async function importWorkProject(url, slug) {
  try {
    console.log(`Fetching ${url}...`);
    
    let html = '';
    let content = '';
    let title = '';
    let extractedImages = [];
    
    // Use Puppeteer if available to render JavaScript
    if (puppeteer) {
      console.log(`  Using Puppeteer to render JavaScript...`);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      
      // Set a reasonable viewport
      await page.setViewport({ width: 1280, height: 720 });
      
      // Navigate to the page and wait for content to load
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // Wait a bit more for any lazy-loaded content using setTimeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get the rendered HTML
      html = await page.content();
      
      // Try to extract content and title from the rendered page
      const pageData = await page.evaluate(() => {
        // Try to find the title from h1 in article - try multiple selectors
        let pageTitle = '';
        const h1Selectors = [
          'article h1',
          'main h1',
          '[class*="post"] h1',
          '[class*="article"] h1',
          '[class*="blog"] h1',
          '[class*="work"] h1',
          '[class*="project"] h1',
          'h1'
        ];
        
        for (const selector of h1Selectors) {
          const h1 = document.querySelector(selector);
          if (h1) {
            const h1Text = (h1.innerText || h1.textContent || '').trim();
            // Skip if it's just "Robert Gourley" or too short
            if (h1Text && h1Text.length > 5 && !h1Text.toLowerCase().includes('robert gourley') && h1Text.length < 200) {
              pageTitle = h1Text;
              break;
            }
          }
        }
        
        // If no good h1, try to get from meta og:title
        if (!pageTitle) {
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) {
            const ogTitleText = ogTitle.getAttribute('content') || '';
            if (ogTitleText && !ogTitleText.toLowerCase().includes('robert gourley') && ogTitleText.length > 5) {
              // Clean up common suffixes
              pageTitle = ogTitleText.replace(/\s*[-|]\s*Robert.*$/i, '').trim();
            }
          }
        }
        
        // Try to find the main article content
        let content = '';
        let contentElement = null;
        
        // First, try to find the main project/work content area
        // Look for sections or divs that contain the actual project description
        const projectSelectors = [
          'article',
          'main',
          '[class*="work-content"]',
          '[class*="project-content"]',
          '[class*="post-content"]',
          '[class*="entry-content"]',
          '[class*="article-content"]',
        ];
        
        for (const selector of projectSelectors) {
          const element = document.querySelector(selector);
          if (element) {
            // Remove navigation, header, footer elements from within
            const clone = element.cloneNode(true);
            const navs = clone.querySelectorAll('nav, header, footer, aside, script, style, [class*="nav"], [class*="menu"]');
            navs.forEach(el => el.remove());
            
            const text = clone.innerText || clone.textContent || '';
            if (text.length > 200) {
              content = clone.innerHTML;
              contentElement = element;
              break;
            }
          }
        }
        
        // If still no content, try to find paragraphs with substantial text
        if (!content || content.replace(/<[^>]+>/g, '').trim().length < 200) {
          // Look for the h1 and get content after it
          const h1 = document.querySelector('h1');
          if (h1) {
            // Find the parent container
            let parent = h1.parentElement;
            while (parent && parent !== document.body) {
              const text = parent.innerText || parent.textContent || '';
              if (text.length > 300) {
                const clone = parent.cloneNode(true);
                const navs = clone.querySelectorAll('nav, header, footer, aside, script, style, [class*="nav"], [class*="menu"], [class*="brand"]');
                navs.forEach(el => el.remove());
                // Remove the h1 itself and everything before it
                const h1Clone = clone.querySelector('h1');
                if (h1Clone) {
                  const h1Index = Array.from(clone.children).indexOf(h1Clone);
                  // Get content after h1
                  const afterH1 = Array.from(clone.children).slice(h1Index + 1);
                  const tempDiv = document.createElement('div');
                  afterH1.forEach(el => tempDiv.appendChild(el.cloneNode(true)));
                  const textContent = tempDiv.innerText || tempDiv.textContent || '';
                  if (textContent.length > 200) {
                    content = tempDiv.innerHTML;
                    contentElement = parent;
                    break;
                  }
                }
              }
              parent = parent.parentElement;
            }
          }
        }
        
        // If still no content, try to find the main content div
        if (!content || content.replace(/<[^>]+>/g, '').trim().length < 200) {
          const contentDivs = document.querySelectorAll('[class*="content"], [class*="post"], [class*="article"], [class*="entry"], [class*="work"], [class*="project"]');
          for (const div of contentDivs) {
            const clone = div.cloneNode(true);
            const navs = clone.querySelectorAll('nav, header, footer, aside, script, style, [class*="nav"], [class*="menu"]');
            navs.forEach(el => el.remove());
            
            const text = clone.innerText || clone.textContent || '';
            if (text.length > 200 && text.length < 50000) { // Reasonable content size
              content = clone.innerHTML;
              contentElement = div;
              break;
            }
          }
        }
        
        // Last resort: get body but remove all navigation elements
        if (!content || content.replace(/<[^>]+>/g, '').trim().length < 200) {
          const body = document.body.cloneNode(true);
          const navs = body.querySelectorAll('nav, header, footer, aside, script, style, [class*="nav"], [class*="menu"], [id*="nav"], [id*="menu"], [class*="brand"]');
          navs.forEach(el => el.remove());
          content = body.innerHTML;
          contentElement = document.body;
        }
        
        // Extract images from the entire page (not just contentElement, as images might be in galleries)
        const images = [];
        // Search the entire document for images
        const imgElements = document.querySelectorAll('img');
        
        imgElements.forEach(img => {
          const src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('data-original') || '';
          const alt = img.getAttribute('alt') || '';
          
          // Skip loader/spinner/icon images - but be more specific
          const srcLower = src.toLowerCase();
          const isLoader = srcLower.includes('infinite-loader') || 
                          (srcLower.includes('loader') && srcLower.includes('svg')) ||
                          (srcLower.includes('spinner') && srcLower.includes('svg')) ||
                          (srcLower.includes('icon') && srcLower.includes('svg'));
          
          // Only include images that look like actual content images
          if (src && !isLoader && src.length > 20) {
            // Include pixpa images or images with common extensions
            const isImage = src.includes('pixpa') || 
                           src.includes('px-web') || 
                           src.includes('px-s3') || 
                           src.includes('.jpg') || 
                           src.includes('.jpeg') || 
                           src.includes('.png') || 
                           src.includes('.webp') ||
                           src.includes('.gif');
            
            if (isImage) {
              // Convert relative URLs to absolute
              let fullSrc = src;
              if (src.startsWith('/')) {
                fullSrc = window.location.origin + src;
              } else if (!src.startsWith('http')) {
                fullSrc = new URL(src, window.location.href).href;
              }
              
              // Check if we already have this image (avoid duplicates)
              if (!images.find(existing => existing.src === fullSrc)) {
                images.push({ src: fullSrc, alt: alt || '' });
              }
            }
          }
        });
        
        return { title: pageTitle.trim(), content, images };
      });
      
      await browser.close();
      console.log(`  Rendered HTML length: ${html.length} chars`);
      console.log(`  Extracted content length: ${content ? content.replace(/<[^>]+>/g, '').trim().length : 0} chars`);
      console.log(`  Found ${pageData.images ? pageData.images.length : 0} images`);
      
      // Use extracted title from page if found
      if (pageData.title) {
        title = pageData.title;
      }
      content = pageData.content;
      
      // Store images for inline insertion
      extractedImages = pageData.images || [];
    } else {
      // Fallback to basic fetch
      html = await fetch(url).then(r => r.text());
      console.log(`  HTML length: ${html.length} chars`);
    }
    
    // Extract metadata from HTML (always do this for title, date, image, etc.)
    const extracted = extractContent(html, url);
    let extractedTitle = extracted.title;
    let { date, image, description, tags } = extracted;
    
    // Use Puppeteer title if available, otherwise use extracted title
    if (!title || title === 'Untitled' || title.toLowerCase().includes('robert gourley')) {
      title = extractedTitle;
    }
    
    // If we don't have content from Puppeteer, use extracted content
    if (!content || content.replace(/<[^>]+>/g, '').trim().length < 200) {
      content = extracted.content || content;
    }
    
    // Debug: Check extracted content
    const contentText = content.replace(/<[^>]+>/g, '').trim();
    console.log(`  Extracted content text length: ${contentText.length} chars`);
    
    // Use provided slug or generate from URL
    const finalSlug = slug || url.split('/').pop() || 'untitled';
    
    // Convert HTML content to markdown
    let markdownContent = htmlToMarkdown(content);
    
    // Insert images inline in the markdown
    // Replace image placeholders or add images after paragraphs
    if (extractedImages && extractedImages.length > 0) {
      console.log(`  Total images found: ${extractedImages.length}`);
      
      // Filter to only include actual content images (not loaders/icons)
      const contentImages = extractedImages.filter(img => {
        const src = img.src.toLowerCase();
        // Skip loader/spinner/icon images
        if (src.includes('loader') || src.includes('spinner') || (src.includes('icon') && src.includes('svg'))) {
          return false;
        }
        // Include images from pixpa or that have image extensions
        return src.includes('px-web') || src.includes('pixpa') || src.includes('jpg') || src.includes('jpeg') || src.includes('png') || src.includes('webp') || src.includes('jpeg');
      });
      
      console.log(`  Filtered to ${contentImages.length} content images`);
      
      if (contentImages.length > 0) {
        console.log(`  Inserting ${contentImages.length} images inline`);
        
        // Find the description text in the markdown - be more flexible with whitespace
        const descriptionPattern = /Product design of[\s\S]{0,300}?globally/i;
        let descriptionMatch = markdownContent.match(descriptionPattern);
        
        // If that doesn't work, try a simpler pattern
        if (!descriptionMatch) {
          descriptionMatch = markdownContent.match(/Product design of[^\n]+platform[^\n]+globally/i);
        }
        
        if (descriptionMatch) {
          // Insert images right after the description
          const imageMarkdown = '\n\n' + contentImages.map(img => `![${img.alt || ''}](${img.src})`).join('\n\n') + '\n\n';
          const insertPos = descriptionMatch.index + descriptionMatch[0].length;
          markdownContent = markdownContent.slice(0, insertPos) + imageMarkdown + markdownContent.slice(insertPos);
          console.log(`  Inserted images after description at position ${insertPos}`);
        } else {
          // Try to find the description line by line
          const lines = markdownContent.split('\n');
          let insertIndex = -1;
          
          for (let i = 0; i < Math.min(150, lines.length); i++) {
            const line = lines[i];
            // Look for a line that contains the project description
            if (line.length > 80 && 
                line.toLowerCase().includes('product design') && 
                (line.toLowerCase().includes('streaming') || 
                 line.toLowerCase().includes('platform') ||
                 line.toLowerCase().includes('interface') ||
                 line.toLowerCase().includes('crunchyroll'))) {
              // Find the end of this paragraph (next empty line or next substantial line)
              for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
                if (lines[j].trim().length === 0 || lines[j].trim().length > 50) {
                  insertIndex = j;
                  break;
                }
              }
              if (insertIndex === -1) insertIndex = i + 1;
              break;
            }
          }
          
          if (insertIndex > 0) {
            const imageMarkdown = contentImages.map(img => `![${img.alt || ''}](${img.src})`).join('\n\n');
            lines.splice(insertIndex, 0, '', imageMarkdown, '');
            markdownContent = lines.join('\n');
          } else {
            // Last resort: add at the beginning after frontmatter
            const imageMarkdown = contentImages.map(img => `![${img.alt || ''}](${img.src})`).join('\n\n');
            // Find where the frontmatter ends
            const frontmatterEnd = markdownContent.indexOf('\n---\n');
            if (frontmatterEnd > 0) {
              markdownContent = markdownContent.slice(0, frontmatterEnd + 5) + '\n' + imageMarkdown + '\n\n' + markdownContent.slice(frontmatterEnd + 5);
            } else {
              markdownContent = imageMarkdown + '\n\n' + markdownContent;
            }
          }
        }
      }
    }
    
    // Create frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${(description || title).replace(/"/g, '\\"')}"
date: "${date}"
${image ? `image: "${image.replace(/"/g, '\\"')}"` : ''}
tags: ${JSON.stringify(tags.length > 0 ? tags : ['product design', 'UX design'])}
featured: false
order: 999
---

${markdownContent}
`;
    
    // Save to content/work directory
    const workDir = path.join(process.cwd(), 'content', 'work');
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
    }
    
    const filePath = path.join(workDir, `${finalSlug}.md`);
    fs.writeFileSync(filePath, frontmatter, 'utf8');
    
    console.log(`✓ Imported: ${finalSlug}.md`);
    console.log(`  Title: ${title}`);
    console.log(`  Date: ${date}`);
    if (image) console.log(`  Image: ${image}`);
    console.log(`  Content length: ${markdownContent.length} chars`);
    console.log('');
    
    return { slug: finalSlug, title, date, image };
  } catch (error) {
    console.error(`✗ Failed to import ${url}:`, error.message);
    return null;
  }
}

async function main() {
  const projects = [
    { url: 'https://www.robertcreative.com/work/apple', slug: 'apple' },
  ];
  
  console.log('Starting work import...\n');
  
  const results = [];
  for (const project of projects) {
    const result = await importWorkProject(project.url, project.slug);
    if (result) {
      results.push(result);
    }
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`\nImport complete! ${results.length} projects imported.`);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { importWorkProject };

