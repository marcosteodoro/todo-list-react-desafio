import { useEffect, useState } from "react"
import ITarefa from "./interfaces/ITarefa"
import ListaTarefas from "./components/ListaTarefas"

function App() {
  const [textoNovaTarefa, setTextoNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const handleNovaTarefa = (texto: string) => {
    if (texto.trim() === "") {
      window.alert("⚠️ Insira uma tarefa válida");
      return;
    }

    const novaTarefa: ITarefa = {
      id: Date.now(),
      tarefa: texto,
      completa: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTextoNovaTarefa("");
  };

  const handleTarefaCompleta = (tarefaAtualizar: ITarefa) => {
    const tarefasAtualizadas = tarefas.map((tarefa) =>
      tarefa.id === tarefaAtualizar.id
        ? { ...tarefa, completa: !tarefa.completa }
        : tarefa
    );

    setTarefas(tarefasAtualizadas);
  };

  const handleApagarTarefa = (tarefaApagar: ITarefa) => {
    const tarefasAtualizadas = tarefas.filter(
      (tarefa) => tarefa.id !== tarefaApagar.id
    );
    setTarefas(tarefasAtualizadas);
  };

  const tarefasIncompletas = tarefas.filter((tarefa) => !tarefa.completa);
  const tarefasCompletas = tarefas.filter((tarefa) => tarefa.completa);
  const isBotaoAdicionarDesabilitado = textoNovaTarefa.trim() === "";

  return (
    <div className="conteudo">
      <p>
        <label htmlFor="nova-tarefa">Adicionar Tarefa</label>
        <input
          id="nova-tarefa"
          type="text"
          value={textoNovaTarefa}
          onChange={(e) => setTextoNovaTarefa(e.target.value)}
        />
        <button
          id="botao-adicionar"
          onClick={() => handleNovaTarefa(textoNovaTarefa)}
          disabled={isBotaoAdicionarDesabilitado}
        >
          Adicionar
        </button>
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
