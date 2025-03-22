const fs = require('fs');
const https = require('https');
const path = require('path');

// Create the directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images', 'categories');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Define the image URLs for each category
const categoryImages = [
  {
    name: 'indoor.jpg',
    url: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'outdoor.jpg',
    url: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'succulents.jpg', 
    url: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'herbs.jpg',
    url: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

// Download function
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filename);
      });
      
      file.on('error', err => {
        fs.unlink(filename, () => {}); // Delete the file
        reject(err);
      });
    }).on('error', err => {
      fs.unlink(filename, () => {}); // Delete the file
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  for (const image of categoryImages) {
    const filePath = path.join(imagesDir, image.name);
    try {
      console.log(`Downloading ${image.name}...`);
      await downloadImage(image.url, filePath);
      console.log(`Downloaded ${image.name} to ${filePath}`);
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error.message);
    }
  }
  console.log('All downloads completed!');
}

// Run the download
downloadAllImages().catch(error => {
  console.error('Download process failed:', error);
}); 