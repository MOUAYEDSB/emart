const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer'); // Import multer configuration

// CRUD Routes for products
router.post('/', upload.array('images', 10), productController.createProduct); // Create a new product with up to 10 images
router.get('/', productController.getProducts); // Get all products
router.get('/:id', productController.getProductById); // Get a product by ID
router.put('/:id', upload.array('images', 10), productController.updateProduct); // Update a product by ID
router.delete('/:id', productController.deleteProduct); // Delete a product by ID

module.exports = router;
