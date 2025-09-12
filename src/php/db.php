<?php
// Evita travar se houver problema de rede/host
putenv('PGCONNECT_TIMEOUT=5');

$url = trim((string) getenv('DATABASE_URL'));

// Normaliza o esquema (Railway às vezes fornece "postgresql://")
if ($url && str_starts_with($url, 'postgresql://')) {
  $url = 'postgres://' . substr($url, strlen('postgresql://'));
}

// Garante SSL
if ($url && strpos($url, 'sslmode=') === false) {
  $url .= (str_contains($url, '?') ? '&' : '?') . 'sslmode=require';
}

if ($url) {
  $conn = @pg_connect($url);
} else {
  // Fallback para PG* individuais, se um dia você preferir usar variáveis separadas
  $host     = trim((string) getenv('PGHOST'));
  $port     = trim((string) (getenv('PGPORT') ?: '5432'));
  $dbname   = trim((string) getenv('PGDATABASE'));
  $user     = trim((string) getenv('PGUSER'));
  $password = trim((string) getenv('PGPASSWORD'));

  $parts = [];
  if ($host !== '')      $parts[] = "host={$host}";
  if ($port !== '')      $parts[] = "port={$port}";
  if ($dbname !== '')    $parts[] = "dbname={$dbname}";
  if ($user !== '')      $parts[] = "user={$user}";
  if ($password !== '')  $parts[] = "password={$password}";
  $parts[] = "sslmode=require";

  $conn = @pg_connect(implode(' ', $parts));
}

if (!$conn) {
  $last = error_get_last();
  // Loga motivo real no Deploy Log do Railway
  error_log('PG CONNECT ERROR: ' . ($last['message'] ?? 'desconhecido'));
  http_response_code(500);
  die('Erro ao conectar ao banco de dados.');
}
