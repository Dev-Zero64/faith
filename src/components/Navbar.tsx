import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { menuItems } from "@/types/menuItems";
import clsx from "clsx";

const Dashboard = {
  title: "Dashboard",
  icon: Home,
  path: "/",
};

interface DropdownMenuProps {
  submenu: { path: string; title: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  submenu,
  isOpen,
  onClose,
}) => {
  return (
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
            {submenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className="block p-2 rounded-lg hover:bg-white/10 transition-all"
                onClick={onClose}
                aria-label={`Navegar para ${subItem.title}`}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
      <div
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
      </div>
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const toggleSubmenu = useCallback((title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }, [signOut]);

  return (
    <div className="w-full h-20 bg-gray-900 text-white flex items-center justify-between px-6">
      <Link to={"/"}>
        <div className="ml-10 text-xl font-bold">Gestão da Igreja</div>
      </Link>

      <nav className="flex gap-4 mr-20">
        <Link to={Dashboard.path} className="flex items-center gap-2">
          <Dashboard.icon size={20} />
          <span>{Dashboard.title}</span>
        </Link>
        {menuItems.map((item) => (
          <div key={item.title} className="relative">
            <div
              className={clsx(
                "flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all",
                openMenu === item.title && "bg-white/10"
              )}
              onClick={() => item.submenu && toggleSubmenu(item.title)}
              aria-expanded={!!item.submenu && openMenu === item.title}
              aria-haspopup={!!item.submenu}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
              {item.submenu && (
                <ChevronDown
                  size={20}
                  className={clsx(
                    "transform transition-transform",
                    openMenu === item.title && "rotate-180"
                  )}
                />
              )}
            </div>
            {item.submenu && (
              <DropdownMenu
                submenu={item.submenu}
                isOpen={openMenu === item.title}
                onClose={() => setOpenMenu(null)}
              />
            )}
          </div>
        ))}
      </nav>

      {user && <ProfileDropdown user={user} onLogout={handleLogout} />}
    </div>
  );
};
