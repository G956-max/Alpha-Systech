/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import AdminLayout from './components/AdminLayout';
import CategoryProducts from './pages/CategoryProducts';
import AppSplashScreen from './components/AppSplashScreen';
import { PageLoadingSpinner } from './components/LoadingAnimation';

import RouteTransitionBar from './components/RouteTransitionBar';
import ScrollToTop from './components/ScrollToTop';

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAuth();
  
  if (loading) return <PageLoadingSpinner message="Checking Admin Credentials..." />;
  if (!user || role !== 'admin') return <Navigate to="/login" replace />;
  
  return <AdminLayout>{children}</AdminLayout>;
};

const PublicLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen bg-[#EBF5EE] flex justify-center items-start text-slate-800 font-sans">
      <div className="w-full max-w-[480px] min-h-screen bg-[#F7FCF9] shadow-2xl relative flex flex-col border-x border-emerald-100/80 overflow-x-hidden">
        {/* Holographic Glowing Route Progress Line */}
        <RouteTransitionBar />
        
        <Navbar />
        <main className="flex-grow pb-16 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ 
                duration: 0.22, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="w-full origin-top"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingWhatsAppCall />
        <BottomNav />
      </div>
    </div>
  );
};

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* Grand App Entrance Animation & Splash */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <AppSplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <Routes>
        {/* Public Routes with persistent PublicLayout for fast, silky page transitions */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Online ordering disabled - Redirect directly to WhatsApp Enquiry & Shop Desk */}
          <Route path="/checkout" element={<Navigate to="/contact" replace />} />
          <Route path="/cart" element={<Navigate to="/contact" replace />} />
        </Route>

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
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppContent />
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
