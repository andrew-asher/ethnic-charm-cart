const Footer = () => (
  <footer className="py-12 bg-warm-brown">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-col items-center mb-2">
        <h3 className="text-gradient-hero font-display text-2xl font-bold">Thozhy</h3>
        <p className="font-body text-[10px] text-primary-foreground/40 tracking-[0.3em] uppercase mt-1">London · Sri Lanka</p>
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
