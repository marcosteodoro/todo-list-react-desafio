import { useState } from "react";
import ITarefa from "../interfaces/ITarefa";

interface TarefasProps {
    titulo: string;
    toDo: boolean;
}

export default function Tarefas(props: TarefasProps) {
    const [tarefas] = useState<ITarefa[]>(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : []
    });

    const listaTarefas = tarefas.filter(tarefa => !tarefa.completa === props.toDo);

    return (
        <div>
            <h1>{props.titulo}</h1>
            <ul>
                {listaTarefas.map(tarefa => <li key={tarefa.id}>{tarefa.tarefa}</li>)}
            </ul>
        </div>
    );
}