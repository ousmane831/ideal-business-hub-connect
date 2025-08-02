import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Annonces', href: '/annonces' },
    { name: 'Profils', href: '/profils' },
    { name: 'Documentation', href: '/documentation' },
    { name: 'Actualités', href: '/actualites' },
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                IDEAL
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-white bg-orange-500/90 hover:bg-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 transform hover:scale-110 hover:rotate-1 hover:shadow-lg hover:shadow-black/50 group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer"></div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthModal 
              trigger={
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
              }
              defaultMode="login"
            />
            <AuthModal 
              trigger={
                <Button className="bg-primary hover:bg-primary/90" size="sm">
                  Inscription
                </Button>
              }
              defaultMode="register"
            />
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-white bg-orange-500/90 hover:bg-black px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 transform hover:scale-105 hover:shadow-lg group overflow-hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left"></div>
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <AuthModal 
                  trigger={
                    <Button variant="outline" size="sm" className="w-full">
                      Connexion
                    </Button>
                  }
                  defaultMode="login"
                />
                <AuthModal 
                  trigger={
                    <Button className="bg-primary hover:bg-primary/90 w-full" size="sm">
                      Inscription
                    </Button>
                  }
                  defaultMode="register"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 0.8s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
