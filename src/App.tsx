import { useEffect, useState } from "react"
import ITarefa from "./interfaces/ITarefa"
import ListaTarefas from "./components/ListaTarefas"

function App() {
  const [textoNovaTarefa, setTextoNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : []
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    document.title = `${tarefas.filter(tarefa => !tarefa.completa).length} tarefas incompletas!`;
  }, [tarefas])

  const tarefasIncompletas: ITarefa[] = tarefas.filter(tarefa => !tarefa.completa);
  const tarefasCompletas: ITarefa[] = tarefas.filter(tarefa => tarefa.completa);

  const handleNovaTarefa = (textoNovaTarefa: string) => {
    if (!textoNovaTarefa.trim()) {
      window.alert("O texto da nova tarefa não pode ser vazio!")
      setTextoNovaTarefa('');
      return;
    }

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
          onKeyUp={e => {if (e.key === "Enter") handleNovaTarefa(textoNovaTarefa)}}
        />
        <button
          id="botao-adicionar"
          onClick={() => handleNovaTarefa(textoNovaTarefa)}
          disabled={!textoNovaTarefa.trim()}
        >Adicionar</button>
      </p>
      <ListaTarefas
        titulo="Tarefas incompletas"
        divId="incompletas"
        tarefas={tarefasIncompletas}
        handleTarefaCompleta={handleTarefaCompleta}
        handleApagarTarefa={handleApagarTarefa}
        linkTitulo="incompletas"
      />
      <ListaTarefas
        titulo="Tarefas completas"
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
