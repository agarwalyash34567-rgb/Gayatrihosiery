import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, HelpCircle, ChevronDown, ChevronUp, Star, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'wholesale', // 'general' | 'wholesale' | 'order' | 'feedback'
    companyName: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      try {
        const savedInquiries = localStorage.getItem('gayatri_inquiries');
        const inquiriesList = savedInquiries ? JSON.parse(savedInquiries) : [];
        const newInquiry = {
          id: 'GH-INQ-' + Math.floor(10000 + Math.random() * 90000),
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'N/A',
          type: formData.type,
          companyName: formData.companyName || 'N/A',
          message: formData.message,
          resolved: false
        };
        inquiriesList.unshift(newInquiry);
        localStorage.setItem('gayatri_inquiries', JSON.stringify(inquiriesList));
      } catch (err) {
        console.error('Error saving inquiries to localStorage:', err);
      }
      setFormSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: 'wholesale',
      companyName: '',
      message: '',
    });
    setFormSubmitted(false);
  };

  const faqList = [
    {
      q: 'Do you offer wholesale pricing or bulk order options?',
      a: 'Yes, Gayatri Hosiery is a prime manufacturer. We cater to distributors, wholesale retailers, and institutional buyers across India. Please fill out our contact form with "Wholesale & Bulk Orders" selected, and our business development head will reach out to you within 24 business hours with our catalog and wholesale pricing slab.',
    },
    {
      q: 'Where are Gayatri Hosiery garments manufactured?',
      a: 'All our premium innerwear, socks, and loungewear are proudly spun and manufactured at our state-of-the-art mills located in India. We utilize combed long-staple cotton yarn processed through premium loom principles infused with modern German and Swiss knitting technologies.',
    },
    {
      q: 'What is your shipping policy across India?',
      a: 'We offer free standard shipping on all orders above ₹1,000. For orders below ₹1,000, a flat shipping fee of ₹99 is applicable. Delivery typically takes 2–4 business days in tier-1 metro cities and 5–7 business days for regional pin codes.',
    },
    {
      q: 'Can I request custom sizes or white-label hosiery manufacturing?',
      a: 'For high-volume institutional requirements (over 5,000 units), we do offer customized blends, packaging, and specific length/width weaving. Please specify your requirements in the contact form or email our corporate division directly at hosierygayatri@gmail.com.',
    },
    {
      q: 'How do I initiate a return or exchange for my purchase?',
      a: 'Due to hygienic standards of innerwear garments, we only accept returns or exchanges on outer loungewear and unused, unwashed packs with tags intact within 7 days of delivery. If you receive a manufacturing defect, please contact our support team at hosierygayatri@gmail.com or call our hotline for immediate free replacement.',
    }
  ];

  return (
    <div className="bg-surface py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in font-sans">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 watermark-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-gold/10 border border-gold/20 px-3 py-1 rounded-full text-gold">
            <Sparkles size={12} />
            <span className="text-[10px] tracking-widest font-bold uppercase">CONNECT WITH THE MANUFACTURER</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy tracking-tight leading-tight">
            Contact Us & <span className="italic font-normal text-gold">Business Inquiries</span>
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-xl mx-auto">
            Whether you are a retail customer needing assistance with an order, or a wholesale merchant interested in partnership, our dedicated help desk is here to serve you.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Coordinates & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
              <h3 className="font-serif text-lg font-bold text-navy border-b border-surface-container pb-3 uppercase tracking-wider">
                Corporate Coordinates
              </h3>
              
              <div className="space-y-6 font-sans text-xs sm:text-sm text-on-surface-variant">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-gold/10 text-gold rounded-lg shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-xs uppercase tracking-wide">Registered Headquarters</h4>
                    <p className="mt-1 text-xs leading-relaxed text-on-surface-variant/90">
                      Near Lalaji Chaat Corner, Turab Nagar,<br />
                      Ghaziabad, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-gold/10 text-gold rounded-lg shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-xs uppercase tracking-wide">Customer Support Hotlines</h4>
                    <p className="mt-1 text-xs leading-relaxed text-on-surface-variant/90">
                      General Support: +91 79822 71879<br />
                      Corporate Office: +91 79822 71879
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-gold/10 text-gold rounded-lg shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-xs uppercase tracking-wide">Official Email Desk</h4>
                    <p className="mt-1 text-xs leading-relaxed text-on-surface-variant/90">
                      Retail Care: hosierygayatri@gmail.com<br />
                      Wholesale Division: hosierygayatri@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-gold/10 text-gold rounded-lg shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-xs uppercase tracking-wide">Business Working Hours</h4>
                    <p className="mt-1 text-xs leading-relaxed text-on-surface-variant/90">
                      Monday to Saturday: 09:30 AM – 06:30 PM (IST)<br />
                      Sundays: Closed for Weaver Welfare Rest
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Promise Card */}
            <div className="bg-gradient-to-br from-navy to-[#051330] text-surface rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl border border-gold/20">
              <div className="flex items-center space-x-2 text-gold">
                <Star size={16} fill="currentColor" />
                <span className="text-[10px] tracking-widest font-extrabold uppercase">THE TRUST PLEDGE</span>
              </div>
              <h4 className="font-serif text-base font-bold text-surface">Direct Support</h4>
              <p className="text-xs text-surface-container/80 leading-relaxed font-sans">
                Unlike mass-drop retail platforms, Gayatri Hosiery is operated directly by our family weaver counsel. Every query is read by our dispatch officers to guarantee authentic comfort, and absolute attention to detail is promised for bulk delivery timelines.
              </p>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container rounded-2xl p-6 sm:p-8 shadow-lg border border-surface-container-highest">
              {formSubmitted ? (
                /* SUCCESS STATE */
                <div className="py-12 px-4 text-center space-y-6">
                  <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <CheckCircle size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-navy">Inquiry Received Successfully!</h3>
                    <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Gayatri Hosiery. A senior care officer has been assigned to your reference and will email or call you shortly.
                    </p>
                    <p className="text-[10px] text-gold font-bold uppercase tracking-wider">
                      Reference ID: GH-INQ-{Math.floor(10000 + Math.random() * 90000)}
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="bg-navy text-surface py-2.5 px-6 text-xs font-bold tracking-widest rounded hover:bg-gold transition-colors uppercase"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                /* ACTIVE FORM STATE */
                <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-navy">Send an Electronic Inquiry</h3>
                    <p className="text-xs text-on-surface-variant font-medium">
                      Fill out the form below, and we will direct your message to the correct regional division.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g. Arvind Sen"
                        className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="E.g. arvind@example.com"
                        className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="E.g. +91 98300 XXXXX"
                        className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Inquiry Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold font-sans cursor-pointer"
                      >
                        <option value="wholesale">Wholesale & Bulk Orders</option>
                        <option value="general">General Support & Product Questions</option>
                        <option value="order">Order Tracking & Returns</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                    </div>
                  </div>

                  {formData.type === 'wholesale' && (
                    <div className="space-y-1 animate-fade-in">
                      <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Company / Retail Store Name *</label>
                      <input
                        type="text"
                        required={formData.type === 'wholesale'}
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="E.g. Sen Brothers Textiles Ltd"
                        className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-wider">Detailed Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please state your question, feedback, or bulk quantity requirement..."
                      className="w-full bg-surface-container-low border border-surface-container text-xs p-3 rounded outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-navy hover:bg-gold text-surface py-3 text-xs font-bold tracking-widest rounded transition-colors uppercase flex items-center justify-center space-x-2"
                  >
                    <Send size={14} />
                    <span>Send Electronic Form</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions Section */}
        <div className="space-y-8 pt-8 border-t border-surface-container-highest">
          <div className="text-center max-w-md mx-auto space-y-1">
            <div className="flex items-center justify-center text-gold space-x-1.5">
              <HelpCircle size={16} />
              <span className="text-[10px] tracking-widest font-bold uppercase">KNOWLEDGE DESK</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-navy uppercase tracking-widest">Frequently Asked Questions</h3>
            <p className="text-xs text-on-surface-variant font-medium">Quick answers to common legacy inquiries</p>
            <div className="w-12 h-1 bg-gold mx-auto mt-2 rounded" />
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-container-low border border-surface-container rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center space-x-4 hover:bg-surface-container transition-colors focus:outline-none"
                  >
                    <span className="font-serif text-sm font-bold text-navy leading-snug">
                      {faq.q}
                    </span>
                    <span className="text-gold shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed animate-fade-in border-t border-surface-container-highest/40">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
