import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Priya S.', text: 'The saree quality is absolutely stunning. Felt like a princess at my cousin\'s wedding!', rating: 5 },
  { name: 'Meena R.', text: 'Thozhi\'s collection is unlike anything in London. Unique, elegant, and beautifully made.', rating: 5 },
  { name: 'Anitha K.', text: 'Ordered a gown for Diwali — the embroidery and fit were perfect. Will definitely order again!', rating: 5 },
];

const TestimonialSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Testimonials</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What Our Customers Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 bg-card rounded-2xl card-product text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="font-body text-sm text-foreground/80 italic leading-relaxed mb-4">"{t.text}"</p>
            <p className="font-display text-sm font-semibold text-primary">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
