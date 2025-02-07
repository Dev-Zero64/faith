// filepath: src/components/NavItem.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface NavItemProps {
  title: string;
  path?: string;
  icon: React.ElementType;
  submenu?: { path: string; title: string }[];
  isOpen: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  path,
  icon: Icon,
  submenu,
  isOpen,
  onClick,
}) => {
  return (
    <div className="relative">
      {submenu ? (
        <>
          <button
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all"
            onClick={onClick}
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

export default NavItem;