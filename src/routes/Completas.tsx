import { useState } from "react";
import ITarefa from "../interfaces/ITarefa";
import ListaBase from "../components/ListaBase";

export default function Completas() {
  const [tarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : [];
  });

  const tarefasCompletas = tarefas.filter((tarefa) => tarefa.completa);

  return (
    <ListaBase titulo="Completas" tarefas={tarefasCompletas} />
  );
}