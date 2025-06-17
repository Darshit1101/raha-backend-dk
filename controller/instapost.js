//upload insta post
const uploadPost = async (req, res) => {
  try {
    const { link } = req.body;
    const image = req.file?.filename;
    
    if (!image || !link) {
      return res.status(400).json({ success: false, message: 'Image and link are required' });
    }

    const newPost = await modalForInstaPost.create({ image, link });
    res.status(201).json({ success: true, message: 'Instagram post uploaded successfully', data: newPost });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

//get all insta posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await modalForInstaPost.findAll();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

//delete post
const deletepost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await modalForInstaPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    await post.destroy();
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

//update post
const updateUploadPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { link } = req.body;
    const post = await modalForInstaPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (req.file) {
      post.image = req.file.filename;
    }
    if (link) {
      post.link = link;
    }
    await post.save();
    res.status(200).json({ success: true, message: 'Post updated successfully', data: post });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

module.exports = {
  uploadPost,
  getAllPosts,
  deletepost,
  updateUploadPost
};
