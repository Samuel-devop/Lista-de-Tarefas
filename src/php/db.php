<?php
putenv('PGCONNECT_TIMEOUT=5'); // evita travar se host/porta estiverem errados

$host     = getenv('PGHOST');
$port     = getenv('PGPORT') ?: '5432';
$dbname   = getenv('PGDATABASE');
$user     = getenv('PGUSER');
$password = getenv('PGPASSWORD');

$conn = pg_connect(
  "host={$host} port={$port} dbname={$dbname} user={$user} password={$password} sslmode=require"
);

if (!$conn) {
  error_log('PG CONNECT ERROR: ' . pg_last_error());
  http_response_code(500);
  die('Erro ao conectar ao banco de dados.');
}
