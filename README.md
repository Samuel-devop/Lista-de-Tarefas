# Lista-de-Tarefas
Aqui é o repo onde eu mantenho uma lista de tarefas

**Projeto - Sistema Lista de Tarefas (Fatto)**



*Fazer: Sistema web para cadastro de tarefas*

*Entregar: link (github)*



**Tabela Tarefas**

. Identificador (chave primária/ID)

. Nome

. Custo

. Data limite

. Ordem de apresentação (campo numérico, não repetido que serve para ordenar os registros na tela)





**# Lista de Tarefas**

É a página principal do sistema.

. Deve listar todos os registros da tabela "Tarefas" (um abaixo do outro).

. Todos os campos, exceto "Ordem de apresentação", devem ser apresentados.

. As tarefas devem ser apresentadas ordenadas pelo campo "Ordem de apresentação".

. Se o custo da tarefa é maior ou igual a 1000, deverá ser apresentada de forma

diferente.

. Ao lado direito de cada registro devem ser apresentados dois ícones, um para executar a função de "Editar" e outro para a função de "Excluir" registro.



**# Excluir**

A função deve excluir o registro da Tarefa escolhida.

. É necessário apresentar uma mensagem de confirmação (Sim/Não) para a realização da

exclusão.



\# **Editar**

A função deve editar o registro da Tarefa escolhida.

. Só é possível alterar o "Nome", o "Custo" e a "Data Limite".

. É necessário verificar se o novo nome da tarefa já existe na base de dados. Se já existir, a alteração não poderá ser feita.

**A implementação é feita assim:** A edição é feita diretamente na tela principal, onde os três campos são habilitados para edição.



**# Incluir**

A função deve permitir a inclusão de uma nova tarefa.

. Apenas os campos "Nome", "Custo" e "Data Limite" são informados pelo usuário.

. Os demais campos são gerados automaticamente pelo sistema.

. O registro recém-criado será o último na ordem de apresentação.

. Não pode haver duas tarefas com o mesmo nome.



**# Reordenação das tarefas**

A função deve permitir que o usuário possa alterar a ordem de apresentação de uma tarefa.

. Com o uso do mouse, o usuário arrasta uma tarefa para cima ou para baixo, soltando na

posição desejada. Estilo drag-and-drop.

 

. Em cada linha (registro) deve ter dois botões, uma para "subir" a tarefa na ordem de

apresentação e outro para "descer". Obviamente a primeira tarefa não poderá "subir"

e nem a última poderá "descer".

