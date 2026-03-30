import top1 from '@/assets/products/top-1.jpg';
import top2 from '@/assets/products/top-2.jpg';
import top3 from '@/assets/products/top-3.jpg';
import top4 from '@/assets/products/top-4.jpg';
import saree1 from '@/assets/products/saree-1.jpg';
import saree2 from '@/assets/products/saree-2.jpg';
import saree3 from '@/assets/products/saree-3.jpg';
import saree4 from '@/assets/products/saree-4.jpg';
import gown1 from '@/assets/products/gown-1.jpg';
import gown2 from '@/assets/products/gown-2.jpg';
import gown3 from '@/assets/products/gown-3.jpg';
import gown4 from '@/assets/products/gown-4.jpg';
import jimmiki1 from '@/assets/products/jimmiki-1.jpg';
import chain1 from '@/assets/products/chain-1.jpg';
import nosepin1 from '@/assets/products/nosepin-1.jpg';
import earpiece1 from '@/assets/products/earpiece-1.jpg';

export type Category = 'Tops' | 'Sarees' | 'Premium Imitation Jewellery' | string;

export type Subcategory = string;

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: Category;
  subcategory?: Subcategory;
  image: string;
  images: string[];
  description: string;
  qualityNote: string;
  sizes: string[];
  colors: string[];
  badge?: 'New Collection' | 'Limited Stock';
}

export const products: Product[] = [
  // Tops
  {
    id: 'top-1',
    name: 'Rose Ember Kurti Top',
    subtitle: 'Handcrafted Embroidered Kurti',
    price: 35,
    category: 'Tops',
    image: top1,
    images: [top1],
    description: 'A stunning rose pink kurti top with intricate embroidery inspired by Eelam textile traditions. Crafted from premium cotton blend fabric, this piece blends traditional artistry with modern elegance.',
    qualityNote: 'Premium cotton blend with hand-finished embroidery details.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rose Pink', 'Dusty Mauve'],
    badge: 'New Collection',
  },
  {
    id: 'top-2',
    name: 'Lotus Grace Tunic',
    subtitle: 'Gold Embroidered Silk Tunic',
    price: 45,
    category: 'Tops',
    image: top2,
    images: [top2],
    description: 'An ivory tunic adorned with rich gold embroidery, perfect for festive occasions and elegant gatherings. The luxurious silk blend fabric drapes beautifully.',
    qualityNote: 'Silk blend with gold thread embroidery, handcrafted finish.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ivory Gold', 'Champagne'],
    badge: 'Limited Stock',
  },
  {
    id: 'top-3',
    name: 'Sandal Bloom Top',
    subtitle: 'Floral Print Cotton Top',
    price: 28,
    category: 'Tops',
    image: top3,
    images: [top3],
    description: 'A breezy sandal-toned top featuring delicate floral prints inspired by Sri Lankan botanical gardens. Perfect for casual elegance.',
    qualityNote: 'Breathable cotton with eco-friendly floral prints.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Sandal', 'Soft Peach'],
  },
  {
    id: 'top-4',
    name: 'Ivory Jaffna Top',
    subtitle: 'Minimalist Embroidered Top',
    price: 32,
    category: 'Tops',
    image: top4,
    images: [top4],
    description: 'A pristine ivory top with subtle gold embroidery inspired by Jaffna textile traditions. Clean silhouette with elegant detailing.',
    qualityNote: 'Premium cotton with fine embroidery, pre-washed fabric.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Off White'],
    badge: 'New Collection',
  },
  // Sarees
  {
    id: 'saree-1',
    name: 'Ruby Heritage Saree',
    subtitle: 'Traditional Silk Saree with Gold Border',
    price: 85,
    category: 'Sarees',
    image: saree1,
    images: [saree1],
    description: 'A magnificent ruby red silk saree with a lustrous gold zari border. This heritage piece celebrates the finest weaving traditions of Eelam artisans.',
    qualityNote: 'Pure silk with real zari border, sourced from traditional weavers.',
    sizes: ['Free Size'],
    colors: ['Ruby Red'],
    badge: 'Limited Stock',
  },
  {
    id: 'saree-2',
    name: 'Golden Veena Saree',
    subtitle: 'Kanchipuram-Style Golden Silk',
    price: 95,
    category: 'Sarees',
    image: saree2,
    images: [saree2],
    description: 'A radiant golden yellow silk saree inspired by the rich Kanchipuram weaving tradition. The intricate motifs tell stories of South Asian artistic heritage.',
    qualityNote: 'Handwoven silk with traditional motifs, premium quality.',
    sizes: ['Free Size'],
    colors: ['Golden Yellow'],
    badge: 'New Collection',
  },
  {
    id: 'saree-3',
    name: 'Midnight Silk Saree',
    subtitle: 'Navy Blue Silk with Silver Zari',
    price: 78,
    category: 'Sarees',
    image: saree3,
    images: [saree3],
    description: 'A dramatic midnight blue silk saree adorned with silver zari work. Perfect for evening events and special celebrations.',
    qualityNote: 'Premium silk with silver zari, handcrafted finish.',
    sizes: ['Free Size'],
    colors: ['Midnight Blue'],
  },
  {
    id: 'saree-4',
    name: 'Pearl Temple Saree',
    subtitle: 'Classic Cream & Gold Temple Border',
    price: 72,
    category: 'Sarees',
    image: saree4,
    images: [saree4],
    description: 'A timeless pearl white saree with a classic gold temple border design. Embodies purity and elegance for traditional ceremonies.',
    qualityNote: 'Pure silk with traditional temple border weaving.',
    sizes: ['Free Size'],
    colors: ['Pearl White'],
    badge: 'Limited Stock',
  },
  // Gowns
  {
    id: 'gown-1',
    name: 'Lavender Festive Gown',
    subtitle: 'Floor-Length Anarkali Gown',
    price: 120,
    category: 'Gowns',
    image: gown1,
    images: [gown1],
    description: 'A breathtaking lavender floor-length anarkali gown with delicate lace detailing. Designed for festive celebrations and grand occasions.',
    qualityNote: 'Premium georgette with lace overlay, fully lined.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Lavender', 'Lilac'],
    badge: 'New Collection',
  },
  {
    id: 'gown-2',
    name: 'Emerald Evening Gown',
    subtitle: 'Embroidered Green Anarkali',
    price: 135,
    category: 'Gowns',
    image: gown2,
    images: [gown2],
    description: 'A stunning emerald green gown with rich gold embroidery that captures the essence of South Asian royal fashion. A showstopper for any occasion.',
    qualityNote: 'Heavy embroidery on premium fabric, fully handcrafted.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Emerald Green'],
    badge: 'Limited Stock',
  },
  {
    id: 'gown-3',
    name: 'Blush Royal Gown',
    subtitle: 'Embellished Pink Anarkali Gown',
    price: 145,
    category: 'Gowns',
    image: gown3,
    images: [gown3],
    description: 'A romantic blush pink gown with exquisite embellishments and a flowing silhouette. Perfect for weddings and engagement celebrations.',
    qualityNote: 'Net overlay with stone embellishments, premium inner lining.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush Pink', 'Peach'],
  },
  {
    id: 'gown-4',
    name: 'Maroon Aura Gown',
    subtitle: 'Royal Maroon & Gold Anarkali',
    price: 155,
    category: 'Gowns',
    image: gown4,
    images: [gown4],
    description: 'A majestic maroon gown with elaborate gold embroidery that exudes royal elegance. The dramatic silhouette makes it perfect for grand celebrations.',
    qualityNote: 'Premium velvet with gold zardozi embroidery, fully lined.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Maroon'],
    badge: 'New Collection',
  },
  // Premium Imitation Jewellery
  {
    id: 'jewel-1',
    name: 'Temple Jimmiki Earrings',
    subtitle: 'Traditional Gold-Finish Jimmikis',
    price: 18,
    category: 'Premium Imitation Jewellery',
    subcategory: 'Jimmikis',
    image: jimmiki1,
    images: [jimmiki1],
    description: 'Exquisite temple-style jimmiki earrings with intricate filigree work and dangling bell details. A timeless South Indian design crafted in premium gold-finish alloy.',
    qualityNote: 'High-grade alloy with matte gold plating, hypoallergenic posts.',
    sizes: ['Free Size'],
    colors: ['Gold'],
    badge: 'New Collection',
  },
  {
    id: 'jewel-2',
    name: 'Heritage Temple Chain',
    subtitle: 'Gold-Plated Pendant Necklace',
    price: 28,
    category: 'Premium Imitation Jewellery',
    subcategory: 'Chains',
    image: chain1,
    images: [chain1],
    description: 'A stunning gold-plated chain necklace featuring a traditional crescent pendant with fine granulation details. Perfect for festive and bridal styling.',
    qualityNote: 'Premium brass with 22K gold micro-plating, tarnish-resistant.',
    sizes: ['Free Size'],
    colors: ['Gold'],
    badge: 'Limited Stock',
  },
  {
    id: 'jewel-3',
    name: 'Classic Stone Nose Pin',
    subtitle: 'Delicate Gold-Finish Stud',
    price: 8,
    category: 'Premium Imitation Jewellery',
    subcategory: 'Nose Pins',
    image: nosepin1,
    images: [nosepin1],
    description: 'A dainty nose pin with a sparkling CZ stone set in a gold-finish bezel. Minimalist yet elegant — perfect for everyday or occasion wear.',
    qualityNote: 'Surgical steel post with gold plating, CZ stone setting.',
    sizes: ['Free Size'],
    colors: ['Gold'],
  },
  {
    id: 'jewel-4',
    name: 'Royal Ear Piece Set',
    subtitle: 'Ornate Gold-Finish Ear Cuffs',
    price: 22,
    category: 'Premium Imitation Jewellery',
    subcategory: 'Ear Pieces',
    image: earpiece1,
    images: [earpiece1],
    description: 'A statement set of ornate ear pieces featuring ruby-toned stones and pearl-finish beading. Inspired by South Indian bridal jewellery traditions.',
    qualityNote: 'Premium alloy with antique gold finish, stone and pearl detailing.',
    sizes: ['Free Size'],
    colors: ['Gold', 'Ruby Gold'],
    badge: 'New Collection',
  },
];
