// filepath: src/components/ProfileDropdown.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, User } from "lucide-react";
import clsx from "clsx";

interface ProfileDropdownProps {
  user: { email: string };
  isOpen: boolean;
  onClick: () => void;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  isOpen,
  onClick,
  onLogout,
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
        onClick={onClick}
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

export default ProfileDropdown;