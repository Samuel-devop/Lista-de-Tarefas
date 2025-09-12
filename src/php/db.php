<?php
putenv('PGCONNECT_TIMEOUT=5'); // evita travar se algo estiver errado

// Se o Railway expuser DATABASE_URL, usamos direto (é o mais robusto)
$url = getenv('DATABASE_URL');
if ($url) {
    if (strpos($url, 'sslmode=') === false) {
        $url .= (str_contains($url, '?') ? '&' : '?') . 'sslmode=require';
    }
    $conn = @pg_connect($url);
} else {
    // Fallback para PG* individuais
    $host     = trim((string)getenv('PGHOST'));
    $port     = trim((string)(getenv('PGPORT') ?: '5432'));
    $dbname   = trim((string)getenv('PGDATABASE'));
    $user     = trim((string)getenv('PGUSER'));
    $password = trim((string)getenv('PGPASSWORD'));

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
    $err = error_get_last();
    error_log('PG CONNECT ERROR: ' . ($err['message'] ?? 'desconhecido'));
    http_response_code(500);
    die('Erro ao conectar ao banco de dados.');
}
