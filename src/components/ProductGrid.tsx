import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product as MockProduct, getRandomProducts } from '../data/products';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

interface ProductGridProps {
  title?: string;
  count?: number;
  categoryFilter?: string | null;
  priceFilter?: number;
  conditionFilter?: string[];
}

interface FirebaseProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  status?: string;
}

export default function ProductGrid({ title, count = 12, categoryFilter, priceFilter, conditionFilter }: ProductGridProps) {
  const [products, setProducts] = useState<FirebaseProduct[] | MockProduct[]>([]);
  const requireAuth = useRequireAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FirebaseProduct[];
        
        let publishedProducts = productsList.filter(p => p.status === 'published' || !p.status);
        
        if (publishedProducts.length === 0) {
          publishedProducts = getRandomProducts(count || 12);
        }

        if (categoryFilter) {
          publishedProducts = publishedProducts.filter(p => p.category && p.category.toLowerCase().includes(categoryFilter.toLowerCase()));
        }
        
        if (priceFilter) {
          publishedProducts = publishedProducts.filter(p => p.price <= priceFilter);
        }
        
        if (conditionFilter && conditionFilter.length > 0) {
          publishedProducts = publishedProducts.filter(p => {
             const isRefurbished = p.id.charCodeAt(0) % 2 === 0;
             const condition = isRefurbished ? 'Refurbished' : 'Brand New';
             return conditionFilter.includes(condition);
          });
        }

        setProducts(publishedProducts.slice(0, count || 12));
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts(getRandomProducts(count));
      }
    };
    fetchProducts();
  }, [count, categoryFilter, priceFilter, conditionFilter]);

  return (
    <section className="w-full">
      {title && (
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-[#1a202c] leading-none">{title}</h2>
          <button 
            onClick={() => requireAuth()}
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            View All
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          // Generate deterministic mock specs based on ID
          const isRefurbished = product.id.charCodeAt(0) % 2 === 0;
          const ram = (product.id.charCodeAt(1) % 3 === 0) ? '32GB DDR4' : '16GB DDR4';
          const storage = (product.id.charCodeAt(2) % 2 === 0) ? '1TB NVMe' : '512GB NVMe';

          return (
            <Link 
              to={`/product/${product.id}`}
              key={product.id} 
              className="group cursor-pointer flex flex-col bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Image Area */}
              <div className="h-[200px] w-full bg-gray-50 relative shrink-0 p-4 flex items-center justify-center">
                <img 
                  src={'imageUrl' in product ? product.imageUrl : product.image} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                  <span className="bg-white text-xs font-bold px-2 py-1 shadow-sm border border-gray-100 uppercase tracking-wider text-[#1a202c]">
                    In Stock
                  </span>
                  {isRefurbished && (
                    <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 shadow-sm uppercase tracking-wider">
                      Refurbished
                    </span>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-1 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 line-clamp-1">
                  {product.category || 'Professional Series'}
                </p>
                <h3 className="text-base font-semibold text-[#1a202c] line-clamp-2 leading-tight mb-3 flex-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xl font-bold text-[#1a202c]">${product.price.toLocaleString()}</p>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 font-medium rounded-sm">Save</span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-gray-50 p-3 rounded text-xs mb-5">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-medium uppercase text-[10px]">RAM</span>
                    <span className="font-semibold text-[#1a202c]">{ram}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-medium uppercase text-[10px]">Storage</span>
                    <span className="font-semibold text-[#1a202c]">{storage}</span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full border border-gray-300 text-gray-700 bg-white py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gray-50 hover:text-black transition-colors mt-auto">
                  View Details
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
