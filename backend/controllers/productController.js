const Product = require('../models/Product');


// Create a new product with image upload
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: req.files ? req.files.map(file => file.path) : [], // Save multiple image paths
      rating: {
        rate: req.body.rating ? req.body.rating.rate : null,
        count: req.body.rating ? req.body.rating.count : null,
      },
    };

    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error });
  }
};

// Update product by ID with image upload handling
exports.updateProduct = async (req, res) => {
  try {
      // Log the request body for debugging
      console.log('Request Body:', req.body);

      const updateData = {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          images: req.files ? req.files.map(file => file.path) : undefined,
          rating: req.body.rating ? {
              rate: req.body.rating.rate,
              count: req.body.rating.count
          } : undefined
      };

      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });

      res.json(product);
  } catch (error) {
      console.error('Update error:', error); // Log the error details
      res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
