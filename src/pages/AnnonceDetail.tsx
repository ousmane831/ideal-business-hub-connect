import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Tag } from 'lucide-react';

type Annonce = {
  id: number;
  auteur: string;
  titre: string;
  description: string;
  categorie: string;
  date_publication: string;
  pieces_jointes: {
  id: number;
  fichier: any; type: string; name: string; url: string 
}[] | null;
  contact: string;
  email?: string; 
};

const categoriesMap: Record<string, string> = {
  // Immobilier: 'Immobilier',
  // affaires: 'Opportunités d\'affaires',
  // offres: 'Offres de services',
  // besoins: 'Recherche de partenaires',
  
};

const AnnonceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [annonce, setAnnonce] = useState<Annonce | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAnnonce = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/annonces/${id}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération de l\'annonce');
        const data = await response.json();

        
        const annonceData: Annonce = {
          id: data.id,
          auteur: data.auteur,
          titre: data.titre,
          description: data.description,
          categorie: data.categorie,
          date_publication: data.date_publication,
          pieces_jointes: data.pieces_jointes ?? [],
          contact: data.contact,
          email: data.email || '', 
        };
        setAnnonce(annonceData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonce();
  }, [id]);

  if (loading) return <p className="text-center py-10">Chargement...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Erreur : {error}</p>;
  if (!annonce) return <p className="text-center py-10">Annonce non trouvée</p>;
  console.log("Pièces jointes :", annonce.pieces_jointes);
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
                {categoriesMap[annonce.categorie] || annonce.categorie}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(annonce.date_publication).toLocaleDateString()}
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{annonce.titre}</h1>

            
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{annonce.description}</p>
            </div>

            {annonce.pieces_jointes && annonce.pieces_jointes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Pièces jointes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {annonce.pieces_jointes.map((attachment, index) => (
                      <div key={attachment.id || index} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          
                          <p className="font-medium text-gray-900">{decodeURIComponent(attachment.fichier.split('/').pop())}</p>
                        
                          <p className="text-sm text-gray-500 capitalize">Fichier joint</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(attachment.fichier, '_blank')}
                        >
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
                <h4 className="font-semibold text-lg mb-4">{annonce.auteur}</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-600" />
                    <a href={`tel:${annonce.contact}`} className="text-primary hover:underline">
                      {annonce.contact}
                    </a>
                  </div>
                  {/* Si tu as un email dans ta vraie API, tu peux l'ajouter ici */}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.open(`tel:${annonce.contact}`)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </Button>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = `mailto:${annonce.email}`}>
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
