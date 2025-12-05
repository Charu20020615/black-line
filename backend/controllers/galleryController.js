import Gallery from '../models/Gallery.js';

export const getGalleryPhotos = async (req, res) => {
  try {
    const { featured } = req.query;
    const query = {};

    if (featured === 'true') {
      query.featured = true;
    }

    const photos = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find({ featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(6);
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGalleryPhotoById = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Gallery photo not found' });
    }
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGalleryPhoto = async (req, res) => {
  try {
    const { imageUrl, featured, order } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    // If setting as featured, check if we already have 6 featured photos
    if (featured) {
      const featuredCount = await Gallery.countDocuments({ featured: true });
      if (featuredCount >= 6) {
        return res.status(400).json({ 
          message: 'Maximum 6 featured photos allowed. Please unfeature another photo first.' 
        });
      }
    }

    const photo = await Gallery.create({
      imageUrl,
      featured: featured || false,
      order: order || 0
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGalleryPhoto = async (req, res) => {
  try {
    const { featured, order } = req.body;

    // If setting as featured, check if we already have 6 featured photos
    if (featured) {
      const currentPhoto = await Gallery.findById(req.params.id);
      if (!currentPhoto) {
        return res.status(404).json({ message: 'Gallery photo not found' });
      }

      // Only check limit if this photo wasn't already featured
      if (!currentPhoto.featured) {
        const featuredCount = await Gallery.countDocuments({ featured: true });
        if (featuredCount >= 6) {
          return res.status(400).json({ 
            message: 'Maximum 6 featured photos allowed. Please unfeature another photo first.' 
          });
        }
      }
    }

    const photo = await Gallery.findByIdAndUpdate(
      req.params.id,
      { featured, order },
      { new: true, runValidators: true }
    );

    if (!photo) {
      return res.status(404).json({ message: 'Gallery photo not found' });
    }

    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryPhoto = async (req, res) => {
  try {
    const photo = await Gallery.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Gallery photo not found' });
    }
    res.json({ message: 'Gallery photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

