<?php
// /controllers/EstudianteController.php

include_once '../db/conexion.php';
include_once '../models/Estudiante.php';

$estudiante = new Estudiante($pdo);

// Obtener la acción desde la solicitud
$requestMethod = $_SERVER["REQUEST_METHOD"];
$input = json_decode(file_get_contents('php://input'), true);

switch ($requestMethod) {
    case 'GET':
        if (isset($_GET['id'])) {
            $data = $estudiante->obtenerPorId($_GET['id']);
            echo json_encode($data);
        } else {
            $data = $estudiante->obtenerTodos();
            echo json_encode($data);
        }
        break;
    
    case 'POST':
        if (isset($input['nombre'], $input['apellido'], $input['email'], $input['edad'])) {
            $success = $estudiante->crear($input['nombre'], $input['apellido'], $input['email'], $input['edad']);
            if ($success) {
                echo json_encode(["message" => "Alumno creado exitosamente."]);
            } else {
                echo json_encode(["message" => "Error al crear el alumno."]);
            }
        }
        break;
    
    case 'PUT':
        if (isset($input['id'], $input['nombre'], $input['apellido'], $input['email'], $input['edad'])) {
            $success = $estudiante->actualizar($input['id'], $input['nombre'], $input['apellido'], $input['email'], $input['edad']);
            if ($success) {
                echo json_encode(["message" => "Alumno actualizado exitosamente."]);
            } else {
                echo json_encode(["message" => "Error al actualizar el alumno."]);
            }
        }
        break;
    
    case 'DELETE':
        if (isset($_GET['id'])) {
            $success = $estudiante->eliminar($_GET['id']);
            if ($success) {
                echo json_encode(["message" => "Alumno eliminado exitosamente."]);
            } else {
                echo json_encode(["message" => "Error al eliminar el alumno."]);
            }
        }
        break;
    
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
?>
