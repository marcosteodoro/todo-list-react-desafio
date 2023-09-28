import { useState } from "react";
import { ITarefa } from "../interfaces/ITarefa";

export function Incompletas() {
  const [tarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : [];
  });

  const tarefasIncompletas = tarefas.filter((tarefa) => !tarefa.completa);

  return (
    <div>
      <h1>Incompletas</h1>
      <ul>
        {tarefasIncompletas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.tarefa}</li>
        ))}
      </ul>
    </div>
  );
}
