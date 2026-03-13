import { Gem, Globe, Heart, Sparkles } from 'lucide-react';

const features = [
  { icon: Globe, title: 'Sourced Globally', desc: 'Handpicked from Sri Lanka & India' },
  { icon: Gem, title: 'Premium Quality', desc: 'Only the finest fabrics & craftsmanship' },
  { icon: Sparkles, title: 'Limited Editions', desc: 'Exclusive collections, never mass-produced' },
  { icon: Heart, title: 'Cultural Beauty', desc: 'Celebrating South Asian textile heritage' },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-blush-gradient">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Our Story</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">About Thozhi</h2>
        <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          Thozhi — meaning "friend" — brings premium women's ethnic wear from Sri Lanka and India to London. 
          We curate limited, handpicked collections that celebrate elegance, cultural beauty, and the finest 
          craftsmanship of South Asian textile traditions. Every piece tells a story of heritage and artistry.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map(f => (
          <div key={f.title} className="text-center p-6 bg-card rounded-2xl card-product">
            <div className="w-12 h-12 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
