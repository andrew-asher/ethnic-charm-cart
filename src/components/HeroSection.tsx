import { useState, useEffect, useMemo } from 'react';
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
import heroSlide4 from '@/assets/hero-slide-4.jpg';
import heroSlide5 from '@/assets/hero-slide-5.jpg';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { useAdmin } from '@/context/AdminContext';

const defaultSlides = [heroSlide1, heroSlide2, heroSlide3, heroSlide4, heroSlide5, heroSlide6];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const { heroSettings } = useAdmin();

  const slides = useMemo(() => {
    const adminSlides = (heroSettings.slides || [])
      .filter(s => s.visible && s.imageUrl)
      .sort((a, b) => a.order - b.order)
      .map(s => s.imageUrl);
    return adminSlides.length > 0 ? adminSlides : defaultSlides;
  }, [heroSettings.slides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Slideshow backgrounds - full bleed */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide}
            alt={`Thozhy ethnic fashion ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />
        </div>
      ))}

      <div className="relative container mx-auto px-4 py-20 z-10">
        <div className="max-w-xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/15 backdrop-blur-sm mb-6 animate-fade-in-up">
            <p className="font-body text-sm font-medium text-peach tracking-widest uppercase">
              ✦ New Collection 2026
            </p>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-3 animate-fade-in-up" style={{ lineHeight: 1.1 }}>
            <span className="text-gradient-hero">Thozhy</span>
          </h1>
          <p className="font-body text-lg md:text-xl font-light text-primary-foreground/90 mb-2 animate-fade-in-up-delay-1 tracking-wide">
            Rooted in Eelam. Styled for You.
          </p>
          <p className="font-body text-sm md:text-base text-primary-foreground/60 mb-10 animate-fade-in-up-delay-2 max-w-md leading-relaxed">
            Our own Thozhy designs paired with handpicked premium ethnic wear — crafted by trusted artisans from Eelam, delivered with love in London.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-3">
            <button
              onClick={scrollToShop}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-body font-semibold text-sm rounded-full hover:brightness-110 transition-all tracking-wider uppercase"
            >
              Shop Now
            </button>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground font-body font-medium text-sm rounded-full hover:bg-primary-foreground/10 transition-all tracking-wider uppercase backdrop-blur-sm"
            >
              Order via WhatsApp
            </a>
          </div>

          {slides.length > 1 && (
            <div className="flex gap-2 mt-8 animate-fade-in-up-delay-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? 'w-8 bg-primary' : 'w-3 bg-primary-foreground/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60H0Z" fill="hsl(35 40% 97%)" /></svg>
      </div>
    </section>
  );
};

export default HeroSection;
