
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xl inline-block mb-4">
              IDEAL
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Plateforme de mise en relation d'affaires, facilitant les opportunités d'investissement 
              et l'accès aux services administratifs pour les entrepreneurs africains.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/annonces" className="text-gray-300 hover:text-orange-400">Annonces</Link></li>
              <li><Link to="/profils" className="text-gray-300 hover:text-orange-400">Profils</Link></li>
              <li><Link to="/mediatheque" className="text-gray-300 hover:text-orange-400">Médiathèque</Link></li>
              <li><Link to="/documentation" className="text-gray-300 hover:text-orange-400">Documentation</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Facilitation administrative</span></li>
              <li><span className="text-gray-300">Montage de dossiers</span></li>
              <li><span className="text-gray-300">Support APIX</span></li>
              <li><span className="text-gray-300">Conseils juridiques</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 IDEAL Platform. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
