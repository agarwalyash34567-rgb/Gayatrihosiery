import React from 'react';
import { Calendar, Heart, ShieldAlert, Sparkles } from 'lucide-react';

export default function AboutUs() {
  const milestones = [
    {
      year: 'Founding',
      title: 'Founding Thread',
      desc: 'Established as a boutique hand-knitting loom focusing on supreme comfort and honest materials.',
    },
    {
      year: 'Quality',
      title: 'The Quality Pioneer',
      desc: 'Introduced high-speed precision combed-cotton spinning machinery, setting new benchmarks for Indian daily comfort innerwear.',
    },
    {
      year: 'Modern',
      title: 'Modern Mastery',
      desc: 'Expanded to children socks and high-end thermal sets utilizing specialized insulated weave structures.',
    },
    {
      year: 'Premium',
      title: 'Pima Cotton Revolution',
      desc: 'Pioneered long-staple pima cotton blend undergarments with seamless double-stitched flatlock boundaries.',
    },
    {
      year: 'Present',
      title: 'Supreme Excellence',
      desc: 'Continuing our commitment of premium softness and classic design, serving over 10 million satisfied families in India.',
    },
  ];

  return (
    <div className="bg-surface py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in font-sans">
      {/* Background decoration watermark */}
      <div className="absolute inset-0 watermark-pattern opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Intro Block Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-gold/10 border border-gold/20 px-3 py-1 rounded-full text-gold">
            <Sparkles size={12} />
            <span className="text-[10px] tracking-widest font-bold uppercase">Woven to Perfection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy tracking-tight leading-tight">
            Our Story of <br />
            <span className="italic font-normal text-gold">Uncompromised Luxury</span>
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Gayatri Hosiery is woven into the daily lives of Indian families. Our reputation is built on thread-by-thread precision and premium cotton blends.
          </p>
        </div>

        {/* Brand Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Historical text description */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy">
              Woven with Pride, Crafted for Families
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Gayatri Hosiery started with a singular vision: to create garments that feel like a second skin. At a time when high-grade hosiery was rare, our founders set out to harness local Indian combed cotton to spin underwear and socks that could endure warm climates while maintaining supreme softness.
            </p>
            
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Every item in our collection is crafted with organic pima cotton and Modal blends. We use highly specialized mercerized finishing that adds structural resilience and a beautiful silk gloss. We run our mills keeping ethics and Indian craftsmanship at the absolute center of our story.
            </p>

            {/* Core Values Bullets */}
            <div className="space-y-4 pt-4 border-t border-surface-container-highest">
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-gold mt-1">workspace_premium</span>
                <div>
                  <h4 className="text-xs font-bold text-navy">No-Marks Guarantee</h4>
                  <p className="text-[11px] text-on-surface-variant">Soft, brushed elastane waistbands that leave absolutely zero skin impressions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-gold mt-1">eco</span>
                <div>
                  <h4 className="text-xs font-bold text-navy">100% Organic Egyptian & Pima Cotton</h4>
                  <p className="text-[11px] text-on-surface-variant">Grown under optimal sunshine, harvested by hand to preserve fibers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Large Image Frame */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUypmYwtk3mxw2lsYALJ0TbN2uRMKyiSFxTyJYAQc9_1bN39XLZ2l_y4gR-KZmYOum0PWyibyxYilYa5hetz9h8eShr4GGUfyoJL1C_quBPYGcqxNPbBlhiAaNrsLFg_P4xWxivEUNYk7Tg3eMmd2dHTuMbPIWnQ9GWGy4NebBuTBZQbCBPlUhiuslvprW0sRnrunDjeeuelJXNaC8kGJcs8ERIq4btKvdxWtTjH5eE68VpR5aOlPojYi-uGbDCSFe3j9AOZQFYWQ"
                alt="Boutique weaving and craft showcase"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-surface">
                <p className="font-serif italic text-lg text-gold">Premium Loom</p>
                <p className="font-sans text-[10px] tracking-widest uppercase">Ghaziabad, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

        </div>

        {/* Milestone Vertical Timeline */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-md mx-auto">
            <h3 className="font-serif text-lg font-bold text-navy uppercase tracking-widest">Our Milestones</h3>
            <div className="w-12 h-1 bg-gold mx-auto mt-2 rounded" />
          </div>

          <div className="relative border-l-2 border-surface-container-highest max-w-4xl mx-auto pl-6 sm:pl-8 space-y-10">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* timeline bullet node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-surface border-4 border-gold text-navy w-5 h-5 rounded-full flex items-center justify-center group-hover:bg-gold transition-colors" />

                <div className="space-y-1">
                  <span className="font-serif text-lg font-bold text-gold">{milestone.year}</span>
                  <h4 className="font-serif text-sm font-bold text-navy uppercase tracking-wide group-hover:text-gold transition-colors">
                    {milestone.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
