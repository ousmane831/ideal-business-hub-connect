import React from 'react';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // ou navigate('/')
  };

  return (
    <div className=" flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-800">{firstName} {lastName}</span>
      <Button  className="bg-red-600 text-white hover:bg-red-600" variant="outline" size="sm" onClick={handleLogout}>
        Déconnexion
      </Button>
    </div>
  );
};

export default UserProfile;
