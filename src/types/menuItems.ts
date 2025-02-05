import {
  ChevronDown,
  Users,
  Home,
  Church,
  DollarSign,
  Calendar,
} from "lucide-react";

export interface MenuItem {
  title: string;
  icon: any;
  path: string;
  submenu?: { title: string; path: string }[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Membros",
    icon: Users,
    path: "/membros",
    submenu: [
      { title: "Listar Membros", path: "/membros" },
      //{ title: "Listar Visitantes", path: "/visitantes" },
      { title: "Novo Cadastro", path: "/membros/novo" },
    ],
  },
  {
    title: "Células",
    icon: Church,
    path: "/celulas",
    submenu: [
      { title: "Listar Células", path: "/celulas" },
      { title: "Nova Célula", path: "/celulas/nova" },
    ],
  },
  {
    title: "Finanças",
    icon: DollarSign,
    path: "/financas",
    submenu: [
      { title: "Visão Geral", path: "/financas" },
      { title: "Entradas", path: "/financas/entradas" },
      { title: "Saídas", path: "/financas/saidas" },
    ],
  },
  {
    title: "Eventos",
    icon: Calendar,
    path: "/eventos",
    submenu: [
      { title: "Listar Eventos", path: "/eventos" },
      { title: "Novo Evento", path: "/eventos/novo" },
    ],
  },
];
