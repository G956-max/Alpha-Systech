import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  subText?: string;
}

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'MacBooks', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', subText: 'Premium Apple hardware' },
  { id: '2', name: 'Gaming Laptops', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', subText: 'High FPS performance' },
  { id: '3', name: 'Workstations', imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800', subText: 'Enterprise reliability' },
  { id: '4', name: 'Ultrabooks', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800', subText: 'Portability & power' },
];

interface CategoryGridProps {
  title: string;
}

export default function CategoryGrid({ title }: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
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
        setCategories(MOCK_CATEGORIES);
      }
    }, (err) => {
      console.error("Error fetching categories:", err);
      setCategories(MOCK_CATEGORIES);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="w-full">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-[#1a202c] leading-none">{title}</h2>
        {title !== "" && (
          <button 
            onClick={() => navigate('/categories')}
            className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            View All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.slice(0, title === "" ? categories.length : 4).map((category) => (
          <div 
            key={category.id} 
            className="group cursor-pointer relative overflow-hidden aspect-[4/3] w-full"
            onClick={() => navigate(`/category/${encodeURIComponent(category.name)}`)}
          >
            <img 
              src={category.imageUrl} 
              alt={category.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
              <h3 className="text-xl font-bold tracking-wide uppercase">{category.name}</h3>
              {category.subText && (
                <p className="text-[10px] mt-2 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.subText}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
