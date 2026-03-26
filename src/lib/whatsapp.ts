import { CartItem } from '@/context/CartContext';
import { Product } from '@/data/products';

// Change this to your actual WhatsApp number
const WHATSAPP_NUMBER = '447000000000';

export function generateCartWhatsAppLink(items: CartItem[], total: number): string {
  let message = `Hello Thozhi, I would like to place an order.\n\nProducts:\n`;
  items.forEach(item => {
    message += `- ${item.product.name} | Size: ${item.size} | Qty: ${item.quantity} | Price: £${item.product.price * item.quantity}\n`;
  });
  message += `\nTotal: £${total}\n\nMy name:\nMy contact number:\nDelivery / Pickup preference:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateProductWhatsAppLink(product: Product, size: string): string {
  const message = `Hello Thozhi, I would like to order:\n\n- ${product.name} | Size: ${size} | Price: £${product.price}\n\nMy name:\nMy contact number:\nDelivery / Pickup preference:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppLink(message?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || 'Hello Thozhi, I am interested in your collection!')}`;
}
