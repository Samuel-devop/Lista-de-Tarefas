<?php
include 'db.php';

$result = pg_query($conn, "SELECT id, nome, custo, data_limite FROM tarefas ORDER BY ordem_apresentacao");
$tarefas = [];
while ($row = pg_fetch_assoc($result)) {
    $tarefas[] = $row;
}
echo json_encode($tarefas);

if (!$result) {
    echo json_encode(["success" => false, "message" => "Erro ao listar tarefas."]);
    exit;
}
?>