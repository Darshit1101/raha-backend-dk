// add single contact
const addContact = async (req, res) => {
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

//get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await modalForContact.findAll();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete a contact by ID
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await modalForContact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    await contact.destroy();
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addContact,
  getAllContacts,
  deleteContact
};