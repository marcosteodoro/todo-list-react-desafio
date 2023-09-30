import { useEffect, useState } from "react";
import ITarefa from "./interfaces/ITarefa";
import ListaTarefas from "./components/ListaTarefas";

function App() {
  const [textoNovaTarefa, setTextoNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  // Use useEffect para atualizar o título da página
  useEffect(() => {
    const quantidadeTarefasIncompletas = tarefas.filter(
      (tarefa) => !tarefa.completa
    ).length;
    document.title = `${quantidadeTarefasIncompletas} tarefas incompletas!`;
  }, [tarefas]);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const handleNovaTarefa = (textoNovaTarefa: string) => {
    if (textoNovaTarefa.trim() === "") {
      alert("Por favor, insira alguma descrição para a tarefa.");
      return; // Impede a adição de tarefas em branco
    }

    setTarefas([
      ...tarefas,
      {
        id: Date.now(),
        tarefa: textoNovaTarefa,
        completa: false,
      },
    ]);
    
    setTextoNovaTarefa(""); // Limpa o campo de entrada
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

  const isTextoInvalido = textoNovaTarefa.trim() === "";

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
          onClick={() => {
            handleNovaTarefa(textoNovaTarefa);
          }}
          disabled={isTextoInvalido}
        >
          Adicionar
        </button>
      </p>
      <ListaTarefas
        titulo="Tarefas"
        divId="incompletas"
        tarefas={tarefas.filter((tarefa) => !tarefa.completa)}
        handleTarefaCompleta={handleTarefaCompleta}
        handleApagarTarefa={handleApagarTarefa}
        linkTitulo="incompletas"
      />
      <ListaTarefas
        titulo="Completas"
        divId="completas"
        tarefas={tarefas.filter((tarefa) => tarefa.completa)}
        handleTarefaCompleta={handleTarefaCompleta}
        handleApagarTarefa={handleApagarTarefa}
        linkTitulo="completas"
      />
    </div>
  );
}

export default App;