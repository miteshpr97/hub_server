const Product = require('../models/productSchema'); // Assuming your Product model is in the 'models' directory

// Create a single product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, image, price } = req.body;

    const newProduct = new Product({
      title,
      description,
      image,
      price
    });

    await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating product',
      error: err.message
    });
  }
};

// Add multiple products
exports.createMultipleProducts = async (req, res) => {
    console.log("dhdh");
    
  try {
    const products = req.body; // Expecting an array of products

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: 'Please provide an array of products'
      });
    }

    // Create an array of new product documents
    const newProducts = await Product.insertMany(products);

    res.status(201).json({
      message: `${newProducts.length} products added successfully`,
      products: newProducts
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error adding products',
      error: err.message
    });
  }
};

exports.getAllProducts = async (req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({
            message: 'Products fetched successfully',
            products: products
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching products',
            error: err.message
        });
    }
}
