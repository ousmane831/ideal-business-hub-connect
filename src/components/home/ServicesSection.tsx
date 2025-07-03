
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    'Montage de dossiers administratifs',
    'Accompagnement APIX',
    'Démarches chambre de commerce',
    'Conseils juridiques et fiscaux',
    'Support douanier',
    'Facilitation investissements'
  ];

  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Services de facilitation administrative
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Bénéficiez de l'accompagnement d'experts pour vos démarches administratives. 
              Nous simplifions vos procédures pour que vous puissiez vous concentrer sur votre business.
            </p>
            
            <div className="space-y-4 mb-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-red-600 hover:bg-red-700">
                Demander un devis
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                En savoir plus
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Moyens de paiement</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">Orange Money</span>
                <div className="w-12 h-8 bg-orange-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">Wave</span>
                <div className="w-12 h-8 bg-blue-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">Carte bancaire</span>
                <div className="w-12 h-8 bg-gray-400 rounded"></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Paiements sécurisés pour tous vos services administratifs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
