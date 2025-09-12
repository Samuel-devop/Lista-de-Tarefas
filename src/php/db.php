<?php
$host = 'containers-us-west-158.railway.app'; // ou o IP do seu servidor PostgreSQL
$port = '7999'; // porta padrão do PostgreSQL
$dbname = 'railway';
$user = 'postgres';
$password = 'VzcZvQOaRqfFCMmnQVhAToRSlxthwaMv';

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
if (!$conn) {
    die("Erro ao conectar ao banco de dados.");
}
?>