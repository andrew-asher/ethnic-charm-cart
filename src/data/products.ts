import top1 from '@/assets/products/top-1.jpg';
import top2 from '@/assets/products/top-2.jpg';
import top3 from '@/assets/products/top-3.jpg';
import top4 from '@/assets/products/top-4.jpg';
import top5 from '@/assets/products/top-5.jpg';
import top6 from '@/assets/products/top-6.jpg';
import gown1 from '@/assets/products/gown-1.jpg';
import gown2 from '@/assets/products/gown-2.jpg';
import gown3 from '@/assets/products/gown-3.jpg';
import gown4 from '@/assets/products/gown-4.jpg';
import gown5 from '@/assets/products/gown-5.jpg';
import gown6 from '@/assets/products/gown-6.jpg';
import saree1 from '@/assets/products/saree-1.jpg';
import saree2 from '@/assets/products/saree-2.jpg';
import saree3 from '@/assets/products/saree-3.jpg';
import saree4 from '@/assets/products/saree-4.jpg';
import saree5 from '@/assets/products/saree-5.jpg';
import saree6 from '@/assets/products/saree-6.jpg';
import jimmiki1 from '@/assets/products/jimmiki-1.jpg';
import chain1 from '@/assets/products/chain-1.jpg';
import nosepin1 from '@/assets/products/nosepin-1.jpg';
import earpiece1 from '@/assets/products/earpiece-1.jpg';

export type Category = 'Tops' | 'Gowns' | 'Sarees' | 'Premium Imitation Jewellery' | string;

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
  // Tops — Short Tops
  {
    id: 'top-1',
    name: 'Black Zari Short Top',
    subtitle: 'Embroidered Ethnic Short Top',
    price: 25,
    category: 'Tops',
    subcategory: 'Short Tops',
    image: top1,
    images: [top1],
    description: 'A chic black short top with delicate gold zari embroidery along the neckline. Perfect for pairing with skirts or palazzos.',
    qualityNote: 'Premium cotton blend with gold zari threadwork.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    badge: 'New Collection',
  },
  // Tops — Kurti (Short / Long)
  {
    id: 'top-2',
    name: 'Ivory Chikankari Kurti',
    subtitle: 'Everyday Ethnic Kurti',
    price: 38,
    category: 'Tops',
    subcategory: 'Kurti (Short / Long)',
    image: top2,
    images: [top2],
    description: 'A classic ivory kurti with fine chikankari hand-embroidery. Versatile enough for office wear or casual outings.',
    qualityNote: 'Pure cotton with traditional chikankari hand embroidery.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Off-White'],
    badge: 'Limited Stock',
  },
  {
    id: 'top-3',
    name: 'Navy Embroidered Kurti',
    subtitle: 'Short Kurti with Mirror Work',
    price: 32,
    category: 'Tops',
    subcategory: 'Kurti (Short / Long)',
    image: top3,
    images: [top3],
    description: 'A rich navy blue short kurti featuring delicate mirror work and silver thread embroidery.',
    qualityNote: 'Premium cotton with fine mirror work, pre-washed fabric.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Indigo'],
  },
  // Tops — Indo-Western Tops
  {
    id: 'top-4',
    name: 'Terracotta Fusion Top',
    subtitle: 'Indo-Western Peplum Style',
    price: 35,
    category: 'Tops',
    subcategory: 'Indo-Western Tops',
    image: top4,
    images: [top4],
    description: 'A stylish terracotta peplum top blending ethnic embroidery with a modern western silhouette. Great for brunches and parties.',
    qualityNote: 'Georgette blend with hand-finished embroidery details.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Terracotta', 'Rust'],
    badge: 'New Collection',
  },
  // Tops — Ethnic Crop Tops
  {
    id: 'top-5',
    name: 'Black & Gold Crop Top',
    subtitle: 'Embroidered Ethnic Crop Top',
    price: 28,
    category: 'Tops',
    subcategory: 'Ethnic Crop Tops',
    image: top5,
    images: [top5],
    description: 'A bold black crop top with heavy gold embroidery. Pair it with a high-waist skirt or lehenga for a stunning look.',
    qualityNote: 'Art silk with gold zardozi embroidery, fully lined.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black Gold', 'Black Silver'],
  },
  {
    id: 'top-6',
    name: 'Maroon Velvet Crop Top',
    subtitle: 'Festive Ethnic Crop Blouse',
    price: 30,
    category: 'Tops',
    subcategory: 'Ethnic Crop Tops',
    image: top6,
    images: [top6],
    description: 'A luxurious maroon velvet crop top with gold bead detailing. Ideal for weddings and festive celebrations.',
    qualityNote: 'Premium velvet with hand-applied bead and sequin work.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Maroon', 'Wine'],
    badge: 'Limited Stock',
  },
  // Gowns
  {
    id: 'gown-1',
    name: 'Maroon Maharani Gown',
    subtitle: 'Heavy Embroidered Floor-Length Gown',
    price: 120,
    category: 'Gowns',
    image: gown1,
    images: [gown1],
    description: 'A regal maroon floor-length gown with lavish gold embroidery. Perfect for weddings and grand celebrations.',
    qualityNote: 'Premium georgette with hand-embroidered gold zari work.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Deep Maroon'],
    badge: 'New Collection',
  },
  {
    id: 'gown-2',
    name: 'Royal Blue Dream Gown',
    subtitle: 'Silver Embroidered Ethnic Gown',
    price: 110,
    category: 'Gowns',
    image: gown2,
    images: [gown2],
    description: 'A stunning royal blue gown with intricate silver embroidery and flowing silhouette for a statement look.',
    qualityNote: 'Silk blend with silver thread embroidery, fully lined.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Royal Blue'],
    badge: 'Limited Stock',
  },
  {
    id: 'gown-3',
    name: 'Emerald Empress Gown',
    subtitle: 'Gold Embroidered Green Gown',
    price: 115,
    category: 'Gowns',
    image: gown3,
    images: [gown3],
    description: 'An enchanting emerald green gown with rich gold embroidery and bell sleeves for a regal appearance.',
    qualityNote: 'Premium net and georgette with gold zardozi embroidery.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Emerald Green'],
  },
  {
    id: 'gown-4',
    name: 'Blush Petal Gown',
    subtitle: 'Floral Embroidered Tiered Gown',
    price: 95,
    category: 'Gowns',
    image: gown4,
    images: [gown4],
    description: 'A dreamy blush pink gown with delicate floral embroidery and tiered skirt, ideal for engagement ceremonies.',
    qualityNote: 'Chiffon with embroidered floral motifs, fully lined.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush Pink'],
    badge: 'New Collection',
  },
  {
    id: 'gown-5',
    name: 'Midnight Gold Gown',
    subtitle: 'Black & Gold Embroidered Gown',
    price: 130,
    category: 'Gowns',
    image: gown5,
    images: [gown5],
    description: 'A dramatic black gown with opulent gold embroidery throughout. The sheer sleeves add a touch of modern glamour.',
    qualityNote: 'Premium net and velvet with gold zari and stone work.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black Gold'],
    badge: 'Limited Stock',
  },
  {
    id: 'gown-6',
    name: 'Purple Royale Gown',
    subtitle: 'Heavy Gold Embroidered Gown',
    price: 125,
    category: 'Gowns',
    image: gown6,
    images: [gown6],
    description: 'A majestic purple gown with heavy gold embroidery, designed for those who want to make an unforgettable entrance.',
    qualityNote: 'Silk georgette with hand-applied gold embroidery and stonework.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Royal Purple'],
  },
  // Sarees
  {
    id: 'saree-1',
    name: 'Ruby Heritage Saree',
    subtitle: 'Traditional Silk Saree with Gold Border',
    price: 85,
    category: 'Sarees',
    subcategory: 'Wedding Collection',
    image: saree1,
    images: [saree1],
    description: 'A magnificent ruby red silk saree with a lustrous gold zari border. This heritage piece celebrates the finest weaving traditions.',
    qualityNote: 'Pure silk with real zari border, sourced from traditional weavers.',
    sizes: ['Free Size'],
    colors: ['Ruby Red'],
    badge: 'Limited Stock',
  },
  {
    id: 'saree-2',
    name: 'Golden Veena Saree',
    subtitle: 'Golden Silk Saree',
    price: 95,
    category: 'Sarees',
    subcategory: 'Wedding Collection',
    image: saree2,
    images: [saree2],
    description: 'A radiant golden yellow silk saree with rich weaving. Perfect for festive celebrations and traditional ceremonies.',
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
    subcategory: 'Party Wear',
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
    subcategory: 'Wedding Collection',
    image: saree4,
    images: [saree4],
    description: 'A timeless pearl white saree with a classic gold temple border design. Embodies purity and elegance for traditional ceremonies.',
    qualityNote: 'Pure silk with traditional temple border weaving.',
    sizes: ['Free Size'],
    colors: ['Pearl White'],
    badge: 'Limited Stock',
  },
  {
    id: 'saree-5',
    name: 'Emerald Silk Saree',
    subtitle: 'Green Silk with Gold Border',
    price: 82,
    category: 'Sarees',
    subcategory: 'Casual Wear',
    image: saree5,
    images: [saree5],
    description: 'A vibrant green silk saree with a wide gold border and contrast red blouse. A festive classic from traditional weavers.',
    qualityNote: 'Pure silk with gold zari border, comes with matching blouse piece.',
    sizes: ['Free Size'],
    colors: ['Emerald Green'],
    badge: 'New Collection',
  },
  {
    id: 'saree-6',
    name: 'Magenta Bliss Saree',
    subtitle: 'Magenta Silk with Silver Border',
    price: 88,
    category: 'Sarees',
    subcategory: 'Party Wear',
    image: saree6,
    images: [saree6],
    description: 'A stunning magenta pink silk saree with elegant silver border work. Bold and vibrant for celebrations.',
    qualityNote: 'Premium silk with silver zari border, lightweight drape.',
    sizes: ['Free Size'],
    colors: ['Magenta Pink'],
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
    description: 'Exquisite temple-style jimmiki earrings with intricate filigree work and dangling bell details.',
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
    description: 'A stunning gold-plated chain necklace featuring a traditional temple pendant with fine granulation details.',
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
    description: 'A dainty nose pin with a sparkling CZ stone set in a gold-finish bezel. Minimalist yet elegant.',
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
    description: 'A statement set of ornate ear pieces featuring ruby-toned stones and pearl-finish beading.',
    qualityNote: 'Premium alloy with antique gold finish, stone and pearl detailing.',
    sizes: ['Free Size'],
    colors: ['Gold', 'Ruby Gold'],
    badge: 'New Collection',
  },
];
