import { useState } from "react";
import ITarefa from "../interfaces/ITarefa";

interface StatusTarefaProps {
    titulo: string,
    completa: boolean
}

export default function StatusTarefa(props: StatusTarefaProps) {
    const [tarefas] = useState<ITarefa[]>(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : []
    });

    const tarefasStatus = tarefas.filter(tarefa => props.completa ? tarefa.completa : !tarefa.completa);

    return (
        <div className="conteudo">
            <h1>{props.titulo}</h1>
            <ul>
                {tarefasStatus.map(tarefa => <li key={tarefa.id}>{tarefa.tarefa}</li>)}
            </ul>
        </div>
    );
}