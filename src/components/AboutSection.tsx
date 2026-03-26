import { Gem, Globe, Heart, Sparkles } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

const features = [
  { icon: Globe, title: 'Globally Sourced', desc: 'Handpicked from artisans in Sri Lanka & India' },
  { icon: Gem, title: 'Premium Quality', desc: 'Only the finest fabrics & craftsmanship' },
  { icon: Sparkles, title: 'Limited Drops', desc: 'Exclusive pieces, never mass-produced' },
  { icon: Heart, title: 'Made with Love', desc: 'Celebrating South Asian textile heritage' },
];

const AboutSection = () => {
  const { siteContent } = useAdmin();

  // Split about text into paragraphs
  const paragraphs = (siteContent.aboutText || '').split('\n').filter(p => p.trim());

  return (
    <section id="about" className="py-24 bg-blush-gradient relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 mb-4">
              <p className="font-body text-xs font-medium text-primary tracking-[0.2em] uppercase">{siteContent.aboutTitle || 'Our Story'}</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ lineHeight: 1.3 }}>
              Where tradition meets <span className="text-gradient-hero italic">modern elegance</span>
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <div className="flex items-center gap-4 mt-4">
              <div className="h-px flex-1 bg-border" />
              <span className="font-body text-xs text-muted-foreground tracking-[0.3em] uppercase">Est. 2026 · London</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`p-6 bg-card rounded-2xl card-product text-center ${i % 2 === 1 ? 'mt-6' : ''}`}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-1">{f.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
