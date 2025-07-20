
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, User, Newspaper, X, Star, Trophy, Target, Zap } from 'lucide-react';

const ModernHeroSection = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedAd, setSelectedAd] = useState<number | null>(null);

  // Images facilement modifiables - remplacez les URLs pour changer les images
  const cardImages = {
    annonces: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    documentation: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    profils: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    actualites: 'https://images.unsplash.com/photo-1504711434969-e33886168f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  };

  // Images pour les publicités - images claires et nettes
  const adImages = {
    formation: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    coaching: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    strategie: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  };

  const features = [
    {
      id: 1,
      title: 'Annonces',
      description: 'Découvrez et publiez des opportunités d\'affaires dans votre secteur d\'activité',
      icon: FileText,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      route: '/annonces',
      image: cardImages.annonces
    },
    {
      id: 2,
      title: 'Documentation',
      description: 'Accédez aux guides et ressources pour optimiser votre utilisation de la plateforme',
      icon: BookOpen,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      route: '/documentation',
      image: cardImages.documentation
    },
    {
      id: 3,
      title: 'Profils',
      description: 'Explorez les profils d\'entrepreneurs et d\'experts dans votre domaine',
      icon: User,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100',
      route: '/profils',
      image: cardImages.profils
    },
    {
      id: 4,
      title: 'Actualités',
      description: 'Restez informé des dernières nouvelles et tendances du monde des affaires',
      icon: Newspaper,
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      route: '/actualites',
      image: cardImages.actualites
    }
  ];

  // Publicités section - seulement 3 cards
  const ads = [
    {
      id: 1,
      title: 'Formation Expert',
      description: 'Devenez expert en 30 jours',
      fullDescription: 'Programme complet de formation pour devenir expert reconnu dans votre domaine. Accès à vie aux contenus, certificat officiel et accompagnement personnalisé.',
      icon: Star,
      color: 'from-yellow-400 to-orange-500',
      badge: 'PROMO -50%',
      price: '299€ au lieu de 599€',
      image: adImages.formation
    },
    {
      id: 2,
      title: 'Coaching Pro',
      description: 'Accompagnement personnalisé',
      fullDescription: 'Coaching individuel avec un expert business pour développer votre stratégie et atteindre vos objectifs plus rapidement.',
      icon: Trophy,
      color: 'from-green-400 to-emerald-500',
      badge: 'NOUVEAU',
      price: 'À partir de 150€/h',
      image: adImages.coaching
    },
    {
      id: 3,
      title: 'Stratégie Business',
      description: 'Plan sur mesure pour votre entreprise',
      fullDescription: 'Analyse complète de votre business et création d\'un plan stratégique personnalisé pour maximiser votre croissance.',
      icon: Target,
      color: 'from-red-400 to-pink-500',
      badge: 'POPULAIRE',
      price: '499€',
      image: adImages.strategie
    }
  ];

  // Duplicate features and ads for infinite scroll
  const duplicatedFeatures = [...features, ...features];
  const duplicatedAds = [...ads, ...ads];

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
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black py-6 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header - Reduced size */}
      <div className="max-w-7xl mx-auto text-center mb-8 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          <span className="text-orange-400">IDEAL</span> Platform
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Votre passerelle vers le succès entrepreneurial
        </p>
      </div>

      {/* Main Features - Reduced size and spacing */}
      <div className="max-w-7xl mx-auto mb-6 relative z-10">
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right space-x-6">
            {duplicatedFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isExpanded = expandedCard === feature.id;
              
              return (
                <div
                  key={`${feature.id}-${index}`}
                  className={`
                    relative overflow-hidden cursor-pointer flex-shrink-0
                    transition-all duration-300 ease-in-out
                    ${isExpanded 
                      ? 'scale-110 z-50 w-80' 
                      : 'hover:scale-105 w-56'
                    }
                  `}
                  onClick={() => handleCardClick(feature)}
                  style={{ 
                    height: isExpanded ? '340px' : '260px',
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
                    
                    {/* Background Image sans overlay de couleur */}
                    <div
                      className="absolute inset-0 bg-cover bg-center rounded-3xl"
                      style={{ backgroundImage: `url(${feature.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 rounded-3xl" />
                    </div>

                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm rounded-3xl"></div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-5 text-white z-10">
                      {/* Close button for expanded state */}
                      {isExpanded && (
                        <button
                          onClick={closeExpanded}
                          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 border border-white/20"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}

                      {/* Icon and Title */}
                      <div className="flex flex-col items-center space-y-3 text-center">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl animate-float">
                          <IconComponent className="h-6 w-6 text-white drop-shadow-lg" />
                        </div>
                        <h3 className="text-lg font-bold text-white drop-shadow-lg">{feature.title}</h3>
                      </div>

                      {/* Description */}
                      <div className="space-y-3 text-center">
                        <p className={`text-xs leading-relaxed text-white/90 drop-shadow-md ${isExpanded ? 'text-sm' : ''}`}>
                          {feature.description}
                        </p>
                        
                        {isExpanded && (
                          <div className="animate-fade-in">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(feature.route);
                              }}
                              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-5 py-2 rounded-xl font-semibold hover:bg-white/30 hover:border-white/50 transition-all duration-200 transform hover:scale-105 shadow-xl text-xs"
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

      {/* Ads Section - 3 cards plus grandes et cliquables */}
      <div className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left space-x-6">
            {duplicatedAds.map((ad, index) => {
            const IconComponent = ad.icon;
            
              return (
                <div
                  key={`${ad.id}-${index}`}
                  className="relative overflow-hidden cursor-pointer flex-shrink-0 w-64 h-40 hover:scale-105 transition-all duration-200"
                  onClick={() => setSelectedAd(ad.id)}
                >
                  {/* Ad Card Container */}
                  <div className="relative h-full rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden group">
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40"></div>
                    
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center rounded-2xl"
                      style={{ backgroundImage: `url(${ad.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 rounded-2xl" />
                    </div>

                  {/* Badge */}
                  <div className="absolute top-2 right-2 bg-white/90 text-black text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                    {ad.badge}
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-center items-center p-4 text-white z-10 text-center">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg mb-2">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-sm font-bold text-white drop-shadow-lg mb-1">{ad.title}</h4>
                    <p className="text-xs text-white/80 drop-shadow-md leading-tight mb-2">{ad.description}</p>
                    <p className="text-xs text-white font-semibold">{ad.price}</p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>

      {/* Modal pour les détails de la publicité */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            {(() => {
              const ad = ads.find(a => a.id === selectedAd);
              if (!ad) return null;
              const IconComponent = ad.icon;
              
              return (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 bg-gradient-to-br ${ad.color} rounded-2xl shadow-xl`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <button
                      onClick={() => setSelectedAd(null)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 border border-white/20"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-xl font-bold">{ad.title}</h3>
                      <span className="px-2 py-1 bg-white/20 text-xs font-bold rounded-full">{ad.badge}</span>
                    </div>
                    
                    <p className="text-white/80 mb-4 leading-relaxed">{ad.fullDescription}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-400">{ad.price}</span>
                      <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-xl">
                        Commander
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Bottom CTA - Reduced size and spacing */}
      <div className="max-w-4xl mx-auto text-center mt-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Prêt à transformer votre business ?
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Rejoignez des milliers d'entrepreneurs qui font confiance à IDEAL Platform
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/profils')}
                className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-xl border border-white/20 backdrop-blur-sm"
              >
                Commencer maintenant
              </button>
              <button
                onClick={() => navigate('/documentation')}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-200 transform hover:scale-105 shadow-xl"
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
        
        @keyframes scroll-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        
        .animate-scroll-right {
          animation: scroll-right 15s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 10s linear infinite;
        }
        
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
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
