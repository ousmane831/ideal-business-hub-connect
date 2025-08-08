import React from 'react';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const firstName = localStorage.getItem('first_name') || '';
  const lastName = localStorage.getItem('last_name') || '';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // Ou utilise navigate('/') si tu utilises react-router
  };

  return (
    <div className="flex items-center space-x-2" aria-label="Profil utilisateur">
      {(firstName || lastName) ? (
        <span className="text-sm font-medium text-gray-800">
          Bienvenue, {firstName} {lastName}
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-800">Bienvenue, Utilisateur</span>
      )}
      <Button
        className="bg-red-600 text-white hover:bg-red-700"
        variant="outline"
        size="sm"
        onClick={handleLogout}
        aria-label="Se déconnecter"
      >
        Déconnexion
      </Button>
    </div>
  );
};

export default UserProfile;
