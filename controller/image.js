async function saveImagePath(filePath, productId) {
  return await modalForImage.create({
    image_path: filePath,
    productId: productId,
  });
}

async function uploadImage(req, res) {
  try {
    const {productId} = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const saved = await saveImagePath(req.file.originalname, productId);
    res.json({ message: "Image uploaded", id: saved.imageId });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
}

module.exports = {
  uploadImage,
};
