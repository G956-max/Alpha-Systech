import { Link } from 'react-router-dom';
import { Heart, Trash2, MessageCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useStore();

  return (
    <div className="min-h-screen bg-[#F7FCF9] pb-6 font-sans text-slate-900">
      {/* Top Mobile Bar */}
      <div className="bg-gradient-to-b from-[#064E3B] to-[#047857] text-white p-4 pt-5 pb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="bg-emerald-400 text-emerald-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            Saved Items
          </span>
          <Link to="/" className="text-emerald-200 hover:text-white text-xs font-bold flex items-center gap-1">
            <ArrowLeft size={13} /> Home
          </Link>
        </div>
        <h1 className="text-xl font-serif font-black tracking-tight leading-tight flex items-center gap-2">
          <Heart className="text-rose-400 fill-rose-400" size={20} />
          My Wishlist ({wishlistItems.length})
        </h1>
        <p className="text-emerald-100 text-xs font-light mt-0.5">
          Items saved for fast WhatsApp enquiry &amp; ordering.
        </p>
      </div>

      <div className="p-3">
        {wishlistItems.length > 0 ? (
          /* Mobile 2-Column Grid */
          <div className="grid grid-cols-2 gap-2.5">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs border border-emerald-100 relative hover:shadow-md transition-shadow"
              >
                <button 
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 backdrop-blur-xs rounded-full text-rose-500 shadow-xs"
                  title="Remove"
                >
                  <Trash2 size={13} />
                </button>
                
                <Link to={`/product/${item.id}`} className="aspect-[3/4] w-full bg-emerald-50/30 overflow-hidden block">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                
                <div className="p-2.5 flex flex-col flex-1 justify-between gap-1.5">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase truncate block">{item.category}</span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">{item.name}</h3>
                  </div>
                  
                  <div className="pt-1.5 border-t border-emerald-50 flex items-center justify-between">
                    <div>
                      <span className="bg-emerald-700 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                        மொத்த விலை
                      </span>
                      <p className="text-[10px] font-bold text-emerald-800 mt-0.5">Enquire on WhatsApp</p>
                    </div>

                    <a
                      href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I am enquiring about saved item: ${item.name} (#${item.id}). Please share wholesale rates and color availability.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white p-1.5 rounded-full shadow-xs hover:bg-[#20ba5a]"
                      title="WhatsApp Enquiry"
                    >
                      <MessageCircle size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-emerald-200 p-6">
            <Heart size={36} className="mx-auto text-emerald-300 mb-2" />
            <h2 className="text-sm font-bold text-slate-900 mb-0.5">Your Wishlist is Empty</h2>
            <p className="text-xs text-gray-500 mb-4">Tap the heart on any saree, nighty or lungi to save it here.</p>
            <Link 
              to="/categories" 
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-block shadow-xs"
            >
              Browse Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
