const socket = io();

socket.on("bienvenidaAUsuario", (data) => {
  console.log(data);
});
 // Mensajes Form
const mensajesForm = document.getElementById("chat");
const messageInput = document.getElementById("fgen");
const tokenInput = document.getElementById("token");
  mensajesForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!messageInput.value || !tokenInput.value  || tokenInput === "token"|| messageInput.value === "Hola") {
      throw new Error("Campos Incompletos");
    }
    const tokenYMensaje = {
      token: tokenInput.value,
      message: messageInput.value
    }
    socket.emit("resp-message", tokenYMensaje);
    messageInput.value = "";

  });
socket.on("errorNoAutorizado", (error)=>{
  if(error === false){
  throw new Error("No autorizado")
}
})
socket.on("imprimirMensaje" , (data) => {
  console.log(data.message)
  const p = document.createElement("p");
  p.innerHTML = `<h3>Tu:</h3>${data.message}`;
  mensajesDiv.appendChild(p);
  socket.emit("mensajeYaImpreso", data)
});
socket.on("sistemResponse" , (data) => {
  console.log(data.message)
  const p = document.createElement("p");
  p.innerHTML = `<h3>Sistema:</h3><br><p>${data.message}</p>`;
  mensajesDiv.appendChild(p);
});