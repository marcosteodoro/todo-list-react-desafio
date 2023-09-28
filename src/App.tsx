import { useEffect, useState } from "react";

import { ListaTarefas } from "./components/ListaTarefas";
import { ITarefa } from "./interfaces/ITarefa";

export function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas?.length
      ? (JSON.parse(tarefasSalvas) as ITarefa[])
      : [];
  });

  const tarefasIncompletas = tarefas.filter((tarefa) => !tarefa.completa);
  const tarefasCompletas = tarefas.filter((tarefa) => tarefa.completa);

  const [textoNovaTarefa, setTextoNovaTarefa] = useState("");

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    document.title = `${tarefasIncompletas.length} tarefas incompletas!`;
  }, [tarefasIncompletas.length]);

  const handleNovaTarefa = (textoNovaTarefa: string) => {
    if (textoNovaTarefa.length === 0) {
      alert("Campo vazio");
      return;
    }

    setTarefas((oldTarefas) => [
      ...oldTarefas,
      {
        id: Date.now(),
        tarefa: textoNovaTarefa,
        completa: false,
      },
    ]);

    setTextoNovaTarefa("");
  };

  const handleTarefaCompleta = (tarefaAtualizar: ITarefa) => {
    setTarefas((oldTarefas) =>
      oldTarefas.map((tarefa) =>
        tarefa.id === tarefaAtualizar.id
          ? { ...tarefa, completa: !tarefa.completa }
          : tarefa
      )
    );
  };

  const handleApagarTarefa = (tarefaApagar: ITarefa) => {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== tarefaApagar.id)
    );
  };

  return (
    <div className="conteudo">
      <p>
        <label htmlFor="nova-tarefa">Adicionar Tarefa</label>

        <input
          id="nova-tarefa"
          type="text"
          value={textoNovaTarefa}
          onChange={(e) => setTextoNovaTarefa(e.currentTarget.value)}
        />

        <button
          id="botao-adicionar"
          onClick={() => handleNovaTarefa(textoNovaTarefa)}
          disabled={textoNovaTarefa.length === 0}
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
  );
}
