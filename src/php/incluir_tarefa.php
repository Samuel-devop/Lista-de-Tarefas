<?php
include 'db.php';

$nome = $_POST['nome'];
$custo = $_POST['custo'];
$data_limite = $_POST['data_limite'];

// Verifica se o nome já existe
$result = pg_query($conn, "SELECT id FROM tarefas WHERE nome = '$nome'");
if (pg_num_rows($result) > 0) {
    echo json_encode(["success" => false, "message" => "Nome já existe!"]);
    exit;
}

// Descobre a última ordem de apresentação
$result = pg_query($conn, "SELECT MAX(ordem_apresentacao) AS max_ordem FROM tarefas");
$row = pg_fetch_assoc($result);
$ordem = $row['max_ordem'] + 1;

$query = "INSERT INTO tarefas (nome, custo, data_limite, ordem_apresentacao) VALUES ('$nome', $custo, '$data_limite', $ordem)";
echo "Tarefa incluída com sucesso!";
if (pg_query($conn, $query)) {
    echo json_encode(["success" => true, "message" => "Tarefa incluída com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao incluir tarefa."]);
}
?>