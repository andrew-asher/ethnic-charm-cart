import { X, ShoppingBag, MessageCircle, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { generateProductWhatsAppLink } from '@/lib/whatsapp';
import { useState } from 'react';

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: Props) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const size = selectedSize || product.sizes[0];
  const allImages = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: 'var(--shadow-elevated)' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-secondary transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-secondary/30">
            <img
              src={allImages[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(i => (i - 1 + allImages.length) % allImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(i => (i + 1) % allImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? 'bg-primary' : 'bg-card/60'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            {product.badge && (
              <span className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold font-body tracking-wide mb-3 ${
                product.badge === 'New Collection' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
              }`}>
                {product.badge}
              </span>
            )}
            <p className="font-body text-xs text-muted-foreground tracking-widest uppercase">{product.category}</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1">{product.name}</h2>
            <p className="font-body text-base text-muted-foreground mt-1">{product.subtitle}</p>
            <p className="font-display text-2xl font-bold text-primary mt-4">£{product.price}</p>

            <p className="font-body text-sm text-foreground/80 mt-4 leading-relaxed">{product.description}</p>

            {/* Sizes */}
            <div className="mt-6">
              <p className="font-body text-sm font-semibold text-foreground mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-full text-sm font-body border transition-colors ${
                      (selectedSize || product.sizes[0]) === s
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-foreground hover:border-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mt-4">
                <p className="font-body text-sm font-semibold text-foreground mb-1">Available in: {product.colors.join(', ')}</p>
              </div>
            )}

            {/* Quality note */}
            <div className="mt-4 flex items-start gap-2 p-3 bg-secondary rounded-lg">
              <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="font-body text-xs text-muted-foreground">{product.qualityNote}</p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addItem(product, size)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <a
                href={generateProductWhatsAppLink(product, size)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-body font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
