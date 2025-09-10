<?php
include 'db.php';

// Recebe o id da tarefa e a nova ordem via POST
$id = $_POST['id'];
$nova_ordem = $_POST['nova_ordem'];

// Busca a tarefa que está na posição desejada
$result = pg_query($conn, "SELECT id FROM tarefas WHERE ordem_apresentacao = $nova_ordem");
$row = pg_fetch_assoc($result);

if ($row) {
	$id_troca = $row['id'];
	// Troca as ordens entre as duas tarefas
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = -1 WHERE id = $id_troca");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = (SELECT ordem_apresentacao FROM tarefas WHERE id = $id) WHERE id = $id_troca");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	pg_query($conn, "UPDATE tarefas SET ordem_apresentacao = $nova_ordem WHERE id = $id");
	echo json_encode(["success" => true, "message" => "Tarefas reordenadas com sucesso!"]);
} else {
	echo json_encode(["success" => false, "message" => "Erro ao reordenar tarefas."]);
}
?>
