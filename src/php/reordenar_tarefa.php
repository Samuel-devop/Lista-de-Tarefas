<?php
include 'db.php';

// Recebe o id da tarefa e a nova ordem via POST

$id = $_POST['id'];
$ordem = $_POST['ordem'];
$id_alvo = $_POST['id_alvo'];
$ordem_alvo = $_POST['ordem_alvo'];




// Troca as ordens entre as duas tarefas
$ok1 = pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = -1 WHERE id = $id_alvo");
$ok2 = pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $ordem_alvo WHERE id = $id");
$ok3 = pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $ordem WHERE id = $id_alvo");
if ($ok1 && $ok2 && $ok3) {
	echo json_encode(["success" => true, "message" => "Tarefas reordenadas com sucesso!"]);
} else {
	echo json_encode(["success" => false, "message" => "Erro ao reordenar tarefas."]);
}
?>
