
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-orange-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-orange-600">IDEAL</span> Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La plateforme qui facilite les opportunités d'affaires, 
            la mise en relation d'acteurs économiques et l'accès aux services administratifs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 px-8 py-3"
              onClick={() => navigate('/annonces')}
            >
              Commencer maintenant
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 border-orange-600 text-orange-600 hover:bg-orange-50"
              onClick={() => navigate('/profils')}
            >
              Découvrir la plateforme
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="text-gray-600">Entrepreneurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">1200+</div>
              <div className="text-gray-600">Annonces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">300+</div>
              <div className="text-gray-600">Opportunités</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Experts</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="flex justify-center mt-12">
        <ArrowDown className="h-6 w-6 text-orange-600 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
