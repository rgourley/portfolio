const puppeteer = require('puppeteer');

async function checkArtgridVideoSource(clipId) {
  const url = `https://artgrid.io/clip/${clipId}/infomap-model-line-3d`;
  
  console.log(`\nChecking how Artgrid serves the video at: ${url}\n`);

  const browser = await puppeteer.launch({ 
    headless: false, // Show browser
    defaultViewport: null 
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('Navigating to Artgrid...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log('\n⚠️  If you see a login page, please log in now.');
    console.log('   Waiting 20 seconds for login...\n');
    await new Promise(resolve => setTimeout(resolve, 20000));
    
    console.log('Analyzing video source...\n');
    
    // Check how the video is served
    const videoAnalysis = await page.evaluate(() => {
      const results = {
        videoElements: [],
        blobUrls: [],
        networkRequests: [],
        downloadButtons: []
      };
      
      // Find all video elements
      const videos = document.querySelectorAll('video');
      videos.forEach((video, index) => {
        results.videoElements.push({
          index,
          src: video.src,
          currentSrc: video.currentSrc,
          poster: video.poster,
          sources: Array.from(video.querySelectorAll('source')).map(s => ({
            src: s.src,
            type: s.type
          }))
        });
      });
      
      // Check for blob URLs in scripts
      const scripts = Array.from(document.querySelectorAll('script'));
      scripts.forEach(script => {
        const content = script.textContent || '';
        const blobMatches = content.match(/blob:https?:\/\/[^\s"']+/g);
        if (blobMatches) {
          results.blobUrls.push(...blobMatches);
        }
      });
      
      // Find download buttons
      const buttons = Array.from(document.querySelectorAll('a, button, [role="button"]'));
      buttons.forEach(btn => {
        const text = (btn.textContent || '').toLowerCase();
        const href = btn.getAttribute('href') || '';
        if (text.includes('download') || href.includes('download')) {
          results.downloadButtons.push({
            text: btn.textContent?.trim(),
            href: href,
            className: btn.className
          });
        }
      });
      
      return results;
    });
    
    // Monitor network requests for video files
    const networkRequests = [];
    page.on('response', response => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';
      
      if (contentType.includes('video') || url.includes('.mp4') || url.includes('video')) {
        networkRequests.push({
          url: url,
          contentType: contentType,
          status: response.status()
        });
      }
    });
    
    // Wait a bit to capture network requests
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('=== VIDEO ELEMENTS ===');
    if (videoAnalysis.videoElements.length > 0) {
      videoAnalysis.videoElements.forEach((video, i) => {
        console.log(`\nVideo ${i + 1}:`);
        console.log(`  src: ${video.src || 'none'}`);
        console.log(`  currentSrc: ${video.currentSrc || 'none'}`);
        if (video.currentSrc) {
          const isBlob = video.currentSrc.startsWith('blob:');
          console.log(`  Type: ${isBlob ? 'BLOB URL ⚠️' : 'Direct URL ✓'}`);
        }
        if (video.sources.length > 0) {
          console.log(`  Sources:`);
          video.sources.forEach((src, j) => {
            console.log(`    ${j + 1}. ${src.src} (${src.type})`);
            if (src.src.startsWith('blob:')) {
              console.log(`       ⚠️  This is a BLOB URL`);
            }
          });
        }
      });
    } else {
      console.log('No video elements found');
    }
    
    console.log('\n=== BLOB URLS FOUND ===');
    if (videoAnalysis.blobUrls.length > 0) {
      console.log('⚠️  Found blob URLs (these are temporary and can\'t be downloaded directly):');
      videoAnalysis.blobUrls.forEach((url, i) => {
        console.log(`  ${i + 1}. ${url}`);
      });
    } else {
      console.log('✓ No blob URLs found in scripts');
    }
    
    console.log('\n=== DOWNLOAD BUTTONS ===');
    if (videoAnalysis.downloadButtons.length > 0) {
      videoAnalysis.downloadButtons.forEach((btn, i) => {
        console.log(`  ${i + 1}. "${btn.text}" - ${btn.href || 'no href'}`);
      });
    } else {
      console.log('No download buttons found');
    }
    
    console.log('\n=== NETWORK REQUESTS (Video files) ===');
    if (networkRequests.length > 0) {
      networkRequests.forEach((req, i) => {
        console.log(`  ${i + 1}. ${req.url}`);
        console.log(`     Content-Type: ${req.contentType}`);
        console.log(`     Status: ${req.status}`);
        if (req.url.startsWith('blob:')) {
          console.log(`     ⚠️  This is a BLOB URL`);
        } else {
          console.log(`     ✓ This is a direct URL (downloadable)`);
        }
      });
    } else {
      console.log('No video network requests captured');
    }
    
    console.log('\n=== SUMMARY ===');
    const hasBlob = videoAnalysis.videoElements.some(v => 
      v.currentSrc?.startsWith('blob:') || v.src?.startsWith('blob:')
    ) || videoAnalysis.blobUrls.length > 0;
    
    if (hasBlob) {
      console.log('⚠️  Artgrid appears to use BLOB URLs for the video.');
      console.log('   This means:');
      console.log('   - The video is loaded dynamically');
      console.log('   - You cannot download it directly via URL');
      console.log('   - You need to use Artgrid\'s download button or right-click save');
    } else {
      console.log('✓ Artgrid appears to use direct URLs for the video.');
      console.log('   The video can potentially be downloaded directly.');
    }
    
    console.log('\n⏳ Browser will stay open for 30 seconds for inspection...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    await browser.close();
    
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    await browser.close();
    throw error;
  }
}

async function main() {
  const clipId = '6085299';
  await checkArtgridVideoSource(clipId);
}

if (require.main === module) {
  main().catch(console.error);
}



