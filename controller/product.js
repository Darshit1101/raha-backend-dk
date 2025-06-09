// add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      actualPrice,
      discountedPrice,
      size,
      stockQuantity,
      benefits,
      ingredients,
      howToUse,
    } = req.body;

    if (!name || !description || !actualPrice || stockQuantity === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Parse JSON string arrays
    const benefitsParsed = benefits ? JSON.parse(benefits) : null;
    const howToUseParsed = howToUse ? JSON.parse(howToUse) : null;

    const newProduct = await modalForProduct.create({
      name,
      description,
      actualPrice,
      discountedPrice,
      size,
      stockQuantity,
      benefits: benefitsParsed,
      ingredients,
      howToUse: howToUseParsed,
    });

    res.status(201).json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await modalForProduct.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await product.destroy();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await modalForProduct.findAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await modalForProduct.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// update product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    actualPrice,
    discountedPrice,
    size,
    stockQuantity,
    benefits,
    ingredients,
    howToUse,
  } = req.body;

  try {
    const product = await modalForProduct.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await product.update({
      name,
      description,
      actualPrice,
      discountedPrice,
      size,
      stockQuantity,
      benefits,
      ingredients,
      howToUse,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
