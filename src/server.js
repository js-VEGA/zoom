import http from "http";
import WebSocket from "ws"
import express from "express";

const app = express();

app.set('view engine', 'pug');
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);


const server = http.createServer(app);

const wss = new WebSocket.Server({ server });//같은 서버에 http,ws 작동

function onSocketClose(){
    console.log("Disconnected from the Brower")
}

const sockets = [];

wss.on("connection",(socket) => {
    sockets.push(socket);
    console.log("Connected to Brower");
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
        socket.forEach((aSocket) => aSocket.send(message));
    });
});

server.listen(3000,handleListen);