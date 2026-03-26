import { useAdmin } from '@/context/AdminContext';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { useState } from 'react';
import { Product } from '@/data/products';
import { Sparkles } from 'lucide-react';

const FeaturedCollections = () => {
  const { collections, products } = useAdmin();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = collections.filter(c => c.featured && c.visible && c.productIds.length > 0);

  if (featured.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {featured.map(collection => {
          const collectionProducts = collection.productIds
            .map(id => products.find(p => p.id === id))
            .filter(Boolean)
            .filter(p => p!.visible)
            .slice(0, 4);

          if (collectionProducts.length === 0) return null;

          return (
            <div key={collection.id} className="mb-16 last:mb-0">
              {/* Collection header */}
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="font-body text-primary text-sm tracking-[0.3em] uppercase">{collection.subtitle || 'Curated'}</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{collection.title}</h2>
              {collection.description && (
                <p className="font-body text-muted-foreground max-w-lg mb-8">{collection.description}</p>
              )}

              {/* Banner + products */}
              {collection.bannerImage && (
                <div className="rounded-2xl overflow-hidden mb-8 max-h-64">
                  <img src={collection.bannerImage} alt={collection.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {collectionProducts.map(product => (
                  <ProductCard key={product!.id} product={product as Product} onQuickView={setSelectedProduct} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
};

export default FeaturedCollections;
