
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Tag, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { getEvenements } from '@/api';


const Actualites = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

      const categories = [
          { id: 'all', name: 'Toutes les actualités' },
          { id: 'opportunites', name: "Opportunités d'affaires" },
          { id: 'networking', name: 'Networking' }, 
          { id: 'formation', name: 'Formation' },
          { id: 'conference', name: 'Conférence' },
          { id: 'atelier', name: 'Atelier' }, 
    ];


    const [news, setEvenements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEvenements = async () => {
        try {
          const response = await getEvenements();
          console.log(response.data);
          setEvenements(response.data);
        } catch (err) {
          setError('Impossible de charger les evenements.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
    fetchEvenements();
  }, []);
  

        const upcomingEvents = news
        .filter((event) => {
          const eventDate = new Date(event.date);
          const today = new Date();
          const timeDiff = eventDate.getTime() - today.getTime();
          const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
          return daysDiff >= 0 && daysDiff <= 15;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);



  const filteredNews = selectedCategory === 'all'
  ? news
  : news.filter(news => news.categorie === selectedCategory);

if (loading) {
  return (
    <div className="text-center mt-10 text-gray-500">Chargement des evenements...</div>
  );
}

if (error) {
  return (
    <div className="text-center mt-10 text-red-500">{error}</div>
  );
}


  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Actualités</h1>
            <p className="text-lg text-gray-600">
              Restez informé des derniers événements, salons et opportunités business en Afrique
            </p>
          </div>

          {/* Upcoming events highlight */}
          <div className="bg-orange-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-600" />
              Événements à venir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{event.titre}</h3>
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.lieu}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories filter */}
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

          {/* News grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
            
              <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={news.image_url || '/placeholder-image.png'} 
                    alt={news.titre}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded">
                  {categories.find(c => c.id === news.categorie)?.name || news.categorie}
                </span>

                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{news.titre}</h3>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {news.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {news.heure_debut} - {news.heure_fin}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {news.lieu}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {news.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a
                href={news.lien_inscription}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-orange-600 hover:bg-orange-700" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  S'inscrire
                </Button>
              </a>

                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Actualites;
