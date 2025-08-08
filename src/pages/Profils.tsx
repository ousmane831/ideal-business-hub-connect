
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, User, MapPin, Briefcase, Phone, Mail } from 'lucide-react';

import { useEffect } from 'react';
import { getExperts} from '@/api';


const Profils = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', name: 'Tous les profils' },
    { id: 'transitaire', name: 'Transitaires' },
    { id: 'expert', name: 'Experts juridiques' },
    { id: 'investisseur', name: 'Investisseurs' },
    { id: 'entrepreneur', name: 'Entrepreneurs' },
  ];

   const [expert, setExperts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
 
   useEffect(() => {
     const fetchExperts = async () => {
       try {
         const response = await getExperts();
         setExperts(response.data);
       } catch (err) {
         setError('Impossible de charger les profils experts.');
         console.error(err);
       } finally {
         setLoading(false);
       }
     };
 
   fetchExperts();
 }, []);


  
  const filteredExperts = selectedSpecialty === 'all' 
    ? expert 
    : expert.filter(exp => exp.specialite === selectedSpecialty);

  

 if (loading) {
  return (
    <div className="text-center mt-10 text-gray-500">Chargement des experts...</div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Profils</h1>
            <p className="text-lg text-gray-600">
              Trouvez les experts et partenaires dont vous avez besoin pour vos projets
            </p>
          </div>

          {/* Search bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un profil par nom ou spécialité..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Rechercher
            </Button>
          </div>

          {/* Specialties filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSpecialty === specialty.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary/10'
                }`}
              >
                {specialty.name}
              </button>
            ))}
          </div>

          {/* Profiles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {expert.map((expert) => (
                  <div key={expert.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-primary">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {expert.user?.username || "Nom inconnu"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {expert.duree_experience} ans d'expérience
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {expert.localisation}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      Spécialité : {expert.specialite}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Services proposés :</h4>
                      <div className="flex flex-wrap gap-1">
                        {expert.services_proposes
                          ? expert.services_proposes.split(',').map((service, index) => (
                              <div key={index} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                                {service.trim()}
                              </div>
                            ))
                          : <div>Aucun service proposé</div>}
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {expert.phone || "Numéro non disponible"}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {expert.user?.email || "Email non renseigné"}
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90" size="sm">
                      Contacter
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

export default Profils;
