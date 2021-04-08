const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//this is call a "route" - basically a url path from your website for static pages
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/MainMenu.html' );
});

//websockets

io.on('connection', (socket)=>{
    console.log(socket.id + ' is connected');

    socket.on('disconnect', ()=> {
        console.log(socket.id + ' is disconnected');
    });

    //custom events

    socket.on('ClosetOpen', (data) =>{
        console.log('ClosetOpen event received');
        io.sockets.emit('closet_open');
    });

});