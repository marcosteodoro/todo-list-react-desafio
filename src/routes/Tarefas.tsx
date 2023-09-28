import { useState } from "react";

import { ITarefa } from "../interfaces/ITarefa";

interface TarefasProps {
  completas: boolean;
}

export function Tarefas({ completas }: TarefasProps) {
  const [tarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length
      ? (JSON.parse(tarefasSalvas) as ITarefa[])
      : [];
  });

  const titulo = completas ? "Completas" : "Incompletas";

  const tarefasFiltradas = tarefas.filter(
    (tarefa) => tarefa.completa == completas
  );

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
