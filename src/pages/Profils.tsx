
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, User, MapPin, Briefcase, Phone, Mail } from 'lucide-react';

const Profils = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', name: 'Tous les profils' },
    { id: 'transitaire', name: 'Transitaires' },
    { id: 'expert', name: 'Experts juridiques' },
    { id: 'investisseur', name: 'Investisseurs' },
    { id: 'entrepreneur', name: 'Entrepreneurs' },
  ];

  const mockProfiles = [
    {
      id: 1,
      name: 'Amadou Ba',
      specialty: 'transitaire',
      location: 'Dakar, Sénégal',
      experience: '8 ans d\'expérience',
      description: 'Spécialiste en transit international et dédouanement pour l\'Afrique de l\'Ouest',
      services: ['Dédouanement', 'Transport', 'Logistique'],
      phone: '+221 77 123 45 67',
      email: 'amadou.ba@transit.sn'
    },
    {
      id: 2,
      name: 'Mariam Diop',
      specialty: 'expert',
      location: 'Abidjan, Côte d\'Ivoire',
      experience: '12 ans d\'expérience',
      description: 'Avocate spécialisée en droit des affaires et création d\'entreprises',
      services: ['Conseil juridique', 'Création d\'entreprise', 'Contrats'],
      phone: '+225 07 12 34 56',
      email: 'mariam.diop@juridique.ci'
    },
    {
      id: 3,
      name: 'Ibrahim Touré',
      specialty: 'investisseur',
      location: 'Bamako, Mali',
      experience: '15 ans d\'expérience',
      description: 'Investisseur actif dans l\'agriculture et les nouvelles technologies',
      services: ['Financement', 'Mentorat', 'Réseau'],
      phone: '+223 70 12 34 56',
      email: 'ibrahim.toure@invest.ml'
    }
  ];

  return (
    <div className="min-h-screen">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
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
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty.name}
              </button>
            ))}
          </div>

          {/* Profiles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProfiles.map((profile) => (
              <div key={profile.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-500">{profile.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {profile.location}
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{profile.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Services proposés :</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {profile.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {profile.email}
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700" size="sm">
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
