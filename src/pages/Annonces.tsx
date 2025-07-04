
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PublishAnnonceForm from '@/components/annonces/PublishAnnonceForm';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Annonces = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'Toutes les annonces' },
    { id: 'affaires', name: 'Opportunités d\'affaires' },
    { id: 'offres', name: 'Offres de services' },
    { id: 'besoins', name: 'Recherche de partenaires' },
  ];

  const initialAnnonces = [
    {
      id: 1,
      title: 'Recherche investisseur pour projet agricole',
      category: 'affaires',
      author: 'Mamadou Diallo',
      location: 'Dakar, Sénégal',
      date: '2024-01-15',
      description: 'Projet d\'agriculture moderne nécessitant un investissement de 50M FCFA...',
      tags: ['Agriculture', 'Investissement', 'Dakar']
    },
    {
      id: 2,
      title: 'Services de transit et dédouanement',
      category: 'offres',
      author: 'SARL TransAfrica',
      location: 'Abidjan, Côte d\'Ivoire',
      date: '2024-01-14',
      description: 'Société spécialisée dans le transit et dédouanement pour toute l\'Afrique de l\'Ouest...',
      tags: ['Transit', 'Douane', 'Logistique']
    },
    {
      id: 3,
      title: 'Partenariat commercial textile',
      category: 'besoins',
      author: 'Fatou Sow',
      location: 'Bamako, Mali',
      date: '2024-01-13',
      description: 'Recherche partenaire pour développement gamme textile africaine...',
      tags: ['Textile', 'Partenariat', 'Mode']
    }
  ];

  const [annonces, setAnnonces] = useState(initialAnnonces);

  const handleAnnoncePublished = (newAnnonce: any) => {
    setAnnonces(prev => [newAnnonce, ...prev]);
  };

  const filteredAnnonces = selectedCategory === 'all' 
    ? annonces 
    : annonces.filter(annonce => annonce.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Annonces</h1>
            <p className="text-lg text-gray-600">
              Découvrez les dernières opportunités d'affaires et publiez vos propres annonces
            </p>
          </div>

          {/* Actions bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher une annonce..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <PublishAnnonceForm onAnnoncePublished={handleAnnoncePublished} />
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Annonces list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnonces.map((annonce) => (
              <div key={annonce.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    {categories.find(c => c.id === annonce.category)?.name}
                  </span>
                  <span className="text-xs text-gray-500">{annonce.date}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{annonce.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{annonce.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{annonce.author}</p>
                    <p className="text-xs text-gray-500">{annonce.location}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {annonce.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700" 
                  size="sm"
                  onClick={() => navigate(`/annonces/${annonce.id}`)}
                >
                  Voir les détails
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Annonces;
