// filepath: src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

interface AuthContextType {
  user: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const setupAuth = async () => {
      // Verifica se há um usuário no localStorage ao carregar o app
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Verifica se há um usuário logado ao carregar o app
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("user", JSON.stringify(session.user)); // Salva no localStorage
        }
      }

      // Escuta mudanças na autenticação
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            setUser(session.user);
            localStorage.setItem("user", JSON.stringify(session.user)); // Salva no localStorage
          } else {
            setUser(null);
            localStorage.removeItem("user"); // Remove do localStorage
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    setupAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user)); // Salva no localStorage ao fazer login
      setUser(data.user);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    localStorage.removeItem("user"); // Remove do localStorage ao fazer logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
