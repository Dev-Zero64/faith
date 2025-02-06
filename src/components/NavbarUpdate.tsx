import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { menuItems } from "@/types/menuItems";
import clsx from "clsx";

const MOBILE_BREAKPOINT = 768;
const NAVBAR_HEIGHT = 80;

interface NavItemProps {
  title: string;
  path?: string;
  icon: React.ElementType;
  submenu?: { path: string; title: string }[];
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  path,
  icon: Icon,
  submenu,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className="relative">
      {submenu ? (
        <>
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all"
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup={true}
          >
            <Icon size={20} />
            <span>{title}</span>
            <ChevronDown
              size={20}
              className={clsx(
                "transform transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
              >
                <div className="p-2 space-y-2">
                  {submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block p-2 rounded-lg hover:bg-white/10 transition-all"
                      onClick={onClick}
                      aria-label={`Navegar para ${subItem.title}`}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          to={path || "#"}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all"
          onClick={onClick}
        >
          <Icon size={20} />
          <span>{title}</span>
        </Link>
      )}
    </div>
  );
};

interface ProfileDropdownProps {
  user: { email: string };
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup={true}
      >
        <User size={20} />
        <span>{user.email || "Usuário"}</span>
        <ChevronDown
          size={20}
          className={clsx(
            "transform transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
          >
            <div className="p-2 space-y-2">
              <button
                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all"
                onClick={onLogout}
                aria-label="Sair"
              >
                <LogOut size={20} />
                Sair
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
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
        <NavItem title="Dashboard" path="/" icon={Home} />
        {menuItems.map((item) => (
          <NavItem
            key={item.title}
            title={item.title}
            path={item.path}
            icon={item.icon}
            submenu={item.submenu}
          />
        ))}
        {user && <ProfileDropdown user={user} onLogout={handleLogout} />}
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
            style={{ marginTop: `${NAVBAR_HEIGHT}px` }}
          >
            <div className="p-4 space-y-4">
              <NavItem
                title="Dashboard"
                path="/"
                icon={Home}
                onClick={closeMobileMenu}
              />
              {menuItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <NavItem
                    title={item.title}
                    path={item.path}
                    icon={item.icon}
                    submenu={item.submenu}
                    onClick={closeMobileMenu}
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
