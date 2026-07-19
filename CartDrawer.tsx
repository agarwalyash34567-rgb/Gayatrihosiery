import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  setScreen: (screen: 'home' | 'new-arrivals') => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  setScreen,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    city: '',
    state: 'West Bengal',
    street: '',
  });

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const afterDiscount = subtotal - discountAmount;
  
  // 5% GST included or extra (let's calculate as part of standard billing)
  const gst = Math.round(afterDiscount * 0.05);
  const shippingFee = afterDiscount > 1000 || afterDiscount === 0 ? 0 : 99;
  const grandTotal = afterDiscount + gst + shippingFee;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'HERITAGE20') {
      setDiscountPercent(20);
      setPromoSuccess('Promo Applied: 20% off Heritage discount!');
      setPromoError('');
    } else if (code === 'FREE100') {
      setDiscountPercent(10);
      setPromoSuccess('Promo Applied: 10% off your purchase!');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try HERITAGE20');
      setPromoSuccess('');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingAddress.fullName && shippingAddress.phone && shippingAddress.pincode) {
      const itemsString = cart.map(item => `${item.quantity}x ${item.product.name} (Size: ${item.selectedSize})`).join(', ');
      
      const newOrder = {
        id: `GH-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: shippingAddress.fullName,
        email: `${shippingAddress.phone}@gayatri.com`,
        items: itemsString,
        total: grandTotal,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Processing'
      };

      try {
        const existingRaw = localStorage.getItem('gayatri_orders');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [newOrder, ...existing];
        localStorage.setItem('gayatri_orders', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      setCheckoutStep('success');
    }
  };

  const handleOrderCompletion = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
    setScreen('home');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Dark Overlay Backdrop */}
      <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface flex flex-col shadow-2xl relative h-full">
          
          {/* Header Segment */}
          <div className="p-6 border-b border-surface-container-highest flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-navy" size={20} />
              <h2 className="font-serif text-lg font-bold text-navy uppercase tracking-wider">
                {checkoutStep === 'success' ? 'Order Confirmed' : checkoutStep === 'shipping' ? 'Shipping Details' : 'Your Shopping Bag'}
              </h2>
            </div>
            <button onClick={onClose} className="text-on-surface hover:text-gold transition-colors focus:outline-none p-1">
              <X size={22} />
            </button>
          </div>

          {checkoutStep === 'success' ? (
            /* ORDER SUCCESS VIEW */
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center items-center text-center space-y-6">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-navy">Order Placed Successfully!</h3>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                  Order ID: GH-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="text-xs text-on-surface-variant/80 max-w-xs mx-auto leading-relaxed">
                  Thank you for purchasing from Gayatri Hosiery. Your premium heritage package will be dispatched within 24 hours.
                </p>
              </div>

              {/* Order summary table */}
              <div className="w-full bg-surface-container-low border border-surface-container rounded-lg p-4 text-left space-y-2 text-xs">
                <p className="font-bold text-navy border-b border-surface-container pb-1.5 uppercase tracking-wide">Delivery Address</p>
                <p className="font-semibold text-on-surface">{shippingAddress.fullName}</p>
                <p className="text-on-surface-variant">{shippingAddress.street}, {shippingAddress.city} - {shippingAddress.pincode}</p>
                <p className="text-on-surface-variant">Phone: {shippingAddress.phone}</p>
                <div className="border-t border-surface-container pt-1.5 mt-2 flex justify-between font-bold text-navy">
                  <span>Grand Total (incl. GST)</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleOrderCompletion}
                className="w-full bg-navy text-surface py-3.5 text-xs font-bold tracking-widest rounded-lg hover:bg-gold transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : checkoutStep === 'shipping' ? (
            /* SHIPPING FORM VIEW */
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <p className="text-xs text-on-surface-variant font-medium border-b border-surface-container pb-2">
                  Please provide your delivery information for shipping across India.
                </p>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    placeholder="E.g. Rajesh Kumar"
                    className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Pincode *</label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      placeholder="6-digit Indian PIN"
                      className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-wider">City *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="E.g. Kolkata"
                      className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Street Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    placeholder="House number, Apartment, Landmark..."
                    className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold font-sans resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-wider">State</label>
                  <select
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold font-sans"
                  >
                    <option value="West Bengal">West Bengal</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                {/* Submitting Buttons */}
                <div className="pt-4 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-navy text-surface py-3.5 text-xs font-bold tracking-widest rounded-lg hover:bg-gold transition-colors uppercase"
                  >
                    PLACE ORDER (CASH ON DELIVERY)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full border border-navy/30 text-navy py-3.5 text-xs font-bold tracking-widest rounded-lg hover:bg-navy/5 transition-colors"
                  >
                    RETURN TO CART
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* STANDARD CART DRAWER VIEW */
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                    <div className="p-4 bg-surface-container rounded-full text-on-surface-variant">
                      <ShoppingBag size={32} />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-navy">Your bag is empty</h3>
                      <p className="text-xs text-on-surface-variant mt-1 max-w-[240px] leading-relaxed">
                        Explore our timeless collection of high-end hosiery & loungewear products.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        setScreen('new-arrivals');
                      }}
                      className="bg-navy text-surface text-xs font-bold tracking-widest py-2.5 px-6 rounded hover:bg-gold transition-colors"
                    >
                      BROWSE CATALOG
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${index}`}
                        className="flex items-start space-x-4 pb-4 border-b border-surface-container"
                      >
                        {/* Thumbnail */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-20 object-cover rounded bg-surface-container-low"
                        />

                        {/* Text Detail */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-xs font-bold text-navy truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 uppercase tracking-wider">
                            Size: <span className="font-bold text-navy">{item.selectedSize}</span> | {item.product.fabric}
                          </p>
                          <p className="text-xs font-bold text-navy mt-1">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </p>

                          {/* Quantity control button group */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="p-1 rounded bg-surface-container hover:bg-surface-container-highest transition-colors text-on-surface"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                              className="p-1 rounded bg-surface-container hover:bg-surface-container-highest transition-colors text-on-surface"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-on-surface-variant/60 hover:text-red-600 transition-colors self-start p-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer pricing segment (Sticky) */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-surface-container bg-surface-container-low space-y-4">
                  {/* Promo box */}
                  <form onSubmit={applyPromo} className="flex space-x-2">
                    <div className="relative flex-1">
                      <Ticket size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo Code (HERITAGE20)"
                        className="w-full bg-surface border border-surface-container-highest text-xs p-2.5 pl-9 rounded outline-none focus:border-gold font-sans uppercase font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-navy text-surface px-4 text-[10px] font-bold tracking-widest rounded hover:bg-gold transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                  {promoError && <p className="text-[10px] text-red-600 font-sans font-medium">{promoError}</p>}
                  {promoSuccess && <p className="text-[10px] text-green-600 font-sans font-medium">{promoSuccess}</p>}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-on-surface-variant">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-semibold text-navy">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Heritage Promo Discount</span>
                        <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>SGST + CGST (5% included)</span>
                      <span className="font-semibold text-navy">₹{gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery (Standard Shipping)</span>
                      <span className="font-semibold text-navy">
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-navy text-sm pt-2 border-t border-surface-container-highest">
                      <span>Total Amount</span>
                      <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* CTA Checkout button */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full bg-navy text-surface py-3.5 text-xs font-bold tracking-widest rounded-lg hover:bg-gold transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck size={16} />
                      <span>PROCEED TO CHECKOUT</span>
                    </button>
                    <p className="text-[9px] text-on-surface-variant/70 text-center leading-normal">
                      100% Secure Checkout | Cash on Delivery available across India.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
