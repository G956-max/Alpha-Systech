import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, Boxes, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 font-sans text-slate-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Dealer Watchlist
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2 flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" size={28} />
            Saved Wholesale Lots ({wishlistItems.length})
          </h1>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 relative hover:shadow-md transition-shadow">
                <button 
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:text-red-700 transition-all shadow-sm"
                  title="Remove from Saved Lots"
                >
                  <Trash2 size={16} />
                </button>
                
                <Link to={`/product/${item.id}`} className="h-[220px] w-full bg-gray-50 p-4 flex items-center justify-center overflow-hidden block border-b border-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{item.category}</span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-0.5">{item.name}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-[9px] text-gray-400 uppercase font-semibold">Wholesale Rate</div>
                      <p className="text-base font-black text-slate-900">₹{item.price.toLocaleString()}</p>
                    </div>
                    <a
                      href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I am enquiring about: ${item.name} (${item.category}) at wholesale rate ₹${item.price}. Please share photos & bulk order details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-green-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-green-700 transition-colors shadow-sm"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-8 max-w-lg mx-auto">
            <Heart size={44} className="mx-auto text-gray-300 mb-3" />
            <h2 className="text-xl font-bold text-slate-900 mb-1">No saved wholesale lots</h2>
            <p className="text-xs text-gray-500 mb-6">Found lots you want to track or negotiate later? Bookmark them to review here.</p>
            <Link 
              to="/categories" 
              className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all inline-block shadow-md"
            >
              Browse Active Lots
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
