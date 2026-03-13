import { useState } from 'react';
import { products, Category, Product } from '@/data/products';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { Search } from 'lucide-react';

const tabs: ('All' | Category)[] = ['All', 'Tops', 'Sarees', 'Gowns'];

interface Props {
  initialCategory?: string;
}

const ShopSection = ({ initialCategory }: Props) => {
  const [active, setActive] = useState<'All' | Category>((initialCategory as Category) || 'All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = products.filter(p => {
    const matchCat = active === 'All' || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="shop" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Explore</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Products</h2>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap justify-center">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-colors ${
                  active === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-secondary rounded-full font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-60"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body py-12">No products found.</p>
        )}
      </div>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
};

export default ShopSection;
