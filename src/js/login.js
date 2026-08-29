import { supabase } from '../supabase/client.js'

const formulario = document.getElementById('loginForm')
const usuario = document.getElementById('usuario')
const contrasena = document.getElementById('contrasena')
const mensaje = document.getElementById('mensaje')

formulario.addEventListener('submit', async (event) => {

    event.preventDefault()

    const codigo = usuario.value.trim()
    const dni = contrasena.value.trim()

    mensaje.textContent = 'Verificando...'

    console.log('Código enviado:', codigo)
    console.log('DNI enviado:', dni)

    const { data, error } = await supabase
        .from('estudiantes')
        .select('id, nombre_apellidos, codigo_estudiante, dni')
        .eq('codigo_estudiante', codigo)
        .eq('dni', dni)
        .maybeSingle()

    console.log('Resultado:', data)
    console.log('Error:', error)

    // ERROR DE SUPABASE
    if (error) {

        console.error('Error de Supabase:', error)

        mensaje.textContent =
            'Error al consultar la base de datos.'

        return
    }

    // USUARIO NO ENCONTRADO
    if (!data) {

        mensaje.textContent =
            'Código o DNI incorrectos.'

        return
    }

    // LOGIN CORRECTO
    console.log('Login correcto:', data)

    localStorage.setItem(
        'codigo_estudiante',
        data.codigo_estudiante
    )

    localStorage.setItem(
        'nombre_estudiante',
        data.nombre_apellidos
    )

    localStorage.setItem(
        'id_estudiante',
        data.id
    )

    mensaje.textContent =
        '¡Inicio de sesión correcto!'

    setTimeout(() => {

        window.location.href =
            '../pages/principal.html'

    }, 300)

})