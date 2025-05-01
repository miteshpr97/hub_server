const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Route to create a single product
router.post('/products', productController.createProduct);

// Route to add multiple products
router.post('/products/multiple', productController.createMultipleProducts);


router.get('/products', productController.getAllProducts);

module.exports = router;
