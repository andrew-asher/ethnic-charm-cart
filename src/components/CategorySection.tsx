import categoryTops from '@/assets/category-tops.jpg';
import categorySarees from '@/assets/category-sarees.jpg';
import categoryGowns from '@/assets/category-gowns.jpg';

const categories = [
  { name: 'Tops', image: categoryTops, desc: 'Elegant kurti tops & tunics with intricate embroidery' },
  { name: 'Sarees', image: categorySarees, desc: 'Handwoven silk sarees from South India & Sri Lanka' },
  { name: 'Gowns', image: categoryGowns, desc: 'Stunning anarkali & floor-length festive gowns' },
];

interface Props {
  onCategoryClick: (cat: string) => void;
}

const CategorySection = ({ onCategoryClick }: Props) => (
  <section className="py-20 bg-blush-gradient">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Browse Our</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Collections</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => onCategoryClick(cat.name)}
            className={`group relative overflow-hidden rounded-2xl aspect-[3/4] card-product animate-fade-in-up-delay-${i + 1 > 3 ? 3 : i + 1}`}
          >
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-1">{cat.name}</h3>
              <p className="font-body text-sm text-primary-foreground/80">{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
