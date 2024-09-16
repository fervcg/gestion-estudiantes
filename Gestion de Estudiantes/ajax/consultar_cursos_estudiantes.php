<?php
// /ajax/consultar_cursos_estudiante.php

include_once '../db/conexion.php';

$input = json_decode(file_get_contents('php://input'), true);

if(isset($input['estudiante_id'])) {
    $estudianteId = $input['estudiante_id'];
    $stmt = $pdo->prepare("SELECT c.id, c.nombre_curso, c.descripcion, c.duracion 
                           FROM Curso c 
                           JOIN Estudiante_Curso ec ON c.id = ec.curso_id 
                           WHERE ec.estudiante_id = :estudianteId");
    $stmt->execute([':estudianteId' => $estudianteId]);
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($cursos);
} else {
    echo json_encode(["error" => "ID de estudiante no proporcionado."]);
}
?>
