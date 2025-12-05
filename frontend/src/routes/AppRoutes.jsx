import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import Reports from '../pages/Dashboard/Reports';
import StaffList from '../pages/Staff/StaffList';
import AddStaff from '../pages/Staff/AddStaff';
import WeddingCollection from '../pages/Collections/WeddingCollection';
import FormalWears from '../pages/Collections/FormalWears';
import Accessories from '../pages/Collections/Accessories';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import ProductManagement from '../pages/Admin/ProductManagement';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import GalleryManagement from '../pages/Admin/GalleryManagement';
import Gallery from '../pages/Gallery';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard/reports" element={<ProtectedRoute requireAdmin><Reports /></ProtectedRoute>} />
      <Route path="/dashboard/products" element={<ProtectedRoute requireAdmin><ProductManagement /></ProtectedRoute>} />
      <Route path="/dashboard/gallery" element={<ProtectedRoute requireAdmin><GalleryManagement /></ProtectedRoute>} />

      <Route path="/staff" element={<ProtectedRoute requireAdmin><StaffList /></ProtectedRoute>} />
      <Route path="/staff/add" element={<ProtectedRoute requireAdmin><AddStaff /></ProtectedRoute>} />

      {/* Collection Pages */}
      <Route path="/collections/wedding" element={<WeddingCollection />} />
      <Route path="/collections/formal" element={<FormalWears />} />
      <Route path="/collections/accessories" element={<Accessories />} />

      {/* Cart & Checkout */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Gallery */}
      <Route path="/gallery" element={<Gallery />} />

      <Route path="/" element={<DashboardHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


