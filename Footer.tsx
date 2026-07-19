import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Facebook, ArrowUp, X, FileText, ShieldAlert } from 'lucide-react';
import { ScreenType } from '../types';

interface FooterProps {
  setScreen: (screen: ScreenType) => void;
}

export default function Footer({ setScreen }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000613] text-surface-container pt-16 pb-8 border-t border-navy relative font-sans">
      {/* Decorative Brand Watermark in Footer */}
      <div className="absolute right-0 bottom-0 watermark-pattern w-64 h-64 select-none opacity-[0.015]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold tracking-widest text-surface select-none">
              GAYATRI HOSIERY
            </h2>
            <p className="font-sans text-xs tracking-[0.25em] text-gold font-medium mt-0.5">
              PREMIUM QUALITY & COMFORT
            </p>
            <p className="font-sans text-xs text-surface-container/80 leading-relaxed pt-2">
              Bringing luxury, comfort, and timeless perfection to premium hosiery across India. Crafted using premium long-staple cotton.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/hosierygayatri" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all text-surface-container">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold/20 hover:text-gold transition-all text-surface-container">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-surface">
              OUR COLLECTIONS
            </h3>
            <ul className="space-y-2.5 font-sans text-xs text-surface-container/70 font-semibold">
              <li>
                <button onClick={() => { setScreen('women'); scrollToTop(); }} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Women's Elite Loungewear
                </button>
              </li>
              <li>
                <button onClick={() => { setScreen('men'); scrollToTop(); }} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Men's Classic Innerwear
                </button>
              </li>
              <li>
                <button onClick={() => { setScreen('kids'); scrollToTop(); }} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Kids Active Premium Socks
                </button>
              </li>
              <li>
                <button onClick={() => { setScreen('new-arrivals'); scrollToTop(); }} className="hover:text-gold transition-colors text-left cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => { setScreen('about-us'); scrollToTop(); }} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => { setScreen('contact'); scrollToTop(); }} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Contact Us & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => { setScreen('admin'); scrollToTop(); }} className="hover:text-gold transition-colors text-left font-bold text-gold flex items-center space-x-1 cursor-pointer">
                  <span>• Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-surface">
              HEADQUARTERS
            </h3>
            <ul className="space-y-3 font-sans text-xs text-surface-container/80">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  Near Lalaji Chaat Corner, Turab Nagar,<br />
                  Ghaziabad, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-gold shrink-0" />
                <a href="tel:7982271879" className="hover:text-gold transition-colors font-semibold">7982271879</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-gold shrink-0" />
                <a href="mailto:hosierygayatri@gmail.com" className="hover:text-gold transition-colors font-semibold">hosierygayatri@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-surface">
              SUBSCRIBE TO LUXURY
            </h3>
            <p className="font-sans text-xs text-surface-container/70 leading-relaxed">
              Receive updates on seasonal premium drops, weaver storybooks, and exclusive hosiery collections.
            </p>

            {subscribed ? (
              <div className="bg-gold/10 border border-gold/30 rounded p-3 text-xs text-gold font-sans font-medium">
                Thank you! You are now subscribed to Gayatri Hosiery releases.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/5 border border-white/20 text-xs p-3 pr-10 rounded text-surface placeholder-white/40 focus:border-gold outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-surface transition-colors"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-sans text-xs text-surface-container/40 border-t border-white/10 mt-6">
          <p>© 2026 Gayatri Hosiery. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-gold transition-colors cursor-pointer focus:outline-none">Privacy Policy</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-gold transition-colors cursor-pointer focus:outline-none">Terms of Service</button>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-gold font-semibold hover:text-surface transition-colors bg-white/5 py-1 px-3 rounded cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* PRIVACY POLICY MODAL OVERLAY */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 font-sans">
          <div className="bg-surface text-on-surface rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-surface-container-highest animate-fade-in text-left">
            <div className="p-6 bg-[#000613] text-surface flex justify-between items-center border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="text-gold" size={20} />
                <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-surface">Privacy Policy</h3>
              </div>
              <button onClick={() => setShowPrivacy(false)} className="text-surface-container hover:text-gold transition-colors focus:outline-none p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed custom-scrollbar bg-surface">
              <p className="font-semibold text-navy">Effective Date: July 19, 2026</p>
              <p>
                At Gayatri Hosiery, accessible via <strong>hosierygayatri@gmail.com</strong>, one of our main priorities is the absolute privacy of our customers and visitors. This Privacy Policy document contains types of information that is collected and recorded by Gayatri Hosiery and how we use it.
              </p>
              
              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">1. Information We Collect</h4>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. When you shop with us, register for newsletters, or use the customer service channels, we may collect your contact numbers (e.g. 7982271879), email addresses, and shipping details.
              </p>

              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">2. How We Use Your Information</h4>
              <p>
                We use the information we collect in various ways to improve your shopping experience, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Providing, operating, and maintaining our premium catalog portal</li>
                <li>Processing transactions securely without storing payment credentials</li>
                <li>Contacting you with order updates or catalog announcements</li>
                <li>Sending periodic promotional emails or messages if consented</li>
                <li>Enhancing material quality based on combined consumer fits</li>
              </ul>

              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">3. Third-Party Sharing</h4>
              <p>
                We only share shipping details with verified Indian logistics and courier providers. Your information is never sold to advertising conglomerates or outside broker tables.
              </p>

              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">4. Contact Channels</h4>
              <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our dedicated support desk at <strong>7982271879</strong> or <strong>hosierygayatri@gmail.com</strong>.
              </p>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-surface-container flex justify-end">
              <button
                onClick={() => setShowPrivacy(false)}
                className="bg-navy text-surface py-2 px-5 text-xs font-bold rounded-lg hover:bg-gold transition-all uppercase cursor-pointer"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TERMS OF SERVICE MODAL OVERLAY */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 font-sans">
          <div className="bg-surface text-on-surface rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-surface-container-highest animate-fade-in text-left">
            <div className="p-6 bg-[#000613] text-surface flex justify-between items-center border-b border-white/10">
              <div className="flex items-center space-x-2.5">
                <FileText className="text-gold" size={20} />
                <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-surface">Terms of Service</h3>
              </div>
              <button onClick={() => setShowTerms(false)} className="text-surface-container hover:text-gold transition-colors focus:outline-none p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed custom-scrollbar bg-surface">
              <p className="font-semibold text-navy">Last Updated: July 19, 2026</p>
              <p>
                These Terms of Service govern your use of the Gayatri Hosiery web application and purchase of garments. By browsing our catalog or initiating order forms, you agree to these terms in full.
              </p>

              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">1. Scope of Products</h4>
              <p>
                Gayatri Hosiery provides high-end combed cotton underwear, comfortable loungewear, and premium combed socks. Because we maintain boutique batches, designs, exact colors, and sizes are subject to immediate inventory changes.
              </p>

              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">2. Accuracy of Information</h4>
              <p>
                We try our absolute best to exhibit the finest precision in details, sizes, colors, and raw weaver characteristics. Minor deviations from product mockups represent genuine loom cotton traits and are not catalog defects.
              </p>

              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">3. Personal Purchases and Hygiene Policy</h4>
              <p>
                Due to sanitary and health compliance guidelines established for intimate apparel across India, innerwear garments (such as briefs, trunks, brassieres, and intimate vests) cannot be returned once delivered or opened, except in instances of validated pre-packaging loom damages.
              </p>

              <h4 className="font-serif font-bold text-navy text-sm uppercase tracking-wide pt-2">4. Wholesale Orders and Contracts</h4>
              <p>
                Commercial institutional orders require signed authorization, advance trade clearances, and custom production timelines. Please write to us at <strong>hosierygayatri@gmail.com</strong> or call <strong>7982271879</strong> for custom bulk billing slabs.
              </p>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-surface-container flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-navy text-surface py-2 px-5 text-xs font-bold rounded-lg hover:bg-gold transition-all uppercase cursor-pointer"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
