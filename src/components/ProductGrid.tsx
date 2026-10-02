import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product as MockProduct, allProducts } from '../data/products';
import { useStore } from '../context/StoreContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ShoppingBag, Heart, Sparkles, Package, MessageCircle, PhoneCall } from 'lucide-react';

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
  const [products, setProducts] = useState<MockProduct[]>([]);
  const { toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const firebaseProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        
        let publishedProducts = firebaseProducts.filter(p => p.status === 'published' || !p.status);
        
        let combinedProducts: MockProduct[] = [];
        if (publishedProducts.length > 0) {
          combinedProducts = publishedProducts.map(fp => {
            const matchMock = allProducts.find(p => p.id === fp.id || p.name.toLowerCase() === fp.name.toLowerCase());
            return {
              id: fp.id,
              name: fp.name,
              brand: fp.brand || matchMock?.brand || 'Vastra',
              category: fp.category || matchMock?.category || 'Women',
              image: fp.imageUrl || fp.image || matchMock?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
              images: fp.images || matchMock?.images || [fp.imageUrl || fp.image],
              price: fp.price || matchMock?.price || 2499,
              wholesalePrice: fp.wholesalePrice || matchMock?.wholesalePrice || 1650,
              retailPrice: fp.retailPrice || matchMock?.retailPrice || 4999,
              fabric: fp.fabric || matchMock?.fabric || 'Pure Silk',
              sizes: fp.sizes || matchMock?.sizes || ['S', 'M', 'L', 'XL'],
              colors: fp.colors || matchMock?.colors || ['Red', 'Blue'],
              occasion: fp.occasion || matchMock?.occasion || 'Festive',
              inStock: fp.inStock !== false,
              isBestseller: fp.isBestseller || matchMock?.isBestseller,
              isNewArrival: fp.isNewArrival || matchMock?.isNewArrival,
              bundleQuantity: fp.bundleQuantity || matchMock?.bundleQuantity || 4,
              description: fp.description || matchMock?.description || 'Authentic designer outfit.',
              washCare: fp.washCare || matchMock?.washCare || 'Dry Clean Only.'
            };
          });
        } else {
          combinedProducts = allProducts;
        }

        // Filters
        if (categoryFilter) {
          const cat = categoryFilter.toLowerCase();
          combinedProducts = combinedProducts.filter(p => 
            p.category.toLowerCase().includes(cat) ||
            p.brand.toLowerCase().includes(cat) ||
            p.name.toLowerCase().includes(cat)
          );
        }
        
        if (priceFilter) {
          combinedProducts = combinedProducts.filter(p => p.price <= priceFilter);
        }
        
        if (fabricFilter && fabricFilter.length > 0) {
          combinedProducts = combinedProducts.filter(p => {
            return fabricFilter.some(fab => p.fabric.toLowerCase().includes(fab.toLowerCase()));
          });
        }

        if (sizeFilter) {
          combinedProducts = combinedProducts.filter(p => 
            p.sizes.some(s => s.toLowerCase().includes(sizeFilter.toLowerCase()))
          );
        }

        if (searchFilter) {
          const query = searchFilter.toLowerCase();
          combinedProducts = combinedProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.fabric.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.occasion.toLowerCase().includes(query)
          );
        }

        setProducts(combinedProducts.slice(0, count || 20));
      } catch (err) {
        console.error("Error fetching dress products:", err);
        setProducts(allProducts.slice(0, count || 20));
      }
    };
    fetchProducts();
  }, [count, categoryFilter, priceFilter, fabricFilter, searchFilter, sizeFilter]);


  const handleWishlistClick = (e: React.MouseEvent, dress: MockProduct) => {
    e.stopPropagation();
    toggleWishlist({
      id: dress.id,
      name: dress.name,
      price: dress.price,
      category: dress.category,
      imageUrl: dress.image
    });
  };

  return (
    <section className="w-full">
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-rose-100 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-rose-950 leading-none">{title}</h2>
            <p className="text-xs text-gray-500 mt-1.5">
              Pure fabrics, designer embroidery, and authentic handloom weaves.
            </p>
          </div>
          <div className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
            Showing {products.length} Outfits Available
          </div>
        </div>
      )}
      
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-rose-100 p-8">
          <ShoppingBag className="h-12 w-12 text-rose-200 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No Outfits Match Your Selected Filters</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Try adjusting your fabric choice, size, or price range to explore other collections.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {products.map((dress) => {
            const discountPct = Math.round(((dress.retailPrice - dress.price) / dress.retailPrice) * 100);
            const isWish = isInWishlist(dress.id);

            return (
              <div 
                key={dress.id}
                onClick={() => navigate(`/product/${dress.id}`)}
                className="group cursor-pointer flex flex-col bg-white border border-rose-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-rose-300 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full bg-rose-50 overflow-hidden">
                  <img 
                    src={dress.image} 
                    alt={dress.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleWishlistClick(e, dress)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10"
                    title={isWish ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    <Heart size={16} className={isWish ? "text-red-500 fill-red-500" : ""} />
                  </button>

                  {/* Discount & Fabric Tag */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                      {discountPct}% OFF
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow border border-rose-100">
                      {dress.fabric.split(' ')[0]}
                    </span>
                  </div>

                  {dress.isBestseller && (
                    <div className="absolute bottom-3 left-3 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow uppercase">
                      Bestseller
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                    <span>{dress.brand}</span>
                    <span className="text-rose-600 font-semibold">{dress.category}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-2 leading-snug mb-2">
                    {dress.name}
                  </h3>

                  <p className="text-[11px] text-gray-500 line-clamp-1 mb-3">
                    {dress.fabric}
                  </p>

                  {/* Size Chips */}
                  <div className="flex items-center gap-1 flex-wrap mb-4">
                    {dress.sizes.slice(0, 4).map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-rose-50 text-rose-900 border border-rose-100 px-2 py-0.5 rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-3 border-t border-rose-50 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-rose-950">
                        ₹{dress.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        MRP: <span className="line-through">₹{dress.retailPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I want to order/enquire about: ${dress.name} (Code: #${dress.id}) at wholesale price ₹${dress.price}. Please share colors & dispatch details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full transition-colors shadow-sm flex items-center gap-1 text-[11px] font-bold"
                      title="Order on WhatsApp"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  {/* Wholesale Reseller Set Price */}
                  <div className="mt-2 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded font-medium flex justify-between">
                    <span>Boutique Set ({dress.bundleQuantity} pcs):</span>
                    <span className="font-bold">₹{dress.wholesalePrice.toLocaleString()}/pc</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
