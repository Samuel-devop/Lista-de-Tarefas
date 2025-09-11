# ✅ Lista de Tarefas (Fatto)

Este é um pequeno sistema web de gerenciamento de tarefas, desenvolvido como exercício prático. Ele permite cadastrar, listar, editar, excluir e reordenar tarefas por prioridade.

---

## 📋 Funcionalidades

### 🗂 Tabela: `Tarefas`
Cada tarefa possui os seguintes campos:

- `ID`: Identificador único (chave primária)
- `Nome`: Nome da tarefa (único)
- `Custo`: Valor numérico associado à tarefa
- `Data Limite`: Data limite para conclusão
- `Ordem de apresentação`: Campo numérico usado para ordenar as tarefas na tela (único e não repetido)

---

### 🏠 Página Principal

A página principal lista todas as tarefas do sistema, com as seguintes regras:

- Lista **todos os registros da tabela Tarefas**, exceto o campo "Ordem de apresentação"
- As tarefas são **ordenadas por "Ordem de apresentação"**
- Se o **custo ≥ 1000**, a tarefa é **exibida de forma diferenciada**
- Cada tarefa exibe dois ícones à direita:
  - ✏️ Editar
  - 🗑️ Excluir

---

### 🧹 Excluir Tarefa

- Ao clicar no ícone de excluir (🗑️), é exibida uma mensagem de confirmação **"Deseja realmente excluir? (Sim/Não)"**
- Se confirmado, o registro é removido do banco

---

### ✏️ Editar Tarefa

- O usuário pode **editar diretamente na tela principal** os campos:
  - `Nome`
  - `Custo`
  - `Data Limite`
- Restrições:
  - Não é permitido repetir o nome de uma tarefa já existente
  - A verificação de nomes é feita antes de salvar a alteração

---

### ➕ Incluir Nova Tarefa

- Os campos informados pelo usuário são:
  - `Nome`
  - `Custo`
  - `Data Limite`
- O sistema gera automaticamente:
  - `ID`
  - `Ordem de apresentação` (adicionado como o **último** da lista)
- Não pode haver duas tarefas com o mesmo nome

---

### 🔀 Reordenar Tarefas

A ordem das tarefas pode ser alterada de duas formas:

#### 1. **Botões "Subir" / "Descer"**

- Cada tarefa possui botões para **mover para cima ou para baixo**
- A primeira tarefa **não pode subir**
- A última tarefa **não pode descer**

#### 2. **Drag and Drop**

- O usuário pode **arrastar** uma tarefa para a posição desejada com o mouse
- A nova ordem é salva automaticamente

---

## 💽 Banco de Dados

O banco de dados está disponível no arquivo:

Lista-de-tarefas/
├── database/
│   └── listadetarefasDB.sql

## 🛠️ Como aplicar o banco de dados no pgAdmin (PostgreSQL)

Se você estiver usando o **pgAdmin**, siga os passos abaixo para importar o arquivo `tarefas.sql` e configurar o banco de dados do projeto:

### ✅ Pré-requisitos
- Ter o PostgreSQL e o pgAdmin instalados
- Já ter criado um banco de dados (ex: `lista_tarefas`)
- Ter o arquivo `tarefas.sql` salvo no seu projeto (pasta `/database`)

---

### 📥 Passo a passo para importar o `.sql` no pgAdmin

1. **Abra o pgAdmin** e conecte-se ao seu servidor PostgreSQL.

2. No painel à esquerda, **expanda "Servers" > seu servidor > Databases**.

3. **Clique com o botão direito** no banco de dados onde deseja importar (ex: `lista_tarefas`) e selecione **"Query Tool" (Ferramenta de Consulta)**.

4. No editor que abrir, clique no botão de **"abrir arquivo"** (ícone de pasta na barra superior).

5. **Selecione o arquivo `tarefas.sql`** do seu projeto (ex: `database/tarefas.sql`).

6. O conteúdo do arquivo será carregado no editor. Agora, clique no botão **"Executar"** (ícone de raio ou "Execute").

7. Após a execução, você verá a mensagem de sucesso e a tabela `Tarefas` estará criada no seu banco.

---

### 🧪 Verifique se funcionou

No painel à esquerda:

- Vá até: `Databases > lista_tarefas > Schemas > public > Tables`
- A tabela `Tarefas` deve estar listada lá

Clique com o botão direito sobre ela e selecione **"View/Edit Data" > "All Rows"** para ver os dados (caso tenha algum de exemplo no `.sql`).

---

### 🧱 Estrutura da tabela esperada

```sql
CREATE TABLE Tarefas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    custo DECIMAL(10,2) NOT NULL,
    data_limite DATE NOT NULL,
    ordem_apresentacao INT NOT NULL UNIQUE
);


