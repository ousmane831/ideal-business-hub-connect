
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Annonces from "./pages/Annonces";
import AnnonceDetail from "./pages/AnnonceDetail";
import Profils from "./pages/Profils";
import Documentation from "./pages/Documentation";
import Actualites from "./pages/Actualites";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/dashboard";







const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/annonces/:id" element={<AnnonceDetail />} />
          <Route path="/profils" element={<Profils />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/accueil" element={<Index />} /> 
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
