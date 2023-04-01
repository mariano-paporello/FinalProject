const socket = io();

socket.on("bienvenidaAUsuario", (data) => {
  console.log(data);
});
// LogIn Form
const logInForm = document.getElementById("logIn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("contraseña");
const tokenDiv = document.getElementById("tokenDiv")

logInForm.addEventListener("submit", (ev)=>{
  ev.preventDefault();
  if(!usernameInput.value || !passwordInput.value || passwordInput.value === "..." || usernameInput.value === "..."){
    throw new Error("Campos incompletos")
  }
  const data = {
    username: usernameInput.value,
    password: passwordInput.value
  }
  socket.emit("sendUserPassword", data)
})

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
    const p = document.createElement("p");
    p.innerHTML = `<h3>Error: Token no autorizado</h3>`
    mensajesDiv.appendChild(p)
  throw new Error("No autorizado")
}
})
socket.on("devuelvoToken", (data)=>{
  
  if(data){
    const p = document.createElement("p");
    p.innerHTML = `<h4>Tu token para copiar: </h4> <div>${data}</div>`
    tokenDiv.appendChild(p)
  }
})
socket.on("imprimirMensaje" , (data) => {
  const p = document.createElement("p");
  p.innerHTML = `<h3>Tu:</h3>${data.message}`;
  mensajesDiv.appendChild(p);
  socket.emit("mensajeYaImpreso", data)
});
socket.on("sistemResponse" , (data) => {
  const p = document.createElement("p");
  p.innerHTML = `<h3>Sistema:</h3><p>${data.message}</p>`;
  mensajesDiv.appendChild(p);
});