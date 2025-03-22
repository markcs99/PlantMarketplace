const fs = require('fs');
const https = require('https');
const path = require('path');

// Define the image URLs to download
const images = [
  // Plant images
  {
    url: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=800',
    path: './public/images/plants/monstera.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=800',
    path: './public/images/plants/snake-plant.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/1470171/pexels-photo-1470171.jpeg?auto=compress&cs=tinysrgb&w=800',
    path: './public/images/plants/echeveria.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
    path: './public/images/plants/philodendron.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=800',
    path: './public/images/plants/aloe.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg?auto=compress&cs=tinysrgb&w=800',
    path: './public/images/plants/tradescantia.jpg'
  },
  // Seller avatars
  {
    url: 'https://randomuser.me/api/portraits/women/68.jpg',
    path: './public/images/avatars/seller1.jpg'
  },
  {
    url: 'https://randomuser.me/api/portraits/men/45.jpg',
    path: './public/images/avatars/seller2.jpg'
  }
];

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
      
      file.on('error', err => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', err => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Create directories if they don't exist
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

// Download all images
async function downloadAllImages() {
  for (const image of images) {
    try {
      ensureDirectoryExists(image.path);
      await downloadImage(image.url, image.path);
    } catch (error) {
      console.error(`Error downloading ${image.url}: ${error.message}`);
    }
  }
  console.log('All images downloaded successfully!');
}

// Start downloading
downloadAllImages(); 