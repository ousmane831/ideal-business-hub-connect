
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-orange-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Prêt à développer votre réseau business ?
        </h2>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          Rejoignez dès maintenant la communauté IDEAL et accédez à toutes les opportunités d'affaires
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => navigate('/profils')}
          >
            Créer mon compte
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
            onClick={() => navigate('/documentation')}
          >
            Découvrir les fonctionnalités
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
