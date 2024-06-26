let listaTareas=[];
const objTarea={
    id: '',
    nombre:'',
    descripcion: '',
    fecha: ''
}
let editando =false
const formulario = document.getElementById("formulario")
const descripcionInput=document.getElementById("decripcion")
const fechaInput =document.getElementById("fecha")
const nombreInput=document.getElementById("nombre")
const btnAgregar=document.getElementById("btnAgregar")
const modal=document.getElementById("myModal")

formulario.addEventListener('submit',validarDatos)

function validarDatos(e){
    e.preventDefault()
    if (descripcionInput.value===''||nombreInput.value===''||fechaInput.value==''){
        alert('Todos los Campos son requeridos')
        return
    }
    if(editando){
        editarTarea()
        editando=false
    }else{
        objTarea.id=Date.now()
        objTarea.nombre=nombreInput.value
        objTarea.fecha=fechaInput.value
        objTarea.descripcion=descripcionInput.value

        agregarTarea()
    }
}

function agregarTarea(){
    listaTareas.push({...objTarea})
    mostrarTareas()
    formulario.reset()
    limpiarObjeto()
}
function mostrarTareas(){
    limpiarHTML()

    const divTareas=document.querySelector(".div-tareas")
    listaTareas.forEach(tarea => {
        const{id,nombre}=tarea
        const div=document.createElement('div')
        div.setAttribute("class","tareas")
        const parrafo =document.createElement('p')
        parrafo.textContent=`${nombre}`
        parrafo.onclick=()=>mostarModal(tarea)
        div.append(parrafo)

        const checkBox =document.createElement('input')
        checkBox.setAttribute("type","checkbox")
        checkBox.setAttribute("id",id)
        checkBox.setAttribute("name","check")
        checkBox.setAttribute("class","form-check-input mt-0")
        div.append(checkBox)
     
        const editarBoton = document.createElement('button')
        editarBoton.onclick = () => cargarTarea(tarea)
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-secondary')
        div.append(editarBoton)
        
        divTareas.appendChild(div)
    })
}

function eliminar(){
    var checkBox=document.getElementsByName('check')
    console.log(checkBox);
    
    for (var i=0;i<checkBox.length;i++ ){        
        if (checkBox[i].checked){
          listaTareas = listaTareas.filter(tarea => tarea.id !==parseInt(checkBox[i].id) )
        }
    }
   
    limpiarHTML()
    mostrarTareas()

}

function cargarTarea(tarea) {
    const {id, nombre, descripcion,fecha} = tarea

    nombreInput.value = nombre
    descripcionInput.value = descripcion
    fechaInput.value=fecha

    objTarea.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar'
    
    editando = true
}
function editarTarea() {

    objTarea.nombre = nombreInput.value;
    objTarea.descripcion = descripcionInput.value

    listaTareas.map(tarea => {

        if(tarea.id === objTarea.id) {
            tarea.id = objTarea.id;
            tarea.nombre = objTarea.nombre;
            tarea.descripcion = objTarea.descripcion;
            tarea.fecha=objTarea.fecha

        }

    })

    limpiarHTML()
    mostrarTareas()
    formulario.reset()

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar'
    
    editando = false
}

function limpiarObjeto(){
    objTarea.id=''
    objTarea.descripcion=''
    objTarea.fecha=''
    objTarea.nombre=''
}
function limpiarHTML(){
    const divTareas = document.querySelector('.div-tareas')
    while (divTareas.firstChild){
        divTareas.removeChild(divTareas.firstChild)
    }
}
function mostarModal(tarea){
    console.log(tarea)
    const modalContent =document.querySelector(".modal-content")
    modalContent.innerHTML=`
    <h1>${tarea.nombre}</h1>
    <hr/>
    <p>${tarea.fecha}</p>
    <p>${tarea.descripcion}</p>
    `
    modal.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.querySelector(".modal-content").innerHTML=``  
    }
  }
/*DEBE SER RESPONSIVA
DEBE PERMITIR AGREGAR UNA O VARIAS TAREAS A LA MISMA VEZ
DEBE PERMITIR MODIFICAR UNA TAREA A LA VEZ
DEBE PERMITIR ELIMINAR UNA O VARIAS TAREAS A LA MISMA VEZ
DEBE CONTENER CHECKBOXES PARA LA SELECCIÓN MASIVA
UTILIZAR TABLA O GRID PARA MOSTRAR LA LISTA DE TAREAS
DEBE PERMITIR BUSCAR LAS TAREAS POR NOMBRE
CUANDO LE DE CLICK A UNA TAREA DEBE APARECER UN MODAL CON LA INFORMACIÓN DE LA TAREA*/ 