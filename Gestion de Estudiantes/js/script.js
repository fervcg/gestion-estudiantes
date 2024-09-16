// /js/script.js

// Función para mostrar una sección específica
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion').forEach((div) => {
        div.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    document.getElementById(seccion).style.display = 'block';

    // Si es la lista de alumnos, obtener la lista
    if (seccion === 'lista-alumnos') {
        obtenerListaEstudiantes();
    }
}

// Función para obtener la lista de estudiantes
function obtenerListaEstudiantes() {
    fetch('../ajax/obtener_estudiantes.php')
        .then(response => response.json())
        .then(data => {
            if(data.error){
                document.getElementById('resultado-lista-alumnos').innerHTML = `<div class="alert">${data.error}</div>`;
                return;
            }
            let output = '<table><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>Edad</th><th>Acciones</th></tr>';
            data.forEach(estudiante => {
                output += `<tr>
                             <td>${estudiante.id}</td>
                             <td>${estudiante.nombre}</td>
                             <td>${estudiante.apellido}</td>
                             <td>${estudiante.email}</td>
                             <td>${estudiante.edad}</td>
                             <td>
                                 <button class="edit" onclick="editarEstudiante(${estudiante.id})">Editar</button>
                                 <button class="delete" onclick="eliminarEstudiante(${estudiante.id})">Eliminar</button>
                             </td>
                           </tr>`;
            });
            output += '</table>';
            document.getElementById('resultado-lista-alumnos').innerHTML = output;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('resultado-lista-alumnos').innerHTML = `<div class="alert">Error al obtener la lista de alumnos.</div>`;
        });
}

// Función para crear un nuevo estudiante
document.getElementById('form-crear-alumno').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores de los inputs
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;

    // Enviar datos usando fetch
    fetch('../ajax/crear_alumno.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, edad })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        obtenerListaEstudiantes(); // Actualizar la lista de estudiantes
        document.getElementById('form-crear-alumno').reset(); // Limpiar el formulario
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al crear el alumno.');
    });
});

// Función para editar un estudiante
function editarEstudiante(id) {
    // Obtener los datos del estudiante
    fetch(`../ajax/obtener_estudiante.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if(data.error){
                alert(data.error);
                return;
            }
            // Mostrar la sección de actualizar alumno
            mostrarSeccion('actualizar-alumno');

            // Llenar el formulario con los datos del estudiante
            document.getElementById('id-actualizar').value = data.id;
            document.getElementById('nombre-actualizar').value = data.nombre;
            document.getElementById('apellido-actualizar').value = data.apellido;
            document.getElementById('email-actualizar').value = data.email;
            document.getElementById('edad-actualizar').value = data.edad;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener los datos del alumno.');
        });
}

// Función para actualizar un estudiante
document.getElementById('form-actualizar-alumno').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const id = document.getElementById('id-actualizar').value;
    const nombre = document.getElementById('nombre-actualizar').value;
    const apellido = document.getElementById('apellido-actualizar').value;
    const email = document.getElementById('email-actualizar').value;
    const edad = document.getElementById('edad-actualizar').value;

    // Enviar la solicitud PUT para actualizar el estudiante
    fetch('../ajax/actualizar_alumno.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, nombre, apellido, email, edad })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        obtenerListaEstudiantes(); // Actualizar la lista
        document.getElementById('form-actualizar-alumno').reset(); // Limpiar el formulario
        mostrarSeccion('lista-alumnos'); // Volver a la lista de alumnos
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el alumno.');
    });
});

// Función para eliminar un estudiante
function eliminarEstudiante(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
        fetch(`../ajax/eliminar_alumno.php?id=${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            obtenerListaEstudiantes(); // Actualizar la lista de estudiantes
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el alumno.');
        });
    }
}

// Función para consultar estudiantes por curso
document.getElementById('form-estudiantes-curso').addEventListener('submit', function(e) {
    e.preventDefault();
    const cursoId = document.getElementById('curso-id').value;

    fetch('../ajax/consultar_estudiantes_curso.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ curso_id: cursoId })
    })
    .then(response => response.json())
    .then(data => {
        let output = '';
        if(data.error){
            output = `<div class="alert">${data.error}</div>`;
        } else if(data.length > 0) {
            output = '<table><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>Edad</th></tr>';
            data.forEach(alumno => {
                output += `<tr>
                             <td>${alumno.id}</td>
                             <td>${alumno.nombre}</td>
                             <td>${alumno.apellido}</td>
                             <td>${alumno.email}</td>
                             <td>${alumno.edad}</td>
                           </tr>`;
            });
            output += '</table>';
        } else {
            output = '<p>No se encontraron estudiantes para este curso.</p>';
        }
        document.getElementById('resultado-estudiantes-curso').innerHTML = output;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado-estudiantes-curso').innerHTML = `<div class="alert">Error al consultar estudiantes.</div>`;
    });
});

// Función para consultar cursos de un estudiante
document.getElementById('form-cursos-estudiante').addEventListener('submit', function(e) {
    e.preventDefault();
    const estudianteId = document.getElementById('estudiante-id').value;

    fetch('../ajax/consultar_cursos_estudiante.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estudiante_id: estudianteId })
    })
    .then(response => response.json())
    .then(data => {
        let output = '';
        if(data.error){
            output = `<div class="alert">${data.error}</div>`;
        } else if(data.length > 0) {
            output = '<table><tr><th>ID</th><th>Nombre del Curso</th><th>Descripción</th><th>Duración (horas)</th></tr>';
            data.forEach(curso => {
                output += `<tr>
                             <td>${curso.id}</td>
                             <td>${curso.nombre_curso}</td>
                             <td>${curso.descripcion}</td>
                             <td>${curso.duracion}</td>
                           </tr>`;
            });
            output += '</table>';
        } else {
            output = '<p>El estudiante no está inscrito en ningún curso.</p>';
        }
        document.getElementById('resultado-cursos-estudiante').innerHTML = output;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado-cursos-estudiante').innerHTML = `<div class="alert">Error al consultar cursos.</div>`;
    });
});
