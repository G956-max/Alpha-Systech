import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { allProducts, Product } from '../data/products';
import { ArrowLeft, Boxes, Package, MessageCircle } from 'lucide-react';

export default function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        if (!categoryName) return;

        // Query products from mock or firebase
        const catQuery = query(
          collection(db, 'products'),
          where('category', '==', categoryName)
        );
        const catSnapshot = await getDocs(catQuery);
        let productsList = catSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];

        if (productsList.length > 0) {
          const mapped = productsList.map(fp => {
            const matchMock = allProducts.find(p => p.id === fp.id || p.name.toLowerCase() === fp.name.toLowerCase());
            return {
              id: fp.id,
              name: fp.name,
              brand: fp.brand || matchMock?.brand || 'Sri Aadhi Nayaga Tex',
              category: fp.category || matchMock?.category || categoryName,
              image: fp.imageUrl || fp.image || matchMock?.image || '',
              wholesalePrice: fp.wholesalePrice || fp.price || matchMock?.wholesalePrice || 350,
              price: fp.wholesalePrice || fp.price || matchMock?.price || 350,
              retailPrice: fp.retailPrice || matchMock?.retailPrice || 650,
              moq: fp.moq || matchMock?.moq || 10,
              lotSize: fp.lotSize || matchMock?.lotSize || 10,
              stockCartons: fp.stockCartons || matchMock?.stockCartons || 25,
              conditionGrade: fp.conditionGrade || matchMock?.conditionGrade || 'Wholesale Bundle Pack',
              fabric: fp.fabric || matchMock?.fabric || 'Pure Cotton',
              pattern: fp.pattern || matchMock?.pattern || 'Traditional / Modern Weave',
              colorOptions: fp.colorOptions || matchMock?.colorOptions || ['Multi Assorted Colors'],
              sareeLength: fp.sareeLength || matchMock?.sareeLength,
              blousePiece: fp.blousePiece || matchMock?.blousePiece,
              description: fp.description || matchMock?.description || 'Authentic wholesale lot from Sri Aadhi Nayaga Tex Erode.',
              tieredPricing: fp.tieredPricing || matchMock?.tieredPricing || [
                { minQty: 10, price: fp.wholesalePrice || 350, label: 'Wholesale Bundle (10+ Pcs)' }
              ]
            } as Product;
          });
          setProducts(mapped);
        } else {
          // Fallback from allProducts
          const matched = allProducts.filter(p => 
            p.category.toLowerCase().includes(categoryName.toLowerCase()) ||
            p.name.toLowerCase().includes(categoryName.toLowerCase()) ||
            p.brand.toLowerCase().includes(categoryName.toLowerCase())
          );
          setProducts(matched.length > 0 ? matched : allProducts.slice(0, 8));
        }
      } catch (err) {
        console.error("Error fetching category products:", err);
        setProducts(allProducts.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="pt-8 pb-20 min-h-screen bg-[#FAF9F6] font-sans text-slate-900">
      <section className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 bg-[#0f172a] text-white p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Wholesale Segment
              </span>
              <span className="text-xs text-gray-400">Master Bundles &amp; Cartons Ready for Dispatch</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              {categoryName} Wholesale Lots
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Direct Erode Powerloom &amp; Handloom textile inventory from Sri Aadhi Nayaga Tex with all-India parcel transport.
            </p>
          </div>

          <Link
            to="/categories"
            className="self-start md:self-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={14} /> All Categories
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64 text-xs font-bold text-gray-400">
            Loading wholesale lot specifications...
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center h-64 flex-col gap-4 bg-white rounded-3xl border border-gray-200 p-8 text-center">
            <Boxes className="h-12 w-12 text-gray-300" />
            <p className="text-sm font-bold text-gray-700">No lots currently found for this category.</p>
            <Link to="/categories" className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase rounded-xl hover:bg-black transition-colors">
              Browse All Active Lots
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const margin = Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100);
              const cartonPrice = product.wholesalePrice * product.lotSize;

              return (
                <Link 
                  to={`/product/${product.id}`}
                  key={product.id} 
                  className="group cursor-pointer flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="h-48 w-full bg-gray-50 relative p-4 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded shadow uppercase">
                        MOQ: {product.moq} Pcs
                      </span>
                      <span className="bg-white/95 text-slate-800 text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-200 shadow-sm">
                        {product.lotSize} pcs / Box
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded shadow ${
                        product.conditionGrade.includes('Pristine')
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {product.conditionGrade.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase mb-1">
                      <span>{product.brand}</span>
                      <span className="text-emerald-600 font-extrabold">{product.stockCartons} Cartons</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-2 flex-grow">
                      {product.name}
                    </h3>

                    <div className="pt-2 border-t border-gray-100 mt-auto">
                      <div className="flex items-baseline justify-between mb-1">
                        <div>
                          <span className="text-[9px] text-gray-400 uppercase font-semibold">Unit Wholesale</span>
                          <div className="text-base font-black text-slate-900">
                            ₹{product.wholesalePrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-gray-400 uppercase font-semibold">Carton Total</span>
                          <div className="text-xs font-bold text-emerald-700">
                            ₹{cartonPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-emerald-50 px-2 py-1 rounded text-[10px] text-emerald-800 font-medium">
                        <span>MRP: ₹{product.retailPrice.toLocaleString()}</span>
                        <span className="font-bold text-emerald-700">~{margin}% Margin</span>
                      </div>

                      <a
                        href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I want to order/enquire: ${product.name} (Code: #${product.id}) at wholesale rate ₹${product.wholesalePrice}. Please share colors & dispatch details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors shadow-sm"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle size={14} />
                        <span>Order via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
