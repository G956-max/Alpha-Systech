export interface TextileProduct {
  id: string;
  name: string;
  brand: string;
  category: 'Sarees' | 'Nighties' | 'Inskirts' | 'Blouses' | 'Lungis' | 'Churidars & Materials' | 'Tops & Kurtis' | 'Vetti & Sattai' | 'Lining & Inners' | string;
  image: string;
  images: string[];
  price: number;              // Retail price
  wholesalePrice: number;     // Wholesale / Bundle price per piece
  retailPrice: number;        // MRP
  fabric: string;
  sizes: string[];
  colors: string[];
  occasion: string;
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  bundleQuantity: number;     // e.g. Pack of 4, 5, 10
  description: string;
  washCare: string;
  moq?: number;
  lotSize?: number;
  stockCartons?: number;
  conditionGrade?: string;
  pattern?: string;
  colorOptions?: string[];
  sareeLength?: string;
  blousePiece?: string;
  tieredPricing?: Array<{ minQty: number; price: number; label: string }>;
}

export type Product = TextileProduct;

export const allProducts: Product[] = [
  // --- SAREES ---
  {
    id: '1',
    name: 'Erode Handloom Soft Cotton Daily Wear Saree',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'
    ],
    price: 650,
    wholesalePrice: 420,
    retailPrice: 1200,
    fabric: '100% Pure Erode Combed Cotton 80s',
    sizes: ['Free Size (6.2m with blouse)'],
    colors: ['Maroon Border', 'Peacock Blue', 'Mustard Yellow', 'Forest Green'],
    occasion: 'Daily Wear, Office & Teachers Special',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 5,
    description: 'Authentic Erode handloom pure soft cotton saree. Breathable, cool for summer with traditional temple border and contrast pallu. Comes with attached running blouse piece.',
    washCare: 'First wash cold water hand wash, starch optional.'
  },
  {
    id: '2',
    name: 'Kanchipuram Semi-Pattu Wedding Silk Saree with Rich Pallu',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800'
    ],
    price: 1850,
    wholesalePrice: 1250,
    retailPrice: 3800,
    fabric: 'Soft Silk with Copper & Gold Zari Weave',
    sizes: ['Free Size (6.3m with blouse)'],
    colors: ['Bridal Red', 'Royal Blue', 'Pista Green', 'Dark Violet'],
    occasion: 'Weddings, Temple Festivals & Family Functions',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 4,
    description: 'Grand festive semi-silk pattu saree with heavy golden copper zari floral jaal weaving across the body and grand contrast pallu. Contrast brocade blouse piece included.',
    washCare: 'Dry Clean Recommended.'
  },
  {
    id: '3',
    name: 'Fancy Designer Georgette Brass & Foil Printed Saree',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Sarees',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800'
    ],
    price: 850,
    wholesalePrice: 550,
    retailPrice: 1600,
    fabric: 'Weightless Pure Georgette with Foil Border',
    sizes: ['Free Size (6.3m)'],
    colors: ['Dusty Rose', 'Wine', 'Olive', 'Teal'],
    occasion: 'Party Wear & Festive Gatherings',
    inStock: true,
    isNewArrival: true,
    bundleQuantity: 4,
    description: 'Featherlight fancy georgette saree with elegant foil brass floral prints and scallop border. Effortless pleating and easy maintenance.',
    washCare: 'Gentle Machine Wash.'
  },

  // --- NIGHTIES ---
  {
    id: '4',
    name: 'Erode Pure Cotton Feeding / Zipper Alpine Nighty (Pack of 3)',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Nighties',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    ],
    price: 380,
    wholesalePrice: 240,
    retailPrice: 650,
    fabric: '100% Superfine Erode Cotton Hosiery & Alpine',
    sizes: ['L (42)', 'XL (44)', 'XXL (48)', 'Free Size (54" Length)'],
    colors: ['Floral Pink', 'Geometric Blue', 'Batik Maroon', 'Lavender'],
    occasion: 'Daily Home Comfort & Maternity Sleepwear',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 6,
    description: 'Super soft, 100% pure Erode cotton nighties with front zipper opening, side pocket, and interlocked stitching for maximum durability. Guaranteed color fastness.',
    washCare: 'Normal Machine Wash with mild detergent.'
  },

  // --- INSKIRTS ---
  {
    id: '5',
    name: 'Pure Cotton 6-Cut Saree Inskirt / Petticoat (Bundle of 5)',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Inskirts',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'
    ],
    price: 190,
    wholesalePrice: 120,
    retailPrice: 350,
    fabric: '100% Cotton Poplin (Heavy 110 GSM)',
    sizes: ['38" Length', '40" Length', '42" Length (Standard Waist 42"-46")'],
    colors: ['Black', 'White', 'Maroon', 'Navy Blue', 'Red', 'Gold', 'Green'],
    occasion: 'Essential Saree Underskirt',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 10,
    description: 'Heavy quality 6-cut cotton petticoat with strong drawstring and double-stitched hemline. Shrink-resistant fabric tested for all saree draping.',
    washCare: 'Regular Machine Wash.'
  },

  // --- BLOUSES ---
  {
    id: '6',
    name: 'Designer Readymade Stretchable Embroidered Silk Blouse',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Blouses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
    ],
    price: 490,
    wholesalePrice: 320,
    retailPrice: 950,
    fabric: 'Phantom Silk with Cotton Inner Lining & Aari Work',
    sizes: ['34-38 (Alterable M/L)', '40-44 (Alterable XL/XXL)'],
    colors: ['Gold', 'Maroon', 'Bottle Green', 'Royal Blue', 'Black'],
    occasion: 'Weddings, Temple & Festival Saree Pairing',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 5,
    description: 'Ready-to-wear padded designer blouse with elbow length sleeves, heavy dori tie-up back, and golden bead embroidery. Inside 2-inch margins for easy alteration.',
    washCare: 'Hand Wash or Dry Clean.'
  },

  // --- LUNGIS ---
  {
    id: '7',
    name: 'Erode Traditional 100% Handloom Cotton Checked Lungi (Pack of 5)',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Lungis',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
    ],
    price: 280,
    wholesalePrice: 175,
    retailPrice: 480,
    fabric: '100% Pure Erode Handloom Cotton (Open / Stitched)',
    sizes: ['2.0 Meters (Standard Men)'],
    colors: ['Classic Multi Checks', 'Blue Navy Checks', 'Green Traditional', 'Brown Checks'],
    occasion: 'Daily Men Home Comfort & Traditional Wear',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 10,
    description: 'Famous Erode woven pure cotton lungis. Super absorbent, high thread count, color guaranteed with finished overlocked edges. Ready to wear.',
    washCare: 'Machine wash with similar colors.'
  },

  // --- CHURIDARS & MATERIALS ---
  {
    id: '8',
    name: 'Pure Cotton Unstitched Churidar Dress Material (Top + Bottom + Dupatta)',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Churidars & Materials',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800'
    ],
    price: 750,
    wholesalePrice: 480,
    retailPrice: 1450,
    fabric: 'Pure Cotton Top 2.25m, Salwar 2.0m, Cotton Dupatta 2.25m',
    sizes: ['Unstitched Material (Can stitch up to 5XL)'],
    colors: ['Batik Mustard & Black', 'Indigo Blue', 'Teal & Coral', 'Maroon & Cream'],
    occasion: 'Office Wear, College & Daily Outing',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 4,
    description: 'Complete 3-piece pure cotton salwar suit material set with rich ethnic hand-block prints and soft cotton printed dupatta. Soft on skin and durable.',
    washCare: 'Hand wash cold water.'
  },

  // --- TOPS & KURTIS ---
  {
    id: '9',
    name: 'Women Floral Printed Straight Kurti / Tunic Top',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Tops & Kurtis',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800'
    ],
    price: 499,
    wholesalePrice: 310,
    retailPrice: 899,
    fabric: 'Premium 14kg Heavy Rayon',
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)', '3XL (46)'],
    colors: ['Indigo Floral', 'Peach Blossom', 'Emerald Fern', 'Black & Gold'],
    occasion: 'College, Office & Casual Wear',
    inStock: true,
    isNewArrival: true,
    bundleQuantity: 5,
    description: 'Calf-length straight cut daily wear kurti with 3/4th sleeves, round neck with buttons, and side slits. Pairs comfortably with leggings, jeans or palazzos.',
    washCare: 'Gentle Machine Wash.'
  },

  // --- VETTI & SATTAI ---
  {
    id: '10',
    name: 'Men Traditional Pure Cotton Double Vetti & Shirt Matching Set',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Vetti & Sattai',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800'
    ],
    price: 1199,
    wholesalePrice: 780,
    retailPrice: 2200,
    fabric: '100% Pure Combed Cotton with Kasavu Gold Border',
    sizes: ['38 (M)', '40 (L)', '42 (XL)', '44 (XXL) with 4-Meter Double Dhoti'],
    colors: ['Traditional Cream with Gold Zari', 'Crisp White with Gold Border'],
    occasion: 'Weddings, Pongal, Temple Poojas & Traditional Ceremonies',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 4,
    description: 'Traditional Tamil Nadu wedding groom & festive matching combo. Includes premium full sleeve cotton shirt with matching 4-meter double dhoti and angavastram towel with rich gold zari borders.',
    washCare: 'Gentle Hand Wash or Dry Clean.'
  },

  // --- LINING & INNERS ---
  {
    id: '11',
    name: 'Pure Cotton 2x2 Aster Blouse Lining Cloth (Pack of 10 Cut Pieces)',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Lining & Inners',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800'
    ],
    price: 450,
    wholesalePrice: 290,
    retailPrice: 800,
    fabric: '100% Pure Cotton 2x2 Rubia Aster (1 Meter Cuts)',
    sizes: ['1 Meter Cut Pieces x 10 Bits (Total 10 Meters)'],
    colors: ['Assorted Fast Colors (Red, Maroon, Black, Blue, Gold, Green)'],
    occasion: 'Tailoring & Blouse Lining Material',
    inStock: true,
    isBestseller: true,
    bundleQuantity: 5,
    description: 'High grade, zero-shrinkage 2x2 cotton rubia aster lining cloth bits for tailoring shops and boutiques. Smooth finish, long lasting color fastness.',
    washCare: 'Cold water wash before cutting.'
  },

  // --- READYMADE CHURIDAR ---
  {
    id: '12',
    name: 'Readymade Stitched Cotton Churidar Suit with Chiffon Dupatta',
    brand: 'Sri Aadhi Nayaga Tex',
    category: 'Churidars & Materials',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'
    ],
    price: 999,
    wholesalePrice: 650,
    retailPrice: 1899,
    fabric: 'Glazed Cotton Kurta with Cotton Pants & Printed Dupatta',
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    colors: ['Coral Pink', 'Teal Green', 'Mustard Gold', 'Navy Blue'],
    occasion: 'Festival Celebrations & Daily Wear',
    inStock: true,
    isNewArrival: true,
    bundleQuantity: 4,
    description: 'Fully readymade stitched salwar suit set. Straight kurta with lace detailing, comfortable pant with pockets, and a matching full length dupatta.',
    washCare: 'Gentle Machine Wash.'
  }
];

export function getRandomProducts(count: number): Product[] {
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
