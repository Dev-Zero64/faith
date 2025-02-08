// filepath: src/components/Navbar.tsx
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { menuItems } from "@/types/menuItems";

import NavItem from "./NavItem";
import ProfileDropdown from "./ProfileDropdown";

const MOBILE_BREAKPOINT = 768;

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const updateMedia = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [updateMedia]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao sair. Por favor, tente novamente.");
    }
  }, [signOut]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const toggleDropdown = useCallback((dropdownKey: string) => {
    setActiveDropdown((prev) => (prev === dropdownKey ? null : dropdownKey));
  }, []);

  return (
    <div className="w-full h-20 bg-gray-900 text-white flex items-center justify-between px-4 md:px-6 relative">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold z-20">
        Gestão da Igreja
      </Link>

      {/* Botão de Menu Móvel */}
      <button
        className="p-2 md:hidden z-20"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Conteúdo da Navbar (Desktop) */}
      <nav className="hidden md:flex items-center gap-4">
        <NavItem
          title="Dashboard"
          path="/"
          icon={Home}
          onClick={() => {}}
          isOpen={false}
        />
        {menuItems.map((item) => (
          <NavItem
            key={item.title}
            title={item.title}
            path={item.path}
            icon={item.icon}
            submenu={item.submenu}
            isOpen={activeDropdown === item.title}
            onClick={() => toggleDropdown(item.title)}
          />
        ))}
        {user && (
          <ProfileDropdown
            user={user}
            isOpen={activeDropdown === "profile"}
            onClick={() => toggleDropdown("profile")}
            onLogout={handleLogout}
          />
        )}
      </nav>

      {/* Menu Móvel */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-gray-900 shadow-lg md:hidden z-10"
          >
            <div className="p-4 space-y-4">
              <NavItem
                title="Dashboard"
                path="/"
                icon={Home}
                onClick={closeMobileMenu}
                isOpen={false}
              />
              {menuItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <NavItem
                    title={item.title}
                    path={item.path}
                    icon={item.icon}
                    submenu={item.submenu}
                    isOpen={activeDropdown === item.title}
                    onClick={() => toggleDropdown(item.title)}
                  />
                </div>
              ))}
              {user && (
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 p-2">
                    <User size={20} />
                    <span>{user.email}</span>
                  </div>
                  <button
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
