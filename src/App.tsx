import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CelulasPage from "./pages/CelulasPage";
import FinancasPage from "./pages/FinancasPage";
import EventosPage from "./pages/EventosPage";
import MembrosPage from "./pages/MembrosPage";
import VisitantesPage from "./pages/VisitantesPage";
import CadastroPage from "./pages/CadastrarPage";
import EntradasPage from "./pages/EntradasPage";
import SaidasPage from "./pages/SaidasPage";
import CadastrarCelulaPage from "./pages/CadastrarCelulaPage";
import CadastrarEventoPage from "./pages/CadastrarEventoPage";
import CadastrarEntradaPage from "./pages/CadastrarEntradaPage";
import CadastrarSaidaPage from "./pages/CadastrarSaidaPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/celulas" element={<CelulasPage />} />
          <Route path="/celulas/nova" element={<CadastrarCelulaPage />} />
          <Route path="/financas" element={<FinancasPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/eventos/novo" element={<CadastrarEventoPage />} />
          <Route path="/membros" element={<MembrosPage />} />
          <Route path="/visitantes" element={<VisitantesPage />} />
          <Route path="/membros/novo" element={<CadastroPage />} />
          <Route path="/financas/entradas" element={<EntradasPage />} />
          <Route path="/financas/saidas" element={<SaidasPage />} />
          <Route
            path="/financas/entradas/nova"
            element={<CadastrarEntradaPage />}
          />
          <Route
            path="/financas/saidas/nova"
            element={<CadastrarSaidaPage />}
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
