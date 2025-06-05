//add to cart api
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const cartItem = await modalForCart.create({
      userId,
      productId,
      quantity,
    });

    res
      .status(201)
      .json({ message: "Item added to cart successfully", data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get cart items for a user
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await modalForCart.findAll({
      where: { userId },
      include: [{ model: modalForProduct, as: "product" }],
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No items found in cart" });
    }

    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete a cart item by ID
const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await modalForCart.findByPk(id);

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    await cartItem.destroy();
    res
      .status(200)
      .json({ success: true, message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteCartItem,
};
