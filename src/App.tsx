import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import ITarefa from "./interfaces/ITarefa"
import ListaTarefas from "./components/ListaTarefas"

function App() {
  const [textoNovaTarefa, setTextoNovaTarefa] = useState('');
  // const [desabilitarBotao, setDesabilitarBotao] = useState(true)
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : []
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas])

  const tarefasIncompletas: ITarefa[] = tarefas.filter(tarefa => !tarefa.completa);
  const tarefasCompletas: ITarefa[] = tarefas.filter(tarefa => tarefa.completa);

  const validaTarefa = () => {
    if (textoNovaTarefa.length < 1 || textoNovaTarefa.trim().length < 1){
     alert('Tarefa em branco')
     return false
    } 
    return true
  }

  const disableButton = textoNovaTarefa.length < 1 || textoNovaTarefa.trim().length < 1;

  const handleNovaTarefa = (textoNovaTarefa: string) => {
    validaTarefa() && 
    setTarefas(tarefas.concat({
      id: Date.now(),
      tarefa: textoNovaTarefa,
      completa: false
    }));
    setTextoNovaTarefa('');
  }

  const handleTarefaCompleta = (tarefaAtualizar: ITarefa) => {
    const tarefasAtualizadas = tarefas.map(tarefa => (
      tarefa.id === tarefaAtualizar.id
        ? { ...tarefa, completa: !tarefa.completa }
        : tarefa
    ))

    
    setTarefas(tarefasAtualizadas);

    const quantidadeTarefasIncompletas = tarefasAtualizadas.filter(tarefa => !tarefa.completa).length;
    document.title = `${quantidadeTarefasIncompletas} tarefas incompletas!`
  }

  const handleApagarTarefa = (tarefaApagar: ITarefa) => {
    const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.id !== tarefaApagar.id)
    setTarefas(tarefasAtualizadas);
  }

  return (
    <div className="conteudo">
      <p>
            <label htmlFor="nova-tarefa" className="d-flex flex-row space-between">Adicionar Tarefa</label>
            <input
                id="nova-tarefa"
                type="text"
                value={textoNovaTarefa}
                onChange={e => setTextoNovaTarefa(e.target.value)}
            />
            <button
                id="botao-adicionar"
                className="btn btn-outline-primary"
                onClick={() => handleNovaTarefa(textoNovaTarefa)}
                disabled={disableButton}
            >Adicionar</button>
        </p>
        <ListaTarefas
          titulo="Tarefas"
          divId="incompletas"
          tarefas={tarefasIncompletas}
          handleTarefaCompleta={handleTarefaCompleta}
          handleApagarTarefa={handleApagarTarefa}
          linkTitulo="incompletas"
        />
        <ListaTarefas
          titulo="Completas"
          divId="completas"
          tarefas={tarefasCompletas}
          handleTarefaCompleta={handleTarefaCompleta}
          handleApagarTarefa={handleApagarTarefa}
          linkTitulo="completas"
        />
    </div>
  )
}

export default App
