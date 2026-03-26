import heroBanner from '@/assets/hero-banner.jpg';
import { getWhatsAppLink } from '@/lib/whatsapp';

const HeroSection = () => {
  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBanner} alt="Thozhi ethnic kurti fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
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
            Premium South Asian Ethnic Wear for Women
          </p>
          <p className="font-body text-sm md:text-base text-primary-foreground/60 mb-10 animate-fade-in-up-delay-2 max-w-md leading-relaxed">
            Carefully curated ethnic wear and jewellery from Sri Lanka and India — delivered with love in London.
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
        </div>
      </div>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60H0Z" fill="hsl(35 40% 97%)" /></svg>
      </div>
    </section>
  );
};

export default HeroSection;
