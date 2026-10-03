import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { allProducts, Product } from '../data/products';
import { ArrowLeft, Boxes, MessageCircle } from 'lucide-react';
import { ProductGridSkeleton } from '../components/LoadingAnimation';

export default function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const getInitialCategoryProducts = () => {
    if (!categoryName) return allProducts.slice(0, 8);
    const matched = allProducts.filter(p => 
      p.category.toLowerCase().includes(categoryName.toLowerCase()) ||
      p.name.toLowerCase().includes(categoryName.toLowerCase()) ||
      p.brand.toLowerCase().includes(categoryName.toLowerCase())
    );
    return matched.length > 0 ? matched : allProducts.slice(0, 8);
  };

  const [products, setProducts] = useState<Product[]>(getInitialCategoryProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts(getInitialCategoryProducts());
    const fetchCategoryProducts = async () => {
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
              images: fp.images || matchMock?.images || [fp.imageUrl || fp.image || ''],
              wholesalePrice: fp.wholesalePrice || fp.price || matchMock?.wholesalePrice || 350,
              price: fp.wholesalePrice || fp.price || matchMock?.price || 350,
              retailPrice: fp.retailPrice || matchMock?.retailPrice || 650,
              moq: fp.moq || matchMock?.moq || 10,
              lotSize: fp.lotSize || matchMock?.lotSize || 10,
              stockCartons: fp.stockCartons || matchMock?.stockCartons || 25,
              conditionGrade: fp.conditionGrade || matchMock?.conditionGrade || 'Wholesale Bundle Pack',
              fabric: fp.fabric || matchMock?.fabric || 'Pure Cotton',
              sizes: fp.sizes || matchMock?.sizes || ['Free Size'],
              colors: fp.colors || matchMock?.colors || ['Assorted Colors'],
              occasion: fp.occasion || matchMock?.occasion || 'Daily / Festive',
              inStock: true,
              bundleQuantity: fp.lotSize || matchMock?.bundleQuantity || 10,
              washCare: 'Normal Hand/Machine Wash',
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
    <div className="p-3 min-h-screen bg-[#F7FCF9] font-sans text-slate-900 pb-4">
      {/* Header Banner */}
      <div className="mb-3 bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#065F46] text-white p-4 rounded-2xl border border-emerald-700/60 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="bg-emerald-400 text-emerald-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            Wholesale Lots
          </span>
          <Link
            to="/categories"
            className="text-emerald-200 hover:text-white text-xs font-bold flex items-center gap-1 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30"
          >
            <ArrowLeft size={12} /> Back
          </Link>
        </div>

        <h1 className="text-xl font-serif font-black tracking-tight leading-tight">
          {categoryName} Stock Lots
        </h1>
        <p className="text-emerald-100 text-xs leading-relaxed font-light">
          Direct Erode textile inventory from Sri Aadhi Nayaga Tex with all-India parcel transport.
        </p>
      </div>
      
      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-48 flex-col gap-3 bg-white rounded-2xl border border-emerald-100 p-6 text-center">
          <Boxes className="h-10 w-10 text-emerald-300" />
          <p className="text-xs font-bold text-slate-700">No items currently found for this category.</p>
          <Link to="/categories" className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl">
            Browse All Active Lots
          </Link>
        </div>
      ) : (
        /* Mobile 2-Column Product Grid */
        <div className="grid grid-cols-2 gap-2.5">
          {products.map((product) => {
            const margin = Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100);

            return (
              <Link 
                to={`/product/${product.id}`}
                key={product.id} 
                className="group cursor-pointer flex flex-col bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all active:scale-[0.99]"
              >
                <div className="relative aspect-[3/4] w-full bg-emerald-50/30 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-gradient-to-r from-emerald-800 to-green-700 text-amber-300 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-xs border border-emerald-600/40">
                      மொத்த விற்பனை
                    </span>
                    <span className="bg-white/95 text-slate-800 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-100 shadow-xs">
                      Pack of {product.bundleQuantity}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 flex flex-col flex-1">
                  <div className="text-[9px] text-gray-500 font-bold uppercase mb-0.5 truncate">
                    {product.brand}
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-emerald-700">
                    {product.name}
                  </h3>

                  {/* Wholesale Enquiry Container - No Price Display */}
                  <div className="mt-auto pt-2 border-t border-emerald-100 flex flex-col gap-1.5">
                    {/* Wholesale Lot Info */}
                    <div className="flex items-center justify-between gap-1">
                      <span className="bg-emerald-700 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-2xs">
                        மொத்த விலை
                      </span>
                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Pack of {product.bundleQuantity} Pcs
                      </span>
                    </div>

                    <div className="text-[9.5px] text-gray-600 font-semibold leading-tight">
                      நேரடி நெசவாளர் விலை • Best Weaver Rate
                    </div>

                    {/* WhatsApp Direct Enquiry Button (No Amount) */}
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I want to enquire wholesale price & details for: ${product.name} (#${product.id}) - Pack of ${product.bundleQuantity} Pcs.`)}`, '_blank');
                      }}
                      className="w-full mt-0.5 bg-gradient-to-r from-[#25D366] to-[#1eb855] hover:from-[#20ba5a] text-white py-1.5 px-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle size={13} className="shrink-0" />
                      <span>WhatsApp-ல் விலை அறியவும்</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
