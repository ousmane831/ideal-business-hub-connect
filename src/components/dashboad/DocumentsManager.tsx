import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, FileText, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  getDocumentations,
  createDocumentation,
  updateDocumentation,
  deleteDocumentation,
} from '@/api';

interface Document {
  id: number;
  titre: string;
  categorie: string;
  contenu: string;
  lien: string;
  fileUrl?: string;
  createdAt: string;
}

export const DocumentsManager = () => {
  const [documents, setDocumentations] = useState<Document[]>([]);
  const [formData, setFormData] = useState({
    titre: '',
    categorie: '',
    contenu: '',
    lien: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDocumentations = async () => {
      setLoading(true);
      try {
        const response = await getDocumentations();
        setDocumentations(response.data);
      } catch (err) {
        toast({
          title: 'Erreur',
          description: "Impossible de charger les documents",
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentations();
  }, [toast]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const form = new FormData();
      form.append('titre', formData.titre);
      form.append('categorie', formData.categorie);
      form.append('contenu', formData.contenu);
      form.append('lien', formData.lien);

      try {
        let data;
        if (editingId) {
          const response = await updateDocumentation(editingId, form, true);
          data = response.data;
          setDocumentations((prev) =>
            prev.map((ev) => (ev.id === editingId ? data : ev))
          );
          toast({ title: 'Document modifié avec succès' });
        } else {
          const response = await createDocumentation(form, true);
          data = response.data;
          setDocumentations((prev) => [...prev, data]);
          toast({ title: 'Document créé avec succès' });
        }

        setFormData({
          titre: '',
          contenu: '',
          categorie: '',
          lien: '',
        });
        setEditingId(null);
        setIsOpen(false);
      } catch (error: any) {
        toast({
          title: 'Erreur',
          description:
            error.response?.data?.detail || "Impossible de sauvegarder le document",
          variant: 'destructive',
        });
      }
    },
    [editingId, formData, toast]
  );

  const handleEdit = useCallback((document: Document) => {
    setFormData({
      titre: document.titre,
      contenu: document.contenu || '',
      categorie: document.categorie,
      lien: document.lien || '',
    });
    setEditingId(document.id);
    setIsOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      if (
        !window.confirm(
          'Voulez-vous vraiment supprimer ce document ? Cette action est irréversible.'
        )
      )
        return;

      try {
        await deleteDocumentation(id);
        setDocumentations((prev) => prev.filter((ev) => ev.id !== id));
        toast({ title: "Document supprimé avec succès" });
      } catch (error) {
        toast({
          title: 'Erreur',
          description: "Impossible de supprimer le document",
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
            <CardTitle>Gestion des Documents</CardTitle>
            <CardDescription>Gérez la documentation et les fichiers</CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData({ titre: '', categorie: '', contenu: '', lien: '' });
                  setEditingId(null);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Modifier le document' : 'Ajouter un document'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Modifiez les informations du document' : 'Ajoutez un nouveau document'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="contenu">Contenu</Label>
                  <Textarea
                    id="contenu"
                    value={formData.contenu}
                    onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="categorie">Catégorie</Label>
                  <Select
                    value={formData.categorie}
                    onValueChange={(value) => setFormData({ ...formData, categorie: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commerciale">Commerciale</SelectItem>
                      <SelectItem value="juridique">Juridique</SelectItem>
                      <SelectItem value="technique">Technique</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lien">Lien</Label>
                  <Input
                    id="lien"
                    type="url"
                    value={formData.lien}
                    onChange={(e) => setFormData({ ...formData, lien: e.target.value })}
                    required={!editingId}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingId ? 'Modifier' : 'Ajouter'}
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
          {documents.map((document) => (
            <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold">{document.titre}</h3>
                  <p className="text-sm text-gray-600">{document.contenu}</p>
                  <p className="text-xs text-gray-500">
                    {document.categorie} • {document.createdAt}
                  </p>

                    {document.lien && (
                        <a href={document.lien} className="text-blue-500 hover:underline text-xs">
                        Voir le lien
                        </a>
                    )}

                </div>
              </div>
              <div className="flex gap-2">
                {document.fileUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={document.fileUrl} download>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => handleEdit(document)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(document.id)}>
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
