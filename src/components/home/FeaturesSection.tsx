
import React from 'react';
import { Users, FileText, Search, Calendar } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: 'Mise en relation',
      description: 'Connectez-vous avec des apporteurs d\'affaires, entrepreneurs et experts de votre secteur.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: FileText,
      title: 'Gestion d\'annonces',
      description: 'Publiez et consultez des annonces d\'opportunités d\'affaires avec documents joints.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Search,
      title: 'Recherche de profils',
      description: 'Trouvez rapidement les bons interlocuteurs par spécialité, secteur ou localisation.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Calendar,
      title: 'Événements business',
      description: 'Restez informé des salons, foires et événements business à venir.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités principales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les outils nécessaires pour développer votre réseau business et saisir les meilleures opportunités
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${feature.color}`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
