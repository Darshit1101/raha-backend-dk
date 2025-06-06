//add to wishlist api
const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const wishlistItem = await modalForWishlist.create({
      userId,
      productId,
    });

    res
      .status(201)
      .json({
        message: "Item added to wishlist successfully",
        data: wishlistItem,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get wishlist items for a user
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlistItems = await modalForWishlist.findAll({
      where: { userId },
      include: [{ model: modalForProduct, as: "product" }],
    });

    if (wishlistItems.length === 0) {
      return res.status(404).json({ message: "No items found in wishlist" });
    }

    res.status(200).json({ success: true, data: wishlistItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete a wishlist item by ID
const deleteWishlistItem = async (req, res) => {
  const { id } = req.params;

  try {
    const wishlistItem = await modalForWishlist.findByPk(id);

    if (!wishlistItem) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist item not found" });
    }

    await wishlistItem.destroy();
    res
      .status(200)
      .json({ success: true, message: "Wishlist item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  deleteWishlistItem,
};
