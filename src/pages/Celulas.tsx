import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabase";

// Componente para renderizar cada linha da tabela
const CellRow = ({ cell }: { cell: any }) => {
  const isActive = cell.status === "active";
  return (
    <TableRow className={isActive ? "" : "opacity-70"}>
      <TableCell>{cell.nome}</TableCell>
      <TableCell>{cell.lider}</TableCell>
      <TableCell>{cell.membros}</TableCell>
      <TableCell>{cell.endereco}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar célula ${cell.nome}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label={`Excluir célula ${cell.nome}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const CelulasPage = () => {
  const [cellsData, setCellsData] = useState([]); // Estado para armazenar os dados das células
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Função para buscar os dados das células do Supabase
  const fetchCells = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("celulas").select("*");
      if (error) {
        console.error("Erro ao buscar células:", error);
      } else {
        setCellsData(data || []);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchCells quando o componente é montado
  useEffect(() => {
    fetchCells();
  }, []);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 container mx-auto px-4 py-8"
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Células</h1>
          <Link to="/celulas/nova">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Adicionar nova célula"
            >
              Nova Célula
            </button>
          </Link>
        </div>
        {/* Tabela de Células */}
        <div className="bg-white rounded-lg shadow p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Líder</TableHead>
                <TableHead>Membros</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Carregando células...
                  </TableCell>
                </TableRow>
              ) : cellsData.length > 0 ? (
                cellsData.map((cell) => <CellRow key={cell.id} cell={cell} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Nenhuma célula encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </>
  );
};

export default CelulasPage;
