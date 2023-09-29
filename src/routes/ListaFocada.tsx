import { useState } from "react";
import ITarefa from "../interfaces/ITarefa";

interface ListaFocadaProps {
    titulo: string,
    completa: boolean
}

export default function ListaFocada(props: ListaFocadaProps) {
    const [tarefas] = useState<ITarefa[]>(() => {
        const tarefasSalvas = localStorage.getItem("tarefas");
        return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : []
    });

    const tarefasEmFoco = tarefas.filter(tarefa => props.completa ? tarefa.completa : !tarefa.completa);

    return (
        <div>
            <h1>{props.titulo}</h1>
            <ul>
                {tarefasEmFoco.map(tarefa => <li key={tarefa.id}>{tarefa.tarefa}</li>)}
            </ul>
        </div>
    );
}