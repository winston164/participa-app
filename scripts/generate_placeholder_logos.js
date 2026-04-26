const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets');

// Simple placeholder logo SVG with a "P" letter
const createLogoSvg = (size, withBackground = true) => {
  const bgColor = '#2E7D6B';
  const letterColor = '#FFFFFF';
  const radius = Math.round(size * 0.1875); // 18.75% for rounded corners

  if (withBackground) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${bgColor}"/>
      <text x="${size/2}" y="${size * 0.66}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size * 0.55}" font-weight="bold" fill="${letterColor}">P</text>
    </svg>`;
  } else {
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <text x="${size/2}" y="${size * 0.66}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size * 0.55}" font-weight="bold" fill="${bgColor}">P</text>
    </svg>`;
  }
};

// Banner SVG with "Participa" text
const createBannerSvg = (width, height, transparent = false) => {
  const bgColor = '#2E7D6B';
  const letterColor = transparent ? bgColor : '#FFFFFF';

  const bgRect = transparent ? '' : `<rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}"/>`;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    ${bgRect}
    <text x="${width/2}" y="${height * 0.65}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${height * 0.4}" font-weight="bold" fill="${letterColor}">Participa</text>
  </svg>`;
};

async function generateLogos() {
  console.log('Generating placeholder logos...');

  // Main logo (567x567)
  await sharp(Buffer.from(createLogoSvg(567, true)))
    .png()
    .toFile(path.join(assetsDir, 'logo.png'));
  console.log('Created logo.png');

  // Transparent logo
  await sharp(Buffer.from(createLogoSvg(567, false)))
    .png()
    .toFile(path.join(assetsDir, 'logo_transparent.png'));
  console.log('Created logo_transparent.png');

  // Favicon (256x256)
  await sharp(Buffer.from(createLogoSvg(256, true)))
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));
  console.log('Created favicon.png');

  // Info logo (512x512)
  await sharp(Buffer.from(createLogoSvg(512, true)))
    .png()
    .toFile(path.join(assetsDir, 'info-logo.png'));
  console.log('Created info-logo.png');

  // Banner (500x200)
  await sharp(Buffer.from(createBannerSvg(500, 200, false)))
    .png()
    .toFile(path.join(assetsDir, 'banner.png'));
  console.log('Created banner.png');

  // Banner transparent
  await sharp(Buffer.from(createBannerSvg(500, 200, true)))
    .png()
    .toFile(path.join(assetsDir, 'banner_transparent.png'));
  console.log('Created banner_transparent.png');

  console.log('All asset logos generated!');
}

generateLogos().catch(console.error);
