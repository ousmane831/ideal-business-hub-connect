
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Building2, Truck, Scale, HelpCircle } from 'lucide-react';

const Documentation = () => {
  const resources = [
    {
      id: 1,
      title: 'Chambres de Commerce',
      icon: Building2,
      description: 'Informations et services des chambres de commerce régionales',
      links: [
        { name: 'Chambre de Commerce de Dakar', url: '#' },
        { name: 'Chambre de Commerce d\'Abidjan', url: '#' },
        { name: 'Chambre de Commerce de Bamako', url: '#' },
      ]
    },
    {
      id: 2,
      title: 'APIX - Agence de promotion des investissements',
      icon: FileText,
      description: 'Services et procédures pour la promotion des investissements au Sénégal',
      links: [
        { name: 'Création d\'entreprise', url: '#' },
        { name: 'Guichet unique', url: '#' },
        { name: 'Zones franches', url: '#' },
      ]
    },
    {
      id: 3,
      title: 'Services Douaniers',
      icon: Truck,
      description: 'Procédures douanières et réglementations d\'importation/exportation',
      links: [
        { name: 'Tarifs douaniers CEDEAO', url: '#' },
        { name: 'Procédures de dédouanement', url: '#' },
        { name: 'Régimes douaniers spéciaux', url: '#' },
      ]
    },
    {
      id: 4,
      title: 'Transitaires et Logistique',
      icon: Truck,
      description: 'Annuaire des transitaires agréés et services logistiques',
      links: [
        { name: 'Liste des transitaires agréés', url: '#' },
        { name: 'Tarifs de référence', url: '#' },
        { name: 'Assurances transport', url: '#' },
      ]
    }
  ];

  const faqs = [
    {
      question: 'Comment créer une entreprise au Sénégal ?',
      answer: 'La création d\'entreprise au Sénégal se fait principalement via l\'APIX (Agence de Promotion des Investissements et des Grands Travaux). Vous devez suivre les étapes du guichet unique...'
    },
    {
      question: 'Quels sont les documents nécessaires pour importer ?',
      answer: 'Pour importer des marchandises, vous avez besoin d\'une facture pro forma, d\'un certificat d\'origine, d\'une licence d\'importation si requise...'
    },
    {
      question: 'Comment obtenir un agrément de transitaire ?',
      answer: 'L\'agrément de transitaire s\'obtient auprès de la Direction Générale des Douanes après constitution d\'un dossier comprenant...'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Documentation</h1>
            <p className="text-lg text-gray-600">
              Ressources officielles et liens utiles pour vos démarches administratives et commerciales
            </p>
          </div>

          {/* Resources section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ressources Officielles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => {
                const IconComponent = resource.icon;
                return (
                  <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    
                    <div className="space-y-2">
                      {resource.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="flex items-center text-orange-600 hover:text-orange-700 text-sm transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Downloadable forms section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulaires Téléchargeables</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Demande de création d\'entreprise',
                  'Déclaration d\'importation',
                  'Demande d\'agrément transitaire',
                  'Formulaire de domiciliation',
                  'Déclaration en douane',
                  'Demande de licence d\'exportation'
                ].map((form, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-4 text-left"
                  >
                    <FileText className="h-5 w-5 mr-3 text-orange-600" />
                    <span className="text-sm">{form}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ section */}
          <div>
            <div className="flex items-center mb-6">
              <HelpCircle className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Questions Fréquentes</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
