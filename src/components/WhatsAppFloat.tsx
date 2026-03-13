import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/whatsapp';

const WhatsAppFloat = () => (
  <a
    href={getWhatsAppLink()}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-sage rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6 text-primary-foreground" />
  </a>
);

export default WhatsAppFloat;
