import { Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: Props) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize);
  };

  return (
    <div className="group card-product bg-card rounded-2xl overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold font-body tracking-wide ${
            product.badge === 'New Collection'
              ? 'bg-primary text-primary-foreground'
              : 'bg-accent text-accent-foreground'
          }`}>
            {product.badge}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="p-3 bg-card rounded-full hover:bg-secondary transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-primary rounded-full hover:opacity-90 transition-opacity"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="font-body text-xs text-muted-foreground tracking-widest uppercase">{product.category}</p>
        <h3 className="font-display text-lg font-semibold text-foreground mt-1">{product.name}</h3>
        <p className="font-body text-sm text-muted-foreground mt-0.5">{product.subtitle}</p>
        <p className="font-display text-lg font-bold text-primary mt-2">£{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
