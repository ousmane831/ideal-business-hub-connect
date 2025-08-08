import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Search, Check, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  getEvenements,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from '@/api';
import * as SelectPrimitive from '@radix-ui/react-select';

const {
  Root: Select,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Viewport: SelectViewport,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
} = SelectPrimitive;

interface Event {
  image_url: string;
  id: number;
  titre: string;
  description: string;
  date: string;
  categorie: string;
  heure_debut: string;
  heure_fin: string;
  lieu: string;
  lien_inscription: string;
  image: string;
}

interface FormData {
  titre: string;
  description: string;
  date: string;
  categorie: string;
  heure_debut: string;
  heure_fin: string;
  lieu: string;
  lien_inscription: string;
  image: File | null;
}

export const EventsManager = () => {
  const [evenements, setEvenements] = useState<Event[]>([]);
  const [formData, setFormData] = useState<FormData>({
    titre: '',
    description: '',
    date: '',
    categorie: '',
    heure_debut: '',
    heure_fin: '',
    lieu: '',
    lien_inscription: '',
    image: null,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvenements = async () => {
      setLoading(true);
      try {
        const response = await getEvenements();
        setEvenements(response.data);
      } catch (err) {
        toast({
          title: 'Erreur',
          description: "Impossible de charger les événements",
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvenements();
  }, [toast]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const form = new FormData();
      form.append('titre', formData.titre);
      form.append('description', formData.description);
      form.append('date', formData.date);
      form.append('categorie', formData.categorie);
      form.append('heure_debut', formData.heure_debut);
      form.append('heure_fin', formData.heure_fin);
      form.append('lieu', formData.lieu);
      form.append('lien_inscription', formData.lien_inscription);
      if (formData.image) {
        form.append('image', formData.image);
      }

      try {
        let data;
        if (editingId) {
          const response = await updateEvenement(editingId, form, true);
          data = response.data;
          setEvenements((prev) =>
            prev.map((ev) => (ev.id === editingId ? data : ev))
          );
          toast({ title: 'Événement modifié avec succès' });
        } else {
          const response = await createEvenement(form, true);
          data = response.data;
          setEvenements((prev) => [...prev, data]);
          toast({ title: 'Événement créé avec succès' });
        }

        setFormData({
          titre: '',
          description: '',
          date: '',
          categorie: '',
          heure_debut: '',
          heure_fin: '',
          lieu: '',
          lien_inscription: '',
          image: null,
        });
        setEditingId(null);
        setIsOpen(false);
      } catch (error: any) {
        toast({
          title: 'Erreur',
          description:
            error.response?.data?.detail || "Impossible de sauvegarder l'événement",
          variant: 'destructive',
        });
      }
    },
    [editingId, formData, toast]
  );

  const handleEdit = useCallback((event: Event) => {
    setFormData({
      titre: event.titre,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0],
      categorie: event.categorie,
      heure_debut: event.heure_debut || '',
      heure_fin: event.heure_fin || '',
      lieu: event.lieu || '',
      lien_inscription: event.lien_inscription || '',
      image: null,
    });
    setEditingId(event.id);
    setIsOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!window.confirm('Voulez-vous vraiment supprimer cet événement ? Cette action est irréversible.')) return;

      try {
        await deleteEvenement(id);
        setEvenements((prev) => prev.filter((ev) => ev.id !== id));
        toast({ title: "Événement supprimé avec succès" });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: "Impossible de supprimer l'événement",
          variant: 'destructive',
        });
      }
    },
    [toast]
  );

  const filteredEvents = evenements.filter(
    (ev) =>
      ev.titre.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle>Gestion des Actualités</CardTitle>
            <CardDescription>
              Gérez les événements et actualités de la plateforme
            </CardDescription>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute top-1/2 left-2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-7"
                aria-label="Recherche événements"
              />
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setFormData({
                      titre: '',
                      description: '',
                      date: '',
                      categorie: '',
                      heure_debut: '',
                      heure_fin: '',
                      lieu: '',
                      lien_inscription: '',
                      image: null,
                    });
                    setEditingId(null);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? "Modifier l'événement" : 'Créer un événement'}</DialogTitle>
                  <DialogDescription>
                    {editingId
                      ? "Modifiez les informations de l'événement"
                      : 'Ajoutez un nouvel événement à la liste'}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titre">Titre</Label>
                    <Input
                      id="titre"
                      value={formData.titre}
                      onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="heure_debut">Heure de début</Label>
                    <Input
                      id="heure_debut"
                      type="time"
                      value={formData.heure_debut}
                      onChange={(e) => setFormData({ ...formData, heure_debut: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="heure_fin">Heure de fin</Label>
                    <Input
                      id="heure_fin"
                      type="time"
                      value={formData.heure_fin}
                      onChange={(e) => setFormData({ ...formData, heure_fin: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="lieu">Lieu</Label>
                    <Input
                      id="lieu"
                      value={formData.lieu}
                      onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Select
                      value={formData.categorie}
                      onValueChange={(value) => setFormData({ ...formData, categorie: value })}
                    >
                      <SelectTrigger
                        id="categorie"
                        aria-label="Choisir une catégorie"
                        className="inline-flex items-center justify-between rounded border border-gray-300 px-3 py-2 w-full text-left"
                      >
                        <SelectValue placeholder="Choisir une catégorie" />
                        <SelectIcon>
                          <ChevronDown className="w-4 h-4" />
                        </SelectIcon>
                      </SelectTrigger>

                      <SelectContent className="bg-white border border-gray-300 rounded shadow-md mt-1 w-full z-50">
                        <SelectViewport>
                          <SelectItem
                            value="conference"
                            className="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100"
                          >
                            <SelectItemText>Conférence</SelectItemText>
                            <SelectItemIndicator className="absolute left-0 inline-flex items-center pl-1 text-blue-600">
                              <Check className="w-4 h-4" />
                            </SelectItemIndicator>
                          </SelectItem>

                          <SelectItem
                            value="atelier"
                            className="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100"
                          >
                            <SelectItemText>Atelier</SelectItemText>
                            <SelectItemIndicator className="absolute left-0 inline-flex items-center pl-1 text-blue-600">
                              <Check className="w-4 h-4" />
                            </SelectItemIndicator>
                          </SelectItem>

                          <SelectItem
                            value="networking"
                            className="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100"
                          >
                            <SelectItemText>Networking</SelectItemText>
                            <SelectItemIndicator className="absolute left-0 inline-flex items-center pl-1 text-blue-600">
                              <Check className="w-4 h-4" />
                            </SelectItemIndicator>
                          </SelectItem>

                          <SelectItem
                            value="formation"
                            className="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100"
                          >
                            <SelectItemText>Formation</SelectItemText>
                            <SelectItemIndicator className="absolute left-0 inline-flex items-center pl-1 text-blue-600">
                              <Check className="w-4 h-4" />
                            </SelectItemIndicator>
                          </SelectItem>

                          <SelectItem
                            value="opportunites"
                            className="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100"
                          >
                            <SelectItemText>Opportunités d'affaires</SelectItemText>
                            <SelectItemIndicator className="absolute left-0 inline-flex items-center pl-1 text-blue-600">
                              <Check className="w-4 h-4" />
                            </SelectItemIndicator>
                          </SelectItem>

                          <SelectItem
                            value="autre"
                            className="cursor-pointer select-none relative py-2 pl-8 pr-4 hover:bg-gray-100"
                          >
                            <SelectItemText>Autre</SelectItemText>
                            <SelectItemIndicator className="absolute left-0 inline-flex items-center pl-1 text-blue-600">
                              <Check className="w-4 h-4" />
                            </SelectItemIndicator>
                          </SelectItem>
                        </SelectViewport>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      className="min-h-[80px]"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="lien_inscription">Lien d'inscription</Label>
                    <Input
                      id="lien_inscription"
                      type="url"
                      value={formData.lien_inscription}
                      onChange={(e) =>
                        setFormData({ ...formData, lien_inscription: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="image">Image (.jpg, .jpeg, .png)</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.files?.[0] || null })
                      }
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-2 justify-end mt-2">
                    <Button type="submit" className="w-full md:w-auto">
                      {editingId ? 'Modifier' : 'Créer'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full md:w-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Chargement des événements...</p>
        ) : filteredEvents.length === 0 ? (
          <p>Aucun événement trouvé.</p>
        ) : (
          <ul className="space-y-4">
            {filteredEvents.map((ev) => (
              <li
                key={ev.id}
                className="border rounded p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
              >
                <div>
                  <h3 className="font-semibold">{ev.titre}</h3>
                  <p>{ev.description}</p>
                  <p>
                    Date : {new Date(ev.date).toLocaleDateString()} de {ev.heure_debut} à{' '}
                    {ev.heure_fin} - Lieu : {ev.lieu}
                  </p>
                  <p>Catégorie : {ev.categorie}</p>

                  {ev.lien_inscription && (
                    <p>
                      Lien :{' '}
                      <a
                        href={ev.lien_inscription}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {ev.lien_inscription}
                      </a>
                    </p>
                  )}

                  {ev.image_url && (
                    <img
                      src={ev.image_url}
                      alt={ev.titre}
                      className="mt-2 max-w-xs rounded shadow"
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(ev)}
                    aria-label={`Modifier ${ev.titre}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(ev.id)}
                    aria-label={`Supprimer ${ev.titre}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
