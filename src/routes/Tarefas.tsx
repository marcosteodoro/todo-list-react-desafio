import { useState } from "react";
import ITarefa from "../interfaces/ITarefa";

interface ListaTarefasProps {
  mostrarCompletas: boolean;
}

export default function ListaTarefas(props: ListaTarefasProps) {
  const [tarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : [];
  });

  const tarefasFiltradas = props.mostrarCompletas
    ? tarefas.filter((tarefa) => tarefa.completa)
    : tarefas.filter((tarefa) => !tarefa.completa);

  const titulo = props.mostrarCompletas ? "Completas" : "Incompletas";

  return (
    <div>
      <h1>{titulo}</h1>
      <ul>
        {tarefasFiltradas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.tarefa}</li>
        ))}
      </ul>
    </div>
  );
}
