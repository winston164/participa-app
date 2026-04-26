const sharp = require('sharp');
const path = require('path');

const iosIconDir = path.join(__dirname, '..', 'ios', 'Runner', 'Assets.xcassets', 'AppIcon.appiconset');

// Simple placeholder logo SVG with a "P" letter
const createLogoSvg = (size) => {
  const bgColor = '#2E7D6B';
  const letterColor = '#FFFFFF';
  const radius = Math.round(size * 0.1875); // 18.75% for rounded corners

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${bgColor}"/>
    <text x="${size/2}" y="${size * 0.66}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size * 0.55}" font-weight="bold" fill="${letterColor}">P</text>
  </svg>`;
};

// iOS icon specifications
const iosIcons = [
  { name: 'Icon-App-20x20@1x.png', size: 20 },
  { name: 'Icon-App-20x20@2x.png', size: 40 },
  { name: 'Icon-App-20x20@3x.png', size: 60 },
  { name: 'Icon-App-29x29@1x.png', size: 29 },
  { name: 'Icon-App-29x29@2x.png', size: 58 },
  { name: 'Icon-App-29x29@3x.png', size: 87 },
  { name: 'Icon-App-40x40@1x.png', size: 40 },
  { name: 'Icon-App-40x40@2x.png', size: 80 },
  { name: 'Icon-App-40x40@3x.png', size: 120 },
  { name: 'Icon-App-60x60@2x.png', size: 120 },
  { name: 'Icon-App-60x60@3x.png', size: 180 },
  { name: 'Icon-App-76x76@1x.png', size: 76 },
  { name: 'Icon-App-76x76@2x.png', size: 152 },
  { name: 'Icon-App-83.5x83.5@2x.png', size: 167 },
  { name: 'Icon-App-1024x1024@1x.png', size: 1024 },
];

async function generateIosIcons() {
  console.log('Generating iOS app icons...');

  for (const icon of iosIcons) {
    const svg = createLogoSvg(icon.size);
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(iosIconDir, icon.name));
    console.log(`Created ${icon.name}`);
  }

  console.log('All iOS icons generated!');
}

generateIosIcons().catch(console.error);
