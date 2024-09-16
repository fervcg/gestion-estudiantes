<?php
// /models/Estudiante.php

class Estudiante {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function obtenerTodos() {
        $stmt = $this->pdo->prepare("SELECT * FROM Estudiante");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crear($nombre, $apellido, $email, $edad) {
        $stmt = $this->pdo->prepare("INSERT INTO Estudiante (nombre, apellido, email, edad) VALUES (:nombre, :apellido, :email, :edad)");
        return $stmt->execute([
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':email' => $email,
            ':edad' => $edad
        ]);
    }

    public function obtenerPorId($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM Estudiante WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function actualizar($id, $nombre, $apellido, $email, $edad) {
        $stmt = $this->pdo->prepare("UPDATE Estudiante SET nombre = :nombre, apellido = :apellido, email = :email, edad = :edad WHERE id = :id");
        return $stmt->execute([
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':email' => $email,
            ':edad' => $edad,
            ':id' => $id
        ]);
    }

    public function eliminar($id) {
        $stmt = $this->pdo->prepare("DELETE FROM Estudiante WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
?>
