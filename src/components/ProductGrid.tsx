import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product as MockProduct, allProducts } from '../data/products';
import { useStore } from '../context/StoreContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Heart, MessageCircle } from 'lucide-react';
import { ProductGridSkeleton } from './LoadingAnimation';
import ThreeDCard from './ThreeDCard';

interface ProductGridProps {
  title?: string;
  count?: number;
  categoryFilter?: string | null;
  priceFilter?: number;
  fabricFilter?: string[];
  searchFilter?: string | null;
  sizeFilter?: string | null;
}

export default function ProductGrid({ 
  title, 
  count = 16, 
  categoryFilter, 
  priceFilter, 
  fabricFilter, 
  searchFilter,
  sizeFilter
}: ProductGridProps) {
  const getFilteredInitial = () => {
    let list = allProducts;
    if (categoryFilter) {
      const cat = categoryFilter.toLowerCase();
      list = list.filter(p => 
        p.category.toLowerCase().includes(cat) ||
        p.brand.toLowerCase().includes(cat) ||
        p.name.toLowerCase().includes(cat)
      );
    }
    if (priceFilter) {
      list = list.filter(p => p.price <= priceFilter);
    }
    if (fabricFilter && fabricFilter.length > 0) {
      list = list.filter(p => fabricFilter.some(fab => p.fabric.toLowerCase().includes(fab.toLowerCase())));
    }
    if (sizeFilter) {
      list = list.filter(p => p.sizes.some(s => s.toLowerCase().includes(sizeFilter.toLowerCase())));
    }
    if (searchFilter) {
      const query = searchFilter.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.fabric.toLowerCase().includes(query)
      );
    }
    return list.slice(0, count);
  };

  const [products, setProducts] = useState<MockProduct[]>(getFilteredInitial);
  const [loading, setLoading] = useState(false);
  const { toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately display filtered local products with zero delay
    setProducts(getFilteredInitial());

    // Silently sync from Firebase in the background without blocking the UI
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const firebaseProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        
        let publishedProducts = firebaseProducts.filter(p => p.status === 'published' || !p.status);
        
        if (publishedProducts.length > 0) {
          let combinedProducts = publishedProducts.map(fp => {
            const matchMock = allProducts.find(p => p.id === fp.id || p.name.toLowerCase() === fp.name.toLowerCase());
            return {
              id: fp.id,
              name: fp.name,
              brand: fp.brand || matchMock?.brand || 'Sri Aadhi Nayaga Tex',
              category: fp.category || matchMock?.category || 'Sarees',
              image: fp.imageUrl || fp.image || matchMock?.image || '',
              images: fp.images || matchMock?.images || [fp.imageUrl || fp.image || ''],
              price: fp.price || matchMock?.price || 450,
              wholesalePrice: fp.wholesalePrice || matchMock?.wholesalePrice || 320,
              retailPrice: fp.retailPrice || matchMock?.retailPrice || 850,
              fabric: fp.fabric || matchMock?.fabric || 'Pure Cotton',
              sizes: fp.sizes || matchMock?.sizes || ['Free Size'],
              colors: fp.colors || matchMock?.colors || ['Assorted'],
              occasion: fp.occasion || matchMock?.occasion || 'Daily Wear',
              inStock: fp.inStock !== false,
              isBestseller: fp.isBestseller || matchMock?.isBestseller,
              isNewArrival: fp.isNewArrival || matchMock?.isNewArrival,
              bundleQuantity: fp.bundleQuantity || matchMock?.bundleQuantity || 5,
              description: fp.description || matchMock?.description || 'Authentic wholesale product from Sri Aadhi Nayaga Tex.',
              washCare: fp.washCare || matchMock?.washCare || 'Hand / Machine Wash'
            };
          });

          // Apply filters to firebase products
          if (categoryFilter) {
            const cat = categoryFilter.toLowerCase();
            combinedProducts = combinedProducts.filter(p => 
              p.category.toLowerCase().includes(cat) ||
              p.brand.toLowerCase().includes(cat) ||
              p.name.toLowerCase().includes(cat)
            );
          }
          if (priceFilter) combinedProducts = combinedProducts.filter(p => p.price <= priceFilter);
          if (fabricFilter && fabricFilter.length > 0) {
            combinedProducts = combinedProducts.filter(p => fabricFilter.some(fab => p.fabric.toLowerCase().includes(fab.toLowerCase())));
          }
          if (sizeFilter) {
            combinedProducts = combinedProducts.filter(p => p.sizes.some(s => s.toLowerCase().includes(sizeFilter.toLowerCase())));
          }
          if (searchFilter) {
            const query = searchFilter.toLowerCase();
            combinedProducts = combinedProducts.filter(p => 
              p.name.toLowerCase().includes(query) ||
              p.category.toLowerCase().includes(query) ||
              p.fabric.toLowerCase().includes(query)
            );
          }
          setProducts(combinedProducts.slice(0, count));
        }
      } catch (err) {
        console.error("Background sync error:", err);
      }
    };

    fetchProducts();
  }, [count, categoryFilter, priceFilter, fabricFilter, searchFilter, sizeFilter]);

  return (
    <section className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-100">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              Direct Wholesale Stock
            </span>
            <h2 className="text-base font-serif font-black text-slate-900 leading-tight">
              {title}
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {products.length} Items
          </span>
        </div>
      )}

      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : products.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border border-emerald-100 p-6">
          <p className="text-xs text-gray-500 font-medium">No wholesale textiles found for this filter.</p>
          <button 
            onClick={() => navigate('/categories')}
            className="mt-3 text-xs bg-emerald-600 text-white font-bold px-4 py-2 rounded-full"
          >
            Clear Filters &amp; View All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {products.map((item, index) => {
            const isWish = isInWishlist(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 26, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ 
                  duration: 0.35, 
                  delay: (index % 2) * 0.08,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="h-full"
              >
                <ThreeDCard depth={10} autoFloat={true}>
                  <div 
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="group cursor-pointer flex flex-col bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all preserve-3d h-full"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] w-full bg-emerald-50/30 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Moving Fabric Sheen */}
                      <div className="animate-shimmer-card opacity-35" />

                      {/* Wishlist Button with Pop Animation */}
                      <motion.button 
                        whileTap={{ scale: 1.35 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            category: item.category,
                            imageUrl: item.image
                          });
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 backdrop-blur-xs text-slate-700 shadow-md transition-transform z-10 active:scale-90"
                      >
                        <Heart size={14} className={isWish ? "text-rose-500 fill-rose-500" : ""} />
                      </motion.button>

                      {/* 3D Popping Badges */}
                      <div 
                        className="absolute top-2 left-2 flex flex-col gap-1"
                        style={{ transform: 'translateZ(20px)' }}
                      >
                        <span className="bg-gradient-to-r from-emerald-800 to-green-700 text-amber-300 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-md border border-emerald-600/40">
                          மொத்த விற்பனை
                        </span>
                        <span className="bg-white/95 text-emerald-950 text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-xs border border-emerald-100">
                          {item.fabric.split(' ')[0]}
                        </span>
                      </div>

                      {item.isBestseller && (
                        <div 
                          className="absolute bottom-2 left-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-md uppercase border border-white/30"
                          style={{ transform: 'translateZ(15px)' }}
                        >
                          Fast Moving
                        </div>
                      )}
                    </div>

                    {/* Details with 3D Depth */}
                    <div className="p-2.5 flex flex-col flex-grow" style={{ transform: 'translateZ(10px)' }}>
                      <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                        <span className="truncate">{item.category}</span>
                        <span className="text-emerald-700 font-extrabold shrink-0 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                          In Stock
                        </span>
                      </div>

                      <h3 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-1">
                        {item.name}
                      </h3>

                      {/* Wholesale Enquiry Container - No Price Display */}
                      <div className="mt-auto pt-2 border-t border-emerald-100 flex flex-col gap-1.5">
                        {/* Wholesale Lot Info */}
                        <div className="flex items-center justify-between gap-1">
                          <span className="bg-emerald-700 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-2xs">
                            மொத்த விலை (Wholesale)
                          </span>
                          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            Pack of {item.bundleQuantity} Pcs
                          </span>
                        </div>

                        <div className="text-[9.5px] text-gray-600 font-semibold leading-tight">
                          நேரடி நெசவாளர் விலை • Best Weaver Rate
                        </div>

                        {/* WhatsApp Direct Enquiry Button (No Amount) */}
                        <motion.a
                          href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I want to enquire wholesale price & details for: ${item.name} (#${item.id}) - Pack of ${item.bundleQuantity} Pcs.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileTap={{ scale: 0.92 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full mt-0.5 bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#20ba5a] text-white py-1.5 px-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                          title="Enquire on WhatsApp"
                        >
                          <MessageCircle size={13} className="shrink-0" />
                          <span>WhatsApp-ல் விலை அறியவும்</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
