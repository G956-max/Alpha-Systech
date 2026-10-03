import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { ArrowRight, Sparkles } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

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
    subText: 'Cotton, Soft Silk, Pattu',
    badge: 'Direct Weaver'
  },
  { 
    id: '2', 
    name: 'Nighties', 
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', 
    subText: 'Cotton & Feeding Nighties',
    badge: '100% Cotton'
  },
  { 
    id: '3', 
    name: 'Inskirts', 
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800', 
    subText: 'Petticoats & Blouses',
    badge: 'All Colors'
  },
  { 
    id: '4', 
    name: 'Lungis', 
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', 
    subText: 'Erode Handloom Lungis',
    badge: 'Erode Special'
  },
  { 
    id: '5', 
    name: 'Churidars', 
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800', 
    subText: 'Stitched & Materials',
    badge: 'Trending'
  },
  { 
    id: '6', 
    name: 'Tops & Kurtis', 
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800', 
    subText: 'Daily & Office Wear',
    badge: 'Daily Wear'
  },
  { 
    id: '7', 
    name: 'Vetti & Sattai', 
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800', 
    subText: 'Pure Cotton Dhoti Sets',
    badge: 'Festive'
  },
  { 
    id: '8', 
    name: 'Lining & Inners', 
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', 
    subText: '2x2 Aster Rubia Lining',
    badge: 'Tailoring'
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
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-100">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
              Erode Market Stock
            </span>
          </div>
          <h2 className="text-base font-serif font-black text-slate-900 leading-tight">
            {title}
          </h2>
        </div>

        <button 
          onClick={() => navigate('/categories')}
          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 shrink-0"
        >
          View All <ArrowRight size={13} />
        </button>
      </div>

      {/* Mobile 2-Column Category Cards with 3D Depth */}
      <div className="grid grid-cols-2 gap-2.5">
        {categories.map((category, index) => (
          <ThreeDCard key={category.id} depth={12} autoFloat={true}>
            <div 
              className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/5] w-full border-2 border-emerald-100 shadow-sm hover:shadow-xl transition-all preserve-3d"
              onClick={() => navigate(`/categories?q=${encodeURIComponent(category.name.split(' ')[0])}`)}
            >
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Soft dark-emerald vignette for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent group-hover:from-emerald-950 transition-colors" />
              
              {/* Category Badge with 3D Pop */}
              {category.badge && (
                <div 
                  className="absolute top-2 left-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider border border-white/30"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {category.badge}
                </div>
              )}

              <div className="absolute bottom-0 inset-x-0 p-3 text-white" style={{ transform: 'translateZ(15px)' }}>
                <h3 className="text-xs font-serif font-black tracking-tight leading-snug drop-shadow-md group-hover:text-amber-300 transition-colors">
                  {category.name}
                </h3>
                {category.subText && (
                  <p className="text-[10px] text-emerald-200 mt-0.5 line-clamp-1 font-light">
                    {category.subText}
                  </p>
                )}
                <div className="mt-1 flex items-center gap-1 text-[9px] font-black text-amber-300 group-hover:translate-x-1.5 transition-transform uppercase">
                  <span>View Stock</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>
    </section>
  );
}
