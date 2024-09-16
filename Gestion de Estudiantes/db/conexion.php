<?php
// Configuración de la base de datos
$dsn = 'mysql:host=localhost;dbname=gestion_estudiantes';
$username = 'root';
$password = '1234';

try {
    // Inicializar PDO
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Conexión fallida: ' . $e->getMessage());
}
?>
