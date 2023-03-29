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
    socket.emit("recibimosTokenYmensaje", tokenYMensaje);
    messageInput.value = "";

  });
socket.on("errorNoAutorizado", (error)=>{
  if(error === false){
  throw new Error("No autorizado")
}
})
socket.on("imprimirMensaje", (data) => {
  const p = document.createElement("p");
  p.innerText = `${data.message}`;
  mensajesDiv.appendChild(p);
});
