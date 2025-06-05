const contactController = async (req, res) => {
  const { name, email, phone, type, message } = req.body;

  try {
    const newInquiry = await modalForContact.create({
      name,
      email,
      phone,
      type,
      message,
    });

    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default {
  contactController,
};
