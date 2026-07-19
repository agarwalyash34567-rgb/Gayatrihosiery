import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Shield, RefreshCw, Truck, ArrowLeft, Plus, Minus, Star, Ruler, X } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (p: Product, size: string, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
  setScreen: (screen: 'home' | 'new-arrivals') => void;
}

export default function ProductDetail({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  allProducts,
  onSelectProduct,
  setScreen,
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(false);

  // Set default state values when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0]?.name || '');
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
  };

  // Find similar products in same category
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If no products in same category, just take other products
  const fallbackProducts = similarProducts.length > 0 
    ? similarProducts 
    : allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-surface py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in font-sans">
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 watermark-pattern opacity-[0.015] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation Breadcrumb & Back action */}
        <div className="flex items-center space-x-2 text-xs text-on-surface-variant font-medium">
          <button
            onClick={() => setScreen('new-arrivals')}
            className="flex items-center space-x-1 hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO COLLECTIONS</span>
          </button>
          <span>/</span>
          <span className="uppercase text-gold font-semibold">{product.category}'s collection</span>
          <span>/</span>
          <span className="truncate max-w-[120px] sm:max-w-xs">{product.name}</span>
        </div>

        {/* Double Column Grid Details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COL - Image panel */}
          <div className="lg:col-span-6 space-y-4">
            <div 
              className="relative aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden shadow-lg border border-surface-container-highest cursor-zoom-in"
              onClick={() => setZoomedImage(!zoomedImage)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${zoomedImage ? 'scale-150' : 'scale-100'}`}
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-navy text-surface text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                  {product.badge}
                </span>
              )}
              
              {/* Image zooming prompt */}
              <div className="absolute bottom-4 right-4 bg-navy/80 text-surface text-[9px] font-bold px-2 py-1 rounded backdrop-blur-sm select-none">
                {zoomedImage ? 'CLICK TO SHRINK' : 'CLICK TO ZOOM'}
              </div>
            </div>

            {/* Quality badge badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-surface-container-low rounded-lg text-center border border-surface-container">
                <span className="material-symbols-outlined text-gold text-lg mb-1">nest_eco_goggles</span>
                <p className="text-[10px] font-bold text-navy">100% Breathable</p>
                <p className="text-[8px] text-on-surface-variant">Cotton Knit</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg text-center border border-surface-container">
                <span className="material-symbols-outlined text-gold text-lg mb-1">dry_cleaning</span>
                <p className="text-[10px] font-bold text-navy">Zero Shrinkage</p>
                <p className="text-[8px] text-on-surface-variant">Pre-washed fabric</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg text-center border border-surface-container">
                <span className="material-symbols-outlined text-gold text-lg mb-1">award_star</span>
                <p className="text-[10px] font-bold text-navy">Premium Fit</p>
                <p className="text-[8px] text-on-surface-variant">No marks soft weave</p>
              </div>
            </div>
          </div>

          {/* RIGHT COL - Specifications & CTA panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-[10px] tracking-widest font-bold text-gold uppercase">
                {product.fabric} • Premium Standard
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy leading-snug">
                {product.name}
              </h1>
              
              {/* Product Rating and Reviews */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="mr-0.5" />
                  ))}
                </div>
                <span className="text-xs text-on-surface-variant font-medium">(4.9/5 • 48 verified customer reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-surface-container-low border border-surface-container rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-sans text-on-surface-variant/70 font-semibold uppercase tracking-wider">Inclusive of all Indian taxes</p>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-xl sm:text-2xl font-bold text-navy">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-on-surface-variant/60 font-semibold line-through">₹{Math.round(product.price * 1.2)}</span>
                  <span className="text-xs text-green-600 font-bold">(20% off)</span>
                </div>
              </div>
              <span className="bg-gold/10 text-gold text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                Free standard shipping
              </span>
            </div>

            {/* Product short description */}
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector Form */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">
                  Select Size: <span className="font-extrabold text-gold">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="flex items-center space-x-1 text-xs font-bold text-gold hover:underline"
                >
                  <Ruler size={14} />
                  <span>Sizing Chart Guide</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-[44px] border rounded-lg text-xs font-bold transition-all focus:outline-none ${
                      selectedSize === size
                        ? 'bg-navy border-navy text-surface shadow-md'
                        : 'border-surface-container-highest text-on-surface hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector chips */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-navy uppercase tracking-wider">
                Select Color Accent: <span className="font-semibold text-on-surface-variant">{selectedColor}</span>
              </label>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`p-1 rounded-full border-2 transition-all focus:outline-none ${
                      selectedColor === color.name ? 'border-gold scale-110' : 'border-transparent'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-white"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Stock indicator and Quantity bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy uppercase tracking-wider">Quantity</label>
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-surface-container-highest rounded-lg bg-surface hover:bg-surface-container-low transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-surface-container-highest rounded-lg bg-surface hover:bg-surface-container-low transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Stock status indicator */}
              <div className="flex items-center space-x-2 bg-green-50 border border-green-200/50 p-2.5 rounded-lg text-green-700">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] font-bold">IN STOCK & READY</p>
                  <p className="text-[9px] text-green-600">Dispatched from Ghaziabad within 24 Hrs</p>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-surface-container">
              <button
                onClick={handleAddToBag}
                className="flex-1 flex items-center justify-center space-x-2.5 bg-navy text-surface py-4 px-8 text-xs font-bold tracking-widest rounded-lg shadow-lg hover:bg-gold transition-all duration-300"
              >
                <ShoppingBag size={16} />
                <span>ADD TO SHOPPING BAG</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-4 rounded-lg border flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-gold/10 border-gold text-gold hover:bg-gold/20'
                    : 'border-surface-container-highest text-on-surface hover:border-gold hover:text-gold'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} className="mr-2" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
                </span>
              </button>
            </div>

            {/* Tabbed accordion specification data */}
            <div className="border border-surface-container rounded-xl overflow-hidden">
              <div className="flex border-b border-surface-container font-sans text-xs font-bold tracking-wider text-center">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-3 transition-colors ${
                    activeTab === 'details' ? 'bg-navy text-surface' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  FABRIC DETAILS
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`flex-1 py-3 transition-colors ${
                    activeTab === 'care' ? 'bg-navy text-surface' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  CARE INSTRUCTIONS
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`flex-1 py-3 transition-colors ${
                    activeTab === 'shipping' ? 'bg-navy text-surface' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  GUARANTEE & RETURNS
                </button>
              </div>

              <div className="p-4 text-xs text-on-surface-variant leading-relaxed bg-surface-container-lowest">
                {activeTab === 'details' && (
                  <ul className="list-disc pl-4 space-y-1.5">
                    {product.details?.map((detail, idx) => <li key={idx}>{detail}</li>) || (
                      <li>Premium long-staple pima cotton blend weaves.</li>
                    )}
                    <li>Designed to handle high humidity climates with active heat transfer.</li>
                    <li>Sustainably woven in Uttar Pradesh, India.</li>
                  </ul>
                )}
                {activeTab === 'care' && (
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>Machine wash cold with similar soft delicate colors.</li>
                    <li>Tumble dry low or air dry under shade to maintain fiber elasticity.</li>
                    <li>Do not bleach or dry clean. Iron on low if necessary.</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Truck size={16} className="text-gold shrink-0 mt-0.5" />
                      <p>
                        <strong>Free standard shipping:</strong> Delivered within 3-5 business days across major cities in India.
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RefreshCw size={16} className="text-gold shrink-0 mt-0.5" />
                      <p>
                        <strong>Hassle-Free 7-Day Exchanges:</strong> If sizing doesn't fit perfectly, we will arrange a doorstep exchange.
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Shield size={16} className="text-gold shrink-0 mt-0.5" />
                      <p>
                        <strong>Our Quality Trust:</strong> Proudly Indian owned. Crafted without compromising stitch consistency and comfort.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Similar items segment */}
        <div className="space-y-6 pt-12 border-t border-surface-container">
          <div className="text-center sm:text-left">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-navy">Similar Premium Pieces</h2>
            <p className="text-xs text-on-surface-variant font-medium mt-1">Customers who bought this also bought these handpicked items</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {fallbackProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group cursor-pointer space-y-2 border border-surface-container rounded-lg p-3 bg-surface hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/5] rounded overflow-hidden bg-surface-container">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left space-y-0.5">
                  <p className="text-[9px] uppercase tracking-wider text-gold font-bold">{p.fabric}</p>
                  <h4 className="font-serif text-xs font-bold text-navy truncate group-hover:text-gold transition-colors">{p.name}</h4>
                  <p className="text-xs font-bold text-navy">₹{p.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sizing Chart Dialog Modal Overlay */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-surface-container-highest rounded-2xl p-6 max-w-md w-full relative space-y-4">
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-4 right-4 text-on-surface hover:text-gold"
            >
              <X size={20} />
            </button>
            <div className="flex items-center space-x-2 border-b border-surface-container pb-3">
              <Ruler className="text-gold" size={20} />
              <h3 className="font-serif text-base font-bold text-navy">Standard Indian Fit Chart Guide</h3>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Our garments are styled following tailored Indian specifications. If you fall in between size markers, we suggest sizing up for comfortable loungewear, or sizing down for supportive innerwear.
            </p>

            <table className="w-full text-xs text-left font-sans border-collapse border border-surface-container">
              <thead>
                <tr className="bg-surface-container-low text-navy font-bold">
                  <th className="p-2 border border-surface-container">Size Accent</th>
                  <th className="p-2 border border-surface-container">Chest / Waist (Inches)</th>
                  <th className="p-2 border border-surface-container">Metric Fit (cm)</th>
                </tr>
              </thead>
              <tbody className="text-on-surface-variant">
                <tr>
                  <td className="p-2 border border-surface-container font-semibold text-navy">S</td>
                  <td className="p-2 border border-surface-container">36" - 38"</td>
                  <td className="p-2 border border-surface-container">90 - 95 cm</td>
                </tr>
                <tr className="bg-surface-container-lowest">
                  <td className="p-2 border border-surface-container font-semibold text-navy">M</td>
                  <td className="p-2 border border-surface-container">38" - 40"</td>
                  <td className="p-2 border border-surface-container">95 - 100 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-surface-container font-semibold text-navy">L</td>
                  <td className="p-2 border border-surface-container">40" - 42"</td>
                  <td className="p-2 border border-surface-container">100 - 105 cm</td>
                </tr>
                <tr className="bg-surface-container-lowest">
                  <td className="p-2 border border-surface-container font-semibold text-navy">XL</td>
                  <td className="p-2 border border-surface-container">42" - 44"</td>
                  <td className="p-2 border border-surface-container">105 - 110 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-surface-container font-semibold text-navy">XXL</td>
                  <td className="p-2 border border-surface-container">44" - 46"</td>
                  <td className="p-2 border border-surface-container">110 - 115 cm</td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="w-full bg-navy text-surface py-2.5 text-xs font-bold tracking-widest rounded-lg hover:bg-gold transition-colors"
            >
              GOT IT, CLOSE GUIDE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
