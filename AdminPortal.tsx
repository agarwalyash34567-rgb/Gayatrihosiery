import React, { useState, useEffect } from 'react';
import { Lock, User, Sparkles, LogOut, CheckCircle, Clock, ShoppingCart, Activity, RefreshCw, Layers, Edit, Check, X, ShieldAlert, AlertTriangle, IndianRupee, Trash2, Plus } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';

interface AdminPortalProps {
  onBackToHome: () => void;
  triggerToast: (msg: string) => void;
}

interface Inquiry {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  companyName?: string;
  message: string;
  resolved: boolean;
}

interface MockOrder {
  id: string;
  customerName: string;
  email: string;
  items: string;
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'GH-INQ-83021',
    date: '18 Jul 2026',
    name: 'Karan Mehra',
    email: 'mehra.textiles@gmail.com',
    phone: '9830022312',
    type: 'wholesale',
    companyName: 'Mehra Wholesale Garments',
    message: 'Looking to purchase 2000 boxes of Men\'s Classic Combed Cotton Vests (Size XL) for our North-India distribution network. Please send your custom volume discount slab and freight delivery timeline to Delhi NCR.',
    resolved: false
  },
  {
    id: 'GH-INQ-48192',
    date: '17 Jul 2026',
    name: 'Anjali Sharma',
    email: 'anjali_sharma@gmail.com',
    phone: '7982231049',
    type: 'order',
    message: 'My order #GH-93821 containing Women\'s Modal Night Loungewear pack has not shipped yet. Can you please verify if the size M is ready for dispatch?',
    resolved: false
  },
  {
    id: 'GH-INQ-21049',
    date: '15 Jul 2026',
    name: 'Suresh Sen',
    email: 'care@senhosiery.com',
    phone: '9433010492',
    type: 'feedback',
    message: 'The double seam on your premium combed socks is absolutely incredible. Finally, a pair of elastic socks that doesn\'t bite my ankles or lose shape in the washing machine. Will place a larger order for my retail stores soon!',
    resolved: true
  }
];

const DEFAULT_ORDERS: MockOrder[] = [
  {
    id: 'GH-ORD-1102',
    customerName: 'Yash Agarwal',
    email: 'agarwalyash34567@gmail.com',
    items: "1x Men's UltraFit Modal Vest (Size: L), 2x Terry-Loop Arch Cushioned Socks (Size: Free)",
    total: 1397,
    date: '19 Jul 2026',
    status: 'Processing'
  },
  {
    id: 'GH-ORD-1099',
    customerName: 'Rajesh Khurana',
    email: 'r_khurana@yahoo.co.in',
    items: "3x Pure Egyptian Cotton Comfort Briefs Pack (Size: XL)",
    total: 2397,
    date: '18 Jul 2026',
    status: 'Shipped'
  },
  {
    id: 'GH-ORD-1098',
    customerName: 'Pooja Bhatia',
    email: 'pooja.bhatia@outlook.com',
    items: "1x Luxury Modal Lounge Nightwear Set (Size: M)",
    total: 1499,
    date: '16 Jul 2026',
    status: 'Delivered'
  },
  {
    id: 'GH-ORD-1097',
    customerName: 'Devender Negi',
    email: 'dev_negi@gmail.com',
    items: "2x Kids Combed Anti-Slip Crew Socks (Size: M)",
    total: 598,
    date: '15 Jul 2026',
    status: 'Delivered'
  }
];

export default function AdminPortal({ onBackToHome, triggerToast }: AdminPortalProps) {
  // Login States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Tab State: 'overview' | 'inventory' | 'orders' | 'inquiries'
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders' | 'inquiries'>('overview');

  // Shared Data States
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<MockOrder[]>([]);

  // Editing states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPriceValue, setEditPriceValue] = useState<number>(0);

  // Modal toggle states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditProduct, setSelectedEditProduct] = useState<Product | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteConfirmId, setShowDeleteConfirmId] = useState<string | null>(null);

  // Unified Product Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: 999,
    image: '',
    category: 'men' as 'women' | 'men' | 'kids' | 'unisex' | 'accessories' | 'new-arrivals',
    badge: '' as any,
    description: '',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'] as string[],
    fabric: 'Combed Cotton',
    colors: 'Pure White, Beige, Charcoal'
  });

  // Load and seed database states
  useEffect(() => {
    // 1. Authenticate check via local session to survive hot reload if desired
    const savedSession = sessionStorage.getItem('gayatri_admin_session');
    if (savedSession === 'active') {
      setIsAuthenticated(true);
    }

    // 2. Load active products
    try {
      const savedProducts = localStorage.getItem('gayatri_inventory');
      if (savedProducts) {
        setProductsList(JSON.parse(savedProducts));
      } else {
        // dynamic default fallback seed from products
        localStorage.setItem('gayatri_inventory', JSON.stringify(products));
        setProductsList(products);
      }
    } catch (e) {
      console.error(e);
    }

    // 3. Load or seed inquiries
    try {
      const savedInq = localStorage.getItem('gayatri_inquiries');
      if (savedInq) {
        setInquiries(JSON.parse(savedInq));
      } else {
        localStorage.setItem('gayatri_inquiries', JSON.stringify(DEFAULT_INQUIRIES));
        setInquiries(DEFAULT_INQUIRIES);
      }
    } catch (e) {
      console.error(e);
    }

    // 4. Load or seed orders
    try {
      const savedOrders = localStorage.getItem('gayatri_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        localStorage.setItem('gayatri_orders', JSON.stringify(DEFAULT_ORDERS));
        setOrders(DEFAULT_ORDERS);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Fetch updated catalog products array from LocalStorage if user changes it
  useEffect(() => {
    const fetchLatest = () => {
      const savedProducts = localStorage.getItem('gayatri_inventory');
      if (savedProducts) {
        setProductsList(JSON.parse(savedProducts));
      } else {
        // Fetch static from public registry
        try {
          const raw = localStorage.getItem('gayatri_inventory_raw_seed');
          if (raw) setProductsList(JSON.parse(raw));
        } catch (e) {
          console.error(e);
        }
      }
    };
    if (isAuthenticated) {
      fetchLatest();
    }
  }, [isAuthenticated]);

  // Auth Action Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'GayatriHosiery' && password === 'gayatrihosiery0980$$') {
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem('gayatri_admin_session', 'active');
      triggerToast('Welcome Back, Administrator. System authenticated successfully.');
    } else {
      setLoginError('Invalid Username or Password Credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('gayatri_admin_session');
    setUsername('');
    setPassword('');
    triggerToast('Logged out of Admin Portal successfully.');
  };

  // Stock toggle logic
  const handleToggleStock = (prodId: string) => {
    const updated = productsList.map((p) => {
      if (p.id === prodId) {
        const currentStock = p.inStock === undefined ? true : p.inStock;
        return { ...p, inStock: !currentStock };
      }
      return p;
    });
    setProductsList(updated);
    localStorage.setItem('gayatri_inventory', JSON.stringify(updated));
    triggerToast('Inventory stock availability updated successfully.');
  };

  // Price adjustment logic
  const handleStartEditPrice = (product: Product) => {
    setEditingProductId(product.id);
    setEditPriceValue(product.price);
  };

  const handleSavePrice = (prodId: string) => {
    if (editPriceValue <= 0 || isNaN(editPriceValue)) {
      triggerToast('Please provide a valid price above zero.');
      return;
    }
    const updated = productsList.map((p) => {
      if (p.id === prodId) {
        return { ...p, price: editPriceValue };
      }
      return p;
    });
    setProductsList(updated);
    localStorage.setItem('gayatri_inventory', JSON.stringify(updated));
    setEditingProductId(null);
    triggerToast('Product price adjusted successfully.');
  };

  // Inquiry resolve logic
  const handleToggleResolveInquiry = (id: string) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, resolved: !inq.resolved };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('gayatri_inquiries', JSON.stringify(updated));
    triggerToast('Customer Inquiry resolved status updated.');
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer inquiry?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem('gayatri_inquiries', JSON.stringify(updated));
      triggerToast('Inquiry message removed from active registry.');
    }
  };

  // Order status update logic
  const handleUpdateOrderStatus = (orderId: string, currentStatus: MockOrder['status']) => {
    let nextStatus: MockOrder['status'] = 'Processing';
    if (currentStatus === 'Processing') nextStatus = 'Shipped';
    else if (currentStatus === 'Shipped') nextStatus = 'Delivered';
    else return; // already delivered

    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        return { ...ord, status: nextStatus };
      }
      return ord;
    });
    setOrders(updated);
    localStorage.setItem('gayatri_orders', JSON.stringify(updated));
    triggerToast(`Order #${orderId} status advanced to ${nextStatus}.`);
  };

  // Simple Seed reset logic
  const handleResetRegistryDefaults = () => {
    localStorage.setItem('gayatri_inventory', JSON.stringify(products));
    localStorage.setItem('gayatri_inquiries', JSON.stringify(DEFAULT_INQUIRIES));
    localStorage.setItem('gayatri_orders', JSON.stringify(DEFAULT_ORDERS));
    setProductsList(products);
    setInquiries(DEFAULT_INQUIRIES);
    setOrders(DEFAULT_ORDERS);
    setShowResetModal(false);
    triggerToast('Database restored to original factory defaults.');
  };

  // Product Add submit handler
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.fabric) {
      triggerToast('Please fill out the required product fields.');
      return;
    }

    const generatedId = formData.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
      `gh-${formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (productsList.some(p => p.id === generatedId)) {
      triggerToast('A product with this Slab Code / ID already exists.');
      return;
    }

    const colorArray = formData.colors.split(',')
      .map(c => c.trim())
      .filter(Boolean)
      .map(c => {
        const lower = c.toLowerCase();
        let hex = '#7F7F7F';
        if (lower.includes('white')) hex = '#FFFFFF';
        else if (lower.includes('black')) hex = '#000000';
        else if (lower.includes('beige')) hex = '#F5F5DC';
        else if (lower.includes('navy')) hex = '#000080';
        else if (lower.includes('charcoal') || lower.includes('grey') || lower.includes('gray')) hex = '#36454F';
        else if (lower.includes('blue')) hex = '#0000FF';
        else if (lower.includes('red')) hex = '#FF0000';
        else if (lower.includes('green')) hex = '#008000';
        else if (lower.includes('gold')) hex = '#D4AF37';
        return { name: c, hex };
      });

    const newProduct: Product = {
      id: generatedId,
      name: formData.name,
      price: formData.price,
      image: formData.image || 'https://lh3.googleusercontent.com/aida/AP1WRLtPBR6Hb2OPIJyAc0i9RBL8Bc0PtymbcmB_EIFNfCqwxTw1jNs9h_W-3lZXYtsd6OcWfjZErBaGy4XIG23qoZ-7k2_7IfriBDwPHcP_vjQ9S3m1M5gKnEwU2_7Ev5Zq_zkMaqHjNaAyg_NSqu_OFeKUNdBvUYqpJgQiDg6cHrccrtDVVZShLh6H5V0YELWih4J667Yn5a1clXeqVhrcOSRaX-fYWoX1RtNftQ3S3VS6hU1xzc8yhAQ-RJo',
      category: formData.category,
      badge: formData.badge ? (formData.badge === 'None' || formData.badge === '' ? undefined : formData.badge) : undefined,
      description: formData.description || 'Crafted with premium soft long-staple cotton fibers.',
      sizes: formData.sizes.length > 0 ? formData.sizes : ['S', 'M', 'L', 'XL', 'XXL'],
      colors: colorArray.length > 0 ? colorArray : [{ name: 'Classic White', hex: '#FFFFFF' }],
      fabric: formData.fabric,
      inStock: true
    };

    const updated = [newProduct, ...productsList];
    setProductsList(updated);
    localStorage.setItem('gayatri_inventory', JSON.stringify(updated));
    setShowAddModal(false);
    triggerToast(`Successfully added new product: ${newProduct.name}`);
  };

  // Product Edit submit handler
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditProduct) return;

    if (!formData.name || !formData.price || !formData.fabric) {
      triggerToast('Please fill out the required product fields.');
      return;
    }

    const colorArray = formData.colors.split(',')
      .map(c => c.trim())
      .filter(Boolean)
      .map(c => {
        const lower = c.toLowerCase();
        let hex = '#7F7F7F';
        if (lower.includes('white')) hex = '#FFFFFF';
        else if (lower.includes('black')) hex = '#000000';
        else if (lower.includes('beige')) hex = '#F5F5DC';
        else if (lower.includes('navy')) hex = '#000080';
        else if (lower.includes('charcoal') || lower.includes('grey') || lower.includes('gray')) hex = '#36454F';
        else if (lower.includes('blue')) hex = '#0000FF';
        else if (lower.includes('red')) hex = '#FF0000';
        else if (lower.includes('green')) hex = '#008000';
        else if (lower.includes('gold')) hex = '#D4AF37';
        return { name: c, hex };
      });

    const updatedProduct: Product = {
      ...selectedEditProduct,
      name: formData.name,
      price: formData.price,
      image: formData.image || selectedEditProduct.image,
      category: formData.category,
      badge: formData.badge ? (formData.badge === 'None' || formData.badge === '' ? undefined : formData.badge) : undefined,
      description: formData.description,
      sizes: formData.sizes.length > 0 ? formData.sizes : ['S', 'M', 'L', 'XL', 'XXL'],
      colors: colorArray.length > 0 ? colorArray : selectedEditProduct.colors,
      fabric: formData.fabric
    };

    const updated = productsList.map(p => p.id === selectedEditProduct.id ? updatedProduct : p);
    setProductsList(updated);
    localStorage.setItem('gayatri_inventory', JSON.stringify(updated));
    setShowEditModal(false);
    setSelectedEditProduct(null);
    triggerToast(`Successfully updated product: ${updatedProduct.name}`);
  };

  // Delete product handler
  const handleDeleteProduct = (prodId: string) => {
    const updated = productsList.filter(p => p.id !== prodId);
    setProductsList(updated);
    localStorage.setItem('gayatri_inventory', JSON.stringify(updated));
    setShowDeleteConfirmId(null);
    triggerToast('Product removed from catalog successfully.');
  };

  // Login Screen Render
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-surface text-on-surface font-sans relative">
        <div className="absolute inset-0 watermark-pattern opacity-[0.015] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full space-y-8 bg-surface-container-low border border-surface-container rounded-2xl p-8 shadow-2xl relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-navy text-gold rounded-xl flex items-center justify-center border border-gold/20 shadow-lg">
              <Lock size={20} />
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-wide text-navy uppercase">
              Admin Portal
            </h2>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
              Secure Staff Registry Authentication
            </p>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-2" />
          </div>

          {/* Form */}
          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-700 text-xs rounded-lg flex items-center space-x-2">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-4 rounded-md shadow-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-navy">
                  Username ID
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/70">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin ID"
                    className="w-full pl-10 pr-3 py-3 bg-surface border border-surface-container text-xs rounded-lg outline-none focus:border-gold font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-navy">
                  Security Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/70">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full pl-10 pr-3 py-3 bg-surface border border-surface-container text-xs rounded-lg outline-none focus:border-gold font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-navy text-surface py-3.5 px-4 text-xs font-bold tracking-widest rounded-lg hover:bg-gold transition-colors uppercase cursor-pointer"
              >
                Authenticate & Login
              </button>
            </div>
          </form>

          {/* Cancel button */}
          <div className="text-center pt-2">
            <button
              onClick={onBackToHome}
              className="text-[10px] font-bold text-on-surface-variant hover:text-gold uppercase tracking-widest transition-colors"
            >
              ← Back to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Admin Dashboard View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in font-sans">
      
      {/* Top Welcome Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#000613] text-surface rounded-2xl p-6 sm:p-8 border border-navy shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 watermark-pattern w-64 h-64 opacity-[0.02] pointer-events-none" />
        
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center space-x-1 bg-gold/20 text-gold py-0.5 px-2 rounded text-[9px] font-bold uppercase tracking-widest">
            <Activity size={10} className="animate-pulse" />
            <span>Authenticated Secure Portal</span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-surface">
            Gayatri Admin Workspace
          </h1>
          <p className="text-xs text-surface-container/70 font-semibold">
            Logged in as manager division • Sourcing, Pricing & Customer CRM Control Desk
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10">
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center space-x-1.5 bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-[10px] font-bold py-2 px-3.5 rounded-lg transition-colors cursor-pointer"
            title="Reset storage variables to initial seeds"
          >
            <RefreshCw size={12} />
            <span>Reset Database</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-surface text-[10px] font-bold py-2 px-3.5 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={12} />
            <span>LOG OUT</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap border-b border-surface-container-highest gap-1 font-sans text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-5 font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
            activeTab === 'overview'
              ? 'border-gold text-gold bg-surface-container-low'
              : 'border-transparent text-on-surface-variant hover:text-gold'
          }`}
        >
          Executive Overview
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-3 px-5 font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
            activeTab === 'inventory'
              ? 'border-gold text-gold bg-surface-container-low'
              : 'border-transparent text-on-surface-variant hover:text-gold'
          }`}
        >
          Garment Inventory ({productsList.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-5 font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'border-gold text-gold bg-surface-container-low'
              : 'border-transparent text-on-surface-variant hover:text-gold'
          }`}
        >
          Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`py-3 px-5 font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
            activeTab === 'inquiries'
              ? 'border-gold text-gold bg-surface-container-low'
              : 'border-transparent text-on-surface-variant hover:text-gold'
          }`}
        >
          Electronic Inquiries ({inquiries.filter((i) => !i.resolved).length} Pending)
        </button>
      </div>

      {/* TAB CONTENT: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Key Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Gross Sales Revenue</span>
                <div className="p-2 bg-green-500/10 text-green-600 rounded-lg">
                  <IndianRupee size={16} />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy">₹3,48,200</h3>
                <p className="text-[10px] text-green-600 font-bold mt-1">↑ +14.6% against past fiscal slab</p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Loom Dispatch Count</span>
                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <ShoppingCart size={16} />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy">{orders.length + 86} Packages</h3>
                <p className="text-[10px] text-blue-600 font-bold mt-1">4 pending tracking IDs</p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Yarn Inventory Quality</span>
                <div className="p-2 bg-gold/10 text-gold rounded-lg">
                  <Layers size={16} />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy">Combed 98% Optimal</h3>
                <p className="text-[10px] text-gold font-bold mt-1">100% long-staple pima grade verified</p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Unresolved CRM Tickets</span>
                <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg">
                  <Clock size={16} />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  {inquiries.filter((i) => !i.resolved).length} Pending
                </h3>
                <p className="text-[10px] text-purple-600 font-bold mt-1">Average response speed: 12 Hrs</p>
              </div>
            </div>
          </div>

          {/* Quick-Help Alert banner */}
          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-gold/10 text-gold rounded-lg mt-0.5 sm:mt-0">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-navy uppercase tracking-wide">Real-Time Control Mode Enabled</h4>
                <p className="text-xs text-on-surface-variant/90 leading-relaxed mt-0.5">
                  Toggling stock status ("In Stock" / "Out of stock") or editing garment prices below will apply instantly across the live customer catalog pages.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('inventory')}
              className="bg-navy text-surface py-2 px-4 text-[10px] font-bold rounded-lg hover:bg-gold transition-colors uppercase shrink-0 cursor-pointer"
            >
              Manage Inventory Now
            </button>
          </div>

          {/* Quick Stats table / Loom info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 space-y-4">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-navy border-b border-surface-container pb-2">
                Regional Indian Sales Distribution (Past Q3)
              </h4>
              <div className="space-y-3.5 font-sans text-xs text-on-surface-variant">
                <div>
                  <div className="flex justify-between font-bold text-navy mb-1">
                    <span>West Bengal (Kolkata Hub)</span>
                    <span>38%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-navy h-full rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-navy mb-1">
                    <span>Maharashtra (Mumbai & Pune)</span>
                    <span>24%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gold h-full rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-navy mb-1">
                    <span>Delhi NCR & Haryana</span>
                    <span>21%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#1b2b4d] h-full rounded-full" style={{ width: '21%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-navy mb-1">
                    <span>Karnataka & Tamil Nadu</span>
                    <span>17%</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-surface-container-highest h-full rounded-full" style={{ width: '17%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-navy border-b border-surface-container pb-2">
                  Weaver Counsel Announcements
                </h4>
                <ul className="space-y-3 mt-3 text-xs text-on-surface-variant leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span><strong>Yarn Price Update:</strong> Long-staple premium cotton fiber experienced a minor 2.4% rate adjustment. Our price slabs remain unchanged for regular institutional contracts to preserve buyer ties.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span><strong>Monsoon Transit Schedule:</strong> Shipments heading into Kerala and North East sectors might experience brief 24-48 hour delays due to heavy state downpours. Ensure courier tracking details are populated promptly.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-surface-container">
                <button
                  onClick={onBackToHome}
                  className="w-full bg-surface-container hover:bg-navy hover:text-surface text-navy font-bold py-2.5 text-center text-xs tracking-widest rounded-lg transition-colors uppercase cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: INVENTORY MANAGER */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-4">
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold text-navy uppercase tracking-wider">Garment Slabs & Price Controls</h3>
              <p className="text-xs text-on-surface-variant">Update the available items in Gayatri Hosiery database below. Toggles are persistent.</p>
            </div>
            
            <button
              onClick={() => {
                setFormData({
                  id: '',
                  name: '',
                  price: 999,
                  image: 'https://lh3.googleusercontent.com/aida/AP1WRLtPBR6Hb2OPIJyAc0i9RBL8Bc0PtymbcmB_EIFNfCqwxTw1jNs9h_W-3lZXYtsd6OcWfjZErBaGy4XIG23qoZ-7k2_7IfriBDwPHcP_vjQ9S3m1M5gKnEwU2_7Ev5Zq_zkMaqHjNaAyg_NSqu_OFeKUNdBvUYqpJgQiDg6cHrccrtDVVZShLh6H5V0YELWih4J667Yn5a1clXeqVhrcOSRaX-fYWoX1RtNftQ3S3VS6hU1xzc8yhAQ-RJo',
                  category: 'men',
                  badge: 'Premium',
                  description: 'Crafted from combed, long-staple cotton threads to ensure premium luxury and a secondary skin feel.',
                  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                  fabric: 'Combed Cotton',
                  colors: 'Pure White, Beige, Charcoal'
                });
                setShowAddModal(true);
              }}
              className="flex items-center space-x-2 bg-navy hover:bg-gold text-surface hover:text-navy text-xs font-bold py-2.5 px-4 rounded-lg tracking-wider transition-all uppercase cursor-pointer shadow-md self-start sm:self-auto shrink-0"
            >
              <Plus size={14} />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-surface-container rounded-xl shadow bg-surface-container-low">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-surface-container-highest uppercase text-[10px] tracking-wider text-navy font-extrabold">
                  <th className="p-4">Garment</th>
                  <th className="p-4">Slab Code</th>
                  <th className="p-4">Fabric</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4 text-center">Modify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest/60">
                {productsList.map((prod) => {
                  const isEditing = editingProductId === prod.id;
                  const inStock = prod.inStock === undefined ? true : prod.inStock;
                  return (
                    <tr key={prod.id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="p-4 flex items-center space-x-3">
                        <img src={prod.image} alt={prod.name} className="w-8 h-10 object-cover rounded bg-white" />
                        <div>
                          <p className="font-bold text-navy truncate max-w-[180px]">{prod.name}</p>
                          <p className="text-[10px] text-on-surface-variant">{prod.badge || 'Standard Series'}</p>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-semibold text-on-surface-variant">{prod.id.toUpperCase()}</td>
                      <td className="p-4 font-semibold text-on-surface-variant">{prod.fabric}</td>
                      <td className="p-4 uppercase font-bold text-[10px] text-navy">{prod.category}</td>
                      <td className="p-4">
                        {isEditing ? (
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold">₹</span>
                            <input
                              type="number"
                              value={editPriceValue}
                              onChange={(e) => setEditPriceValue(parseInt(e.target.value) || 0)}
                              className="w-16 bg-surface p-1 rounded border border-gold focus:outline-none font-bold text-navy text-xs"
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-navy">₹{prod.price.toLocaleString('en-IN')}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStock(prod.id)}
                          className={`py-1 px-2.5 rounded text-[10px] font-bold uppercase transition-colors tracking-wide cursor-pointer ${
                            inStock
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-red-100 text-red-800 border border-red-200'
                          }`}
                          title="Click to toggle availability"
                        >
                          {inStock ? '● IN STOCK' : '○ OUT OF STOCK'}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {isEditing ? (
                            <div className="flex items-center space-x-1.5">
                              <button
                                onClick={() => handleSavePrice(prod.id)}
                                className="p-1.5 bg-green-600 hover:bg-green-700 text-surface rounded transition-colors cursor-pointer"
                                title="Save adjusted rate"
                              >
                                <Check size={12} />
                              </button>
                              <button
                                onClick={() => setEditingProductId(null)}
                                className="p-1.5 bg-surface-container-highest text-on-surface-variant rounded hover:text-navy transition-colors cursor-pointer"
                                title="Discard"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartEditPrice(prod)}
                              className="p-1.5 bg-surface border border-surface-container hover:border-gold hover:text-gold rounded transition-colors cursor-pointer"
                              title="Edit price rate quickly"
                            >
                              <IndianRupee size={12} />
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setSelectedEditProduct(prod);
                              setFormData({
                                id: prod.id,
                                name: prod.name,
                                price: prod.price,
                                image: prod.image,
                                category: prod.category,
                                badge: prod.badge || '',
                                description: prod.description || '',
                                sizes: prod.sizes,
                                fabric: prod.fabric,
                                colors: prod.colors.map(c => c.name).join(', ')
                              });
                              setShowEditModal(true);
                            }}
                            className="flex items-center space-x-1 bg-surface border border-surface-container hover:border-gold hover:text-gold text-[10px] font-bold py-1 px-2 rounded transition-colors cursor-pointer"
                            title="Edit full product details"
                          >
                            <Edit size={11} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => setShowDeleteConfirmId(prod.id)}
                            className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-[10px] font-bold py-1 px-2 rounded transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 size={11} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in font-sans">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-navy uppercase tracking-wider">Active Customer Orders Desk</h3>
            <p className="text-xs text-on-surface-variant">Logistics coordination board. Change status of packages sent across states.</p>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-surface-container-low border border-surface-container rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
              >
                <div className="space-y-2 flex-grow min-w-0">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs font-bold text-navy uppercase bg-surface-container px-2 py-0.5 rounded border border-surface-container-highest">
                      {ord.id}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium">{ord.date}</span>
                    
                    <span className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                      ord.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                      ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-navy text-sm">{ord.customerName}</h4>
                    <p className="text-xs text-on-surface-variant">{ord.email}</p>
                  </div>

                  <p className="text-xs text-on-surface-variant/90 border-t border-surface-container-highest/40 pt-2 font-medium">
                    <span className="text-navy font-bold">Items:</span> {ord.items}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-highest/40">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant">Amount Billed</p>
                    <p className="text-base font-extrabold text-navy font-mono">₹{ord.total.toLocaleString('en-IN')}</p>
                  </div>

                  {ord.status !== 'Delivered' ? (
                    <button
                      onClick={() => handleUpdateOrderStatus(ord.id, ord.status)}
                      className="bg-navy hover:bg-gold text-surface text-[10px] font-bold py-2 px-4 rounded-lg tracking-wider transition-colors uppercase flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RefreshCw size={11} />
                      <span>{ord.status === 'Processing' ? 'Dispatch Order' : 'Mark as Delivered'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-1.5 text-green-700 text-[10px] font-bold uppercase bg-green-50 py-1 px-2 rounded border border-green-200">
                      <CheckCircle size={12} />
                      <span>Order Delivered</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CUSTOMER INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-navy uppercase tracking-wider">CRM Electronic Inquiries Management</h3>
            <p className="text-xs text-on-surface-variant">Manage general care tickets, bulk wholesale order bids, and feedback logs.</p>
          </div>

          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-surface-container-low border border-surface-container rounded-2xl text-on-surface-variant">
                <p className="font-semibold text-navy">No inquiry records in active registry.</p>
                <p className="text-xs mt-1">When customers submit the contact form, their queries will populate here immediately.</p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`border rounded-xl p-6 space-y-4 transition-all shadow-sm ${
                    inq.resolved
                      ? 'bg-surface border-surface-container opacity-70'
                      : 'bg-surface-container-low border-gold/30 ring-1 ring-gold/10'
                  }`}
                >
                  {/* Inquiry Header metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-container-highest/50">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-navy uppercase">{inq.id}</span>
                        <span className="text-[10px] text-on-surface-variant">{inq.date}</span>
                        <span className={`text-[9px] font-bold uppercase py-0.5 px-2 rounded-full ${
                          inq.type === 'wholesale' ? 'bg-purple-100 text-purple-800' :
                          inq.type === 'order' ? 'bg-orange-100 text-orange-800' :
                          inq.type === 'feedback' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {inq.type === 'wholesale' ? 'Wholesale Bid' : inq.type === 'order' ? 'Order Query' : inq.type === 'feedback' ? 'Feedback Log' : 'General Care'}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-navy text-sm">
                        {inq.name} {inq.companyName && inq.companyName !== 'N/A' && (
                          <span className="text-xs text-on-surface-variant font-sans font-medium">({inq.companyName})</span>
                        )}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <button
                        onClick={() => handleToggleResolveInquiry(inq.id)}
                        className={`text-[10px] font-bold uppercase py-1.5 px-3 rounded transition-colors cursor-pointer border ${
                          inq.resolved
                            ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
                            : 'bg-navy text-surface border-navy hover:bg-gold'
                        }`}
                      >
                        {inq.resolved ? '✓ Ticket Resolved' : 'Mark as Resolved'}
                      </button>
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="text-[10px] font-bold text-red-600 hover:bg-red-50 hover:text-red-800 p-1.5 rounded transition-colors cursor-pointer"
                        title="Delete inquiry record"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Body Inquiry Content */}
                  <div className="space-y-2 text-xs sm:text-sm text-on-surface-variant/90 leading-relaxed text-left">
                    <p className="bg-surface-container-low/40 p-4 rounded-lg border border-surface-container whitespace-pre-wrap">
                      {inq.message}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[10px] text-on-surface-variant pt-1 font-semibold">
                      <span>Email: <a href={`mailto:${inq.email}`} className="text-navy hover:underline">{inq.email}</a></span>
                      <span>Phone: <a href={`tel:${inq.phone}`} className="text-navy hover:underline">{inq.phone}</a></span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ADD & EDIT GARMENT MODAL */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={() => { setShowAddModal(false); setShowEditModal(false); setSelectedEditProduct(null); }} />
          
          <div className="relative bg-[#000613] border border-gold/30 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden z-10 animate-fade-in text-surface font-sans">
            {/* Header */}
            <div className="p-5 bg-navy flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-surface">
                  {showAddModal ? 'Add New Garment to Catalog' : 'Modify Garment Details'}
                </h3>
              </div>
              <button 
                onClick={() => { setShowAddModal(false); setShowEditModal(false); setSelectedEditProduct(null); }}
                className="text-surface/80 hover:text-gold transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={showAddModal ? handleAddProductSubmit : handleEditProductSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-left">
              {/* Row 1: ID & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                    Slab Code / SKU (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. classic-brief"
                    disabled={showEditModal}
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Premium Modal Vest"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                  />
                </div>
              </div>

              {/* Row 2: Price & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                    Loom Rate (Price INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="999"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                    Fabric Composition *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100% Pima Cotton"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                  />
                </div>
              </div>

              {/* Row 3: Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                    Target Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 bg-navy border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                  >
                    <option value="men">Men's Innerwear</option>
                    <option value="women">Women's Loungewear</option>
                    <option value="kids">Kids Undergarments</option>
                    <option value="unisex">Unisex Comforts</option>
                    <option value="new-arrivals">New Arrivals</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                    Marketing Badge
                  </label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                    className="w-full p-2.5 bg-navy border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                  >
                    <option value="">None (Standard)</option>
                    <option value="Premium">Premium</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Daily Wear">Daily Wear</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Premium Collection">Premium Collection</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                  Garment Image URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Leave empty for beautiful default placeholder illustration"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                />
              </div>

              {/* Comma Separated Colors */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                  Product Colors (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Classic White, Deep Beige, Charcoal Melange"
                  value={formData.colors}
                  onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface"
                />
              </div>

              {/* Sizes Selection */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-3 pt-1">
                  {['S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map((sz) => {
                    const isChecked = formData.sizes.includes(sz);
                    return (
                      <label key={sz} className="flex items-center space-x-2 text-xs text-surface/90 cursor-pointer bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold transition-colors">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            const nextSizes = isChecked 
                              ? formData.sizes.filter(s => s !== sz) 
                              : [...formData.sizes, sz];
                            setFormData({ ...formData, sizes: nextSizes });
                          }}
                          className="accent-gold cursor-pointer"
                        />
                        <span>{sz}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gold/90">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe fabric softness, weave density, waistband, flatlock seam, and design specs..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-xs focus:border-gold outline-none text-surface leading-relaxed resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setShowEditModal(false); setSelectedEditProduct(null); }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy hover:bg-gold text-surface hover:text-navy border border-gold/40 text-xs font-bold rounded-lg transition-all uppercase tracking-wider cursor-pointer"
                >
                  {showAddModal ? 'Save Garment' : 'Update Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE PRODUCT CONFIRMATION OVERLAY */}
      {showDeleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={() => setShowDeleteConfirmId(null)} />
          
          <div className="relative bg-[#000613] border border-red-500/30 rounded-2xl w-full max-w-sm shadow-2xl p-6 z-10 animate-fade-in text-surface font-sans text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center border border-red-500/20">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold uppercase tracking-wide text-red-500">
                Delete Product?
              </h3>
              <p className="text-xs text-surface-container/80">
                This action cannot be undone. This garment will be permanently removed from the customer catalog registry.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirmId(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
              >
                No, Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(showDeleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-surface text-xs font-bold rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET DATABASE CONFIRMATION OVERLAY */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={() => setShowResetModal(false)} />
          
          <div className="relative bg-[#000613] border border-gold/30 rounded-2xl w-full max-w-sm shadow-2xl p-6 z-10 animate-fade-in text-surface font-sans text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center border border-gold/20">
              <RefreshCw size={22} className="text-gold" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base font-bold uppercase tracking-wide text-gold">
                Reset Database defaults?
              </h3>
              <p className="text-xs text-surface-container/80 leading-relaxed">
                This will wipe all custom products, restore initial garment catalog slabs, seed standard simulated customer orders, and reset all care messages to mill defaults.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider cursor-pointer"
              >
                No, Cancel
              </button>
              <button
                onClick={handleResetRegistryDefaults}
                className="px-4 py-2 bg-navy hover:bg-gold text-surface hover:text-navy border border-gold/40 text-xs font-bold rounded-lg transition-all uppercase tracking-wider cursor-pointer"
              >
                Yes, Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
