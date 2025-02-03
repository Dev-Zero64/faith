import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { menuItems } from "@/types/menuItems";

const Dashboard = {
  title: "Dashboard",
  icon: Home,
  path: "/",
};

// Componente DropdownMenu para renderizar o submenu
const DropdownMenu = ({
  submenu,
  isOpen,
  onClose,
}: {
  submenu: { path: string; title: string }[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
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
                onClick={onClose} // Fecha o menu ao clicar em um item
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

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Função para alternar o menu aberto
  const toggleSubmenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <div
      className="w-full h-20 bg-gray-900 text-white flex items-center justify-between px-6"
    >
      {/* Logo */}
      <Link to={"/"}>
        <div className="ml-10 text-xl font-bold">Gestão da Igreja</div>
      </Link>

      {/* Menu */}
      <nav className="flex gap-4 mr-20">
        <Link to={Dashboard.path} className="flex items-center gap-2">
          <Dashboard.icon size={20} />
          <span>{Dashboard.title}</span>
        </Link>
        {menuItems.map((item) => (
          <div key={item.title} className="relative">
            {/* Botão principal do menu */}
            <div
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all ${
                openMenu === item.title ? "bg-white/10" : ""
              }`}
              onClick={() => item.submenu && toggleSubmenu(item.title)}
              aria-expanded={!!item.submenu && openMenu === item.title}
              aria-haspopup={!!item.submenu}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
              {item.submenu && (
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    openMenu === item.title ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {/* Submenu */}
            {item.submenu && (
              <DropdownMenu
                submenu={item.submenu}
                isOpen={openMenu === item.title}
                onClose={() => setOpenMenu(null)} // Fecha o menu ao interagir
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
