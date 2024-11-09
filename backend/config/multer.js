const multer = require('multer');
const path = require('path');

// Allowed MIME types for images
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

// Storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  }
});

// File filter function to restrict file types
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed!'), false); // Reject invalid file types
  }
};

// Initialize multer with options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 2MB file size limit
});

module.exports = upload;
