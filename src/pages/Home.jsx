import React from 'react';
import Hero from '../components/Hero';
import BrandIntro from '../components/BrandIntro';
import ProductGrid from '../components/ProductGrid';
import FeatureSection from '../components/FeatureSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <>
      {/* Các section sẽ nằm theo thứ tự từ trên xuống dưới */}
      <Hero />
      <BrandIntro />
      <ProductGrid />
      <FeatureSection />
      <ContactSection />
    </>
  );
}