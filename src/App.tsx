import { useEffect, useState } from "react"
import ITarefa from "./interfaces/ITarefa"
import ListaTarefas from "./components/ListaTarefas"

function App() {
  const [textoNovaTarefa, setTextoNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : []
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    const quantidadeTarefasIncompletas = tarefas.filter(tarefa => !tarefa.completa).length;
    document.title = `${quantidadeTarefasIncompletas} tarefas incompletas!`
  }, [tarefas])

  let tarefasIncompletas: ITarefa[] = [];
  let tarefasCompletas: ITarefa[] = [];

  tarefas.forEach(tarefa => {
    if (!tarefa.completa) {
      tarefasIncompletas.push(tarefa);
    }
  });

  tarefas.forEach(tarefa => {
    if (tarefa.completa) {
      tarefasCompletas.push(tarefa);
    }
  });

  const handleNovaTarefa = (textoNovaTarefa: string) => {
    setTarefas(tarefas.concat({
      id: Date.now(),
      tarefa: textoNovaTarefa,
      completa: false
    }));

    textoNovaTarefa = '';
  }

  const handleTarefaCompleta = (tarefaAtualizar: ITarefa) => {
    const tarefasAtualizadas = tarefas.map(tarefa => (
      tarefa.id === tarefaAtualizar.id
        ? { ...tarefa, completa: !tarefa.completa }
        : tarefa
    ))

    setTarefas(tarefasAtualizadas);
  }

  const handleApagarTarefa = (tarefaApagar: ITarefa) => {
    const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.id !== tarefaApagar.id)
    setTarefas(tarefasAtualizadas);
  }

  return (
    <div className="conteudo">
      <p>
            <label htmlFor="nova-tarefa">Adicionar Tarefa</label>
            <input
                id="nova-tarefa"
                type="text"
                value={textoNovaTarefa}
                onChange={e => setTextoNovaTarefa(e.target.value)}
            />
            <button
                id="botao-adicionar"
                onClick={() => handleNovaTarefa(textoNovaTarefa)}
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
