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
            <h4 id="link-label"><Link to={props.linkTitulo} className="link-offset-2 link-underline link-underline-opacity-0" >{props.titulo}</Link></h4>
            <ul id={props.divId}>
                {props.tarefas.map(tarefa => (
                    <li key={tarefa.id}>
                    <input type="checkbox" checked={tarefa.completa} onChange={() => handleTarefaCompleta(tarefa)}/>
                    {tarefa.completa ? <label><del>{tarefa.tarefa}</del></label> : <label>{tarefa.tarefa}</label>}
                    <button className="apagar btn btn-outline-danger" onClick={() => handleApagarTarefa(tarefa)}>Apagar</button>
                </li>
                ))}
            </ul>
        </>
    )
}