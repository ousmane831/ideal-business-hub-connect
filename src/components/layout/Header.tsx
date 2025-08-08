import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import UserProfile from '@/pages/AffichProfils';




const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('access_token'); // <-- ajoute après useState

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Annonces', href: '/annonces' },
    { name: 'Experts', href: '/profils' },
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
            <img
              src="logo/logo_ideal2.PNG"
              alt="Logo IDEAL"
              className="h-[64px] w-auto"

            />
          </Link>
        </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="bg-orange-500 text-white hover:bg-black px-4 py-2 rounded-md text-sm font-medium transform hover:animate-bounce transition duration-300 ease-in-out"
            >
              {item.name}
            </Link>
          ))}
        </nav>


          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <UserProfile />
            ) : (
              <>
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
              </>
            )}
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
                  className="bg-orange-500 text-white hover:bg-black px-4 py-2 rounded-md text-sm font-medium transform hover:animate-bounce transition duration-300 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col space-y-2 pt-4 border-t">
                {isLoggedIn ? (
                  <UserProfile />
                ) : (
                  <>
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
                  </>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
