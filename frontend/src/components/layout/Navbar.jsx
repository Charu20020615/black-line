import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-6 border-b border-[#1a1a1a]">
      <img src="/Images/Logo.png" alt="Black Line Exclusive" className="h-10 w-40 sm:h-12 sm:w-48 lg:h-14 lg:w-56 object-contain" />
      <ul className="flex space-x-8">
        <li><Link to="/" className="gold-text transition hover:opacity-90">Home</Link></li>
        <li><Link to="/shop" className="gold-text transition hover:opacity-90">Shop</Link></li>
        <li><Link to="/about" className="gold-text transition hover:opacity-90">About Us</Link></li>
      </ul>
      <button className="gold-btn px-5 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition">
        Shop Now
      </button>
    </nav>
  );
}


