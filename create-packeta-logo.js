const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, 'public', 'images', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Create a simple square orange PNG for Packeta
try {
  // Create a canvas with the desired dimensions
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // Draw orange background
  ctx.fillStyle = '#ff6818';
  ctx.beginPath();
  ctx.roundRect(0, 0, 200, 200, 15);
  ctx.fill();

  // Draw white cross
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  
  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(50, 100);
  ctx.lineTo(150, 100);
  ctx.stroke();
  
  // Vertical line
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(100, 150);
  ctx.stroke();

  // Convert canvas to PNG buffer
  const buffer = canvas.toBuffer('image/png');
  
  // Save the buffer to a PNG file
  fs.writeFileSync(path.join(logosDir, 'packeta-logo.png'), buffer);
  
  console.log('Packeta logo PNG created successfully!');
} catch (error) {
  console.error('Failed to create PNG:', error.message);
  
  // Fallback to create a simple text file explaining how to create the logo
  fs.writeFileSync(
    path.join(logosDir, 'packeta-logo-instructions.txt'),
    'Please create a 200x200 orange (#ff6818) square with rounded corners and a white cross in the center.'
  );
  console.log('Created instructions file instead.');
} 