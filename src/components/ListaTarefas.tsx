import { Link } from "react-router-dom"
import ITarefa from "../interfaces/ITarefa"

interface ListaTarefasProps {
    titulo: string,
    divId: string,
    tarefas: ITarefa[],
    handleTarefaCompleta: CallableFunction,
    handleApagarTarefa: CallableFunction,
    linkTitulo: string
}

export default function ListaTarefas(props: ListaTarefasProps) {
    const handleTarefaCompleta = (tarefa: ITarefa) => {
        props.handleTarefaCompleta(tarefa)
    }

    const handleApagarTarefa = (tarefa: ITarefa) => {
        props.handleApagarTarefa(tarefa)
    }

    return (
        <>
            <h3><Link to={props.linkTitulo}>{props.titulo}</Link></h3>
            <ul id={props.divId}>
                {props.tarefas.map(tarefa => (
                    <li key={tarefa.id}>
                    <input type="checkbox" checked={tarefa.completa} onChange={() => handleTarefaCompleta(tarefa)}/>
                    <label>{tarefa.completa ? <del>{tarefa.tarefa}</del> : tarefa.tarefa}</label>
                    <button className="apagar" onClick={() => handleApagarTarefa(tarefa)}>Apagar</button>
                </li>
                ))}
            </ul>
        </>
    )
}