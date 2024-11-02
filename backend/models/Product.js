const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    rating: {
        rate: { type: Number, required: false },  // Made optional
        count: { type: Number, required: false }  // Made optional
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
