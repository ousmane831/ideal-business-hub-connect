
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, FileText, Video, Image, Download, Eye } from 'lucide-react';

const Mediatheque = () => {
  const [selectedType, setSelectedType] = useState('all');

  const types = [
    { id: 'all', name: 'Tous les documents', icon: FileText },
    { id: 'video', name: 'Vidéos', icon: Video },
    { id: 'presentation', name: 'Présentations', icon: FileText },
    { id: 'image', name: 'Images', icon: Image },
  ];

  const mockDocuments = [
    {
      id: 1,
      title: 'Guide de création d\'entreprise au Sénégal',
      type: 'presentation',
      size: '2.5 MB',
      format: 'PDF',
      description: 'Guide complet pour créer son entreprise au Sénégal avec toutes les démarches administratives',
      date: '2024-01-15',
      downloads: 245
    },
    {
      id: 2,
      title: 'Opportunités d\'investissement en agriculture',
      type: 'video',
      size: '45 MB',
      format: 'MP4',
      description: 'Présentation vidéo des opportunités d\'investissement dans le secteur agricole',
      date: '2024-01-12',
      downloads: 189
    },
    {
      id: 3,
      title: 'Procédures de dédouanement CEDEAO',
      type: 'presentation',
      size: '1.8 MB',
      format: 'PDF',
      description: 'Procédures détaillées pour le dédouanement dans l\'espace CEDEAO',
      date: '2024-01-10',
      downloads: 156
    },
    {
      id: 4,
      title: 'Modèles de contrats commerciaux',
      type: 'presentation',
      size: '3.2 MB',
      format: 'DOC',
      description: 'Collection de modèles de contrats pour les transactions commerciales',
      date: '2024-01-08',
      downloads: 298
    }
  ];

  const getTypeIcon = (type: string) => {
    const typeData = types.find(t => t.id === type);
    return typeData ? typeData.icon : FileText;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Médiathèque</h1>
            <p className="text-lg text-gray-600">
              Accédez à notre collection de documents, vidéos et ressources utiles pour vos projets
            </p>
          </div>

          {/* Search bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un document..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Rechercher
            </Button>
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {types.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {type.name}
                </button>
              );
            })}
          </div>

          {/* Documents grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDocuments.map((document) => {
              const IconComponent = getTypeIcon(document.type);
              return (
                <div key={document.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <IconComponent className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          {document.format}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{document.size}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{document.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{document.description}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span>{document.date}</span>
                    <span>{document.downloads} téléchargements</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Aperçu
                    </Button>
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mediatheque;
