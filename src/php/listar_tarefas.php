<?php
include 'db.php';

$result = pg_query($conn, "SELECT id, nome, custo, data_limite, concluida FROM tarefas ORDER BY ordem_apresentacao");
$tarefas = [];
while ($row = pg_fetch_assoc($result)) {
    // Garante que concluida seja booleano
    $row['concluida'] = ($row['concluida'] === 't' || $row['concluida'] === true || $row['concluida'] == 1);
    $tarefas[] = $row;
}
echo json_encode($tarefas);

if (!$result) {
    echo json_encode(["success" => false, "message" => "Erro ao listar tarefas."]);
    exit;
}
?>