const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {join} = require('node:path')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname,'index.html'));
  });

io.on('connection',(socket)=>{
    console.log('User connected');
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    })
})

io.on('connection',(socket)=>{
    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    })
})

server.listen(3000,(err)=>{
    if (err) throw err;
    console.log("server is running on port 3000");
})