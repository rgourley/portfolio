const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Create videos directory if it doesn't exist
const videosDir = path.join(process.cwd(), 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

async function downloadFromArtgrid(clipId, outputFilename) {
  const url = `https://artgrid.io/clip/${clipId}/infomap-model-line-3d`;
  const outputPath = path.join(videosDir, outputFilename);
  
  // Check if file already exists
  if (fs.existsSync(outputPath)) {
    console.log(`File already exists: ${outputFilename}`);
    return outputPath;
  }

  console.log(`\nAccessing Artgrid page: ${url}`);
  console.log('This script will:');
  console.log('1. Open the Artgrid page in a browser');
  console.log('2. Wait for you to log in (if needed)');
  console.log('3. Find the video source URL (blob or direct)');
  console.log('4. Download the video\n');

  const browser = await puppeteer.launch({ 
    headless: false, // Show browser so user can log in
    defaultViewport: null 
  });

  try {
    const page = await browser.newPage();
    
    // Set a reasonable viewport
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('Navigating to Artgrid...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log('\n⚠️  IMPORTANT: If you see a login page, please log in now.');
    console.log('   The script will wait 30 seconds for you to log in...\n');
    
    // Wait a bit for user to log in if needed
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    console.log('Looking for video source...');
    
    // Try to find video element and get its source
    const videoInfo = await page.evaluate(() => {
      // Look for video elements
      const videos = document.querySelectorAll('video');
      const videoSources = [];
      
      videos.forEach((video, index) => {
        const src = video.src;
        const sources = Array.from(video.querySelectorAll('source')).map(s => ({
          src: s.src,
          type: s.type
        }));
        
        videoSources.push({
          index,
          src: src || null,
          sources: sources.length > 0 ? sources : null,
          currentSrc: video.currentSrc || null
        });
      });
      
      // Also check for any blob URLs in the page
      const blobUrls = [];
      const scripts = Array.from(document.querySelectorAll('script'));
      scripts.forEach(script => {
        const content = script.textContent || '';
        const blobMatches = content.match(/blob:https?:\/\/[^\s"']+/g);
        if (blobMatches) {
          blobUrls.push(...blobMatches);
        }
      });
      
      return {
        videos: videoSources,
        blobUrls: [...new Set(blobUrls)],
        pageUrl: window.location.href
      };
    });
    
    console.log('\nFound video information:');
    console.log(JSON.stringify(videoInfo, null, 2));
    
    // Try to find download button or link
    const downloadInfo = await page.evaluate(() => {
      // Look for download buttons/links
      const downloadButtons = Array.from(document.querySelectorAll('a, button'))
        .filter(el => {
          const text = el.textContent?.toLowerCase() || '';
          const href = el.getAttribute('href') || '';
          return text.includes('download') || href.includes('download');
        })
        .map(el => ({
          text: el.textContent,
          href: el.getAttribute('href'),
          onclick: el.getAttribute('onclick')
        }));
      
      return downloadButtons;
    });
    
    if (downloadInfo.length > 0) {
      console.log('\nFound download buttons/links:');
      console.log(JSON.stringify(downloadInfo, null, 2));
    }
    
    // If we found a direct video source (not blob), we can download it
    let videoUrl = null;
    
    if (videoInfo.videos.length > 0) {
      const firstVideo = videoInfo.videos[0];
      videoUrl = firstVideo.currentSrc || firstVideo.src || 
                 (firstVideo.sources && firstVideo.sources[0]?.src);
      
      // If it's a blob URL, we need to handle it differently
      if (videoUrl && videoUrl.startsWith('blob:')) {
        console.log('\n⚠️  Video is served as a blob URL.');
        console.log('   Blob URLs are temporary and can\'t be downloaded directly.');
        console.log('   You\'ll need to:');
        console.log('   1. Right-click the video on the page');
        console.log('   2. Select "Save video as..." or "Download video"');
        console.log('   3. Save it manually to: ' + outputPath);
        console.log('\n   Or use the download button if available on the page.');
        
        // Keep browser open for manual download
        console.log('\n⏳ Browser will stay open for 60 seconds for manual download...');
        await new Promise(resolve => setTimeout(resolve, 60000));
        
        await browser.close();
        return null;
      }
    }
    
    // If we have a direct URL, download it
    if (videoUrl && !videoUrl.startsWith('blob:')) {
      console.log(`\n✓ Found video URL: ${videoUrl}`);
      console.log('Downloading...');
      
      const response = await page.goto(videoUrl);
      const buffer = await response.buffer();
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`✓ Video downloaded: ${outputFilename}`);
      console.log(`  Size: ${(buffer.length / 1024 / 1024).toFixed(2)}MB`);
      
      await browser.close();
      return outputPath;
    }
    
    console.log('\n⚠️  Could not find a direct video URL.');
    console.log('   The video might be:');
    console.log('   - Protected/requires authentication');
    console.log('   - Served as a blob URL');
    console.log('   - Loaded dynamically via JavaScript');
    console.log('\n   Please download it manually from the Artgrid interface.');
    console.log('   Browser will stay open for 60 seconds...');
    
    await new Promise(resolve => setTimeout(resolve, 60000));
    await browser.close();
    return null;
    
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    await browser.close();
    throw error;
  }
}

async function main() {
  const clipId = '6085299';
  const outputFilename = '6085299_Infomap Model Line 3d_By_Finn_Moeller_Artlist_HD.mp4';
  
  try {
    const result = await downloadFromArtgrid(clipId, outputFilename);
    if (result) {
      console.log('\n✓ Success! Video is ready to use.');
    } else {
      console.log('\n⚠️  Please download the video manually and save it to:');
      console.log(`   ${path.join(videosDir, outputFilename)}`);
    }
  } catch (error) {
    console.error('\n✗ Failed:', error.message);
    console.log('\nAlternative: Download manually from Artgrid and save to:');
    console.log(`   ${path.join(videosDir, outputFilename)}`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { downloadFromArtgrid };


