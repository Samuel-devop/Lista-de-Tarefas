<?php
$host = 'localhost'; // ou o IP do seu servidor PostgreSQL
$port = '5432'; // porta padrão do PostgreSQL
$dbname = 'listadetarefas';
$user = 'postgre';
$password = '1234';

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$conn) {
    die("Erro ao conectar ao banco de dados.");
}
?>