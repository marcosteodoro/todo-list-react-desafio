import { useState } from "react";
import ITarefa from "../interfaces/ITarefa";
import ListaBase from "../components/ListaBase";

export default function Incompletas() {
  const [tarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : [];
  });

  const tarefasIncompletas = tarefas.filter((tarefa) => !tarefa.completa);

  return (
    <ListaBase titulo="Incompletas" tarefas={tarefasIncompletas} />
  );
}
