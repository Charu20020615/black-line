import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getFeaturedPhotos } from '../../api/galleryService';
import { getImageUrl } from '../../utils/imageUtils';

export default function RanjithCustomtailer() {
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    fetchFeaturedPhotos();
  }, []);

  const fetchFeaturedPhotos = async () => {
    try {
      setLoadingGallery(true);
      const data = await getFeaturedPhotos();
      setFeaturedPhotos(data);
    } catch (error) {
      console.error('Error fetching featured photos:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-center px-12 py-20">
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-bold mb-6 leading-tight gold-text">
            Personalized Clothing<br/>Tailored Just for You
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Expert craftsmanship for formal attire and wedding essentials.
          </p>
          <button className="gold-btn px-6 py-3 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition">
            Browse Collection
          </button>
        </div>
        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <div className="grid grid-cols-2 gap-4 items-stretch">
            {/* Large suit video */}
            <video
              src="/Videos/main.mp4"
              className="col-span-1 row-span-2 rounded-xl shadow-xl w-[260px] h-[360px] md:w-[500px] md:h-[420px] object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Top-right tile */}
            <img
              src="/Images/hero1.png"
              alt="Dress Shirt"
              className="rounded-xl shadow-xl w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-cover"
            />
            {/* Bottom-right tile */}
            <img
              src="/Images/hero2.png"
              alt="Oxford Shoes"
              className="rounded-xl shadow-xl w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="text-center py-16 border-t border-[#1a1a1a]">
        <h3 className="text-3xl font-bold mb-4">Craftsmanship</h3>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Experience excellence in craftsmanship, meticulous attention to detail, and personalized service that sets us apart.
        </p>
      </section>

      {/* Signature Collection Section */}
      <section className="text-center py-16 border-t border-[#1a1a1a]">
        <h3 className="text-3xl font-bold mb-8">Our Signature Collection</h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          Discover our best-selling formalwear and accessories handcrafted for perfection.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
          {[
            {name: 'Wedding Collection', price: 'Starting from LKR 25,000', img: '/Images/wedding _collection.png', path: '/collections/wedding'},
            {name: 'Formal Wears', price: 'Starting from LKR 15,000', img: '/Images/formalwear.png', path: '/collections/formal'},
            {name: 'Accessories', price: 'Starting from LKR 3,500', img: '/Images/accessories.png', path: '/collections/accessories'}
          ].map((item) => (
            <div key={item.name} className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] hover:shadow-[0_0_15px_#d4af37] transition">
              <img src={item.img} alt={item.name} className="rounded-lg mb-4 w-full h-64 object-cover" />
              <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
              <p className="text-gray-400 mb-4">{item.price}</p>
              <Link to={item.path}>
                <button className="gold-btn px-5 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition w-full">
                  See Collection
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Our Gallery</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our exquisite collection of handcrafted formalwear and accessories.
          </p>
        </div>
        <div className="px-12">
          {loadingGallery ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Loading gallery photos...</p>
            </div>
          ) : featuredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No gallery photos available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {featuredPhotos.slice(0, 6).map((photo) => (
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
              <div className="text-center mt-8">
                <Link to="/gallery">
                  <button className="gold-btn px-8 py-3 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition">
                    View All Photos
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Make Appointment Section */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] rounded-3xl border-2 border-[#d4af37]/30 p-8 md:p-12 shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-300">
              <div className="text-center">
                <div className="inline-block mb-6">
                  <svg className="w-16 h-16 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold mb-4 gold-text">Book Your Appointment</h3>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Experience personalized tailoring service. Schedule a consultation with our expert craftsmen to create your perfect ensemble.
                </p>
                <button className="gold-btn px-8 py-4 rounded-lg text-lg font-semibold hover:from-[#d4af37] hover:to-[#ffd666] transition transform hover:scale-105 shadow-lg">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
