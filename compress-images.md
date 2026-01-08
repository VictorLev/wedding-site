# Image Compression Guide

## Critical Images That Need Compression

Your website has extremely large images that are causing slow load times. Here's what needs to be fixed:

### **Urgent - Extremely Large Images:**

1. **faqbg.jpg** - 39MB → Target: ~500KB max
2. **lake.jpg** - 20MB → Target: ~800KB max
3. **archive/home-1.jpg** - 17MB → Target: ~1MB max
4. **story-1.jpg** - 6.5MB → Target: ~500KB max
5. **story-2.jpg** - 5.4MB → Target: ~500KB max
6. **manoir.png** - 3.0MB → Target: ~300KB max
7. **story-7.jpg** - 3.2MB → Target: ~500KB max
8. **home.jpg** - 2.6MB → Target: ~500KB max
9. **story-5.jpg** - 2.6MB → Target: ~500KB max
10. **home-1.jpg** - 2.3MB → Target: ~500KB max
11. **story-4.jpg** - 2.1MB → Target: ~500KB max
12. **story-6.jpg** - 2.1MB → Target: ~500KB max
13. **home-3.jpg** - 1.6MB → Target: ~500KB max

## Compression Options

### Option 1: Online Tool (Easiest)
1. Go to https://tinypng.com or https://squoosh.app
2. Upload your images
3. Download the compressed versions
4. Replace the originals in `/src/public/images/`

### Option 2: Using ImageMagick (Recommended for batch)
```bash
# Install ImageMagick if not already installed
# Ubuntu/WSL:
sudo apt-get install imagemagick

# macOS:
brew install imagemagick

# Compress all JPG images to 85% quality
cd /home/victor/projects/wedding-site/src/public/images
for img in *.jpg; do
  convert "$img" -quality 85 -strip "compressed-$img"
done

# For PNG images
for img in *.png; do
  convert "$img" -quality 85 -strip "compressed-$img"
done
```

### Option 3: Using sharp (Node.js - Best Quality)
```bash
# Install sharp
npm install sharp --save-dev

# Run compression script (see below)
node compress-images.js
```

Create `compress-images.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const imagesDir = './src/public/images';

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const outputPath = filePath;

  try {
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath + '.tmp');
      await fs.rename(outputPath + '.tmp', outputPath);
      console.log(`✓ Compressed: ${path.basename(filePath)}`);
    } else if (ext === '.png') {
      await sharp(filePath)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(outputPath + '.tmp');
      await fs.rename(outputPath + '.tmp', outputPath);
      console.log(`✓ Compressed: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`✗ Error compressing ${filePath}:`, error.message);
  }
}

async function compressAll() {
  const files = await fs.readdir(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stat = await fs.stat(filePath);

    if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
      await compressImage(filePath);
    }
  }

  console.log('\\n✓ All images compressed!');
}

compressAll().catch(console.error);
```

## What I've Already Optimized

✅ **Next.js Image Configuration**
- Added WebP and AVIF format support (automatic conversion)
- Configured responsive device sizes
- Set quality to 85% (good balance)

✅ **Lazy Loading**
- Story images now load lazily (only when scrolling)
- Home slideshow images load lazily (except first)
- FAQ background optimized

✅ **Responsive Sizing**
- Added proper `sizes` prop to all images
- Next.js will serve appropriately sized images

## Expected Performance Improvements

After compressing images:
- **Load time**: 15-20 seconds → 2-3 seconds
- **Total page size**: 100+ MB → 5-10 MB
- **Lighthouse score**: Will dramatically improve

## Quick Test After Compression

Run this command to see new sizes:
```bash
find /home/victor/projects/wedding-site/src/public/images -type f \\( -name "*.jpg" -o -name "*.png" \\) -exec ls -lh {} \\; | awk '{print $5, $9}' | sort -h
```
