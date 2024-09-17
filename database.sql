CREATE DATABASE IF NOT EXISTS gestion_estudiantes;
USE gestion_estudiantes;

CREATE TABLE IF NOT EXISTS Estudiante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    edad INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_curso VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion INT NOT NULL -- Duración en horas, por ejemplo
);

CREATE TABLE IF NOT EXISTS Estudiante_Curso (
    estudiante_id INT,
    curso_id INT,
    fecha_inscripcion DATE NOT NULL,
    PRIMARY KEY (estudiante_id, curso_id),
    FOREIGN KEY (estudiante_id) REFERENCES Estudiante(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES Curso(id) ON DELETE CASCADE
);

-- Insertar estudiantes
INSERT INTO Estudiante (nombre, apellido, email, edad) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', 20),
('Ana', 'Gómez', 'ana.gomez@email.com', 22);

-- Insertar cursos
INSERT INTO Curso (nombre_curso, descripcion, duracion) VALUES
('Matemáticas', 'Curso avanzado de matemáticas', 40),
('Historia', 'Historia mundial moderna', 30);

-- Inscribir estudiantes en cursos
INSERT INTO Estudiante_Curso (estudiante_id, curso_id, fecha_inscripcion) VALUES
(1, 1, '2024-09-15'),
(1, 2, '2024-09-15'),
(2, 1, '2024-09-16');

SELECT * FROM Estudiante_Curso
