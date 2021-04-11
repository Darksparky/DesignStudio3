const { ifError } = require('assert');
const { Console, debug } = require('console');
const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT = 8080;

class Player {
    pos = {
        x: 0,
        y: 0,
        z: 0 
    };
      
    rot = {
        x: 0,
        y: 0,
        z: 0,
        w: 0
    };

    constructor(id, pos, rot){
        this.id = id;
        this.pos = pos;
        this.rot = rot;
    };
}

var Players = [];

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
        let indx = Players.findIndex( function(element){
            if(element.id == socket.id){
                return element;
            }else{
                return -1;
            }
        });
        Players.splice(indx);
        console.log(socket.id + ' is disconnected');
        console.log(Players);
        socket.broadcast.emit('Delete_Player', socket.id);
    });
    socket.broadcast.emit('Create_Player', socket.id);

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
        
        let indx = Players.findIndex( function(element){
            if(element.id == id){
                return element;
            }else{
                return -1;
            }
        });
        if(pos){
            Players[indx].pos = pos; 
         }
         if(rot){
             Players[indx].rot = rot;
         }
        console.log(Players);
        io.emit('Sync_Players', Players);
    });
/*
    socket.on('Player_Update', (id, pos, rot)=>{
        let indx = Players.findIndex( function(element){
            if(element.id == id){
                return element;
            }else{
                return -1;
            }
        });
        if(Players[indx]!= undefined && indx != -1){
            if(pos){
            Players[indx].pos = pos; 
            }
            if(rot){
            Players[indx].rot = rot;
            }
        } else {
            console.log('player[indx] is undefined');
        }
      
        
        
       
    });
    */
    /*var Consoltick = setInterval(function(){
    
    if(Players[0]){
        console.log('player 1 id: ' + Players[0].id);
        console.log('player 1 pos: ' + Players[0].pos);
        console.log('player 1 rot: ' + Players[0].rot);
    }
    if(Players[1]){
        console.log('player 2 id: ' + Players[1].id);
        console.log('player 2 pos: ' + Players[1].pos);
        console.log('player 2 rot: ' + Players[1].rot);
    }
    
    
    }, 10000);*/

   socket.on('up',((id, pos, rot)=>{
        //console.log('server recognizes that a player has emitted player update');
        let indx = Players.findIndex( function(element){
            if(element.id == id){
                return element;
            }else{
                return -1;
            }
        });
        Players[indx].pos.x = pos.x;
        Players[indx].pos.y = pos.y;
        Players[indx].pos.z = pos.z;
        Players[indx].rot.x = rot.x;
        Players[indx].rot.y = rot.y;
        Players[indx].rot.z = rot.z;
        console.log(Players);
    

}));
});

 
