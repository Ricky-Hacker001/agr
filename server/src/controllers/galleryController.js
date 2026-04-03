import Gallery from '../models/Gallery.js';

const shape = (g) => ({
  id:         g._id.toString(),
  title:      g.title,
  category:   g.category,
  url:        g.url,
  uploadedAt: g.uploadedAt,
  pdfUrl:     g.pdfUrl ?? '',
});

export const getGallery = async (_req, res) => {
  try {
    const items = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(items.map(shape));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(shape(item));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { id: _id, galleryId: _gid, ...data } = req.body;
    const item = await Gallery.create(data);
    res.status(201).json(shape(item));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id: _id, galleryId: _gid, ...data } = req.body;
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(shape(item));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
