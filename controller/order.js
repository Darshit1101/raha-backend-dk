//add order data
const addOrder = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    email,
    phone,
    address,
    apt,
    city,
    state,
    postalCode,
    paymentMethod,
    totalPrice,
    items // <-- Array of { productId, price, quantity, totalAmount }
  } = req.body;

  if (
    !userId || !firstName || !lastName || !email || !phone ||
    !address || !apt || !city || !state || !postalCode ||
    !paymentMethod || !totalPrice || !Array.isArray(items) || items.length === 0
  ) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const t = await modalForOrder.sequelize.transaction();
  try {
    // 1. Create the order
    const newOrder = await modalForOrder.create({
      userId,
      firstName,
      lastName,
      email,
      phone,
      address,
      apt,
      city,
      state,
      postalCode,
      paymentMethod,
      totalPrice,
    }, { transaction: t });

    // 2. Create order items
    const orderItems = await Promise.all(
      items.map(item =>
        modalForOrderItem.create({
          orderId: newOrder.orderId,
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
          totalAmount: item.totalAmount,
        }, { transaction: t })
      )
    );

    await t.commit();
    res.status(201).json({ success: true, order: newOrder, orderItems });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addOrder,
};
