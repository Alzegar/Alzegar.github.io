import{n as e,r as t,t as n}from"../client-CbEimS2L.js";t((()=>{n();var t=document.getElementById(`nombreEstudiante`),r=document.getElementById(`tablaCursos`),i=document.getElementById(`cantidadCursos`),a=document.getElementById(`promedioGeneral`),o=document.getElementById(`btnCerrarSesion`),s=localStorage.getItem(`codigo_estudiante`);async function c(){if(!s){window.location.href=`../../index.html`;return}let{data:n,error:o}=await e.from(`estudiantes`).select(`id, nombre_apellidos, codigo_estudiante`).eq(`codigo_estudiante`,s).maybeSingle();if(o){console.error(o),t.textContent=`No se pudo cargar el estudiante.`;return}if(!n){console.error(`No se encontró el estudiante.`),localStorage.removeItem(`codigo_estudiante`),localStorage.removeItem(`nombre_estudiante`),localStorage.removeItem(`id_estudiante`),window.location.href=`../../index.html`;return}t.textContent=`¡Bienvenido, ${n.nombre_apellidos}!`;let{data:c,error:l}=await e.from(`notas`).select(`
                nota,
                cursos (
                    nombre_curso,
                    nombre_profesor,
                    creditos
                )
            `).eq(`estudiante_id`,n.id);if(l){console.error(l),r.innerHTML=`
            <tr>
                <td colspan="4">
                    Error al cargar los cursos.
                </td>
            </tr>
        `;return}if(i.textContent=c.length,a.textContent=c.length>0?(c.reduce((e,t)=>e+Number(t.nota),0)/c.length).toFixed(2):`0.00`,c.length===0){r.innerHTML=`
            <tr>
                <td colspan="4">
                    No tienes cursos registrados.
                </td>
            </tr>
        `;return}r.innerHTML=``,c.forEach(e=>{let t=e.cursos,n=Number(e.nota),i=n>=11?`nota-aprobada`:`nota-desaprobada`,a=document.createElement(`tr`);a.innerHTML=`

            <td>
                ${t.nombre_curso}
            </td>

            <td>
                ${t.nombre_profesor}
            </td>

            <td>
                ${t.creditos}
            </td>

            <td class="nota ${i}">
                ${n}
            </td>

        `,r.appendChild(a)})}o.addEventListener(`click`,()=>{localStorage.removeItem(`codigo_estudiante`),localStorage.removeItem(`nombre_estudiante`),window.location.href=`../../index.html`}),c()}))();