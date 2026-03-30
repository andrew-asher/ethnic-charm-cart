import thozhyLogo from '@/assets/thozhy-logo.jpeg';

const Footer = () => (
  <footer className="py-12 bg-warm-brown">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <img src={thozhyLogo} alt="Thozhy" className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30" />
        <div className="text-left">
          <h3 className="text-gradient-hero font-display text-2xl font-bold">Thozhy</h3>
          <p className="font-body text-[10px] text-primary-foreground/40 tracking-[0.3em] uppercase">London · Sri Lanka</p>
        </div>
      </div>
      <p className="font-body text-sm text-primary-foreground/50 mb-6 mt-3">
        Premium Ethnic Wear & Jewellery — Rooted in Eelam
      </p>
      <div className="flex justify-center gap-8 mb-8">
        {['Shop', 'About', 'Contact'].map(item => (
          <button
            key={item}
            onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            className="font-body text-xs text-primary-foreground/40 hover:text-primary transition-colors tracking-widest uppercase"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="h-px bg-primary-foreground/10 mb-6 max-w-xs mx-auto" />
      <p className="font-body text-[11px] text-primary-foreground/25 tracking-wide">
        © {new Date().getFullYear()} Thozhy. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
