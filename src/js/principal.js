
import { supabase } from '../supabase/client.js'


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const nombreEstudiante =
    document.getElementById('nombreEstudiante')

const tablaCursos =
    document.getElementById('tablaCursos')

const cantidadCursos =
    document.getElementById('cantidadCursos')

const promedioGeneral =
    document.getElementById('promedioGeneral')

const btnCerrarSesion =
    document.getElementById('btnCerrarSesion')


// ==========================================
// OBTENER CÓDIGO DEL USUARIO
// ==========================================

const codigoEstudiante =
    localStorage.getItem('codigo_estudiante')


// ==========================================
// CARGAR DATOS
// ==========================================

async function cargarDatos() {

    if (!codigoEstudiante) {

        window.location.href = '../../index.html'

        return
    }


    // ======================================
    // BUSCAR ESTUDIANTE
    // ======================================

    const { data: estudiante, error: errorEstudiante } =
        await supabase
            .from('estudiantes')
            .select('id, nombre_apellidos, codigo_estudiante')
            .eq('codigo_estudiante', codigoEstudiante)
            .maybeSingle()


    if (errorEstudiante) {

    console.error(errorEstudiante)

    nombreEstudiante.textContent =
        'No se pudo cargar el estudiante.'

    return
    }

    if (!estudiante) {

        console.error('No se encontró el estudiante.')

        localStorage.removeItem('codigo_estudiante')
        localStorage.removeItem('nombre_estudiante')
        localStorage.removeItem('id_estudiante')

        window.location.href = '../../index.html'

        return
    }


    // ======================================
    // MOSTRAR BIENVENIDA
    // ======================================

    nombreEstudiante.textContent =
        `¡Bienvenido, ${estudiante.nombre_apellidos}!`


    // ======================================
    // OBTENER CURSOS Y NOTAS
    // ======================================

    const { data: notas, error: errorNotas } =
        await supabase
            .from('notas')
            .select(`
                nota,
                cursos (
                    nombre_curso,
                    nombre_profesor,
                    creditos
                )
            `)
            .eq('estudiante_id', estudiante.id)


    if (errorNotas) {

        console.error(errorNotas)

        tablaCursos.innerHTML = `
            <tr>
                <td colspan="4">
                    Error al cargar los cursos.
                </td>
            </tr>
        `

        return
    }


    // ======================================
    // CANTIDAD DE CURSOS
    // ======================================

    cantidadCursos.textContent = notas.length


    // ======================================
    // PROMEDIO
    // ======================================

    if (notas.length > 0) {

        const suma =
            notas.reduce(
                (total, item) =>
                    total + Number(item.nota),
                0
            )


        const promedio =
            suma / notas.length


        promedioGeneral.textContent =
            promedio.toFixed(2)

    } else {

        promedioGeneral.textContent = '0.00'
    }


    // ======================================
    // TABLA
    // ======================================

    if (notas.length === 0) {

        tablaCursos.innerHTML = `
            <tr>
                <td colspan="4">
                    No tienes cursos registrados.
                </td>
            </tr>
        `

        return
    }


    tablaCursos.innerHTML = ''


    notas.forEach(item => {

        const curso = item.cursos

        const nota = Number(item.nota)


        const claseNota =
            nota >= 11
                ? 'nota-aprobada'
                : 'nota-desaprobada'


        const fila =
            document.createElement('tr')


        fila.innerHTML = `

            <td>
                ${curso.nombre_curso}
            </td>

            <td>
                ${curso.nombre_profesor}
            </td>

            <td>
                ${curso.creditos}
            </td>

            <td class="nota ${claseNota}">
                ${nota}
            </td>

        `


        tablaCursos.appendChild(fila)

    })

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

btnCerrarSesion.addEventListener(
    'click',
    () => {

        localStorage.removeItem(
            'codigo_estudiante'
        )

        localStorage.removeItem(
            'nombre_estudiante'
        )


        window.location.href =
            '../../index.html'

    }
)


// ==========================================
// EJECUTAR
// ==========================================

cargarDatos()