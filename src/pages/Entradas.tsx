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
const EntryRow = ({ entry }: { entry: any }) => {
  return (
    <TableRow>
      <TableCell>{entry.data}</TableCell>
      <TableCell>{entry.detalhes}</TableCell>
      <TableCell>{entry.categoria}</TableCell>
      <TableCell className="text-green-600 font-bold">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(entry.valor)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-600 transition-colors"
            aria-label={`Editar entrada ${entry.detalhes}`}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label={`Excluir entrada ${entry.detalhes}`}
          >
            Excluir
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const EntradasPage = () => {
  const [entriesData, setEntriesData] = useState([]); // Estado para armazenar os dados das entradas
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Função para buscar os dados das entradas do Supabase
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("entradas").select("*");
      if (error) {
        console.error("Erro ao buscar entradas:", error);
      } else {
        setEntriesData(data || []);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função fetchEntries quando o componente é montado
  useEffect(() => {
    fetchEntries();
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
          <h1 className="text-3xl font-bold text-gray-800">Entradas</h1>
          <Link to="/financas/entradas/nova">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              aria-label="Adicionar nova entrada"
            >
              Nova Entrada
            </button>
          </Link>
        </div>
        {/* Tabela de Entradas */}
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Carregando entradas...
                  </TableCell>
                </TableRow>
              ) : entriesData.length > 0 ? (
                entriesData.map((entry) => (
                  <EntryRow key={entry.id} entry={entry} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Nenhuma entrada encontrada.
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

export default EntradasPage;
