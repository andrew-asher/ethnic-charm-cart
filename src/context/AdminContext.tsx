import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

export interface AdminCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  visible: boolean;
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

export interface HeroSettings {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
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
  { id: 'cat-tops', name: 'Tops', description: 'Elegant kurti tops and tunics', image: '', order: 1, visible: true },
  { id: 'cat-sarees', name: 'Sarees', description: 'Traditional silk and designer sarees', image: '', order: 2, visible: true },
  { id: 'cat-gowns', name: 'Gowns', description: 'Floor-length anarkali gowns', image: '', order: 3, visible: true },
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
};

const defaultWhatsApp: WhatsAppSettings = {
  phoneNumber: '447000000000',
  messageTemplate: 'Hello Thozhi, I would like to place an order.',
  showOnProductCards: true,
  showOnProductDetail: true,
  showOnCart: true,
  showFloatingButton: true,
  deliveryNote: 'London delivery & pickup available',
};

const defaultTestimonials: Testimonial[] = [
  { id: 'test-1', name: 'Priya M.', quote: 'Absolutely stunning collection! The quality is premium and the fit is perfect.', avatar: '', visible: true },
  { id: 'test-2', name: 'Anita K.', quote: 'Found my dream saree for the wedding. Thozhi has the best curated pieces.', avatar: '', visible: true },
  { id: 'test-3', name: 'Meera S.', quote: 'Love the personal touch with WhatsApp ordering. Makes shopping so easy!', avatar: '', visible: true },
];

const defaultSiteContent: SiteContent = {
  aboutTitle: 'Our Story',
  aboutText: 'Thozhi brings premium women\'s ethnic wear from Sri Lanka and India to London.',
  tagline: 'Premium South Asian Ethnic Wear for Women',
  subtext: 'Carefully selected tops, sarees, and gowns from Sri Lanka and India',
  deliveryNote: 'Free delivery across London for orders over £100',
  pickupNote: 'Pickup available in Central London',
  instagramLink: 'https://instagram.com/thozhi.london',
  footerText: '© 2026 Thozhi London. All rights reserved.',
  contactLocation: 'London, United Kingdom',
};

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
    return stored ? JSON.parse(stored) : fallback;
  } catch { return fallback; }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadFromStorage('admin_auth', false));
  const [products, setProducts] = useState<AdminProduct[]>(() => loadFromStorage('admin_products', defaultProducts.map(convertToAdmin)));
  const [categories, setCategories] = useState<AdminCategory[]>(() => loadFromStorage('admin_categories', defaultCategories));
  const [collections, setCollections] = useState<AdminCollection[]>(() => loadFromStorage('admin_collections', defaultCollections));
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => loadFromStorage('admin_hero', defaultHero));
  const [whatsAppSettings, setWhatsAppSettings] = useState<WhatsAppSettings>(() => loadFromStorage('admin_whatsapp', defaultWhatsApp));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadFromStorage('admin_testimonials', defaultTestimonials));
  const [siteContent, setSiteContent] = useState<SiteContent>(() => loadFromStorage('admin_site_content', defaultSiteContent));

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('admin_auth', JSON.stringify(isAuthenticated)); }, [isAuthenticated]);
  useEffect(() => { localStorage.setItem('admin_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('admin_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('admin_collections', JSON.stringify(collections)); }, [collections]);
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
      heroSettings, updateHeroSettings,
      whatsAppSettings, updateWhatsAppSettings,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      siteContent, updateSiteContent,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
