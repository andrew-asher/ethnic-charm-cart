import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="font-display text-2xl font-bold text-primary tracking-wider">
          Thozhi
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Shop', 'About', 'Contact'].map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
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
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in-up">
          {['Shop', 'About', 'Contact'].map(item => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="block w-full text-left py-3 font-body text-lg text-foreground/80 hover:text-primary transition-colors"
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
