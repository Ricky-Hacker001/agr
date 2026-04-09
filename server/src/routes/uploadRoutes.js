// src/routes/uploadRoutes.js
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// 1. Tell Cloudinary where to put the files
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'arg_school_images', // This creates a neat folder in your Cloudinary dashboard
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
  },
});

// 2. Set up the Multer middleware to catch the 'image' file
const upload = multer({ storage: storage });

// 3. The actual API Route (POST /api/upload)
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    // Success! req.file.path contains the brand new Cloudinary URL.
    // We send ONLY the URL string back to the frontend.
    res.json({ 
      success: true,
      imageUrl: req.file.path 
    });
    
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

export default router;