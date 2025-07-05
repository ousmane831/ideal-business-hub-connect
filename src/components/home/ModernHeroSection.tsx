
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, User, Newspaper, X } from 'lucide-react';

const ModernHeroSection = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: 'Annonces',
      description: 'Découvrez et publiez des opportunités d\'affaires dans votre secteur d\'activité',
      icon: FileText,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      route: '/annonces',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Documentation',
      description: 'Accédez aux guides et ressources pour optimiser votre utilisation de la plateforme',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      route: '/documentation',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'Profils',
      description: 'Explorez les profils d\'entrepreneurs et d\'experts dans votre domaine',
      icon: User,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100',
      route: '/profils',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'Actualités',
      description: 'Restez informé des dernières nouvelles et tendances du monde des affaires',
      icon: Newspaper,
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      route: '/actualites',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const handleCardClick = (feature: typeof features[0]) => {
    if (expandedCard === feature.id) {
      navigate(feature.route);
    } else {
      setExpandedCard(feature.id);
    }
  };

  const closeExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          <span className="text-orange-600">IDEAL</span> Platform
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Votre passerelle vers le succès entrepreneurial
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isExpanded = expandedCard === feature.id;
            
            return (
              <div
                key={feature.id}
                className={`
                  relative overflow-hidden cursor-pointer
                  transition-all duration-700 ease-in-out shadow-xl
                  animate-pulse
                  ${isExpanded 
                    ? 'scale-110 z-50 md:col-span-2 lg:col-span-2' 
                    : 'hover:scale-105 hover:shadow-2xl'
                  }
                `}
                onClick={() => handleCardClick(feature)}
                style={{ 
                  height: isExpanded ? '500px' : '400px',
                  clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                  transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'}) translateY(${Math.sin(Date.now() * 0.001 + index) * 10}px)`,
                  animation: `float-${index} 3s ease-in-out infinite alternate`
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-80`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  {/* Close button for expanded state */}
                  {isExpanded && (
                    <button
                      onClick={closeExpanded}
                      className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  )}

                  {/* Icon and Title */}
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm animate-bounce">
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 text-center">
                    <p className={`text-lg leading-relaxed ${isExpanded ? 'text-xl' : ''}`}>
                      {feature.description}
                    </p>
                    
                    {isExpanded && (
                      <div className="animate-fade-in">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(feature.route);
                          }}
                          className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
                        >
                          Découvrir →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Moving overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto text-center mt-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à transformer votre business ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers d'entrepreneurs qui font confiance à IDEAL Platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/profils')}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 transform hover:scale-105"
            >
              Commencer maintenant
            </button>
            <button
              onClick={() => navigate('/documentation')}
              className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 transform hover:scale-105"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0% { transform: rotate(2deg) translateY(0px); }
          100% { transform: rotate(2deg) translateY(-20px); }
        }
        @keyframes float-1 {
          0% { transform: rotate(-2deg) translateY(-10px); }
          100% { transform: rotate(-2deg) translateY(10px); }
        }
        @keyframes float-2 {
          0% { transform: rotate(2deg) translateY(-5px); }
          100% { transform: rotate(2deg) translateY(-25px); }
        }
        @keyframes float-3 {
          0% { transform: rotate(-2deg) translateY(-15px); }
          100% { transform: rotate(-2deg) translateY(5px); }
        }
      `}</style>
    </section>
  );
};

export default ModernHeroSection;
