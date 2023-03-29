const socket = io()

socket.on('bienvenidaAUsuario', (data) => {
    console.log("Bienvenido Usuario")
})
// Users Form
const nombreUser = document.getElementById('nombreUser')
const gmailUser = document.getElementById('gmailUser')
const userForm = document.getElementById('userForm')



userForm.addEventListener("submit", (ev)=>{
  ev.preventDefault()
  if(!nombreUser.value || !gmailUser.value) {
    throw new Error("Campos incompletos , media pila :|")
  }else{
    const nuevoUser = {
      nombre: nombreUser.value,
      email: gmailUser.value
    }
    socket.emit('enviarNuevoUser', nuevoUser)
    socket.on('UsuarioConfirmadoYGuardado', data=>{
      if(data){
        // Divs de Parte de chat
        const divIngreso = document.getElementById('formDeIngreso')
        const divChat = document.getElementById('chat')
        divIngreso.classList.add('esconder') 
        divChat.setAttribute('id', 'mostrar')

        // Mensajes Form
        const mensajesForm = document.getElementById('formForUsuarioName')
        const general = document.getElementById('fgen')
        
        mensajesForm.addEventListener('submit', ev=>{
          ev.preventDefault()
          if( !general.value || general.value === '...' ){
              throw new Error('Campos Incompletos')
          }
          const mensajeGeneral = {
             ...data,
              mensajeGeneral: general.value
          }

          socket.emit('enviarMensaje', mensajeGeneral)
          general.value = ''


          

      })
      }
      else{
        throw new Error('Error')
      }
     
    })
    socket.on('imprimirMensaje', data=>{
      const p = document.createElement('p')
       p.innerText=`${data.mensajeGeneral}`
       mensajesDiv.appendChild(p)
   })
  }
})
