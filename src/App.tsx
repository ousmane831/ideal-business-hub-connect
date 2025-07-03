
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Annonces from "./pages/Annonces";
import Profils from "./pages/Profils";
import Mediatheque from "./pages/Mediatheque";
import Documentation from "./pages/Documentation";
import Actualites from "./pages/Actualites";
import NotFound from "./pages/NotFound";

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
          <Route path="/profils" element={<Profils />} />
          <Route path="/mediatheque" element={<Mediatheque />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/actualites" element={<Actualites />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
