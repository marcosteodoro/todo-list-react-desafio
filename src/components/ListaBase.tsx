import React from "react";
import ITarefa from "../interfaces/ITarefa";

interface ListaTarefasProps {
  titulo: string;
  tarefas: ITarefa[];
}

const ListaTarefas: React.FC<ListaTarefasProps> = ({ titulo, tarefas }) => {
  return (
    <div>
      <h1>{titulo}</h1>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.tarefa}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTarefas;