import { Product } from './types';

export const products: Product[] = [
  {
    id: 'premium-socks',
    name: 'Premium Cotton Socks',
    price: 1299,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-IaWo_tVkWxk2MFzp6eLh09edF3xZDjEYXjvJ8_Dp0iah6DpncU70wkiK5okTTufA-q5cQS8bMI4J8lHwlxLQb3PGrqBsEt4_pALn2NhiUnqxPoLF9-2opugbE45SqwWIUEzFkMfQVzA70rXSzfSd512FZ-paYwm9WQiayIi-o1V8tfWgd7AURkMTXAf5mwofX9nH2dG8zVaXPiPk_VWlj0g8LqcxnFrOOIXKGaWpj7oF7TknPrcMmu0kHUsCtokdtMv6kb6DzmE',
    category: 'new-arrivals',
    badge: 'New Arrival',
    description: 'Pack of 3 premium socks crafted with fine ribbing and breathable long-staple pima cotton. Designed for seamless comfort and style.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Charcoal', hex: '#1E1E1E' },
      { name: 'Navy Blue', hex: '#001F3F' }
    ],
    fabric: 'Pima Cotton',
    packInfo: 'Pack of 3 | Pure Pima Cotton',
    details: [
      '95% Premium Pima Cotton, 5% Lycra for perfect fit',
      'Reinforced heel and toe sections for durability',
      'Ultra-soft hand feel with seamless toe closures',
      'Hypoallergenic material for all-day dry comfort'
    ],
    inStock: true
  },
  {
    id: 'essential-innerwear',
    name: "Essential Men's Innerwear",
    price: 449,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk3fteb0RoZlTydYV7a7L72dz6xe9myi3Mjn7E3GXmDz2zYwNDczUbEcpFOihxa1EoBGCUuW0GOgnVWQVqUdwxPXJ02XYJdXegZIn9LRE42Enuq4jkmtNj66zVkbLdLwGZKzTG8jhyLS4BALJh24mU_OC0MuFtwUc6uj-aE90Fa_ccXQrpjXdIz5ppumAoVTnw1PwNbqgjzuGJlGhuv8snCnDgHLTZoyOfPVrkGu0TX8thfHrxk1j_A0_d7tN6_frfF6r720Klmko',
    category: 'men',
    badge: 'Bestseller',
    description: "Classic cotton brief and undershirt set designed for premium stretch, ultimate breathability, and seamless daily support.",
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy Blue', hex: '#001F3F' },
      { name: 'Charcoal', hex: '#1E1E1E' }
    ],
    fabric: 'Modal Blend',
    packInfo: 'Premium stretch and support',
    details: [
      'Premium combed cotton fabric with elastane stretch',
      'Moisture-wicking finish keeping you dry and fresh',
      'Chafe-free flatlock seams for maximum skin comfort',
      'Soft-brushed interior waistband that leaves no marks'
    ],
    inStock: true
  },
  {
    id: 'winter-thermal',
    name: 'Winter Thermal Set',
    price: 1299,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Ip1oTyBXaeR64l4FzDWe_9xolExTuNUEHySL-MKyJ378KP4dSXT5KKq5yOeHyQ9T00PqKV2soYSCPrI0DzUk1Jyg9xpSwqdn-j3kqVu827toaS4xEeEiW9dNeBaszUhte8gnDNWowSVnQxREpBrWswBYkV4yrc__lQs0l3ZcK87d8eysARrN3F9EhWfpEXAYDxPog8bmQ4ee7jeHSog1IK6BaUYvbcf1anB6KQHlg2Z6QWJxrfPgZNJRR0IFXDZ71ciFtv7oRYI',
    category: 'men',
    badge: 'Premium',
    description: 'A cozy, charcoal-gray thermal set, neatly knitted for thermal insulation, durability, and a luxuriously soft feel against the skin.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#1E1E1E' },
      { name: 'Beige', hex: '#D2B48C' }
    ],
    fabric: 'Modal Blend',
    packInfo: 'Heavyweight insulation',
    details: [
      'Double-layer knit fabric with heat-retention loops',
      'Brushed thermal backing for extreme cold protection',
      'Form-fitting elastic waistband with side pockets',
      'Inherently breathable yet retains body temperature perfectly'
    ],
    inStock: true
  },
  {
    id: 'casual-cotton',
    name: 'Casual Cotton Wear',
    price: 899,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZvYcQfpjd1vlbqE7Y1avE33wHJrarT0uHQB-QP-A1CQr19TMY-93mIr5MlcKXJdjmWaB0tsvq93D2ribpmGhB8uNFBLm_s4krXMz8hjYu08lvV9vs_9n2tly9hbApBdo9XtypWw8zsa3igMsxIIEs0BP8mz6A6nYzFROqymDz1I7NqgitX7ilhxs3xhy-wRue3vU5aMoPTrmeVkqYPhKGPX0xNU9He51SSESxELTAB-q3E2NDuCXCcQU1WefDxR6rYgMOUbyNR7o',
    category: 'new-arrivals',
    badge: 'Daily Wear',
    description: 'A lifestyle product featuring soft-focus casual wear including lounge pants and t-shirts drape styled for supreme breathability.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#D2B48C' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    fabric: 'Pima Cotton',
    packInfo: 'Everyday Lounge Comfort',
    details: [
      '100% Breathable Combed Cotton',
      'Garment-dyed for unique soft feel and color vintage',
      'Comfort-focused drawstring waist on lounge pants',
      'Perfect for working from home or gentle leisure'
    ],
    inStock: true
  },
  {
    id: 'cotton-innerwear',
    name: 'Cotton Innerwear',
    price: 849,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUypmYwtk3mxw2lsYALJ0TbN2uRMKyiSFxTyJYAQc9_1bN39XLZ2l_y4gR-KZmYOum0PWyibyxYilYa5hetz9h8eShr4GGUfyoJL1C_quBPYGcqxNPbBlhiAaNrsLFg_P4xWxivEUNYk7Tg3eMmd2dHTuMbPIWnQ9GWGy4NebBuTBZQbCBPlUhiuslvprW0sRnrunDjeeuelJXNaC8kGJcs8ERIq4btKvdxWtTjH5eE68VpR5aOlPojYi-uGbDCSFe3j9AOZQFYWQ',
    category: 'women',
    badge: 'Premium',
    description: 'Ultimate breathability and zero seam irritation. Neatly woven with fine-quality cotton threads for high-end boutique appeal.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#D2B48C' }
    ],
    fabric: 'Pima Cotton',
    packInfo: 'Ultimate Breathability | Seamless',
    details: [
      'Hypoallergenic lightweight cotton fabric',
      'Ergonomic contouring for absolute freedom of movement',
      'Seamless edges for invisibility under tight outerwear',
      'Highly resistant to color fading and piling'
    ],
    inStock: true
  },
  {
    id: 'comfort-loungewear',
    name: 'Comfort Loungewear',
    price: 2499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkb3D4q3NJ4fXSrmoi1EQWuLk53eirBXxSWEJwsEIwP5DV4WYbZtQglDSK-6XUpEIHP-gU-TRV9EpPBKWTG4UwtGMIm5VytXH_DMBss8pOTcuttggcQ1Uj1bcSIwyTcrU4q_fjue-8C1-dLo6f81kwXBHA67P_KYJzNlL_qOuu1VbussKpqDdl900ni5asC0-eSl0HrjabKYFLQjHjDjrn4F6RajQlBZ18J9Hwn_YJ9j1ja7rtem9Pn_ZgyQpYwNEFM_f0e6kAESY',
    category: 'women',
    badge: 'Premium Collection',
    description: 'Luxuriously soft modal-blend loungewear offering a relaxed fit and ultimate comfort for daily lounging. Complete cozy set.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#1E1E1E' },
      { name: 'Beige', hex: '#D2B48C' }
    ],
    fabric: 'Modal Blend',
    packInfo: 'Modal Blend | Relaxed Fit',
    details: [
      'Silky micro-modal yarns blended with premium cotton',
      'Unsurpassed skin-friendly drape and softness',
      'Elegant crewneck drape top and ribbed hem jogger',
      'Durable elastic waist with refined knit drawcords'
    ],
    inStock: true
  },
  {
    id: 'mercerized-formal',
    name: 'Mercerized Formal Pack',
    price: 1799,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIG2uq0-CpsqWcccpMg1RQyJ2HfNkv8UCR4AHfZ17FPjD68HojRhaNtIl6nwaCTrfS5cgImAzyFldt0v3a-HHxa2F31w1-8IBHsr5O9P5fqKSU6imzyyIW3DX5Q6j949NhU9TeqavcleRFGNWX1XH1HKlBQ-s8_H0f9niSFUYITjMt1H9KfcawnzgXtczJuHNV59z_05HqpSGD4SgXzjPk4X4QVQqauB5LZVR140-O7MMqkiDIuexGZimL1KUas7M_i5USSYMjFQ8',
    category: 'men',
    badge: 'Premium',
    description: 'A curated 5-pair formal sock set with a gloss finish. Constructed with mercerized cotton for a distinct high-quality sheen.',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#1E1E1E' },
      { name: 'Navy Blue', hex: '#001F3F' }
    ],
    fabric: 'Pima Cotton',
    packInfo: '5 Pairs | Gloss Finish',
    details: [
      'Double mercerized long-staple cotton fibers',
      'Gives a silk-like lustrous shine and brilliant colors',
      'Enhanced wear resistance with hand-linked toe seams',
      'Perfect length for tailored dress suits'
    ],
    inStock: true
  },
  {
    id: 'bamboo-knit',
    name: 'Bamboo Knit Vest',
    price: 999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeFR5-GKeM1vsk16L9BoiDqv-VrpbDDDZ1a3a7ydNhygkgLof2hWVRT_fj1gthF59JuX59h1EUSptekOIxXMAk1uXPmg_FwZ8EFf08Zy-fG5abbPfrQ3wCYddagLaq2oc1ohX-VSOuNgt0HtjlOMpd-8JKgHp0_XrcvTQ7icYeNnXyyz6T3Ety3FPY5IRYIBmXoHzrmLnSleo-6jwJ5pEncR6OwbFPvXwgYgksePkSF09iEAeSz2b5voJPVze_Tlb4ANLZCUKApTs',
    category: 'men',
    badge: 'Premium',
    description: 'Finely woven bamboo-fiber undershirt offering anti-bacterial protection, natural temperature regulation, and ultra-light comfort.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#D2B48C' }
    ],
    fabric: 'Bamboo Fiber',
    packInfo: 'Anti-bacterial | Lightweight',
    details: [
      '95% Organic Bamboo Fiber, 5% Spandex for responsive stretch',
      'Naturally antibacterial and hypoallergenic properties',
      'Micro-gaps in fabric fiber offer premium sweat-wicking',
      'Dries up to 2 times faster than conventional cotton'
    ],
    inStock: true
  },
  {
    id: 'performance-sports',
    name: 'Performance Sports Pack',
    price: 1149,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs09jYLYwGKsjJl2qb4xO5yK1meeZFsjhftjxK6w_Qi7hBML67yEcGbx5Dl5cZ1WbhSgMO14RG5el4WImWLfim6MVX8N8SMiSHjDUwt0ReRNe4voRWWYArx4d7DajJ8nHbkM64441Ui53YmpX85aNnSEVkjgSVq8zjNn8zvklO3FX32FIU5__5TUXHTefvf1h070_wHKbq42AjlCiQIXrBOdLtvQBAhsMt8bFeSnq1gcgGx6Vmmw6wYxvZcEe_wLsGgar5xfBxlKM',
    category: 'kids',
    badge: 'Daily Wear',
    description: 'Sports socks with extra cushioning and arch support. Highly durable performance-oriented knit cotton blends.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Navy Blue', hex: '#001F3F' }
    ],
    fabric: 'Pima Cotton',
    packInfo: 'Extra Cushioning | Arch Support',
    details: [
      'High-density terry-loop padding on heel and forefoot',
      'Dynamic compression bands around the arch for posture support',
      'Vented mesh panels along the bridge for max ventilation',
      'Engineered cuffs prevent slippage during active wear'
    ],
    inStock: true
  },
  {
    id: 'heritage-luxe',
    name: 'Premium Luxe Silk-Finish Hosiery',
    price: 1499,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtPBR6Hb2OPIJyAc0i9RBL8Bc0PtymbcmB_EIFNfCqwxTw1jNs9h_W-3lZXYtsd6OcWfjZErBaGy4XIG23qoZ-7k2_7IfriBDwPHcP_vjQ9S3m1M5gKnEwU2_7Ev5Zq_zkMaqHjNaAyg_NSqu_OFeKUNdBvUYqpJgQiDg6cHrccrtDVVZShLh6H5V0YELWih4J667Yn5a1clXeqVhrcOSRaX-fYWoX1RtNftQ3S3VS6hU1xzc8yhAQ-RJo',
    category: 'women',
    badge: 'Premium Collection',
    description: 'Experience the pinnacle of comfort with our Premium Luxe collection. Crafted from high-density long-staple cotton, these pieces offer a second-skin feel with unparalleled breathability and a subtle, sophisticated sheen.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#D2B48C' },
      { name: 'Charcoal', hex: '#1E1E1E' }
    ],
    fabric: 'Pima Cotton',
    packInfo: 'Premium Collection | Comfort Redefined',
    details: [
      '95% Long-staple Combed Cotton, 5% Premium Elastane for shape retention.',
      'Machine wash cold with like colors. Tumble dry low or air dry for longevity.',
      'Eco-friendly dyes that remain vibrant even after 50+ washes.'
    ],
    inStock: true
  }
];

export const featuredProducts = products.filter(p => 
  p.id === 'premium-socks' || 
  p.id === 'essential-innerwear' || 
  p.id === 'winter-thermal' || 
  p.id === 'casual-cotton'
);
