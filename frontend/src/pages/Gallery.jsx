import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getGalleryPhotos } from '../api/galleryService';
import { getImageUrl } from '../utils/imageUtils';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-sans">
      <Navbar />

      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 gold-text">Our Gallery</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our exquisite collection of handcrafted formalwear and accessories.
          </p>
        </div>
        <div className="px-12">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Loading gallery photos...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No gallery photos available at the moment.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {photos.map((photo) => (
                <div key={photo._id} className="break-inside-avoid mb-6 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl border-2 border-[#2a2a2a] hover:border-[#d4af37] transition-all duration-300">
                    <img 
                      src={getImageUrl(photo.imageUrl)} 
                      alt="Gallery" 
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

