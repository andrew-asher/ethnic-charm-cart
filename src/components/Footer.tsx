const Footer = () => (
  <footer className="py-10 bg-foreground">
    <div className="container mx-auto px-4 text-center">
      <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Thozhi</h3>
      <p className="font-body text-sm text-primary-foreground/60 mb-4">
        Premium South Asian Ethnic Wear for Women — London, UK
      </p>
      <div className="flex justify-center gap-6 mb-6">
        {['Shop', 'About', 'Contact'].map(item => (
          <button
            key={item}
            onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            className="font-body text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
      <p className="font-body text-xs text-primary-foreground/30">
        © {new Date().getFullYear()} Thozhi. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
