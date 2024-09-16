<?php
// /ajax/consultar_estudiantes_curso.php

include_once '../db/conexion.php';

$input = json_decode(file_get_contents('php://input'), true);

if(isset($input['curso_id'])) {
    // Obtener los estudiantes por curso
    $cursoId = $input['curso_id'];
    $stmt = $pdo->prepare("SELECT e.id, e.nombre, e.apellido, e.email, e.edad 
                           FROM Estudiante e 
                           JOIN Estudiante_Curso ec ON e.id = ec.estudiante_id 
                           WHERE ec.curso_id = :cursoId");
    $stmt->execute([':cursoId' => $cursoId]);
    $estudiantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($estudiantes);

} else {
    // Si no se proporciona curso_id, devolver la lista de cursos con sus IDs
    $stmt = $pdo->query("SELECT id, nombre FROM Curso");
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($cursos) {
        echo json_encode($cursos);
    } else {
        echo json_encode(["error" => "No hay cursos disponibles."]);
    }
}
?>
