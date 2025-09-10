<?php
include 'db.php';

$id = $_POST['id'];

// Exclui a tarefa pelo id
$query = "DELETE FROM tarefas WHERE id = $id";
if (pg_query($conn, $query)) {
	echo json_encode(["success" => true, "message" => "Tarefa excluída com sucesso!"]);
} else {
	echo json_encode(["success" => false, "message" => "Erro ao excluir tarefa."]);
}
?>
