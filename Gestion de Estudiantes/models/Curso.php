<?php
// /models/Curso.php

class Curso {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function obtenerTodos() {
        $stmt = $this->pdo->prepare("SELECT * FROM Curso");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Añade más métodos según sea necesario
}
?>
