const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Try to use puppeteer if available, otherwise fall back to basic fetch
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

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    };
    
    const req = client.request(options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirects
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          return fetchURL(redirectUrl.startsWith('http') ? redirectUrl : `${urlObj.protocol}//${urlObj.hostname}${redirectUrl}`)
            .then(resolve)
            .catch(reject);
        }
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.end();
  });
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
  
  // Try multiple content selectors with more flexible patterns
  const contentSelectors = [
    // Standard semantic HTML
    /<article[^>]*>(.*?)<\/article>/is,
    /<main[^>]*>(.*?)<\/main>/is,
    // Common class patterns (more flexible)
    /<div[^>]*class=["'][^"']*post-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*entry-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*blog-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*article-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*class=["'][^"']*content[^"']*["'][^>]*>(.*?)<\/div>/is,
    // ID patterns
    /<div[^>]*id=["']content["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*id=["']post-content["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*id=["']article-content["'][^>]*>(.*?)<\/div>/is,
    /<div[^>]*id=["']main-content["'][^>]*>(.*?)<\/div>/is,
    // Pixpa-specific patterns (since the site uses Pixpa)
    /<div[^>]*class=["'][^"']*pixpa-content[^"']*["'][^>]*>(.*?)<\/div>/is,
    /<section[^>]*class=["'][^"']*content[^"']*["'][^>]*>(.*?)<\/section>/is,
  ];
  
  for (const selector of contentSelectors) {
    const match = html.match(selector);
    if (match && match[1]) {
      const textContent = match[1].replace(/<[^>]+>/g, '').trim();
      // Check if content is substantial (more than 200 chars)
      if (textContent.length > 200) {
        content = match[1];
        break;
      }
    }
  }
  
  // If still no good content, try to find any div with substantial text content
  if (!content || content.replace(/<[^>]+>/g, '').trim().length < 200) {
    // Find all divs and check their text content
    const divMatches = html.matchAll(/<div[^>]*>(.*?)<\/div>/gis);
    for (const match of divMatches) {
      const textContent = match[1].replace(/<[^>]+>/g, '').trim();
      // Look for divs with substantial text (likely content)
      if (textContent.length > 500 && textContent.split(/\s+/).length > 50) {
        content = match[1];
        break;
      }
    }
  }
  
  // Last resort: try body but remove common non-content elements
  if (!content || content.replace(/<[^>]+>/g, '').trim().length < 200) {
    const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/is);
    if (bodyMatch) {
      let bodyContent = bodyMatch[1];
      // Remove common non-content elements
      bodyContent = bodyContent.replace(/<header[^>]*>.*?<\/header>/gis, '');
      bodyContent = bodyContent.replace(/<nav[^>]*>.*?<\/nav>/gis, '');
      bodyContent = bodyContent.replace(/<footer[^>]*>.*?<\/footer>/gis, '');
      bodyContent = bodyContent.replace(/<aside[^>]*>.*?<\/aside>/gis, '');
      bodyContent = bodyContent.replace(/<script[^>]*>.*?<\/script>/gis, '');
      bodyContent = bodyContent.replace(/<style[^>]*>.*?<\/style>/gis, '');
      // Try to find the largest text block
      const paragraphs = bodyContent.match(/<p[^>]*>.*?<\/p>/gis);
      if (paragraphs && paragraphs.length > 3) {
        content = paragraphs.join('\n');
      } else {
        content = bodyContent;
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

// Title mapping for known posts
const titleMap = {
  'no-one-cares-about-your-design-system-and-how-to-fix-it': 'No One Cares About Your Design System (And How to Fix It)',
  'vibe-design-is-here-and-it-might-be-leading-us-off-a-cliff': 'Vibe Design Is Here and It Might Be Leading Us Off a Cliff',
  'ux-classics': 'UX Classics',
  'shape-up-design': 'Shape Up Design',
};

async function importBlogPost(url) {
  try {
    console.log(`Fetching ${url}...`);
    
    let html = '';
    let content = '';
    let title = '';
    
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
        const article = document.querySelector('article');
        if (article) {
          content = article.innerHTML;
        } else {
          // Try main content area
          const main = document.querySelector('main');
          if (main) {
            content = main.innerHTML;
          } else {
            // Try common content class names
            const contentDivs = document.querySelectorAll('[class*="content"], [class*="post"], [class*="article"], [class*="entry"]');
            for (const div of contentDivs) {
              const text = div.innerText || div.textContent || '';
              if (text.length > 500) {
                content = div.innerHTML;
                break;
              }
            }
            
            // Fallback: get body content but remove nav/footer
            if (!content) {
              const body = document.body.cloneNode(true);
              const navs = body.querySelectorAll('nav, header, footer, aside, script, style');
              navs.forEach(el => el.remove());
              content = body.innerHTML;
            }
          }
        }
        
        return { title: pageTitle.trim(), content };
      });
      
      // Use extracted title if found and it's not just "Robert Gourley"
      if (pageData.title && pageData.title.length > 5 && !pageData.title.toLowerCase().includes('robert gourley')) {
        title = pageData.title;
      }
      content = pageData.content;
      
      await browser.close();
      console.log(`  Rendered HTML length: ${html.length} chars`);
      console.log(`  Extracted content length: ${content ? content.replace(/<[^>]+>/g, '').trim().length : 0} chars`);
      
      // Use extracted title from page if found
      if (pageData.title) {
        title = pageData.title;
      }
      content = pageData.content;
    } else {
      // Fallback to basic fetch
      html = await fetchURL(url);
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
    
    // Try to find JSON-LD structured data for additional metadata
    const jsonLdMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
    for (const match of jsonLdMatches) {
      try {
        const jsonData = JSON.parse(match[1]);
        console.log(`  Found JSON-LD: ${jsonData['@type'] || 'unknown'}`);
        if (jsonData.articleBody || jsonData.text) {
          console.log(`  Found article body in JSON-LD`);
          // Use JSON-LD content if we don't have good content yet
          if (!content || content.replace(/<[^>]+>/g, '').trim().length < 200) {
            if (jsonData.articleBody) {
              content = `<p>${jsonData.articleBody}</p>`;
            } else if (jsonData.text) {
              content = `<p>${jsonData.text}</p>`;
            }
          }
        }
      } catch (e) {
        // Not valid JSON, skip
      }
    }
    
    // Debug: Check extracted content
    const contentText = content.replace(/<[^>]+>/g, '').trim();
    console.log(`  Extracted content text length: ${contentText.length} chars`);
    
    // Generate slug from URL
    const urlParts = url.split('/');
    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
    
    // Use mapped title if available, otherwise use extracted title
    const finalTitle = titleMap[slug] || (title !== 'Untitled' ? title : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    
    // Convert HTML content to markdown
    const markdownContent = htmlToMarkdown(content);
    
    // Create frontmatter
    const frontmatter = `---
title: "${finalTitle.replace(/"/g, '\\"')}"
description: "${(description || finalTitle).replace(/"/g, '\\"')}"
date: "${date}"
${image ? `image: "${image}"` : ''}
tags: ${JSON.stringify(tags.length > 0 ? tags : ['design', 'product design'])}
---

${markdownContent}
`;
    
    // Save to content/blog directory
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    
    const filePath = path.join(blogDir, `${slug}.md`);
    fs.writeFileSync(filePath, frontmatter, 'utf8');
    
    console.log(`✓ Imported: ${slug}.md`);
    console.log(`  Title: ${finalTitle}`);
    console.log(`  Date: ${date}`);
    if (image) console.log(`  Image: ${image}`);
    console.log(`  Content length: ${markdownContent.length} chars`);
    console.log('');
    
    return { slug, title: finalTitle, date, image };
  } catch (error) {
    console.error(`✗ Failed to import ${url}:`, error.message);
    return null;
  }
}

async function main() {
  const urls = [
    'https://www.robertcreative.com/blog/no-one-cares-about-your-design-system-and-how-to-fix-it',
    'https://www.robertcreative.com/blog/vibe-design-is-here-and-it-might-be-leading-us-off-a-cliff',
    'https://www.robertcreative.com/blog/ux-classics',
    'https://www.robertcreative.com/blog/shape-up-design',
    'https://www.robertcreative.com/blog/mushroom-house-of-la-jolla',
    'https://www.robertcreative.com/blog/what-is-the-goal-gradient-effect',
    'https://www.robertcreative.com/blog/how-to-run-a-ux-brainstorming-session',
    'https://www.robertcreative.com/blog/find-all-font-sizes',
    'https://www.robertcreative.com/blog/what-is-a-design-system',
    'https://www.robertcreative.com/blog/unlocking-design-secrets-from-enzo-ferrari',
    'https://www.robertcreative.com/blog/100-best-pricing-page-examples',
  ];
  
  console.log('Starting blog import...\n');
  
  const results = [];
  for (const url of urls) {
    const result = await importBlogPost(url);
    if (result) {
      results.push(result);
    }
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\nImport complete! ${results.length} posts imported.`);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { importBlogPost };

