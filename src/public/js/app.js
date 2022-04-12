const socket = io();//알아서 서버 찾음

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

form.addEventListener("submit",handleRoomSubmit);

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("room",{payload: input.value });
    input.value = "";//4분까지 봄
}
