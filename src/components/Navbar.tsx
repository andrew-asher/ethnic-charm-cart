import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import thozhyLogo from '@/assets/thozhy-logo.jpeg';

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
          <img src={thozhyLogo} alt="Thozhy" className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all" />
          <div className="flex flex-col items-start leading-tight">
            <span className="font-display text-xl font-bold tracking-wide text-gradient-hero">Thozhy</span>
            <span className="font-body text-[9px] font-medium tracking-[0.35em] uppercase text-muted-foreground">London · Sri Lanka</span>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Shop', 'About', 'Contact'].map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 hover:bg-primary/10 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-4 pb-4 animate-fade-in-up">
          {['Shop', 'About', 'Contact'].map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="block w-full text-left py-3 font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
