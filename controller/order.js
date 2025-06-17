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
    items, // <-- Array of { productId, price, quantity, totalAmount }
  } = req.body;

  if (
    !userId ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !apt ||
    !city ||
    !state ||
    !postalCode ||
    !paymentMethod ||
    !totalPrice ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  const t = await modalForOrder.sequelize.transaction();
  try {
    // 1. Create the order
    const newOrder = await modalForOrder.create(
      {
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
      },
      { transaction: t }
    );

    // 2. Create order items
    const orderItems = await Promise.all(
      items.map((item) =>
        modalForOrderItem.create(
          {
            orderId: newOrder.orderId,
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
            totalAmount: item.totalAmount,
          },
          { transaction: t }
        )
      )
    );

    // 3. Delete cart items after order creation
    await modalForCart.destroy({ where: { userId }, transaction: t });

    // 4. Commit transaction
    await t.commit();

    res.status(201).json({ success: true, order: newOrder, orderItems });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ success: false, error: error.message });
  }
};

//get order by userId
const getOrderByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await modalForOrder.findAll({
      where: { userId },
      attributes: [
        "orderId",
        "userId",
        "status",
        "totalPrice",
        "paymentStatus",
        "address",
        "firstName",
        "phone",
      ],
      include: [
        {
          model: modalForOrderItem,
          attributes: ["orderItemId", "totalAmount"],
          include: [
            {
              model: modalForProduct,
              attributes: ["productId", "name", "size", "discountedPrice"],
              include: [
                {
                  model: modalForImage,
                  attributes: ["imageId", "image_path"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    // Reshape the data
    const simpleOrders = orders.map((order) => {
      const items = order.orderitems.map((item) => ({
        orderItemId: item.orderItemId,
        productId: item.product.productId,
        name: item.product.name,
        size: item.product.size,
        discountedPrice: item.product.discountedPrice,
        image: item.product.images.map((img) => img.image_path),
      }));

      const subtotal = order.orderitems.reduce(
        (sum, item) => sum + item.totalAmount,
        0
      );

      return {
        orderId: order.orderId,
        userId: order.userId,
        status: order.status,
        totalPrice: order.totalPrice,
        paymentStatus: order.paymentStatus,
        shippingAddress: {
          name: order.firstName,
          address: order.address,
          phone: order.phone,
        },
        subtotal, // Moved outside
        items,
        shipping: 20.0,
        tax: 20.0,      
      };
    });

    res.status(200).json({ success: true, data: simpleOrders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await modalForOrder.findAll({
      include: [{ model: modalForOrderItem }],
    });

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//delete order by ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await modalForOrder.findByPk(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await order.destroy();
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//update status of order by ID
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, error: "Status is required" });
  }

  try {
    const order = await modalForOrder.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await modalForOrder.findByPk(orderId, {
      include: [{ model: modalForOrderItem }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addOrder,
  getOrderByUserId,
  getAllOrders,
  deleteOrder,
  updateOrder,
  getOrderById,
};
