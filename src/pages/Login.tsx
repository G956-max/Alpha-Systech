import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail } from 'lucide-react';

type UserMode = 'login' | 'signup';

export default function Login() {
  const { loginAdmin, loginUser, signupUser } = useAuth();
  const navigate = useNavigate();
  const [userMode, setUserMode] = useState<UserMode>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUserAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    setLoading(true);
    try {
      if (userMode === 'login') {
        if (!email || !password) {
          throw new Error('Please fill in all fields.');
        }
        
        // Check if admin login
        if (email === 'admin@sriaadhinayagatex.com' || email === 'admin@alphasystech.com' || email === 'gopinathsumathi05@gmail.com') {
          await loginAdmin(email, password);
          navigate('/admin');
        } else {
          await loginUser(email, password);
          navigate('/');
        }
      } else {
        if (!email || !password) {
          throw new Error('Please fill in all fields.');
        }
        await signupUser(email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || `Failed to ${userMode}`);
    } finally {
      setLoading(false);
    }
  };

  const handleModeSwitch = (mode: UserMode) => {
    if (mode === userMode) return;
    setUserMode(mode);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-3 bg-[#F7FCF9]">
      <div className="w-full bg-white p-5 rounded-2xl shadow-xs border border-emerald-100 overflow-hidden">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-500 text-white font-serif font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-600/20">
            A
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={userMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-serif font-bold text-slate-900">
                {userMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {userMode === 'login' ? 'Sign in to access wholesale catalog & prices' : 'Join Sri Aadhi Nayaga Tex wholesale platform'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleUserAuth} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-3.5 py-2.5 bg-emerald-50/40 rounded-xl border border-emerald-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-emerald-50/40 rounded-xl border border-emerald-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/30 transition-all mt-2 disabled:opacity-70 active:scale-95"
          >
            {loading ? 'Please wait...' : (userMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-t border-emerald-50">
          <button 
            onClick={() => handleModeSwitch(userMode === 'login' ? 'signup' : 'login')}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold"
          >
            {userMode === 'login' 
              ? "New here? Create an account" 
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
