import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Home, Church, DollarSign, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuItem {
  title: string;
  icon: any;
  path: string;
  submenu?: { title: string; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/',
  },
  {
    title: 'Membros',
    icon: Users,
    path: '/membros',
    submenu: [
      { title: 'Listar Membros', path: '/membros' },
      { title: 'Listar Visitantes', path: '/visitantes' },
      { title: 'Novo Cadastro', path: '/membros/novo' },
    ],
  },
  {
    title: 'Células',
    icon: Church,
    path: '/celulas',
    submenu: [
      { title: 'Listar Células', path: '/celulas' },
      { title: 'Nova Célula', path: '/celulas/nova' },
    ],
  },
  {
    title: 'Finanças',
    icon: DollarSign,
    path: '/financas',
    submenu: [
      { title: 'Visão Geral', path: '/financas' },
      { title: 'Entradas', path: '/financas/entradas' },
      { title: 'Saídas', path: '/financas/saidas' },
    ],
  },
  {
    title: 'Eventos',
    icon: Calendar,
    path: '/eventos',
    submenu: [
      { title: 'Listar Eventos', path: '/eventos' },
      { title: 'Novo Evento', path: '/eventos/novo' },
    ],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 min-h-screen sidebar-gradient text-white p-4"
    >
      <div className="text-2xl font-bold mb-8 text-center">
        Gestão Igreja
      </div>
      
      <nav>
        {menuItems.map((item) => (
          <div key={item.title} className="mb-2">
            <div
              className={`flex items-center justify-between p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all ${
                openMenus[item.title] ? 'bg-white/10' : ''
              }`}
              onClick={() => item.submenu && toggleSubmenu(item.title)}
            >
              <div className="flex items-center gap-2">
                <item.icon size={20} />
                <span>{item.title}</span>
              </div>
              {item.submenu && (
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    openMenus[item.title] ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>
            
            <AnimatePresence>
              {item.submenu && openMenus[item.title] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-8 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block p-2 rounded-lg hover:bg-white/10 transition-all"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;