import { useAdmin } from '@/context/AdminContext';
import categoryTops from '@/assets/category-tops.jpg';
import categoryGowns from '@/assets/category-gowns.jpg';
import categorySarees from '@/assets/category-sarees.jpg';
import categoryJewellery from '@/assets/category-jewellery.jpg';

const fallbackImages: Record<string, string> = {
  Tops: categoryTops,
  Gowns: categoryGowns,
  Sarees: categorySarees,
  'Premium Imitation Jewellery': categoryJewellery,
};

interface Props {
  onCategoryClick: (cat: string) => void;
}

const CategorySection = ({ onCategoryClick }: Props) => {
  const { categories } = useAdmin();
  const visible = categories.filter(c => c.visible).sort((a, b) => a.order - b.order);

  return (
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-body text-primary text-sm tracking-[0.3em] uppercase mb-2">Browse By</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Categories</h2>
        </div>
        <div className={`grid gap-4 md:gap-6 mx-auto ${
          visible.length === 1 ? 'grid-cols-1 max-w-2xl' :
          visible.length === 2 ? 'grid-cols-2 max-w-4xl' :
          visible.length === 3 ? 'grid-cols-1 sm:grid-cols-3 max-w-5xl' :
          'grid-cols-2 md:grid-cols-4 max-w-6xl'
        }`}>
          {visible.map((cat) => {
            const img = cat.image || fallbackImages[cat.name] || '';
            const isSingle = visible.length === 1;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.name)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                  isSingle ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[3/4]'
                }`}
              >
                <img src={img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 ${isSingle ? 'text-center' : 'text-left'}`}>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary-foreground mb-1">{cat.name}</h3>
                  <p className="font-body text-xs sm:text-sm text-primary-foreground/80 mb-2 line-clamp-2">{cat.description}</p>
                  {(cat.subcategories || []).length > 0 && (
                    <div className="hidden sm:flex flex-wrap gap-1.5">
                      {(cat.subcategories || []).map(sub => (
                        <span key={sub.id} className="text-[11px] bg-primary/30 backdrop-blur-sm text-primary-foreground px-2 py-0.5 rounded-full">
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
