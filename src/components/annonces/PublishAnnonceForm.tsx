
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
import { Plus, Upload, X, FileText, FileImage, FileVideo } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublishAnnonceFormProps {
  onAnnoncePublished: (annonce: any) => void;
}

interface Attachment {
  id: string;
  file: File;
  type: 'pdf' | 'image' | 'video';
}

const PublishAnnonceForm = ({ onAnnoncePublished }: PublishAnnonceFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'affaires',
    description: '',
    location: '',
    tags: '',
    author: '',
    phone: '',
    email: '',
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const fileType = file.type;
      let type: 'pdf' | 'image' | 'video';
      
      if (fileType.includes('pdf')) {
        type = 'pdf';
      } else if (fileType.includes('image')) {
        type = 'image';
      } else if (fileType.includes('video')) {
        type = 'video';
      } else {
        toast({
          title: "Type de fichier non supporté",
          description: "Veuillez choisir un fichier PDF, image ou vidéo.",
          variant: "destructive",
        });
        return;
      }

      const newAttachment: Attachment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        type
      };

      setAttachments(prev => [...prev, newAttachment]);
    });

    // Reset input
    event.target.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-orange-600" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-green-600" />;
      case 'video':
        return <FileVideo className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newAnnonce = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        author: formData.author || 'Utilisateur anonyme',
        location: formData.location,
        date: new Date().toISOString().split('T')[0],
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        contact: {
          phone: formData.phone,
          email: formData.email,
        },
        attachments: attachments.map(att => ({
          type: att.type,
          name: att.file.name,
          url: '#'
        }))
      };

      onAnnoncePublished(newAnnonce);

      // Réinitialiser le formulaire
      setFormData({
        title: '',
        category: 'affaires',
        description: '',
        location: '',
        tags: '',
        author: '',
        phone: '',
        email: '',
      });
      setAttachments([]);

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
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Publier une annonce
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Ex: +221 77 123 45 67"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Ex: contact@email.com"
              />
            </div>
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

          <div>
            <Label>Pièces jointes</Label>
            <div className="mt-2">
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Cliquez pour ajouter des fichiers
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, Images, Vidéos (max 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(attachment.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(attachment.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
              className="flex-1 bg-orange-600 hover:bg-orange-700"
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
