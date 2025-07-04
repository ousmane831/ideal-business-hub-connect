
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ModernHeroSection from '@/components/home/ModernHeroSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ModernHeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
