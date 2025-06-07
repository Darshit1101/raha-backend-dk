async function saveImagePath(filePath, productId) {
  return await modalForImage.create({
    image_path: filePath,
    productId: productId,
  });
}

async function uploadImage(req, res) {
  try {
    const { productId } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const savedImages = [];

    for (const file of req.files) {
      const saved = await saveImagePath(file.originalname, productId);
      savedImages.push({ id: saved.imageId, name: file.originalname });
    }

    res.json({ message: "Images uploaded", images: savedImages });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
}

module.exports = {
  uploadImage,
};
