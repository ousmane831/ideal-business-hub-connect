
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

  // Duplicate features for infinite scroll
  const duplicatedFeatures = [...features, ...features];

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
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          <span className="text-orange-400">IDEAL</span> Platform
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Votre passerelle vers le succès entrepreneurial
        </p>
      </div>

      {/* Scrolling Features Container */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right space-x-8">
            {duplicatedFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isExpanded = expandedCard === feature.id;
              
              return (
                <div
                  key={`${feature.id}-${index}`}
                  className={`
                    relative overflow-hidden cursor-pointer flex-shrink-0
                    transition-all duration-700 ease-in-out
                    ${isExpanded 
                      ? 'scale-110 z-50 w-96' 
                      : 'hover:scale-105 w-80'
                    }
                  `}
                  onClick={() => handleCardClick(feature)}
                  style={{ 
                    height: isExpanded ? '500px' : '400px',
                  }}
                >
                  {/* Mirror Card Container */}
                  <div className="relative h-full rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50"></div>
                    
                    {/* Reflection effect */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
                    
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
                    
                    {/* Background Image with mirror effect */}
                    <div
                      className="absolute inset-0 bg-cover bg-center rounded-3xl"
                      style={{ backgroundImage: `url(${feature.image})` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-60 rounded-3xl`} />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 rounded-3xl" />
                    </div>

                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm rounded-3xl"></div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-8 text-white z-10">
                      {/* Close button for expanded state */}
                      {isExpanded && (
                        <button
                          onClick={closeExpanded}
                          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 border border-white/20"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      )}

                      {/* Icon and Title */}
                      <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl animate-float">
                          <IconComponent className="h-12 w-12 text-white drop-shadow-lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{feature.title}</h3>
                      </div>

                      {/* Description */}
                      <div className="space-y-4 text-center">
                        <p className={`text-lg leading-relaxed text-white/90 drop-shadow-md ${isExpanded ? 'text-xl' : ''}`}>
                          {feature.description}
                        </p>
                        
                        {isExpanded && (
                          <div className="animate-fade-in">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(feature.route);
                              }}
                              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-xl font-semibold hover:bg-white/30 hover:border-white/50 transition-all duration-200 transform hover:scale-105 shadow-xl"
                            >
                              Découvrir →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto text-center mt-20 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Prêt à transformer votre business ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez des milliers d'entrepreneurs qui font confiance à IDEAL Platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/profils')}
                className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-xl border border-white/20 backdrop-blur-sm"
              >
                Commencer maintenant
              </button>
              <button
                onClick={() => navigate('/documentation')}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        `}
      </style>
    </section>
  );
};

export default ModernHeroSection;
