import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Layout/Navbar";

interface FinanceLayoutProps {
  children: React.ReactNode;
}

const FinanceLayout: React.FC<FinanceLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 container mx-auto px-4 py-8"
      >
        {children}
      </motion.div>
    </>
  );
};

export default FinanceLayout;
