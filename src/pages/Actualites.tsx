
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Tag, ExternalLink } from 'lucide-react';

const Actualites = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes les actualités' },
    { id: 'salons', name: 'Salons & Foires' },
    { id: 'evenements', name: 'Événements Business' },
    { id: 'reglementations', name: 'Réglementations' },
    { id: 'opportunites', name: 'Opportunités' },
  ];

  const mockNews = [
    {
      id: 1,
      title: 'Salon International de l\'Agriculture de Dakar 2024',
      category: 'salons',
      date: '2024-03-15',
      location: 'Centre International de Conférences Abdou Diouf, Dakar',
      time: '09:00 - 18:00',
      description: 'Le plus grand salon agricole de l\'Afrique de l\'Ouest réunit les acteurs du secteur pour présenter les innovations et créer des partenariats.',
      image: '/placeholder.svg',
      link: 'https://salon-agriculture-dakar.com',
      tags: ['Agriculture', 'Innovation', 'Partenariats']
    },
    {
      id: 2,
      title: 'Forum des Investisseurs Africains 2024',
      category: 'evenements',
      date: '2024-02-28',
      location: 'Hôtel Radisson Blu, Abidjan',
      time: '08:30 - 17:00',
      description: 'Rencontre entre investisseurs et porteurs de projets innovants en Afrique. Opportunités de financement et networking.',
      image: '/placeholder.svg',
      link: 'https://forum-investisseurs-afrique.com',
      tags: ['Investissement', 'Financement', 'Innovation']
    },
    {
      id: 3,
      title: 'Nouvelles réglementations douanières CEDEAO',
      category: 'reglementations',
      date: '2024-02-20',
      location: 'En ligne',
      time: 'Toute la journée',
      description: 'Mise à jour des procédures douanières dans l\'espace CEDEAO. Formation gratuite pour les transitaires et importateurs.',
      image: '/placeholder.svg',
      link: 'https://cedeao-douanes.org',
      tags: ['Douanes', 'CEDEAO', 'Formation']
    },
    {
      id: 4,
      title: 'Foire Commerciale de Bamako 2024',
      category: 'salons',
      date: '2024-04-10',
      location: 'Palais des Congrès, Bamako',
      time: '10:00 - 19:00',
      description: 'Exposition commerciale majeure du Mali présentant les produits locaux et les opportunités d\'exportation.',
      image: '/placeholder.svg',
      link: 'https://foire-bamako.ml',
      tags: ['Commerce', 'Exportation', 'Produits locaux']
    }
  ];

  const upcomingEvents = mockNews.filter(news => new Date(news.date) > new Date()).slice(0, 3);

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
          <div className="bg-red-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-red-600" />
              Événements à venir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{event.title}</h3>
                  <div className="flex items-center text-xs text-gray-600 mb-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* News grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                    {categories.find(c => c.id === news.category)?.name}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{news.title}</h3>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {news.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {news.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {news.location}
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
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    En savoir plus
                  </Button>
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
