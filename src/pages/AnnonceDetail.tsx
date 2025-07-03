
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Tag } from 'lucide-react';

const AnnonceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Données d'exemple - dans une vraie app, ces données viendraient d'une API
  const annonce = {
    id: parseInt(id || '1'),
    title: 'Recherche investisseur pour projet agricole',
    category: 'affaires',
    author: 'Mamadou Diallo',
    location: 'Dakar, Sénégal',
    date: '2024-01-15',
    description: 'Projet d\'agriculture moderne nécessitant un investissement de 50M FCFA. Nous développons une ferme intégrée avec des techniques d\'agriculture durable et moderne. Le projet inclut la production de légumes biologiques, l\'élevage de volaille et la transformation de produits agricoles. Nous recherchons un partenaire financier sérieux pour développer ce projet d\'avenir.',
    tags: ['Agriculture', 'Investissement', 'Dakar'],
    contact: {
      phone: '+221 77 123 45 67',
      email: 'mamadou.diallo@email.com',
      whatsapp: '+221 77 123 45 67'
    },
    attachments: [
      { type: 'pdf', name: 'business-plan.pdf', url: '#' },
      { type: 'image', name: 'terrain.jpg', url: '#' }
    ]
  };

  const categories = {
    'affaires': 'Opportunités d\'affaires',
    'offres': 'Offres de services',
    'besoins': 'Recherche de partenaires'
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/annonces')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux annonces
          </Button>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                {categories[annonce.category as keyof typeof categories]}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {annonce.date}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{annonce.title}</h1>

            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              {annonce.location}
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{annonce.description}</p>
            </div>

            {annonce.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {annonce.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {annonce.attachments.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Pièces jointes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {annonce.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{attachment.type}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-6">Contacter l'annonceur</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">{annonce.author}</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-600" />
                    <a href={`tel:${annonce.contact.phone}`} className="text-blue-600 hover:underline">
                      {annonce.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-gray-600" />
                    <a href={`mailto:${annonce.contact.email}`} className="text-blue-600 hover:underline">
                      {annonce.contact.email}
                    </a>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Envoyer un email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnnonceDetail;
