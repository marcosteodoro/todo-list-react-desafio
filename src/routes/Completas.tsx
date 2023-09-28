import { useState } from "react";
import { ITarefa } from "../interfaces/ITarefa";

export function Completas() {
  const [tarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : [];
  });

  const tarefasCompletas = tarefas.filter((tarefa) => tarefa.completa);

  return (
    <div>
      <h1>Completas</h1>
      <ul>
        {tarefasCompletas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.tarefa}</li>
        ))}
      </ul>
    </div>
  );
}
