//upload insta post
const uploadPost = async (req, res) => {
  try {
    const { link } = req.body;
    const image = req.file?.filename;

    if (!image || !link) {
      return res.status(400).json({
        success: false,
        message: 'Image and link are required'
      });
    }

    const newPost = await modalForInstaPost.create({
      image,
      link
    });

    res.status(201).json({
      success: true,
      message: 'Instagram post uploaded successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

//get all insta posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await modalForInstaPost.findAll();
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

module.exports = {
  uploadPost,
  getAllPosts
};
