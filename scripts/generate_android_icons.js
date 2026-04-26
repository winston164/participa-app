const sharp = require('sharp');
const path = require('path');

const resDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

// Simple placeholder logo SVG with a "P" letter
const createLogoSvg = (size) => {
  const bgColor = '#2E7D6B';
  const letterColor = '#FFFFFF';
  const radius = Math.round(size * 0.1875);

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${bgColor}"/>
    <text x="${size/2}" y="${size * 0.66}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size * 0.55}" font-weight="bold" fill="${letterColor}">P</text>
  </svg>`;
};

// Android icon specifications (legacy launcher icons)
const androidIcons = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

async function generateAndroidIcons() {
  console.log('Generating Android app icons...');

  for (const icon of androidIcons) {
    const svg = createLogoSvg(icon.size);
    const outputPath = path.join(resDir, icon.folder, 'ic_launcher.png');
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);
    console.log(`Created ${icon.folder}/ic_launcher.png (${icon.size}x${icon.size})`);
  }

  console.log('All Android icons generated!');
}

generateAndroidIcons().catch(console.error);
