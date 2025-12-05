import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <nav className="flex justify-between items-center px-12 py-6 border-b border-[#1a1a1a]">
      <img src="/Images/Logo.png" alt="Black Line Exclusive" className="h-10 w-40 sm:h-12 sm:w-48 lg:h-14 lg:w-56 object-contain" />
      <ul className="flex space-x-8">
        <li><Link to="/" className="gold-text transition hover:opacity-90">Home</Link></li>
        <li><Link to="/shop" className="gold-text transition hover:opacity-90">Shop</Link></li>
        <li><Link to="/about" className="gold-text transition hover:opacity-90">About Us</Link></li>
      </ul>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <span className="text-[#d4af37] font-semibold">
            {user?.name || user?.email || 'User'}
          </span>
        ) : (
          <Link to="/login">
            <button className="gold-btn px-5 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition">
              Login
            </button>
          </Link>
        )}
        <button className="gold-btn px-5 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition">
          Shop Now
        </button>
      </div>
    </nav>
  );
}


