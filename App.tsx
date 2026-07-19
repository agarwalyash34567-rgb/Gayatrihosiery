import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Sparkles, Heart, Trash2, X, Info } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AboutUs from './components/AboutUs';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import AdminPortal from './components/AdminPortal';
import { Product, CartItem, ScreenType } from './types';
import { products, featuredProducts } from './data';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Active stateful product catalog synchronization
  const [activeProducts, setActiveProducts] = useState<Product[]>(products);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gayatri_inventory');
      if (saved) {
        setActiveProducts(JSON.parse(saved));
      } else {
        localStorage.setItem('gayatri_inventory', JSON.stringify(products));
        localStorage.setItem('gayatri_inventory_raw_seed', JSON.stringify(products));
      }
    } catch (e) {
      console.error('Error seeding storage products:', e);
    }
  }, []);

  // Synchronize on transition
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gayatri_inventory');
      if (saved) {
        setActiveProducts(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error syncing dynamic products:', e);
    }
  }, [location.pathname]);

  const activeFeaturedProducts = activeProducts.filter(p => 
    p.id === 'premium-socks' || 
    p.id === 'essential-innerwear' || 
    p.id === 'winter-thermal' || 
    p.id === 'casual-cotton'
  );

  // Shared state engines
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Interactive filter and sorting states for catalogs
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [filterFabric, setFilterFabric] = useState<string>('all');
  const [filterSize, setFilterSize] = useState<string>('all');

  // Success Feedback Toast Notifications
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  // Load cart and wishlist from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gayatri_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWish = localStorage.getItem('gayatri_wishlist');
      if (savedWish) setWishlist(JSON.parse(savedWish));
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }
  }, []);

  // Save cart and wishlist whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('gayatri_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gayatri_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage:', e);
    }
  }, [wishlist]);

  // Derive active screen type from route path
  const getScreenFromPath = (pathname: string): ScreenType => {
    const p = pathname.replace(/^\//, '');
    if (!p || p === 'home') return 'home';
    if (p === 'about-us' || p === 'contact' || p === 'women' || p === 'men' || p === 'kids' || p === 'new-arrivals' || p === 'admin') {
      return p as ScreenType;
    }
    if (p.startsWith('product/')) {
      return 'product-detail';
    }
    return 'home';
  };

  const currentScreen = getScreenFromPath(location.pathname);

  // Reset category filters when screen changes
  useEffect(() => {
    setSortBy('default');
    setFilterFabric('all');
    setFilterSize('all');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Utility toast messenger
  const triggerToast = (msg: string) => {
    setToast({ message: msg, show: true });
    setTimeout(() => {
      setToast({ message: '', show: false });
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: qty }];
    });
    triggerToast(`Added ${qty}x ${product.name} (Size: ${size}) to your bag.`);
  };

  const handleUpdateCartQty = (productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
    triggerToast('Removed item from shopping bag.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      triggerToast('Removed from wishlist.');
    } else {
      setWishlist((prev) => [...prev, product]);
      triggerToast('Added to wishlist. You can view all loved items in your loved drawer.');
    }
  };

  // Screen navigation wrapper matching existing API signature
  const handleSetScreen = (screen: ScreenType) => {
    if (screen === 'home') {
      navigate('/');
    } else {
      navigate('/' + screen);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 left-6 z-50 bg-navy text-surface text-xs font-semibold py-3 px-5 rounded-lg shadow-2xl border border-gold/30 flex items-center space-x-2 animate-bounce">
          <Sparkles size={14} className="text-gold" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={handleSetScreen}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        wishlist={wishlist}
        setIsWishlistOpen={setIsWishlistOpen}
        onSearch={setSearchQuery}
        setSelectedProduct={(p) => navigate('/product/' + p.id)}
        allProducts={activeProducts}
      />

      {/* Routed main body */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                setScreen={handleSetScreen}
                featuredProducts={activeFeaturedProducts}
                wishlist={wishlist}
                handleToggleWishlist={handleToggleWishlist}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          
          <Route path="/about-us" element={<AboutUs />} />
          
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/admin"
            element={
              <AdminPortal
                onBackToHome={() => handleSetScreen('home')}
                triggerToast={triggerToast}
              />
            }
          />

          <Route
            path="/product/:productId"
            element={
              <ProductDetailWrapper
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                handleToggleWishlist={handleToggleWishlist}
                handleSetScreen={handleSetScreen}
                activeProducts={activeProducts}
              />
            }
          />

          {/* Individual Category routes */}
          <Route
            path="/women"
            element={
              <CatalogView
                category="women"
                products={activeProducts}
                searchQuery={searchQuery}
                sortBy={sortBy}
                filterFabric={filterFabric}
                filterSize={filterSize}
                setSortBy={setSortBy}
                setFilterFabric={setFilterFabric}
                setFilterSize={setFilterSize}
                setSearchQuery={setSearchQuery}
                handleAddToCart={handleAddToCart}
                handleToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/men"
            element={
              <CatalogView
                category="men"
                products={activeProducts}
                searchQuery={searchQuery}
                sortBy={sortBy}
                filterFabric={filterFabric}
                filterSize={filterSize}
                setSortBy={setSortBy}
                setFilterFabric={setFilterFabric}
                setFilterSize={setFilterSize}
                setSearchQuery={setSearchQuery}
                handleAddToCart={handleAddToCart}
                handleToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/kids"
            element={
              <CatalogView
                category="kids"
                products={activeProducts}
                searchQuery={searchQuery}
                sortBy={sortBy}
                filterFabric={filterFabric}
                filterSize={filterSize}
                setSortBy={setSortBy}
                setFilterFabric={setFilterFabric}
                setFilterSize={setFilterSize}
                setSearchQuery={setSearchQuery}
                handleAddToCart={handleAddToCart}
                handleToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/new-arrivals"
            element={
              <CatalogView
                category="new-arrivals"
                products={activeProducts}
                searchQuery={searchQuery}
                sortBy={sortBy}
                filterFabric={filterFabric}
                filterSize={filterSize}
                setSortBy={setSortBy}
                setFilterFabric={setFilterFabric}
                setFilterSize={setFilterSize}
                setSearchQuery={setSearchQuery}
                handleAddToCart={handleAddToCart}
                handleToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
        </Routes>
      </main>

      {/* Main Brand Footer */}
      <Footer setScreen={handleSetScreen} />

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        setScreen={handleSetScreen}
      />

      {/* Wishlist loved items Drawer component */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setIsWishlistOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-surface flex flex-col shadow-2xl h-full">
              
              <div className="p-6 border-b border-surface-container-highest flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="text-gold" size={20} fill="currentColor" />
                  <h2 className="font-serif text-lg font-bold text-navy uppercase tracking-wider">Your Loved Items</h2>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="text-on-surface hover:text-gold transition-colors focus:outline-none p-1">
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                    <div className="p-4 bg-surface-container rounded-full text-gold">
                      <Heart size={32} />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-navy">No loved items yet</h3>
                      <p className="text-xs text-on-surface-variant mt-1 max-w-[240px] leading-relaxed">
                        Tap the heart icon on any of our premium products to save them for later.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex items-start space-x-4 pb-4 border-b border-surface-container cursor-pointer hover:bg-surface-container-low p-2 rounded transition-colors"
                        onClick={() => {
                          navigate('/product/' + prod.id);
                          setIsWishlistOpen(false);
                        }}
                      >
                        <img src={prod.image} alt={prod.name} className="w-12 h-16 object-cover rounded bg-surface-container-low" />
                        
                        <div className="flex-grow min-w-0">
                          <h4 className="font-serif text-xs font-bold text-navy truncate">{prod.name}</h4>
                          <p className="text-[10px] text-on-surface-variant/80 font-semibold">{prod.fabric}</p>
                          <p className="text-xs font-bold text-navy mt-1">₹{prod.price.toLocaleString('en-IN')}</p>
                        </div>

                        <div className="flex flex-col space-y-2 items-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist(prod);
                            }}
                            className="text-on-surface-variant hover:text-red-600 p-1"
                            title="Remove from Loved Items"
                          >
                            <Trash2 size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(prod, prod.sizes[0] || 'M');
                            }}
                            className="text-[9px] font-bold text-navy bg-gold/10 hover:bg-gold hover:text-surface px-2 py-1 rounded border border-gold/30 transition-all uppercase"
                          >
                            ADD +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-surface-container bg-surface-container-low">
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-full bg-navy text-surface py-3 text-xs font-bold tracking-widest rounded-lg hover:bg-gold transition-colors uppercase"
                >
                  CLOSE WISHLIST
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* SUB-VIEW 1: HOME PAGE VIEW */
interface HomeViewProps {
  setScreen: (scr: ScreenType) => void;
  featuredProducts: Product[];
  wishlist: Product[];
  handleToggleWishlist: (p: Product) => void;
  handleAddToCart: (product: Product, size: string, qty?: number) => void;
}

function HomeView({
  setScreen,
  featuredProducts,
  wishlist,
  handleToggleWishlist,
  handleAddToCart
}: HomeViewProps) {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [volume, setVolume] = React.useState(80);
  const [isMuted, setIsMuted] = React.useState(false);
  const [quality, setQuality] = React.useState<'1080p' | '4K UHD'>('1080p');
  const [subtitlesEnabled, setSubtitlesEnabled] = React.useState(true);

  // Video timer ticker
  React.useEffect(() => {
    let interval: any = null;
    if (isVideoOpen && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 135) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVideoOpen, isPlaying]);

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Get synchronized subtitle based on current time
  const getSubtitleText = (secs: number) => {
    if (secs < 5) return 'Welcome to Gayatri Hosiery mills in Ghaziabad, Uttar Pradesh.';
    if (secs < 12) return 'Our family has been perfecting combed long-staple cotton spinning for generations.';
    if (secs < 20) return 'Every yarn is combed multiple times to extract short, abrasive fibers.';
    if (secs < 30) return 'We utilize advanced double-stitch flatlock seams to avoid skin impressions.';
    if (secs < 45) return 'Our waistbands are brushed with soft micro-Modal to guarantee a No-Marks wear.';
    if (secs < 60) return 'Experience the uncompromised luxury and secondary skin-like comfort.';
    if (secs < 75) return 'Available directly from our loom, shipped to every pin code across India.';
    return 'Gayatri Hosiery: Crafted for daily comfort and lifetime endurance.';
  };

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      {/* Hero sliding/marketing segment */}
      <HeroSection setScreen={setScreen} />

      {/* Custom Bento-Grid Category Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy tracking-tight">
            Choose Your Premium Fit
          </h2>
          <p className="font-sans text-xs text-on-surface-variant font-medium uppercase tracking-widest">
            Perfected loom craftsmanship for ultimate comfort
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Women Card */}
          <div
            onClick={() => setScreen('women')}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-surface-container hover:shadow-2xl transition-all duration-300"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUypmYwtk3mxw2lsYALJ0TbN2uRMKyiSFxTyJYAQc9_1bN39XLZ2l_y4gR-KZmYOum0PWyibyxYilYa5hetz9h8eShr4GGUfyoJL1C_quBPYGcqxNPbBlhiAaNrsLFg_P4xWxivEUNYk7Tg3eMmd2dHTuMbPIWnQ9GWGy4NebBuTBZQbCBPlUhiuslvprW0sRnrunDjeeuelJXNaC8kGJcs8ERIq4btKvdxWtTjH5eE68VpR5aOlPojYi-uGbDCSFe3j9AOZQFYWQ"
              alt="Women Loungewear Elite collection"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-surface space-y-1">
              <p className="font-sans text-[9px] tracking-widest text-gold font-extrabold uppercase">EXCLUSIVE RANGE</p>
              <h3 className="font-serif text-lg font-bold">Women's Loungewear</h3>
              <p className="font-sans text-[10px] text-surface-container/80 line-clamp-1 leading-relaxed">
                Silky Modal Blends & Pima Cotton Sets
              </p>
              <button className="pt-2 text-[9px] font-bold text-gold hover:underline tracking-widest uppercase">
                BROWSE WOMEN →
              </button>
            </div>
          </div>

          {/* Men Card */}
          <div
            onClick={() => setScreen('men')}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-surface-container hover:shadow-2xl transition-all duration-300"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk3fteb0RoZlTydYV7a7L72dz6xe9myi3Mjn7E3GXmDz2zYwNDczUbEcpFOihxa1EoBGCUuW0GOgnVWQVqUdwxPXJ02XYJdXegZIn9LRE42Enuq4jkmtNj66zVkbLdLwGZKzTG8jhyLS4BALJh24mU_OC0MuFtwUc6uj-aE90Fa_ccXQrpjXdIz5ppumAoVTnw1PwNbqgjzuGJlGhuv8snCnDgHLTZoyOfPVrkGu0TX8thfHrxk1j_A0_d7tN6_frfF6r720Klmko"
              alt="Men Premium Support brief and undershirt collection"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-surface space-y-1">
              <p className="font-sans text-[9px] tracking-widest text-gold font-extrabold uppercase">THE BESTSELLER</p>
              <h3 className="font-serif text-lg font-bold">Men's Classics</h3>
              <p className="font-sans text-[10px] text-surface-container/80 line-clamp-1 leading-relaxed">
                Ergonomic Briefs, Insulated Thermals & Bamboo Vests
              </p>
              <button className="pt-2 text-[9px] font-bold text-gold hover:underline tracking-widest uppercase">
                BROWSE MEN →
              </button>
            </div>
          </div>

          {/* Kids Card */}
          <div
            onClick={() => setScreen('kids')}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-surface-container hover:shadow-2xl transition-all duration-300"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs09jYLYwGKsjJl2qb4xO5yK1meeZFsjhftjxK6w_Qi7hBML67yEcGbx5Dl5cZ1WbhSgMO14RG5el4WImWLfim6MVX8N8SMiSHjDUwt0ReRNe4voRWWYArx4d7DajJ8nHbkM64441Ui53YmpX85aNnSEVkjgSVq8zjNn8zvklO3FX32FIU5__5TUXHTefvf1h070_wHKbq42AjlCiQIXrBOdLtvQBAhsMt8bFeSnq1gcgGx6Vmmw6wYxvZcEe_wLsGgar5xfBxlKM"
              alt="Kids Active Stretch support collection"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-surface space-y-1">
              <p className="font-sans text-[9px] tracking-widest text-gold font-extrabold uppercase">DAILY PROTECTION</p>
              <h3 className="font-serif text-lg font-bold">Kids Active Premium</h3>
              <p className="font-sans text-[10px] text-surface-container/80 line-clamp-1 leading-relaxed">
                Cushioned Terry-Loop Arch Support Socks
              </p>
              <button className="pt-2 text-[9px] font-bold text-gold hover:underline tracking-widest uppercase">
                BROWSE KIDS →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="font-serif text-2xl font-bold text-navy">Featured Premium Collection</h2>
            <p className="text-xs text-on-surface-variant font-medium">Uncompromising premium quality commitment. Sourced organically.</p>
          </div>
          <button
            onClick={() => setScreen('new-arrivals')}
            className="text-xs font-bold text-gold hover:underline tracking-widest uppercase flex items-center space-x-1"
          >
            <span>VIEW ALL PRODUCTS</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={(p) => navigate('/product/' + p.id)}
              isWishlisted={wishlist.some((item) => item.id === prod.id)}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Brand Heritage Video Mockup / Trust banner */}
      <section className="bg-surface-container py-12 border-y border-surface-container-highest relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-1 text-gold font-bold text-xs uppercase tracking-widest">
                <Sparkles size={14} />
                <span>Trust & Pure Softness</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy leading-snug">
                Why Gayatri Hosiery is India's Premium Comfort Choice
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Unlike generic factory-spun hosiery, we maintain a boutique standard. Our pima and organic cotton yarns are combed multiple times to extract short fibers, ensuring only the longest, strongest cotton fibers are spun. This results in standard-defying shape retention and a luxurious, silk-finish hand feel that prevents skin rashes, itching, and seam chafing even during long summer days.
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setScreen('about-us')}
                  className="bg-navy text-surface py-3 px-6 text-[10px] font-bold tracking-widest rounded-lg hover:bg-gold transition-colors uppercase"
                >
                  Read Our Story
                </button>
              </div>
            </div>

            <div 
              onClick={() => { setIsVideoOpen(true); setIsPlaying(true); }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-xl bg-[#000613] border border-white flex items-center justify-center cursor-pointer group"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZvYcQfpjd1vlbqE7Y1avE33wHJrarT0uHQB-QP-A1CQr19TMY-93mIr5MlcKXJdjmWaB0tsvq93D2ribpmGhB8uNFBLm_s4krXMz8hjYu08lvV9vs_9n2tly9hbApBdo9XtypWw8zsa3igMsxIIEs0BP8mz6A6nYzFROqymDz1I7NqgitX7ilhxs3xhy-wRue3vU5aMoPTrmeVkqYPhKGPX0xNU9He51SSESxELTAB-q3E2NDuCXCcQU1WefDxR6rYgMOUbyNR7o"
                alt="Premium soft cotton material close shot"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-surface/90 border border-gold text-navy flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl pl-0.5">play_arrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Video Loom Tour Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
          <div className="absolute inset-0 bg-black/90 transition-opacity" onClick={() => { setIsVideoOpen(false); setIsPlaying(false); }} />
          
          <div className="relative bg-[#000613] border border-gold/30 rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-navy flex items-center justify-between border-b border-surface-container-highest">
              <div className="flex items-center space-x-2">
                <span className="animate-pulse w-2 h-2 rounded-full bg-gold" />
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-surface">Gayatri Heritage Loom Tour</h3>
                <span className="text-[10px] text-gold/80 font-bold font-mono uppercase border border-gold/20 px-1.5 py-0.5 rounded">Ghaziabad Mill</span>
              </div>
              <button 
                onClick={() => { setIsVideoOpen(false); setIsPlaying(false); }}
                className="text-surface/80 hover:text-gold transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Simulated Video Frame with Background Loom Pic */}
            <div className="relative aspect-video bg-[#00040b] flex flex-col justify-between overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZvYcQfpjd1vlbqE7Y1avE33wHJrarT0uHQB-QP-A1CQr19TMY-93mIr5MlcKXJdjmWaB0tsvq93D2ribpmGhB8uNFBLm_s4krXMz8hjYu08lvV9vs_9n2tly9hbApBdo9XtypWw8zsa3igMsxIIEs0BP8mz6A6nYzFROqymDz1I7NqgitX7ilhxs3xhy-wRue3vU5aMoPTrmeVkqYPhKGPX0xNU9He51SSESxELTAB-q3E2NDuCXCcQU1WefDxR6rYgMOUbyNR7o"
                alt="Heritage Spinning Loom"
                className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 saturate-100 opacity-90' : 'scale-100 saturate-50 opacity-60'}`}
                referrerPolicy="no-referrer"
              />

              {/* Subtitles Overlay */}
              {subtitlesEnabled && (
                <div className="absolute bottom-16 left-4 right-4 text-center">
                  <span className="bg-black/80 text-surface text-xs sm:text-sm font-medium px-4 py-1.5 rounded border border-white/10 shadow-lg inline-block">
                    {getSubtitleText(currentTime)}
                  </span>
                </div>
              )}

              {/* Pause overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-surface/90 border-2 border-gold text-navy flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-4xl pl-1">play_arrow</span>
                  </div>
                </div>
              )}

              {/* Loader indicator during first few seconds */}
              {isPlaying && currentTime === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#000613]/90 space-y-3">
                  <span className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
                  <span className="text-[10px] text-gold font-bold uppercase tracking-widest font-mono">Loading HD Stream...</span>
                </div>
              )}
            </div>

            {/* Custom Video Controls Bar */}
            <div className="p-4 bg-navy text-surface border-t border-surface-container-highest flex flex-col gap-3 font-sans text-xs">
              {/* Progress Slider */}
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] text-surface-container/70 font-bold">{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden relative cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    setCurrentTime(Math.floor(percent * 135));
                  }}
                >
                  <div 
                    className="bg-gold h-full rounded-full transition-all duration-200"
                    style={{ width: `${(currentTime / 135) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-surface-container/70 font-bold">2:15</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause */}
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-surface hover:text-gold transition-colors font-bold flex items-center space-x-1 p-1"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  {/* Mute/Volume */}
                  <div className="flex items-center space-x-1.5">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-surface hover:text-gold transition-colors p-1"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isMuted || volume === 0 ? 'volume_off' : volume < 50 ? 'volume_down' : 'volume_up'}
                      </span>
                    </button>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseInt(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="w-16 accent-gold cursor-pointer h-1 rounded bg-white/20"
                    />
                  </div>
                </div>

                {/* Subtitles & Resolution */}
                <div className="flex items-center space-x-4 text-[10px] font-bold">
                  {/* Subtitles toggle */}
                  <button 
                    onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                    className={`px-2 py-1 rounded border transition-colors ${subtitlesEnabled ? 'bg-gold/20 text-gold border-gold/40' : 'border-white/10 text-surface/60 hover:text-surface'}`}
                  >
                    CC
                  </button>

                  {/* Resolution toggle */}
                  <button 
                    onClick={() => setQuality(quality === '1080p' ? '4K UHD' : '1080p')}
                    className="px-2 py-1 rounded border border-white/20 hover:border-gold hover:text-gold transition-colors font-mono"
                  >
                    {quality}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* SUB-VIEW 2: CATALOG VIEW (FOR CATEGORIES) */
interface CatalogViewProps {
  category: ScreenType;
  products: Product[];
  searchQuery: string;
  sortBy: string;
  filterFabric: string;
  filterSize: string;
  setSortBy: (v: any) => void;
  setFilterFabric: (v: string) => void;
  setFilterSize: (v: string) => void;
  setSearchQuery: (v: string) => void;
  handleAddToCart: (product: Product, size: string, qty?: number) => void;
  handleToggleWishlist: (p: Product) => void;
  wishlist: Product[];
}

function CatalogView({
  category,
  products,
  searchQuery,
  sortBy,
  filterFabric,
  filterSize,
  setSortBy,
  setFilterFabric,
  setFilterSize,
  setSearchQuery,
  handleAddToCart,
  handleToggleWishlist,
  wishlist
}: CatalogViewProps) {
  const navigate = useNavigate();

  const availableFabrics = Array.from(new Set(products.map((p) => p.fabric)));
  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const getFilteredProducts = () => {
    let list = [...products];

    // Category filter
    if (category === 'new-arrivals') {
      list = products.filter((p) => p.category === 'new-arrivals' || p.badge === 'New Arrival' || p.badge === 'Premium Collection');
    } else {
      list = products.filter((p) => p.category === category);
    }

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Fabric filter
    if (filterFabric !== 'all') {
      list = list.filter((p) => p.fabric === filterFabric);
    }

    // Size filter
    if (filterSize !== 'all') {
      list = list.filter((p) => p.sizes.includes(filterSize));
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  };

  const activeCatalogProducts = getFilteredProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in">
      {/* Banner Category block */}
      <div className="relative bg-[#000613] text-surface rounded-2xl p-8 sm:p-12 overflow-hidden border border-navy/40 flex flex-col justify-center min-h-[180px] sm:min-h-[220px]">
        <div className="absolute inset-0 watermark-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2 max-w-lg">
          <span className="font-sans text-[9px] tracking-widest font-extrabold text-gold uppercase">GAYATRI BOUTIQUE</span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-wider">
            {category === 'new-arrivals' ? 'Latest Luxury Drops' : `${category}'s Luxury Wear`}
          </h1>
          <p className="font-sans text-xs text-surface-container/80 leading-relaxed">
            Finely combed long-staple threads, eco-conscious dyes, and absolute anatomical support. Perfected premium boutique design.
          </p>
        </div>
      </div>

      {/* Catalog Filters Bar */}
      <div className="bg-surface-container-low border border-surface-container rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-sans text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Fabric Selector */}
          <div className="flex items-center space-x-1.5 bg-surface border border-surface-container px-3 py-1.5 rounded-lg">
            <span className="text-on-surface-variant font-medium">Fabric:</span>
            <select
              value={filterFabric}
              onChange={(e) => setFilterFabric(e.target.value)}
              className="font-bold text-navy outline-none cursor-pointer bg-transparent"
            >
              <option value="all">All Fabrics</option>
              {availableFabrics.map((fabric) => (
                <option key={fabric} value={fabric}>
                  {fabric}
                </option>
              ))}
            </select>
          </div>

          {/* Sizing Selector */}
          <div className="flex items-center space-x-1.5 bg-surface border border-surface-container px-3 py-1.5 rounded-lg">
            <span className="text-on-surface-variant font-medium">Size:</span>
            <select
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              className="font-bold text-navy outline-none cursor-pointer bg-transparent"
            >
              <option value="all">All Sizes</option>
              {availableSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sorting options dropdown */}
        <div className="flex items-center space-x-1.5 bg-surface border border-surface-container px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <span className="text-on-surface-variant font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="font-bold text-navy outline-none cursor-pointer bg-transparent"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Matched product catalog listing */}
      {activeCatalogProducts.length === 0 ? (
        <div className="bg-surface-container-low border border-surface-container rounded-2xl p-12 text-center space-y-4">
          <div className="text-on-surface-variant/70">
            <Info size={32} className="mx-auto" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-navy">No matching garments found</h3>
            <p className="text-xs text-on-surface-variant mt-1">Try adjusting your filters or search criteria.</p>
          </div>
          <button
            onClick={() => {
              setFilterFabric('all');
              setFilterSize('all');
              setSortBy('default');
              setSearchQuery('');
            }}
            className="bg-navy text-surface text-xs font-bold tracking-widest py-2 px-5 rounded hover:bg-gold transition-colors"
          >
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCatalogProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={(p) => navigate('/product/' + p.id)}
              isWishlisted={wishlist.some((item) => item.id === prod.id)}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* SUB-VIEW 3: PRODUCT DETAIL WRAPPER */
interface ProductDetailWrapperProps {
  onAddToCart: (product: Product, size: string, qty?: number) => void;
  wishlist: Product[];
  handleToggleWishlist: (p: Product) => void;
  handleSetScreen: (screen: ScreenType) => void;
  activeProducts: Product[];
}

function ProductDetailWrapper({
  onAddToCart,
  wishlist,
  handleToggleWishlist,
  handleSetScreen,
  activeProducts
}: ProductDetailWrapperProps) {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = activeProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 bg-navy/5 text-navy/40 rounded-full flex items-center justify-center mx-auto">
          <Info size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-navy">Garment Not Found</h2>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            The premium garment you are looking for does not exist or has been archived from our catalog.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-navy text-surface py-2.5 px-6 text-xs font-bold tracking-widest rounded-lg hover:bg-gold transition-colors uppercase font-sans"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      onAddToCart={onAddToCart}
      isWishlisted={wishlist.some((item) => item.id === product.id)}
      onToggleWishlist={handleToggleWishlist}
      allProducts={activeProducts}
      onSelectProduct={(p) => navigate('/product/' + p.id)}
      setScreen={handleSetScreen}
    />
  );
}
