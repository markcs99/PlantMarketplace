const fs = require('fs');
const path = require('path');
const https = require('https');

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, 'public', 'images', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// URL of the Packeta logo from Vinted
const logoUrl = 'https://carrier-assets.vinted.com/icons/packeta_shop_hu@3x.png';

// Download the image
https.get(logoUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download logo: Status code ${response.statusCode}`);
    return;
  }

  // Create a file stream and pipe the response to it
  const logoPath = path.join(logosDir, 'packeta-logo.png');
  const fileStream = fs.createWriteStream(logoPath);
  
  response.pipe(fileStream);
  
  // Handle events
  fileStream.on('finish', () => {
    console.log(`Packeta logo downloaded successfully to ${logoPath}`);
    fileStream.close();
  });
  
  fileStream.on('error', (err) => {
    console.error('Error saving the logo:', err.message);
    fs.unlinkSync(logoPath); // Delete the file if there was an error
  });
}).on('error', (err) => {
  console.error('Error downloading the logo:', err.message);
}); 