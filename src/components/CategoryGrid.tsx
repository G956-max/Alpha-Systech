import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  subText?: string;
  badge?: string;
}

const SRI_AADHI_CATEGORIES: Category[] = [
  { 
    id: '1', 
    name: 'Sarees', 
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93510cb07707?auto=format&fit=crop&q=80&w=800', 
    subText: 'Cotton, Soft Silk, Fancy, Bridal, Banarasi & Pattu',
    badge: 'Direct Weaver'
  },
  { 
    id: '2', 
    name: 'Nighties', 
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', 
    subText: 'Pure Cotton, Feeding & Zipper Alpine Nighties',
    badge: '100% Cotton'
  },
  { 
    id: '3', 
    name: 'Inskirts & Blouses', 
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800', 
    subText: '6-Cut Cotton Petticoats & Aari Work Blouses',
    badge: 'All Colors'
  },
  { 
    id: '4', 
    name: 'Lungis', 
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', 
    subText: 'Erode Famous 100% Handloom Cotton Lungis',
    badge: 'Erode Special'
  },
  { 
    id: '5', 
    name: 'Churidars & Materials', 
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800', 
    subText: 'Readymade Stitched & Unstitched Dress Materials',
    badge: 'Trending'
  },
  { 
    id: '6', 
    name: 'Tops & Kurtis', 
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800', 
    subText: 'Rayon & Cotton Printed Daily & Office Kurtis',
    badge: 'Daily Wear'
  },
  { 
    id: '7', 
    name: 'Vetti & Sattai', 
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800', 
    subText: 'Traditional Pure Cotton Dhoti & Shirt Sets',
    badge: 'Festive'
  },
  { 
    id: '8', 
    name: 'Lining & Inners', 
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', 
    subText: 'Pure Cotton 2x2 Rubia Aster Lining & Inners',
    badge: 'Tailoring Bits'
  }
];

interface CategoryGridProps {
  title: string;
}

export default function CategoryGrid({ title }: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>(SRI_AADHI_CATEGORIES);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const firebaseCategories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      
      if (firebaseCategories.length > 0) {
        setCategories(firebaseCategories);
      } else {
        setCategories(SRI_AADHI_CATEGORIES);
      }
    }, (err) => {
      console.error("Error fetching categories:", err);
      setCategories(SRI_AADHI_CATEGORIES);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-indigo-100">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 leading-none">{title}</h2>
          <p className="text-xs text-gray-500 mt-1.5">
            Sourced directly from Erode weavers &amp; powerloom mills at lowest wholesale rates.
          </p>
        </div>

        <button 
          onClick={() => navigate('/categories')}
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 transition-colors self-start sm:self-auto"
        >
          View Full Textile Catalog <ArrowRight size={14} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-[3/4] w-full border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={() => navigate(`/categories?q=${encodeURIComponent(category.name.split(' ')[0])}`)}
          >
            <img 
              src={category.imageUrl} 
              alt={category.name}
              className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent group-hover:from-slate-950/95 transition-colors duration-300" />
            
            {/* Badge */}
            {category.badge && (
              <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                {category.badge}
              </div>
            )}

            <div className="absolute bottom-0 inset-x-0 p-5 text-white">
              <h3 className="text-xl font-serif font-black tracking-tight leading-snug">{category.name}</h3>
              {category.subText && (
                <p className="text-xs text-indigo-200 mt-1 line-clamp-1 font-light">
                  {category.subText}
                </p>
              )}
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                Explore Products &rarr;
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
