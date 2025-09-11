<?php
include 'db.php';


$id = $_POST['id'];
$desfazer = isset($_POST['desfazer']) ? $_POST['desfazer'] : 0;


// Marca como pendente se desfazer, senão marca como concluída
$novo_status = $desfazer ? 'false' : 'true';
$query = "UPDATE tarefas SET concluida = $novo_status WHERE id = $id";
if (pg_query($conn, $query)) {
    echo json_encode(["success" => true, "message" => $novo_status == 'true' ? "Tarefa concluída!" : "Tarefa marcada como pendente!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao atualizar status da tarefa."]);
}
?>
