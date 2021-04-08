const { Console } = require('console');
const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT = 8080;

class Player {
    constructor(id, pos, rot){
        this.id = id;
        this.pos = pos;
        this.rot = rot;
    }
}

let Players = [];

var exitIsOpen = false;
var closetIsOpen = false;
var computerIsLocked = true;

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
    Players.push(new Player(socket.id));
    console.log(Players);
    socket.on('disconnect', ()=> {
        let indx = Players.findIndex(Player => Player.id == socket.id);
        Players.splice(indx);
        console.log(socket.id + ' is disconnected');
        console.log(Players);
    });

    //custom events

    socket.on('openDoor', (padID,isOpn) =>{
        console.log('openDoor event recieved');
        if(padID == 'Closet_Lock'){
            console.log('Closet_Lock needs to be synced');
            closetIsOpen = isOpn; 
            io.sockets.emit('Sync_Closet', closetIsOpen);
        }
        else if(padID == 'Exit_Lock'){
            exitIsOpen = isOpn;
            io.sockets.emit('Sync_Exit', exitIsOpen);
        }
       
    });

    socket.on('Set_Player', (id, pos, rot) =>{
        let p = Players.find(Player => Player.id == id)
        p.pos = pos;
        p.rot = rot;
        console.log(Players);
    });

    setInterval(() => {
        
    }, interval);
});