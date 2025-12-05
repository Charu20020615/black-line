import React, { useState, useEffect } from 'react';
import { getGalleryPhotos, createGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto } from '../../api/galleryService';
import { uploadSingleImage } from '../../api/uploadService';
import { getImageUrl } from '../../utils/imageUtils';

export default function GalleryManagement() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const data = await getGalleryPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      alert('Failed to fetch gallery photos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Only image files (JPEG, PNG, GIF, WEBP) are allowed.');
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert(`File size is too large. Maximum file size is 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`);
      e.target.value = ''; // Clear the input
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    setUploading(true);
    try {
      // Upload image
      const uploadResult = await uploadSingleImage(selectedFile);
      const imageUrl = uploadResult.file;

      // Create gallery photo entry
      await createGalleryPhoto(imageUrl, false, 0);
      
      alert('Gallery photo added successfully!');
      resetForm();
      fetchPhotos();
    } catch (error) {
      console.error('Error adding gallery photo:', error);
      if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Failed to add gallery photo');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleToggleFeatured = async (photo) => {
    try {
      await updateGalleryPhoto(photo._id, {
        featured: !photo.featured,
        order: photo.order
      });
      alert('Photo updated successfully!');
      fetchPhotos();
    } catch (error) {
      console.error('Error updating photo:', error);
      if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Failed to update photo');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      try {
        await deleteGalleryPhoto(id);
        alert('Gallery photo deleted successfully!');
        fetchPhotos();
      } catch (error) {
        console.error('Error deleting photo:', error);
        alert('Failed to delete gallery photo');
      }
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setShowForm(false);
  };

  const featuredCount = photos.filter(p => p.featured).length;

  return (
    <div className="p-6 bg-[#0a0a0a] text-[#d4af37] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-gray-400 text-sm mt-2">
            Featured photos: {featuredCount}/6 (Only featured photos appear on homepage)
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="gold-btn px-6 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition"
        >
          {showForm ? 'Cancel' : 'Add New Photo'}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] mb-6">
          <h2 className="text-2xl font-bold mb-4">Add New Gallery Photo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Select Image</label>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileSelect}
                required
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none mb-4"
              />
              <p className="text-gray-500 text-sm mb-4">JPEG, PNG, GIF, WEBP - Max 10MB</p>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-gray-400 text-sm mb-2">Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-64 object-cover rounded-lg border border-[#2a2a2a]"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="gold-btn px-6 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Add Photo'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-400">Loading gallery photos...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No gallery photos yet. Add your first photo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo._id}
              className={`bg-[#111111] p-4 rounded-2xl border-2 ${
                photo.featured ? 'border-[#d4af37] shadow-[0_0_15px_#d4af37]' : 'border-[#2a2a2a]'
              }`}
            >
              <div className="relative">
                <img
                  src={getImageUrl(photo.imageUrl)}
                  alt="Gallery"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                {photo.featured && (
                  <div className="absolute top-2 right-2 bg-[#d4af37] text-black px-2 py-1 rounded text-xs font-bold">
                    Featured
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleToggleFeatured(photo)}
                  className={`px-4 py-2 rounded-lg transition ${
                    photo.featured
                      ? 'bg-[#d4af37] text-black hover:bg-[#ffd666]'
                      : 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                  }`}
                >
                  {photo.featured ? 'Unfeature' : 'Mark as Featured'}
                </button>
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

