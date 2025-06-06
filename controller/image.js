async function saveImagePath(filePath) {
  return await modalForImage.create({ image_path: filePath });
}

async function uploadImage(req, res) {
  try {
    const saved = await saveImagePath(req.file.filename);
    res.json({ message: "Image uploaded", id: saved.id });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
}

module.exports = {
  uploadImage,
};
