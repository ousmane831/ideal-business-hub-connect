
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Building2, Truck, Scale, HelpCircle } from 'lucide-react';


import {useEffect, useState} from 'react';
import {getDocumentations} from '@/api';

const iconMap = {
  Commerciale: Building2,
  Formation: FileText,
  Transport: Truck,
  Justice: Scale,
  Aide: HelpCircle,
};


const Documentation = () => {

  const [selectedCategory, setSelectedCategory] = useState('all');
  
        const categories = [
            { id: 'all', name: 'Toutes les documentations' },
            { id: 'commerciale', name: "Commerciale" },
            { id: 'juridique', name: 'Juridique' }, 
            { id: 'technique', name: 'Technique' },
            { id: 'autre', name: 'Autre' }, 
      ];


    const [resources, setDocumentations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  
    useEffect(() => {
      const fetchDocumentations = async () => {
        try {
          const response = await getDocumentations();
          console.log(response.data);
          setDocumentations(response.data);
        } catch (err) {
          setError('Impossible de charger les documentations.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
    fetchDocumentations();
  }, []);


  const filteredRessources = selectedCategory === 'all'
  ? resources
  : resources.filter(resources => resources.categorie === selectedCategory);

if (loading) {
  return (
    <div className="text-center mt-10 text-gray-500">Chargement des documentations...</div>
  );
}

if (error) {
  return (
    <div className="text-center mt-10 text-red-500">{error}</div>
  );
}



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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
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

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((categorie) => (
              <button
                key={categorie.id}
                onClick={() => setSelectedCategory(categorie.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === categorie.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary/10'
                }`}
              >
                {categorie.name}
              </button>
            ))}
          </div>


          {/* Resources section */}
         
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ressources Officielles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRessources.map((resource) => {
                const IconComponent = iconMap[resource.categorie] || FileText;
                return (
                  <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary relative">
                  
                  <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {resource.categorie}
                  </span>

                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{resource.titre}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{resource.contenu}</p>

                  {resource.lien && (
                    <a
                      href={resource.lien}
                      className="flex items-center text-primary hover:text-primary/80 text-sm transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {resource.lien}
                    </a>
                  )}
                </div>

                );
              })}
            </div>
          </div>

          {/* FAQ section */}
          <div>
            <div className="flex items-center mb-6">
              <HelpCircle className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Questions Fréquentes</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
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
