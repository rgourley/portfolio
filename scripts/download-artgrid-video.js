const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create videos directory if it doesn't exist
const videosDir = path.join(process.cwd(), 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

async function downloadVideo(url, outputFilename) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(videosDir, outputFilename);
    
    // Check if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`File already exists: ${outputFilename}`);
      resolve(outputPath);
      return;
    }

    const client = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'video/mp4,video/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://artgrid.io/',
      }
    };

    console.log(`Downloading from: ${url}`);
    console.log(`Saving to: ${outputFilename}`);

    const req = client.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirects
        return downloadVideo(res.headers.location, outputFilename)
          .then(resolve)
          .catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode} ${res.statusMessage}`));
        return;
      }

      const totalSize = parseInt(res.headers['content-length'], 10);
      let downloadedSize = 0;

      const fileStream = fs.createWriteStream(outputPath);
      
      res.on('data', (chunk) => {
        downloadedSize += chunk.length;
        if (totalSize) {
          const percent = ((downloadedSize / totalSize) * 100).toFixed(1);
          process.stdout.write(`\rProgress: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(2)}MB / ${(totalSize / 1024 / 1024).toFixed(2)}MB)`);
        }
      });

      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`\n✓ Downloaded: ${outputFilename}`);
        console.log(`  Size: ${(downloadedSize / 1024 / 1024).toFixed(2)}MB`);
        resolve(outputPath);
      });

      fileStream.on('error', (err) => {
        fs.unlinkSync(outputPath);
        reject(err);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

async function getArtgridVideoUrl(clipId) {
  // Artgrid video URLs typically follow this pattern, but may require authentication
  // You'll need to get the actual download URL from Artgrid's interface
  
  console.log(`\nTo download from Artgrid, you need to:`);
  console.log(`1. Log into your Artgrid account`);
  console.log(`2. Navigate to: https://artgrid.io/clip/${clipId}/infomap-model-line-3d`);
  console.log(`3. Click the download button to get the direct download URL`);
  console.log(`4. Run this script with the direct download URL\n`);
  
  return null;
}

async function main() {
  const clipId = '6085299';
  const outputFilename = '6085299_Infomap Model Line 3d_By_Finn_Moeller_Artlist_HD.mp4';
  
  // Check if user provided a direct download URL
  const downloadUrl = process.argv[2];
  
  if (!downloadUrl) {
    console.log('Artgrid Video Downloader');
    console.log('========================\n');
    console.log(`Clip ID: ${clipId}`);
    console.log(`Output: ${outputFilename}\n`);
    
    await getArtgridVideoUrl(clipId);
    
    console.log('Usage:');
    console.log('  node scripts/download-artgrid-video.js <direct-download-url>');
    console.log('\nExample:');
    console.log('  node scripts/download-artgrid-video.js "https://cdn.artgrid.io/videos/6085299/download.mp4"');
    console.log('\nNote: You need to get the direct download URL from Artgrid after logging in.');
    return;
  }
  
  try {
    await downloadVideo(downloadUrl, outputFilename);
    console.log('\n✓ Video downloaded successfully!');
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    console.log('\nTips:');
    console.log('- Make sure you have access to the video on Artgrid');
    console.log('- The download URL should be the direct link (not the preview page)');
    console.log('- You may need to be logged into Artgrid in your browser');
    console.log('- Try right-clicking the download button and copying the link address');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { downloadVideo };



