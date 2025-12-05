import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/productService';
import { uploadImages } from '../../api/uploadService';
import { getImageUrl } from '../../utils/imageUtils';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
    category: 'wedding',
    sizes: [],
    colors: [],
    stock: 0,
    status: 'active'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only image files (JPEG, PNG, GIF, WEBP) are allowed.');
    }

    setSelectedFiles([...selectedFiles, ...validFiles]);

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imagePaths = [];

      // If editing and no new files selected, use existing images
      if (editingProduct && selectedFiles.length === 0) {
        imagePaths = formData.images;
      } else {
        // Upload new files if any
        if (selectedFiles.length > 0) {
          const uploadResult = await uploadImages(selectedFiles);
          imagePaths = uploadResult.files;
          
          // If editing, combine with existing images
          if (editingProduct && formData.images.length > 0) {
            imagePaths = [...formData.images, ...imagePaths];
          }
        } else if (!editingProduct) {
          // New product must have at least one image
          alert('Please select at least one image');
          setUploading(false);
          return;
        }
      }

      // Validate that at least one image is provided
      if (imagePaths.length === 0) {
        alert('Please provide at least one image');
        setUploading(false);
        return;
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: imagePaths,
        category: formData.category,
        sizes: formData.sizes || [],
        colors: formData.colors || [],
        status: formData.status
      };

      // Validate price and stock
      if (isNaN(productData.price) || productData.price < 0) {
        alert('Please enter a valid price');
        setUploading(false);
        return;
      }

      if (isNaN(productData.stock) || productData.stock < 0) {
        alert('Please enter a valid stock quantity');
        setUploading(false);
        return;
      }

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        alert('Product updated successfully!');
      } else {
        await createProduct(productData);
        alert('Product created successfully!');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      
      // Show detailed error message
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } else if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Failed to save product. Please check all fields are filled correctly.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images || [],
      category: product.category,
      sizes: product.sizes || [],
      colors: product.colors || [],
      stock: product.stock,
      status: product.status
    });
    // Reset file selection and previews when editing
    setSelectedFiles([]);
    setImagePreviews([]);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      images: [],
      category: 'wedding',
      sizes: [],
      colors: [],
      stock: 0,
      status: 'active'
    });
    setSelectedFiles([]);
    setImagePreviews([]);
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-[#0a0a0a] text-[#d4af37] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="gold-btn px-6 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Price (LKR)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none"
              >
                <option value="wedding">Wedding Collection</option>
                <option value="formal">Formal Wears</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Product Images</label>
              
              {/* File Input */}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                multiple
                onChange={handleFileSelect}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none mb-4"
              />
              <p className="text-gray-500 text-sm mb-4">You can select multiple images (JPEG, PNG, GIF, WEBP - Max 5MB each)</p>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-[#2a2a2a]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Existing Images (when editing) */}
              {editingProduct && formData.images.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Existing Images:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={getImageUrl(img)}
                          alt={`Existing ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-[#2a2a2a]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:border-[#d4af37] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="gold-btn px-6 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Create Product'}
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
          <p className="text-gray-400">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a]"
            >
              <img
                src={getImageUrl(product.images?.[0], '/Images/accessories.png')}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
              <p className="text-[#d4af37] font-bold mb-2">LKR {product.price.toLocaleString()}</p>
              <p className="text-gray-400 text-sm mb-4">
                Category: {product.category} | Stock: {product.stock} | Status: {product.status}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 px-4 py-2 bg-[#2a2a2a] hover:bg-[#d4af37] rounded-lg transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
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

