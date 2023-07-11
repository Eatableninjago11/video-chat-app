
// express js used to create the server
const express = require('express');
const app = express();
const server = require('http').Server(app);

// server is configured to use ejs template engine for rendering the views
app.set('view engine', 'ejs');
app.use(express.static("public"));

const {v4: uuidv4} = require('uuid');
const io = require("socket.io", (server,{cors: {
    origin: '*'
}})) 


const {ExpressPeerServer} = require('peer')
const peerServer = ExpressPeerServer(server,{debug:true})
app.use("/peerjs",peerServer)

//Handling Routes
app.get('/', (req, res) => res.redirect(`/${uuidv4()}`));

app.get('/:room', (req, res) => res.render('index', {roomId: req.params.room})) 

//app.get('/', (req, res) => res.status(200).send("Hello World"))

// {} object destructuring
/**
 * var student ={
 * name: 'Arsh',
 * email: 'arsh@gmail.com',
 * password: 'arsh123',
 * subjects:['coding','maths']}
 * 
 * console.log(student.name, student.email, student.password)
 * 
 * var {name} = student
 * var {email} = student
 */


//Handling socket io connection (.on listens for connections)
io.on("connection", (socket) =>{
    //()=>{} event listener
    socket.on("join-room",(roomId,userId,userName)=>{
        socket.join(roomId)
        socket.on("message", (message) => {
            io.to(roomId).emit("createMessage", message,userName);
        }) 
    })
    
})

 

server.listen(3030);
