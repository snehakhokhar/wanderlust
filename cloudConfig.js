const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV', // The folder in Cloudinary where images will be stored
   allowed_formats: ['jpg', 'png', 'jpeg'], // Correct key

  },
});
 module.exports = { storage }; // Export the storage configuration for use in other files
