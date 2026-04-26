export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const allProducts: Product[] = [
  { id: '1', name: 'MacBook Pro M3 Max', price: 289900, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', category: 'Apple' },
  { id: '2', name: 'Dell XPS 15 9530', price: 154900, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800', category: 'Dell' },
  { id: '3', name: 'ThinkPad X1 Carbon Gen 11', price: 124900, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800', category: 'Lenovo' },
  { id: '4', name: 'HP Spectre x360', price: 104900, image: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=800', category: 'HP' },
  { id: '5', name: 'ASUS ROG Zephyrus G14', price: 139900, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800', category: 'ASUS' },
  { id: '6', name: 'Razer Blade 16', price: 249900, image: 'https://images.unsplash.com/photo-1525373612132-b3e2779d1f14?auto=format&fit=crop&q=80&w=800', category: 'Razer' },
  { id: '7', name: 'Microsoft Surface Laptop 5', price: 84900, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800', category: 'Microsoft' },
  { id: '8', name: 'Gigabyte AERO 16', price: 179900, image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800', category: 'Gigabyte' },
  { id: '9', name: 'Mechanical Keyboard RGB', price: 9900, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', category: 'Accessories' },
  { id: '10', name: 'Vertical Ergonomic Mouse', price: 3500, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800', category: 'Accessories' },
  { id: '11', name: 'UltraWide 34" Monitor', price: 38900, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', category: 'Monitors' },
  { id: '12', name: 'Noise Cancelling Headphones', price: 29900, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Audio' },
  { id: '13', name: 'Laptop Cooling Pad', price: 2500, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800', category: 'Accessories' },
  { id: '14', name: 'USB-C Docking Station', price: 12500, image: 'https://images.unsplash.com/photo-1616440788399-6360af7db091?auto=format&fit=crop&q=80&w=800', category: 'Accessories' },
  { id: '15', name: 'Sony WH-1000XM5', price: 34900, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800', category: 'Audio' },
  { id: '16', name: 'Alienware m18 R2', price: 209900, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800', category: 'Dell' },
];

export function getRandomProducts(count: number): Product[] {
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
