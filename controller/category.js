//add category api
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await modalForCategory.create({
      name,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error to add category" });
    console.log(error);
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await modalForCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error to fetch categories" });
    console.log(error);
  }
};

//delete category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await modalForCategory.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error to delete category" });
    console.log(error);
  }
};

//update category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await modalForCategory.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error to update category" });
    console.log(error);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory
};
