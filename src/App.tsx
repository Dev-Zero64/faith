import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoutes";
import { supabase } from "./services/supabase";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./auth/NotFound";
import CelulasPage from "./pages/Celulas";
import FinancasPage from "./pages/Financas";
import EventosPage from "./pages/Eventos";
import MembrosPage from "./pages/Membros";
import CadastroPage from "./pages/CadastrarPessoa";
import EntradasPage from "./pages/Entradas";
import SaidasPage from "./pages/Saidas";
import CadastrarCelulaPage from "./pages/CadastrarCelula";
import CadastrarEventoPage from "./pages/CadastrarEvento";
import CadastrarEntradaPage from "./pages/CadastrarEntrada";
import CadastrarSaidaPage from "./pages/CadastrarSaida";
import RegisterPage from "./auth/Register";
import LoginPage from "./auth/Login";
import ResetPasswordPage from "./auth/ResetPassword";
import UpdatePassword from "./auth/UpdatePassword";

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
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/update-password" element={<UpdatePassword />} />
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
