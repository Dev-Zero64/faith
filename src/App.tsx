import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Membros
import MembrosPage from "./pages/membros/Index";
import VisitantesPage from "./pages/membros/visitantes/Index";
import NovoMembroPage from "./pages/membros/novo/Index";

// Células
import CelulasPage from "./pages/celulas/Index";
import NovaCelulaPage from "./pages/celulas/nova/Index";

// Finanças
import FinancasPage from "./pages/financas/Index";
import EntradasPage from "./pages/financas/entradas/Index";
import SaidasPage from "./pages/financas/saidas/Index";

// Eventos
import EventosPage from "./pages/eventos/Index";
import NovoEventoPage from "./pages/eventos/novo/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Rotas de Membros */}
            <Route path="/membros" element={<MembrosPage />} />
            <Route path="/visitantes" element={<VisitantesPage />} />
            <Route path="/membros/novo" element={<NovoMembroPage />} />
            
            {/* Rotas de Células */}
            <Route path="/celulas" element={<CelulasPage />} />
            <Route path="/celulas/nova" element={<NovaCelulaPage />} />
            
            {/* Rotas de Finanças */}
            <Route path="/financas" element={<FinancasPage />} />
            <Route path="/financas/entradas" element={<EntradasPage />} />
            <Route path="/financas/saidas" element={<SaidasPage />} />
            
            {/* Rotas de Eventos */}
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/eventos/novo" element={<NovoEventoPage />} />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;