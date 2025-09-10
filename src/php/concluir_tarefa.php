<?php
include 'db.php';

$id = $_POST['id'];

// Marca/desmarca como concluída
$result = pg_query($conn, "SELECT concluida FROM tarefas WHERE id = $id");
$row = pg_fetch_assoc($result);
if ($row) {
    $novo_status = ($row['concluida'] == 't') ? 'false' : 'true';
    $query = "UPDATE tarefas SET concluida = $novo_status WHERE id = $id";
    if (pg_query($conn, $query)) {
        echo json_encode(["success" => true, "message" => $novo_status == 'true' ? "Tarefa concluída!" : "Tarefa marcada como pendente!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao atualizar status da tarefa."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Tarefa não encontrada."]);
}
?>
