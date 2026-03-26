import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeaturedCollections from '@/components/FeaturedCollections';
import ShopSection from '@/components/ShopSection';
import AboutSection from '@/components/AboutSection';
import TestimonialSection from '@/components/TestimonialSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedCollections />
      <CategorySection onCategoryClick={handleCategoryClick} />
      <ShopSection initialCategory={selectedCategory} />
      <AboutSection />
      <TestimonialSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
      <CartSidebar />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
