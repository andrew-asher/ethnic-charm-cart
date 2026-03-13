import heroBanner from '@/assets/hero-banner.jpg';
import { getWhatsAppLink } from '@/lib/whatsapp';

const HeroSection = () => {
  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBanner} alt="Thozhi ethnic fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-xl">
          <p className="font-body text-gold-light text-lg tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
            Exclusive Collection
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-4 animate-fade-in-up">
            Thozhi
          </h1>
          <p className="font-display text-xl md:text-2xl text-primary-foreground/90 mb-2 animate-fade-in-up-delay-1">
            Premium South Asian Ethnic Wear for Women
          </p>
          <p className="font-body text-base md:text-lg text-primary-foreground/70 mb-8 animate-fade-in-up-delay-2">
            Carefully selected tops, sarees, and gowns from Sri Lanka and India
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-3">
            <button
              onClick={scrollToShop}
              className="px-8 py-3 bg-primary text-primary-foreground font-body font-semibold text-base rounded-full hover:opacity-90 transition-opacity tracking-wide"
            >
              Shop Now
            </button>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary-foreground/40 text-primary-foreground font-body font-semibold text-base rounded-full hover:bg-primary-foreground/10 transition-colors tracking-wide"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
