import { MessageCircle, Instagram, MapPin, Truck } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

const ContactSection = () => (
  <section id="contact" className="py-20 bg-blush-gradient">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Get in Touch</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Contact Us</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-6 bg-card rounded-2xl card-product hover:border-primary border border-transparent transition-colors"
        >
          <MessageCircle className="w-8 h-8 text-sage mb-3" />
          <h3 className="font-display text-base font-semibold text-foreground mb-1">WhatsApp</h3>
          <p className="font-body text-sm text-muted-foreground text-center">Order & enquiries via WhatsApp</p>
        </a>
        <div className="flex flex-col items-center p-6 bg-card rounded-2xl card-product">
          <Instagram className="w-8 h-8 text-rose-light mb-3" />
          <h3 className="font-display text-base font-semibold text-foreground mb-1">Instagram</h3>
          <p className="font-body text-sm text-muted-foreground text-center">@thozhi.fashion</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-card rounded-2xl card-product">
          <MapPin className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-display text-base font-semibold text-foreground mb-1">Location</h3>
          <p className="font-body text-sm text-muted-foreground text-center">London, United Kingdom</p>
        </div>
        <div className="flex flex-col items-center p-6 bg-card rounded-2xl card-product">
          <Truck className="w-8 h-8 text-gold mb-3" />
          <h3 className="font-display text-base font-semibold text-foreground mb-1">Delivery</h3>
          <p className="font-body text-sm text-muted-foreground text-center">Delivery & pickup available in London</p>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
