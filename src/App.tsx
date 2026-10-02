/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminCategories from './pages/AdminCategories';
import AdminContact from './pages/AdminContact';
import AdminProducts from './pages/AdminProducts';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import AdminDiscounts from './pages/AdminDiscounts';
import AdminSettings from './pages/AdminSettings';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import AdminBanners from './pages/AdminBanners';
import Wishlist from './pages/Wishlist';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsAppCall from './components/FloatingWhatsAppCall';
import ErrorBoundary from './components/ErrorBoundary';
import AdminLayout from './components/AdminLayout';
import CategoryProducts from './pages/CategoryProducts';

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">Loading...</div>;
  if (!user || role !== 'admin') return <Navigate to="/login" replace />;
  
  return <AdminLayout>{children}</AdminLayout>;
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-auto flex flex-col font-sans bg-[#FAF9F6] text-[#2C2C2C] m-0 p-0 relative">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
    <FloatingWhatsAppCall />
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <Routes>
            {/* Public Routes - Sri Aadhi Nayaga Tex Wholesale Textile & Saree Market */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            
            {/* Open Store Routes - Accessible without login (WhatsApp & Call Orders Only) */}
            <Route path="/categories" element={<PublicLayout><Categories /></PublicLayout>} />
            <Route path="/category/:categoryName" element={<PublicLayout><CategoryProducts /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />
            <Route path="/dashboard" element={<PublicLayout><UserDashboard /></PublicLayout>} />
            <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
            <Route path="/wishlist" element={<PublicLayout><Wishlist /></PublicLayout>} />

            {/* Online ordering disabled - Redirect directly to WhatsApp Enquiry & Shop Desk */}
            <Route path="/checkout" element={<Navigate to="/contact" replace />} />
            <Route path="/cart" element={<Navigate to="/contact" replace />} />

            {/* Admin Routes - Modern Dashboard UI with Sidebar & Topbar (NO Footer) */}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/analytics" element={<ProtectedAdminRoute><AdminAnalytics /></ProtectedAdminRoute>} />
            <Route path="/admin/products" element={<ProtectedAdminRoute><AdminProducts /></ProtectedAdminRoute>} />
            <Route path="/admin/products/add" element={<ProtectedAdminRoute><AdminAddProduct /></ProtectedAdminRoute>} />
            <Route path="/admin/products/edit/:id" element={<ProtectedAdminRoute><AdminAddProduct /></ProtectedAdminRoute>} />
            <Route path="/admin/orders" element={<ProtectedAdminRoute><AdminOrders /></ProtectedAdminRoute>} />
            <Route path="/admin/customers" element={<ProtectedAdminRoute><AdminCustomers /></ProtectedAdminRoute>} />
            <Route path="/admin/discounts" element={<ProtectedAdminRoute><AdminDiscounts /></ProtectedAdminRoute>} />
            <Route path="/admin/categories" element={<ProtectedAdminRoute><AdminCategories /></ProtectedAdminRoute>} />
            <Route path="/admin/banners" element={<ProtectedAdminRoute><AdminBanners /></ProtectedAdminRoute>} />
            <Route path="/admin/contact" element={<ProtectedAdminRoute><AdminContact /></ProtectedAdminRoute>} />
            <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
