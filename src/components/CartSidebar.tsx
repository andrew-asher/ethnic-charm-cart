import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { generateCartWhatsAppLink } from '@/lib/whatsapp';

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" onClick={() => setIsCartOpen(false)}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div
        className="absolute top-0 right-0 h-full w-full max-w-md bg-card shadow-2xl flex flex-col animate-slide-in-right"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'slide-in-right 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Your Cart</h2>
            <span className="text-sm text-muted-foreground font-body">({totalItems})</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-body text-muted-foreground">Your cart is empty</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 text-primary font-body font-semibold hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-3 bg-secondary/50 rounded-xl">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold text-foreground truncate">{item.product.name}</h4>
                    <p className="font-body text-xs text-muted-foreground">Size: {item.size}</p>
                    <p className="font-display text-sm font-bold text-primary mt-1">£{item.product.price * item.quantity}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="p-1 rounded-full border border-border hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-1 rounded-full border border-border hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-base text-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-primary">£{totalPrice}</span>
            </div>
            <a
              href={generateCartWhatsAppLink(items, totalPrice)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-sage text-primary-foreground rounded-full font-body font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" /> Checkout via WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-muted-foreground font-body hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
