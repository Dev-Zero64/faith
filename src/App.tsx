import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Importe o AuthProvider e useAuth
import { PrivateRoute } from "./components/PrivateRoutes"; // Importe o PrivateRoute
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
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { supabase } from "./services/supabase";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Verifica a sessão atual ao carregar o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Sessão atual:", session);
    });

    // Escuta mudanças na autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Mudança de sessão:", session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {" "}
        {/* Envolve o app com o AuthProvider */}
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Rota pública */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<RegisterPage />} />

              {/* Rotas privadas */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                }
              />
              <Route
                path="/celulas"
                element={
                  <PrivateRoute>
                    <CelulasPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/celulas/nova"
                element={
                  <PrivateRoute>
                    <CadastrarCelulaPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financas"
                element={
                  <PrivateRoute>
                    <FinancasPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financas/entradas"
                element={
                  <PrivateRoute>
                    <EntradasPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financas/saidas"
                element={
                  <PrivateRoute>
                    <SaidasPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financas/entradas/nova"
                element={
                  <PrivateRoute>
                    <CadastrarEntradaPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/financas/saidas/nova"
                element={
                  <PrivateRoute>
                    <CadastrarSaidaPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/eventos"
                element={
                  <PrivateRoute>
                    <EventosPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/eventos/novo"
                element={
                  <PrivateRoute>
                    <CadastrarEventoPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/membros"
                element={
                  <PrivateRoute>
                    <MembrosPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/visitantes"
                element={
                  <PrivateRoute>
                    <VisitantesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/membros/novo"
                element={
                  <PrivateRoute>
                    <CadastroPage />
                  </PrivateRoute>
                }
              />

              {/* Página 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
