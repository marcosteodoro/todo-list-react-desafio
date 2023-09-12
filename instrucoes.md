# Instruções
## Estamos com alguns problemas nesse projeto, vamos corrigí-los?

1. A lista de tarefas está separada por tarefas completas e incompletas no ```src/App.tsx```, porém não parece a melhor maneira de fazer isso... Consegue **filtrar** essas informações de alguma outra maneira?
2. O input de adicionar tarefa não está funcionando, ele parece não se *lembrar* o valor do estado do texto da nova tarefa. Vamos corrigí-lo?
3. Agora que o input foi corrigido, notei mais um problema. Acredito que tenha faltado uma validação na hora de salvar a tarefa. O mesmo está cadastrando tarefas em branco. Podemos adicionar uma validação antes de salvar a mesma? Um alert resolve.
4. Poderíamos deixar o botão de adicionar tarefas desabilitado seguindo o cenário de cima...
5. Após criar uma nova tarefa seria interessante limparmos o input da nova tarefa. Será que conseguimos fazer isso? Acredito que daria para definir o valor do ```textoNovaTarefa``` como uma string vazia
6. Na lista de tarefas completas, em nossa página inicial, gostaria que o nome da mesma ficasse dentro de uma tag ```<del></del>```. Será que é possível? (Lembrando que é só para as completas 😁)
7. Parece que tem algo errado com a [página de tarefas completas](http://localhost:5173/completas)... Ela está carregando tarefas incompletas. Consegue corrigir?
8. E falando nisso, o conteúdo dos arquivos ```src/routes/Completas``` e ```src/routes/Incompletas``` parece estar duplicado. Poderíamos componentizá-lo, utilizando props para dinamizar as diferenças.
9. O title da página não parece estar atualizando da maneira como gostaríamos. Deveria contabilizar a quantidade de tarefas incompletas, mas não está batendo. Será que conseguimos usar um side-effect para sincronizar isso com a atualização das tarefas? Podemos usar um *```useEffect```* para já carregar na primeira renderização da página e na atualização das tarefas.