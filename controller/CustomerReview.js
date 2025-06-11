//add review data
const addReview = async (req, res) => {
  const { name, rating, review } = req.body;

  // Validate required fields
  if (!name || !rating) {
    return res
      .status(400)
      .json({ success: false, error: "Name and rating are required" });
  }

  // Validate rating range
  if (rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ success: false, error: "Rating must be between 1 and 5" });
  }

  try {
    // Create the review
    const newReview = await modalForCustomerReview.create({
      name,
      rating,
      review,
    });

    return res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// Get all review data
const getReview = async (req, res) => {
  try {
    const reviews = await modalForCustomerReview.findAll();

    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  addReview,
  getReview,
};
