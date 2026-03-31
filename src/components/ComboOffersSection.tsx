import { useAdmin } from '@/context/AdminContext';
import { useCart } from '@/context/CartContext';
import { Gift, ShoppingBag } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';
import combo1Img from '@/assets/combo-1.jpg';
import combo2Img from '@/assets/combo-2.jpg';
import combo3Img from '@/assets/combo-3.jpg';

const comboFallbackImages: Record<string, string> = {
  'combo-1': combo1Img,
  'combo-2': combo2Img,
  'combo-3': combo3Img,
};

const ComboOffersSection = () => {
  const { comboOffers, products } = useAdmin();
  const { addItem } = useCart();

  const visibleCombos = comboOffers.filter(c => c.visible);
  if (visibleCombos.length === 0) return null;

  return (
    <section className="py-20 bg-warm-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 mb-3">
            <p className="font-body text-xs font-medium text-accent tracking-[0.2em] uppercase">✦ Special Deals</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Combo Offers
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Handpicked bundles at exclusive prices — style more, save more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {visibleCombos.map(combo => {
            const comboProducts = products.filter(p => combo.productIds.includes(p.id));
            const savings = combo.originalPrice - combo.comboPrice;
            const savingsPercent = combo.originalPrice > 0 ? Math.round((savings / combo.originalPrice) * 100) : 0;

            return (
              <div key={combo.id} className="bg-card rounded-2xl overflow-hidden card-product">
                {/* Product thumbnails row */}
                <div className="relative p-4 pb-0">
                  <span className="absolute top-6 left-6 z-10 text-[11px] font-semibold bg-accent text-accent-foreground px-3 py-1 rounded-full">
                    {combo.badge || 'Combo Offer'}
                  </span>
                  {(combo.image || comboFallbackImages[combo.id]) ? (
                    <img src={combo.image || comboFallbackImages[combo.id]} alt={combo.title} className="w-full h-44 object-cover rounded-xl" />
                  ) : (
                    <div className="flex gap-2 h-44">
                      {comboProducts.slice(0, 3).map(p => (
                        <div key={p.id} className="flex-1 rounded-xl overflow-hidden bg-muted">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Gift className="w-6 h-6 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-foreground mb-1">{combo.title}</h3>
                  {combo.description && (
                    <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-2">{combo.description}</p>
                  )}

                  {/* Included products */}
                  <div className="space-y-1.5 mb-4">
                    {comboProducts.map(p => (
                      <div key={p.id} className="flex items-center gap-2 text-xs">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span className="text-foreground/80 truncate">{p.name}</span>
                        <span className="text-muted-foreground ml-auto">£{p.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display text-xl font-bold text-primary">£{combo.comboPrice}</span>
                    <span className="text-sm text-muted-foreground line-through">£{combo.originalPrice}</span>
                    {savingsPercent > 0 && (
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        Save {savingsPercent}%
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        comboProducts.forEach(p => addItem(p as any, p.sizes?.[0] || 'Free Size'));
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full hover:brightness-110 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add Bundle
                    </button>
                    <a
                      href={getWhatsAppLink(`Hi, I'm interested in the "${combo.title}" combo offer (£${combo.comboPrice})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-border text-foreground text-xs font-medium rounded-full hover:bg-muted transition-all"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComboOffersSection;
