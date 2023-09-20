import { useEffect, useState } from "react";
import ITarefa from "./interfaces/ITarefa";
import ListaTarefas from "./components/ListaTarefas";

function App() {
  // 2 - Criamos novo estado pra nova tarefa
  const [textoNovaTarefa, setTextoNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // 3 - funcao de criacao de nova tarefa, validacao 
  const handleNovaTarefa = (textoNovaTarefa: string) => {
    if (!textoNovaTarefa) {
      window.alert("Insira o nome de uma tarefa antes de continuar");
      return;
    }

    setTarefas(
      tarefas.concat({
        id: Date.now(),
        tarefa: textoNovaTarefa,
        completa: false,
      })
    );

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

  useEffect(() => {
    const quantidadeTarefasIncompletas = tarefas.filter(
      (tarefa) => !tarefa.completa
    ).length;
    document.title = `${quantidadeTarefasIncompletas} tarefas incompletas!`;
  }, [tarefas]);

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
          disabled={!textoNovaTarefa}
          onClick={() => handleNovaTarefa(textoNovaTarefa)}
        >
          Adicionar
        </button>
      </p>
      <ListaTarefas
        titulo="Tarefas"
        divId="incompletas"
        tarefas={tarefas.filter((t) => !t.completa)}
        handleTarefaCompleta={handleTarefaCompleta}
        handleApagarTarefa={handleApagarTarefa}
        linkTitulo="incompletas"
      />
      <ListaTarefas
        titulo="Completas"
        divId="completas"
        tarefas={tarefas.filter((t) => t.completa)}
        handleTarefaCompleta={handleTarefaCompleta}
        handleApagarTarefa={handleApagarTarefa}
        linkTitulo="completas"
      />
    </div>
  );
}

export default App;
