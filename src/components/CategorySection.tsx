import { useAdmin } from '@/context/AdminContext';
import categoryTops from '@/assets/category-tops.jpg';
import categorySarees from '@/assets/category-sarees.jpg';
import categoryGowns from '@/assets/category-gowns.jpg';
import categoryJewellery from '@/assets/category-jewellery.jpg';

const fallbackImages: Record<string, string> = {
  Tops: categoryTops,
  Sarees: categorySarees,
  Gowns: categoryGowns,
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
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {visible.map((cat) => {
            const img = cat.image || fallbackImages[cat.name] || '';
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.name)}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg hover:shadow-xl transition-shadow"
              >
                <img src={img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-2xl font-bold text-primary-foreground mb-1">{cat.name}</h3>
                  <p className="font-body text-sm text-primary-foreground/80 mb-2">{cat.description}</p>
                  {(cat.subcategories || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {(cat.subcategories || []).map(sub => (
                        <span key={sub.id} className="text-[11px] bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-2 py-0.5 rounded-full">
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
