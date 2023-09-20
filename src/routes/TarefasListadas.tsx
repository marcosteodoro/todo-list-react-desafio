import { useState } from "react";
import ITarefa from "../interfaces/ITarefa";

interface TarefasListadasProps {
  completas?: boolean;
}

export default function TarefasListadas(props: TarefasListadasProps) {
  const [tarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    const listaTarefas = tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : [];
    return listaTarefas.filter((t: ITarefa) =>
      props.completas ? t.completa : !t.completa
    );
  });

  return (
    <div>
      <h1>{props.completas ? "Completas" : "Incompletas"}</h1>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.tarefa}</li>
        ))}
      </ul>
    </div>
  );
}
