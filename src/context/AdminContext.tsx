import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// Force HMR boundary
import { products as defaultProducts, Product } from '@/data/products';

// Extended product type for admin
export interface AdminProduct extends Omit<Product, 'badge'> {
  collection?: string;
  oldPrice?: number;
  stockQuantity?: number;
  stockLabel?: string;
  featured: boolean;
  isNewCollection: boolean;
  isLimitedStock: boolean;
  visible: boolean;
  badge?: 'New Collection' | 'Limited Stock';
}

export interface AdminSubcategory {
  id: string;
  name: string;
  order: number;
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  visible: boolean;
  subcategories: AdminSubcategory[];
}

export interface AdminCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  productIds: string[];
  featured: boolean;
  visible: boolean;
}

export interface ComboOffer {
  id: string;
  title: string;
  description: string;
  image: string;
  productIds: string[];
  originalPrice: number;
  comboPrice: number;
  badge: string;
  featured: boolean;
  visible: boolean;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  order: number;
  visible: boolean;
}

export interface HeroSettings {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
  slides: HeroSlide[];
}

export interface WhatsAppSettings {
  phoneNumber: string;
  messageTemplate: string;
  showOnProductCards: boolean;
  showOnProductDetail: boolean;
  showOnCart: boolean;
  showFloatingButton: boolean;
  deliveryNote: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  avatar: string;
  visible: boolean;
}

export interface SiteContent {
  aboutTitle: string;
  aboutText: string;
  tagline: string;
  subtext: string;
  deliveryNote: string;
  pickupNote: string;
  instagramLink: string;
  footerText: string;
  contactLocation: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  products: AdminProduct[];
  addProduct: (product: AdminProduct) => void;
  updateProduct: (id: string, product: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;

  categories: AdminCategory[];
  addCategory: (category: AdminCategory) => void;
  updateCategory: (id: string, category: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;

  collections: AdminCollection[];
  addCollection: (collection: AdminCollection) => void;
  updateCollection: (id: string, collection: Partial<AdminCollection>) => void;
  deleteCollection: (id: string) => void;

  comboOffers: ComboOffer[];
  addComboOffer: (combo: ComboOffer) => void;
  updateComboOffer: (id: string, combo: Partial<ComboOffer>) => void;
  deleteComboOffer: (id: string) => void;

  heroSettings: HeroSettings;
  updateHeroSettings: (settings: Partial<HeroSettings>) => void;

  whatsAppSettings: WhatsAppSettings;
  updateWhatsAppSettings: (settings: Partial<WhatsAppSettings>) => void;

  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
}

const ADMIN_PASSWORD = 'thozhi2026';

const defaultCategories: AdminCategory[] = [
  { id: 'cat-tops', name: 'Tops', description: 'Elegant kurti tops and tunics', image: '', order: 1, visible: true, subcategories: [{ id: 'sub-casual', name: 'Casual Wear', order: 1 }, { id: 'sub-party', name: 'Party Wear', order: 2 }, { id: 'sub-office', name: 'Office Wear', order: 3 }] },
  { id: 'cat-sarees', name: 'Sarees', description: 'Traditional silk and designer sarees', image: '', order: 2, visible: true, subcategories: [{ id: 'sub-wedding', name: 'Wedding Collection', order: 1 }, { id: 'sub-party-saree', name: 'Party Wear', order: 2 }, { id: 'sub-casual-saree', name: 'Casual Wear', order: 3 }, { id: 'sub-silk', name: 'Pure Silk', order: 4 }] },
  { id: 'cat-jewellery', name: 'Premium Imitation Jewellery', description: 'Elegant ethnic jewellery pieces', image: '', order: 3, visible: true, subcategories: [{ id: 'sub-jimmikis', name: 'Jimmikis', order: 1 }, { id: 'sub-chains', name: 'Chains', order: 2 }, { id: 'sub-nose-pins', name: 'Nose Pins', order: 3 }, { id: 'sub-ear-pieces', name: 'Ear Pieces', order: 4 }] },
];

const defaultCollections: AdminCollection[] = [
  { id: 'col-new', title: 'New Arrivals', subtitle: 'Fresh from our latest sourcing', description: 'Discover our newest additions', bannerImage: '', productIds: [], featured: true, visible: true },
  { id: 'col-festive', title: 'Festive Edit', subtitle: 'For celebrations', description: 'Curated for festive occasions', bannerImage: '', productIds: [], featured: true, visible: true },
];

const defaultHero: HeroSettings = {
  backgroundImage: '',
  title: 'thozhi',
  subtitle: 'Premium South Asian Ethnic Wear for Women',
  ctaText: 'Shop Now',
  secondaryCtaText: 'Order via WhatsApp',
  slides: [],
};

const defaultWhatsApp: WhatsAppSettings = {
  phoneNumber: '447000000000',
  messageTemplate: 'Hello Thozhi, I would like to place an order.',
  showOnProductCards: true,
  showOnProductDetail: true,
  showOnCart: true,
  showFloatingButton: true,
  deliveryNote: 'London delivery & Sri Lanka shipping available',
};

const defaultTestimonials: Testimonial[] = [
  { id: 'test-1', name: 'Priya M.', quote: 'Absolutely stunning collection! The quality is premium and the fit is perfect.', avatar: '', visible: true },
  { id: 'test-2', name: 'Anita K.', quote: 'Found my dream saree for the wedding. Thozhi has the best curated pieces.', avatar: '', visible: true },
  { id: 'test-3', name: 'Meera S.', quote: 'Love the personal touch with WhatsApp ordering. Makes shopping so easy!', avatar: '', visible: true },
];

const defaultSiteContent: SiteContent = {
  aboutTitle: 'Our Story',
  aboutText: 'Thozhy is a women\'s ethnic fashion brand with Eelam roots, growing across Sri Lanka and London. We offer a carefully curated selection of ethnic wear — combining our own Thozhy designs with handpicked premium pieces sourced from trusted Eelam artisans.\n\nOur style reflects elegance, simplicity, and cultural beauty — blending modern aesthetics with traditional craftsmanship rooted in our heritage. Every piece is chosen with intention, focusing on quality, detail, and a refined feminine appeal.\n\nThozhy represents more than fashion — it is a journey of heritage, identity, and timeless style, brought together with a minimalist yet premium touch.',
  tagline: 'Premium Ethnic Wear — Rooted in Eelam',
  subtext: 'Carefully curated ethnic wear and jewellery from Sri Lanka',
  deliveryNote: 'Free delivery across London for orders over £100',
  pickupNote: 'Pickup available in Central London & Sri Lanka',
  instagramLink: 'https://instagram.com/thozhy.london',
  footerText: '© 2026 Thozhy. All rights reserved.',
  contactLocation: 'London, UK & Sri Lanka',
};

const defaultComboOffers: ComboOffer[] = [];

function convertToAdmin(p: Product): AdminProduct {
  return {
    ...p,
    featured: !!p.badge,
    isNewCollection: p.badge === 'New Collection',
    isLimitedStock: p.badge === 'Limited Stock',
    visible: true,
    collection: '',
    oldPrice: undefined,
    stockQuantity: undefined,
    stockLabel: p.badge === 'Limited Stock' ? 'Limited Stock' : undefined,
  };
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    // Force-migrate stale site content to new defaults
    if (key === 'admin_site_content' && typeof parsed === 'object' && parsed !== null) {
      const sc = parsed as Record<string, unknown>;
      const aboutText = sc.aboutText as string | undefined;
      if (!aboutText || !aboutText.includes('Eelam roots')) {
        return { ...fallback, ...sc, aboutText: (fallback as Record<string, unknown>).aboutText } as T;
      }
    }
    // Force-migrate products to include jewellery if missing
    if (key === 'admin_products' && Array.isArray(parsed)) {
      const hasJewellery = parsed.some((p: { category?: string }) => p.category === 'Premium Imitation Jewellery');
      if (!hasJewellery) {
        const jewelleryDefaults = (fallback as unknown[]).filter((p: any) => p.category === 'Premium Imitation Jewellery');
        return [...parsed, ...jewelleryDefaults] as unknown as T;
      }
    }
    // Force-migrate categories to include jewellery if missing, and remove Gowns
    if (key === 'admin_categories' && Array.isArray(parsed)) {
      let cats = parsed.filter((c: { name?: string }) => c.name !== 'Gowns');
      const hasJewellery = cats.some((c: { name?: string }) => c.name === 'Premium Imitation Jewellery');
      if (!hasJewellery) {
        const jewelleryCategory = (fallback as unknown[]).find((c: any) => c.name === 'Premium Imitation Jewellery');
        if (jewelleryCategory) cats = [...cats, jewelleryCategory];
      }
      if (cats.length !== parsed.length) return cats as unknown as T;
      if (!hasJewellery) return cats as unknown as T;
    }
    return parsed;
  } catch { return fallback; }
}

const defaultAdminContext: AdminContextType = {
  isAuthenticated: false,
  login: () => false,
  logout: () => undefined,
  products: defaultProducts.map(convertToAdmin),
  addProduct: () => undefined,
  updateProduct: () => undefined,
  deleteProduct: () => undefined,
  categories: defaultCategories,
  addCategory: () => undefined,
  updateCategory: () => undefined,
  deleteCategory: () => undefined,
  collections: defaultCollections,
  addCollection: () => undefined,
  updateCollection: () => undefined,
  deleteCollection: () => undefined,
  comboOffers: defaultComboOffers,
  addComboOffer: () => undefined,
  updateComboOffer: () => undefined,
  deleteComboOffer: () => undefined,
  heroSettings: defaultHero,
  updateHeroSettings: () => undefined,
  whatsAppSettings: defaultWhatsApp,
  updateWhatsAppSettings: () => undefined,
  testimonials: defaultTestimonials,
  addTestimonial: () => undefined,
  updateTestimonial: () => undefined,
  deleteTestimonial: () => undefined,
  siteContent: defaultSiteContent,
  updateSiteContent: () => undefined,
};

const AdminContext = createContext<AdminContextType>(defaultAdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadFromStorage('admin_auth', false));
  const [products, setProducts] = useState<AdminProduct[]>(() => loadFromStorage('admin_products', defaultProducts.map(convertToAdmin)));
  const [categories, setCategories] = useState<AdminCategory[]>(() => loadFromStorage('admin_categories', defaultCategories));
  const [collections, setCollections] = useState<AdminCollection[]>(() => loadFromStorage('admin_collections', defaultCollections));
  const [comboOffers, setComboOffers] = useState<ComboOffer[]>(() => loadFromStorage('admin_combos', defaultComboOffers));
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => loadFromStorage('admin_hero', defaultHero));
  const [whatsAppSettings, setWhatsAppSettings] = useState<WhatsAppSettings>(() => loadFromStorage('admin_whatsapp', defaultWhatsApp));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadFromStorage('admin_testimonials', defaultTestimonials));
  const [siteContent, setSiteContent] = useState<SiteContent>(() => loadFromStorage('admin_site_content', defaultSiteContent));

  useEffect(() => { localStorage.setItem('admin_auth', JSON.stringify(isAuthenticated)); }, [isAuthenticated]);
  useEffect(() => { localStorage.setItem('admin_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('admin_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('admin_collections', JSON.stringify(collections)); }, [collections]);
  useEffect(() => { localStorage.setItem('admin_combos', JSON.stringify(comboOffers)); }, [comboOffers]);
  useEffect(() => { localStorage.setItem('admin_hero', JSON.stringify(heroSettings)); }, [heroSettings]);
  useEffect(() => { localStorage.setItem('admin_whatsapp', JSON.stringify(whatsAppSettings)); }, [whatsAppSettings]);
  useEffect(() => { localStorage.setItem('admin_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('admin_site_content', JSON.stringify(siteContent)); }, [siteContent]);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) { setIsAuthenticated(true); return true; }
    return false;
  }, []);
  const logout = useCallback(() => setIsAuthenticated(false), []);

  const addProduct = useCallback((p: AdminProduct) => setProducts(prev => [...prev, p]), []);
  const updateProduct = useCallback((id: string, data: Partial<AdminProduct>) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p)), []);
  const deleteProduct = useCallback((id: string) => setProducts(prev => prev.filter(p => p.id !== id)), []);

  const addCategory = useCallback((c: AdminCategory) => setCategories(prev => [...prev, c]), []);
  const updateCategory = useCallback((id: string, data: Partial<AdminCategory>) => setCategories(prev => prev.map(c => c.id === id ? { ...c, ...data } : c)), []);
  const deleteCategory = useCallback((id: string) => setCategories(prev => prev.filter(c => c.id !== id)), []);

  const addCollection = useCallback((c: AdminCollection) => setCollections(prev => [...prev, c]), []);
  const updateCollection = useCallback((id: string, data: Partial<AdminCollection>) => setCollections(prev => prev.map(c => c.id === id ? { ...c, ...data } : c)), []);
  const deleteCollection = useCallback((id: string) => setCollections(prev => prev.filter(c => c.id !== id)), []);

  const addComboOffer = useCallback((c: ComboOffer) => setComboOffers(prev => [...prev, c]), []);
  const updateComboOffer = useCallback((id: string, data: Partial<ComboOffer>) => setComboOffers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c)), []);
  const deleteComboOffer = useCallback((id: string) => setComboOffers(prev => prev.filter(c => c.id !== id)), []);

  const updateHeroSettings = useCallback((data: Partial<HeroSettings>) => setHeroSettings(prev => ({ ...prev, ...data })), []);
  const updateWhatsAppSettings = useCallback((data: Partial<WhatsAppSettings>) => setWhatsAppSettings(prev => ({ ...prev, ...data })), []);

  const addTestimonial = useCallback((t: Testimonial) => setTestimonials(prev => [...prev, t]), []);
  const updateTestimonial = useCallback((id: string, data: Partial<Testimonial>) => setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...data } : t)), []);
  const deleteTestimonial = useCallback((id: string) => setTestimonials(prev => prev.filter(t => t.id !== id)), []);

  const updateSiteContent = useCallback((data: Partial<SiteContent>) => setSiteContent(prev => ({ ...prev, ...data })), []);

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      products, addProduct, updateProduct, deleteProduct,
      categories, addCategory, updateCategory, deleteCategory,
      collections, addCollection, updateCollection, deleteCollection,
      comboOffers, addComboOffer, updateComboOffer, deleteComboOffer,
      heroSettings, updateHeroSettings,
      whatsAppSettings, updateWhatsAppSettings,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      siteContent, updateSiteContent,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
