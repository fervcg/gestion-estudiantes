<?php
// /ajax/obtener_estudiante.php

header('Content-Type: application/json');

include_once '../db/conexion.php';

if(isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM Estudiante WHERE id = :id");
    $stmt->execute([':id' => $id]);
    $estudiante = $stmt->fetch(PDO::FETCH_ASSOC);
    if($estudiante) {
        echo json_encode($estudiante);
    } else {
        echo json_encode(["error" => "Alumno no encontrado."]);
    }
} else {
    echo json_encode(["error" => "ID del alumno no proporcionado."]);
}
?>
