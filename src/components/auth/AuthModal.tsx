import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot-password';
type UserType = 'apporteur' | 'chercheur' | 'expert';

interface AuthModalProps {
  trigger: React.ReactNode;
  defaultMode?: AuthMode;
}

const AuthModal: React.FC<AuthModalProps> = ({ trigger, defaultMode = 'login' }) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: '' as UserType | '',
    phone: ''
  });

  const userTypes = [
    { value: 'apporteur', label: 'Apporteur d\'affaire' },
    { value: 'chercheur', label: 'Chercheur d\'affaire' },
    { value: 'expert', label: 'Expert' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { mode, formData });
    // Ici vous ajouterez la logique d'authentification
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
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                placeholder="Jean"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="userType">Type de profil</Label>
            <Select value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
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
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
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