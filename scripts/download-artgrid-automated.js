const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');

// Create videos directory if it doesn't exist
const videosDir = path.join(process.cwd(), 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'video/mp4,video/*,*/*;q=0.8',
        'Referer': 'https://artgrid.io/',
      }
    };

    const fileStream = fs.createWriteStream(outputPath);
    let downloadedSize = 0;
    let totalSize = 0;

    const req = client.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fileStream.close();
        fs.unlinkSync(outputPath);
        return downloadFile(res.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (res.statusCode !== 200) {
        fileStream.close();
        fs.unlinkSync(outputPath);
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      totalSize = parseInt(res.headers['content-length'], 10) || 0;

      res.on('data', (chunk) => {
        downloadedSize += chunk.length;
        if (totalSize) {
          const percent = ((downloadedSize / totalSize) * 100).toFixed(1);
          process.stdout.write(`\rDownloading: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(2)}MB)`);
        }
      });

      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`\n✓ Downloaded: ${(downloadedSize / 1024 / 1024).toFixed(2)}MB`);
        resolve(outputPath);
      });

      fileStream.on('error', (err) => {
        fileStream.close();
        fs.unlinkSync(outputPath);
        reject(err);
      });
    });

    req.on('error', (err) => {
      fileStream.close();
      reject(err);
    });

    req.end();
  });
}

async function downloadArtgridVideo(clipId, outputFilename) {
  const url = `https://artgrid.io/clip/${clipId}/infomap-model-line-3d`;
  const outputPath = path.join(videosDir, outputFilename);
  
  if (fs.existsSync(outputPath)) {
    console.log(`\n⚠️  File already exists: ${outputFilename}`);
    console.log('   Delete it first if you want to re-download.\n');
    return outputPath;
  }

  console.log(`\n🎬 Artgrid Video Downloader`);
  console.log(`============================\n`);
  console.log(`Clip ID: ${clipId}`);
  console.log(`URL: ${url}`);
  console.log(`Output: ${outputFilename}\n`);

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--disable-blink-features=AutomationControlled']
  });

  try {
    const page = await browser.newPage();
    
    // Intercept and log all network requests
    const videoUrls = [];
    const downloadUrls = [];
    
    page.on('response', async (response) => {
      const responseUrl = response.url();
      const contentType = response.headers()['content-type'] || '';
      const status = response.status();
      
      // Look for video files
      if (status === 200 && (
        contentType.includes('video') || 
        responseUrl.includes('.mp4') || 
        responseUrl.includes('video') ||
        responseUrl.match(/\.(mp4|webm|mov)(\?|$)/i)
      )) {
        if (!responseUrl.startsWith('blob:')) {
          videoUrls.push({
            url: responseUrl,
            contentType: contentType,
            size: response.headers()['content-length']
          });
          console.log(`\n📹 Found video URL: ${responseUrl}`);
        }
      }
      
      // Look for download endpoints
      if (responseUrl.includes('download') && status === 200) {
        downloadUrls.push(responseUrl);
        console.log(`\n⬇️  Found download URL: ${responseUrl}`);
      }
    });

    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('🌐 Opening Artgrid page...');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    console.log('\n⏳ Waiting for page to load...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Try to find and click download button
    console.log('🔍 Looking for download button...');
    const downloadButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('a, button, [role="button"], [class*="download"], [class*="Download"]'));
      
      for (const btn of buttons) {
        const text = (btn.textContent || '').toLowerCase();
        const href = btn.getAttribute('href') || '';
        const className = btn.className || '';
        
        if (text.includes('download') || href.includes('download') || className.toLowerCase().includes('download')) {
          return {
            text: btn.textContent?.trim(),
            href: href,
            tagName: btn.tagName,
            className: className
          };
        }
      }
      return null;
    });
    
    if (downloadButton) {
      console.log(`✓ Found download button: "${downloadButton.text}"`);
      console.log('   Attempting to click...');
      
      try {
        await page.click('a[href*="download"], button:has-text("download"), [class*="download"]', { timeout: 5000 });
        console.log('   Clicked download button, waiting for download...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      } catch (e) {
        console.log('   Could not auto-click, you may need to click manually');
      }
    } else {
      console.log('   No download button found automatically');
    }
    
    // Wait for more network activity
    console.log('\n⏳ Monitoring network requests (30 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Check for video elements and their sources
    console.log('\n🔍 Analyzing video elements...');
    const videoInfo = await page.evaluate(() => {
      const videos = Array.from(document.querySelectorAll('video'));
      return videos.map((video, i) => ({
        index: i,
        src: video.src,
        currentSrc: video.currentSrc,
        sources: Array.from(video.querySelectorAll('source')).map(s => ({
          src: s.src,
          type: s.type
        }))
      }));
    });
    
    if (videoInfo.length > 0) {
      console.log(`\n📹 Found ${videoInfo.length} video element(s):`);
      videoInfo.forEach((video, i) => {
        console.log(`\n  Video ${i + 1}:`);
        console.log(`    src: ${video.src || 'none'}`);
        console.log(`    currentSrc: ${video.currentSrc || 'none'}`);
        if (video.sources.length > 0) {
          console.log(`    sources:`);
          video.sources.forEach((src, j) => {
            console.log(`      ${j + 1}. ${src.src} (${src.type})`);
          });
        }
      });
    }
    
    // Try to download from collected URLs
    console.log(`\n📥 Found ${videoUrls.length} potential video URL(s)`);
    
    if (videoUrls.length > 0) {
      // Try the largest file (likely the full quality video)
      const bestUrl = videoUrls.sort((a, b) => (parseInt(b.size) || 0) - (parseInt(a.size) || 0))[0];
      console.log(`\n⬇️  Attempting to download from: ${bestUrl.url}`);
      
      try {
        await downloadFile(bestUrl.url, outputPath);
        console.log(`\n✅ Success! Video downloaded to: ${outputFilename}`);
        await browser.close();
        return outputPath;
      } catch (error) {
        console.log(`\n⚠️  Failed to download: ${error.message}`);
        console.log('   Trying alternative methods...');
      }
    }
    
    // If no direct URLs found, provide manual instructions
    console.log(`\n⚠️  Could not automatically download the video.`);
    console.log(`\n📋 Manual Download Instructions:`);
    console.log(`   1. The browser window is still open`);
    console.log(`   2. Log into Artgrid if you haven't already`);
    console.log(`   3. Look for a "Download" button on the page`);
    console.log(`   4. Right-click the video and select "Save video as..."`);
    console.log(`   5. Save it to: ${outputPath}`);
    console.log(`\n⏳ Browser will stay open for 2 minutes for manual download...`);
    
    await new Promise(resolve => setTimeout(resolve, 120000));
    
    // Check if file was manually downloaded
    if (fs.existsSync(outputPath)) {
      console.log(`\n✅ File found! It looks like you downloaded it manually.`);
      await browser.close();
      return outputPath;
    }
    
    await browser.close();
    return null;
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    await browser.close();
    throw error;
  }
}

async function main() {
  const clipId = '6085299';
  const outputFilename = '6085299_Infomap Model Line 3d_By_Finn_Moeller_Artlist_HD.mp4';
  
  try {
    const result = await downloadArtgridVideo(clipId, outputFilename);
    if (result) {
      console.log(`\n✅ Video is ready at: ${result}`);
    } else {
      console.log(`\n⚠️  Video was not downloaded.`);
      console.log(`   Please download it manually and save to:`);
      console.log(`   ${path.join(videosDir, outputFilename)}`);
    }
  } catch (error) {
    console.error(`\n❌ Failed: ${error.message}`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { downloadArtgridVideo };


