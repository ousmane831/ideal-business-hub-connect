import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


type AuthMode = 'login' | 'register' | 'forgot-password';
type UserType = 'apporteur' | 'chercheur' | 'expert';

interface AuthModalProps {
  trigger: React.ReactNode;
  defaultMode?: AuthMode;
}

const AuthModal: React.FC<AuthModalProps> = ({ trigger, defaultMode = 'login' }) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: '' as UserType | '',
    phone: '',
    role: '',
    first_name: '',
    last_name: '',
    adresse: '',
    telephone: '',
    duree_experience: '',
    specialite: '',
    localisation: '',
    services_proposes: ''
  });

  

  const userTypes = [
    { value: 'apporteur', label: 'Apporteur d\'affaire' },
    { value: 'chercheur', label: 'Chercheur d\'affaire' },
    { value: 'expert', label: 'Expert' }
  ];

  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (mode === 'login') {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: formData.username,
        password: formData.password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      alert("Connexion réussie !");

      navigate('/accueil');
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Nom d'utilisateur ou mot de passe incorrect");
    }
  } if (mode === 'register') {
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const payload = {
      role: formData.role,  
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        adresse: formData.adresse,
        telephone: formData.telephone
      },
        duree_experience: formData.duree_experience || '',
        specialite: formData.specialite || '',
        localisation: formData.localisation || '',
        services_proposes: formData.services_proposes || '',
      };
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', payload);

      console.log("Saving in localStorage:", formData.first_name, formData.last_name);
      localStorage.setItem('firstName', formData.first_name);
      localStorage.setItem('lastName', formData.last_name);

     
      alert("Inscription réussie, vous pouvez maintenant vous connecter !");
      setMode('login');
      // éventuellement réinitialiser le formData ou fermer le modal
    } catch (error: any) {
      console.error("Erreur lors de l'inscription :", error.response || error);
      alert(error.response?.data?.message || "Erreur lors de l'inscription.");
    }
  }

  if (mode === 'forgot-password') {
    // à implémenter
  }
};





  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderLoginForm = () => (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Connexion</CardTitle>
        <CardDescription className="text-center">
          Connectez-vous à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="username"
              type="text"
              placeholder="Votre nom d'utilisateur"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

          
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Se connecter
          </Button>
        </form>

        <div className="text-center space-y-2">
          <Button
            variant="link"
            onClick={() => setMode('forgot-password')}
            className="text-sm text-primary hover:text-primary/80"
          >
            Mot de passe oublié ?
          </Button>
          <div className="text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Button
              variant="link"
              onClick={() => setMode('register')}
              className="text-primary hover:text-primary/80 p-0"
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderRegisterForm = () => (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Inscription</CardTitle>
        <CardDescription className="text-center">
          Créez votre compte professionnel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                placeholder="Ousmane"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                placeholder="Diouf"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
              <Label htmlFor="last_name">Nom d'utilisateur</Label>
              <Input
                id="username"
                placeholder="ouz"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
              />
            </div>

          <div className="space-y-1">
            <Label htmlFor="role">Type de profil</Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre profil" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={formData.telephone}
                onChange={(e) => handleInputChange('telephone', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pr-8"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirmer</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">
            Créer mon compte
          </Button>
        </form>

        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            Déjà un compte ?{' '}
            <Button
              variant="link"
              onClick={() => setMode('login')}
              className="text-primary hover:text-primary/80 p-0"
            >
              Se connecter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderForgotPasswordForm = () => (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Mot de passe oublié</CardTitle>
        <CardDescription className="text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Envoyer le lien
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setMode('login')}
            className="text-sm text-primary hover:text-primary/80"
          >
            ← Retour à la connexion
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderForm = () => {
    switch (mode) {
      case 'register':
        return renderRegisterForm();
      case 'forgot-password':
        return renderForgotPasswordForm();
      default:
        return renderLoginForm();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;