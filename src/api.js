import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/api/";

// Création d'une instance axios avec baseURL
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Intercepteur qui ajoute le token si présent dans localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Fonctions pour les APIs publiques (pas besoin de token)

// ANNONCES
export const getAnnonces = () => axios.get(`${BASE_URL}annonces/`);

// EVENEMENTS
export const getEvenements = () => axios.get(`${BASE_URL}evenements/`);
export const createEvenement = (data) => apiClient.post('evenements/', data);
export const updateEvenement = (id, data) => apiClient.put(`evenements/${id}/`, data);
export const deleteEvenement = (id) => apiClient.delete(`evenements/${id}/`);

// PUBLICITES
export const getPublicites = () => axios.get(`${BASE_URL}publicites/`);
export const createPublicite = (data) => apiClient.post('publicites/', data);
export const updatePublicite = (id, data) => apiClient.put(`publicites/${id}/`, data);
export const deletePublicite = (id) => apiClient.delete(`publicites/${id}/`);

// DOCUMENTATIONS
export const getDocumentations = () => axios.get(`${BASE_URL}documentations/`);
export const createDocumentation = (data) => apiClient.post('documentations/', data);
export const updateDocumentation = (id, data) => apiClient.put(`documentations/${id}/`, data);
export const deleteDocumentation = (id) => apiClient.delete(`documentations/${id}/`);

// Fonctions pour les APIs protégées (utiliser apiClient pour avoir le token automatiquement)
export const getExperts = () => apiClient.get('experts/');
export const getApporteurs = () => apiClient.get('apporteurs/');
export const getChercheurs = () => apiClient.get('chercheurs/');
export const getAdministrateurs = () => apiClient.get('administrateurs/');
export const getUsers = () => apiClient.get('users/');
