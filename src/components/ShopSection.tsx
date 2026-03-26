import { useState, useEffect, useMemo } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { Search } from 'lucide-react';

interface Props {
  initialCategory?: string;
}

const ShopSection = ({ initialCategory }: Props) => {
  const { products, categories } = useAdmin();
  const visibleProducts = useMemo(() => products.filter(p => p.visible), [products]);
  const categoryNames = useMemo(() => ['All', ...categories.filter(c => c.visible).sort((a, b) => a.order - b.order).map(c => c.name)], [categories]);

  const [active, setActive] = useState(initialCategory || 'All');
  const [activeSub, setActiveSub] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') {
      setActive(initialCategory);
      setActiveSub('All');
    }
  }, [initialCategory]);

  const activeCategory = categories.find(c => c.name === active);
  const subcategories = activeCategory?.subcategories || [];

  const filtered = visibleProducts.filter(p => {
    const matchCat = active === 'All' || p.category === active;
    const matchSub = activeSub === 'All' || (p as any).subcategory === activeSub;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSub && matchSearch;
  });

  return (
    <section id="shop" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-2">Explore</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Our Products</h2>
        </div>

        {/* Search & Category Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex gap-2 flex-wrap justify-center">
            {categoryNames.map(tab => (
              <button
                key={tab}
                onClick={() => { setActive(tab); setActiveSub('All'); }}
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

        {/* Subcategory pills */}
        {active !== 'All' && subcategories.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            <button
              onClick={() => setActiveSub('All')}
              className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-colors border ${
                activeSub === 'All' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              All {active}
            </button>
            {subcategories.sort((a, b) => a.order - b.order).map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSub(sub.name)}
                className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-colors border ${
                  activeSub === sub.name ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product as Product} onQuickView={setSelectedProduct} />
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
