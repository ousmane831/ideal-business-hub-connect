
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PublishAnnonceForm from '@/components/annonces/PublishAnnonceForm';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { getAnnonces } from '@/api';


  
const Annonces = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'Toutes les annonces' },
    { id: 'opportunites_affaires', name: 'Opportunités d\'affaires' },
    { id: 'offres_services', name: 'Offres de services' },
    { id: 'recherche_partenaires', name: 'Recherche de partenaires' },
    { id: 'conseil_juridique', name: 'Conseil Juridique' },
    { id: 'autre', name: 'Autre' },
  ];

  
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await getAnnonces();
        setAnnonces(response.data);
      } catch (err) {
        setError('Impossible de charger les annonces.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  fetchAnnonces();
}, []);




  const handleAnnoncePublished = (newAnnonce: any) => {
    setAnnonces(prev => [newAnnonce, ...prev]);
  };

  const filteredAnnonces = selectedCategory === 'all' 
  ? annonces 
  : annonces.filter(annonce => annonce.categorie === selectedCategory);


if (loading) {
  return (
    <div className="text-center mt-10 text-gray-500">Chargement des annonces...</div>
  );
}

if (error) {
  return (
    <div className="text-center mt-10 text-red-500">{error}</div>
  );
}



  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <PublishAnnonceForm onAnnoncePublished={handleAnnoncePublished} />
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Categories */}
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

          {/* Annonces list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnonces.map((annonce) => (
              <div key={annonce.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-primary">
                <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {annonce.categorie}
                  </span>

                  <span className="text-xs text-gray-500">{annonce.date_publication}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{annonce.titre}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{annonce.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {annonce.auteur.replace(/^Apporteur:\s*/, '')}
                    </p>

                    <p className="text-xs text-gray-500">{annonce.lieu}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {(annonce.tags || []).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {tag}
                  </span>
                ))}
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
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
