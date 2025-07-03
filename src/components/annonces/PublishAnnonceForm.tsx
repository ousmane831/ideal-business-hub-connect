
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublishAnnonceFormProps {
  onAnnoncePublished: (annonce: any) => void;
}

const PublishAnnonceForm = ({ onAnnoncePublished }: PublishAnnonceFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'affaires',
    description: '',
    location: '',
    tags: '',
    author: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler la publication de l'annonce
      const newAnnonce = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        author: formData.author || 'Utilisateur anonyme',
        location: formData.location,
        date: new Date().toISOString().split('T')[0],
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      // Ajouter l'annonce à la liste
      onAnnoncePublished(newAnnonce);

      // Réinitialiser le formulaire
      setFormData({
        title: '',
        category: 'affaires',
        description: '',
        location: '',
        tags: '',
        author: '',
      });

      toast({
        title: "Annonce publiée avec succès !",
        description: "Votre annonce est maintenant visible par tous les utilisateurs.",
      });

      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la publication.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Publier une annonce
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Publier une nouvelle annonce</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de l'annonce *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ex: Recherche investisseur pour projet agricole"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="affaires">Opportunités d'affaires</option>
              <option value="offres">Offres de services</option>
              <option value="besoins">Recherche de partenaires</option>
            </select>
          </div>

          <div>
            <Label htmlFor="author">Votre nom *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Ex: Jean Dupont"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Localisation *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Ex: Dakar, Sénégal"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Décrivez votre annonce en détail..."
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="Ex: Agriculture, Investissement, Dakar"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publication...' : 'Publier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PublishAnnonceForm;
