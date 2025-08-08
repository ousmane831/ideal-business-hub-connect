import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Megaphone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

import {
  getPublicites,
  createPublicite,
  updatePublicite,
  deletePublicite,
} from '@/api';

interface Ad {
  id: number;
  titre: string;
  contenu: string;
  badge: string;
  lien: string;
  image: string;
  contact: string;
  date_publication: string;
}

export const AdsManager = () => {
  const [ads, setPublicites] = useState<Ad[]>([]);
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    lien: '',
    date_publication: '',
    contact: '',
    badge: '',
    image: null as File | null
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPublicites = async () => {
      setLoading(true);
      try {
        const response = await getPublicites();
        setPublicites(response.data);
      } catch (err) {
        toast({
          title: 'Erreur',
          description: "Impossible de charger les publicités",
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPublicites();
  }, [toast]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const form = new FormData();
      form.append('titre', formData.titre);
      form.append('contenu', formData.contenu);
      form.append('badge', formData.badge);
      form.append('lien', formData.lien);
      form.append('contact', formData.contact);
      form.append('date_publication', formData.date_publication);

      if (formData.image !== null) {
        form.append('image', formData.image);
      }

      try {
        let data;
        if (editingId) {
          const response = await updatePublicite(editingId, form, true);
          data = response.data;
          setPublicites((prev) =>
            prev.map((ev) => (ev.id === editingId ? data : ev))
          );
          toast({ title: 'Publicité modifiée avec succès' });
        } else {
          const response = await createPublicite(form, true);
          data = response.data;
          setPublicites((prev) => [...prev, data]);
          toast({ title: 'Publicité créée avec succès' });
        }

        setFormData({
          titre: '',
          contenu: '',
          badge: '',
          date_publication: '',
          contact: '',
          lien: '',
          image: null,
        });
        setEditingId(null);
        setIsOpen(false);
      } catch (error: any) {
        toast({
          title: 'Erreur',
          description: error.response?.data?.detail || "Échec de l'enregistrement",
          variant: 'destructive',
        });
      }
    },
    [editingId, formData, toast]
  );

  const handleEdit = useCallback((ads: Ad) => {
    setFormData({
      titre: ads.titre,
      contenu: ads.contenu,
      lien: ads.lien,
      date_publication: ads.date_publication,
      contact: ads.contact,
      badge: ads.badge,
      image: null
    });
    setEditingId(ads.id);
    setIsOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (
        !window.confirm('Voulez-vous vraiment supprimer cette publicité ? Cette action est irréversible.')
      )
        return;

      try {
        await deletePublicite(id);
        setPublicites((prev) => prev.filter((ev) => ev.id !== id));
        toast({ title: "Publicité supprimée avec succès" });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: "Impossible de supprimer la publicité",
          variant: 'destructive',
        });
      }
    },
    [toast]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gestion des Publicités</CardTitle>
            <CardDescription>Gérez les annonces publicitaires de la plateforme</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setFormData({ titre: '', contenu: '', lien: '', contact: '', date_publication: '', badge: '', image: null });
                setEditingId(null);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle publicité
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Modifier la publicité' : 'Créer une publicité'}
                </DialogTitle>
                <DialogDescription>
                  {editingId ? 'Modifiez les informations de la publicité' : 'Ajoutez une nouvelle publicité'}
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
                    <Label htmlFor="badge">Badge</Label>
                    <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    required
                    />
                </div>
                <div className="md:col-span-2">
                    <Label htmlFor="contenu">Contenu</Label>
                    <Textarea
                    id="contenu"
                    value={formData.contenu}
                    onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="lien">Lien</Label>
                    <Input
                    id="lien"
                    type="url"
                    value={formData.lien}
                    onChange={(e) => setFormData({ ...formData, lien: e.target.value })}
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="date_publication">Date</Label>
                    <Input
                    id="date_publication"
                    type="date"
                    value={formData.date_publication}
                    onChange={(e) => setFormData({ ...formData, date_publication: e.target.value })}
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="image">Image</Label>
                    <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    required={!editingId}
                    />
                </div>

                <div className="md:col-span-2 flex gap-2 mt-2">
                    <Button type="submit" className="flex-1">
                    {editingId ? 'Modifier' : 'Créer'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Annuler
                    </Button>
                </div>
                </form>

            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ads.map((ad) => (
            <div key={ad.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Megaphone className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="font-semibold">{ad.titre}</h3>
                  <p className="text-sm text-gray-600">{ad.contenu}</p>
                  <p className="text-xs text-gray-500">
                    {ad.contact} • {ad.date_publication}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(ad)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(ad.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
