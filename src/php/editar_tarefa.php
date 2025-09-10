<?php
include 'db.php';

$id = $_POST['id'];
$novo_nome = $_POST['nome'];
$novo_custo = $_POST['custo'];
$nova_data = $_POST['data_limite'];

// Verifica se o novo nome já existe para outra tarefa
$result = pg_query($conn, "SELECT id FROM tarefas WHERE nome = '$novo_nome' AND id != $id");
if (pg_num_rows($result) > 0) {
	echo json_encode(["success" => false, "message" => "Nome já existe!"]);
	exit;
}

// Atualiza os dados da tarefa
$query = "UPDATE tarefas SET nome = '$novo_nome', custo = $novo_custo, data_limite = '$nova_data' WHERE id = $id";
if (pg_query($conn, $query)) {
	echo json_encode(["success" => true, "message" => "Tarefa editada com sucesso!"]);
} else {
	echo json_encode(["success" => false, "message" => "Erro ao editar tarefa."]);
}
?>
