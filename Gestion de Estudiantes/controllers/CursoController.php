<?php
// /controllers/CursoController.php

include_once '../db/conexion.php';
include_once '../models/Curso.php';

$curso = new Curso($pdo);

// Obtener la acción desde la solicitud
$requestMethod = $_SERVER["REQUEST_METHOD"];
$input = json_decode(file_get_contents('php://input'), true);

switch ($requestMethod) {
    case 'GET':
        $data = $curso->obtenerTodos();
        echo json_encode($data);
        break;
    
    // Implementa otras acciones si es necesario
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
?>
