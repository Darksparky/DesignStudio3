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
var Rooms = [];
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
        Players.splice(indx, 1);
        console.log(socket.id + ' is disconnected');
        console.log(Players);
        io.emit('Delete_Player', socket.id);
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
    socket.on('Update_Object', (id, pos, rot, objectID)=>{
        socket.broadcast.emit('Sync_Object', id, pos, rot,objectID);
    }); 
    socket.on('Set_Player', (id, pos, rot) =>{
        let pEl = Players.find(e => e.id == id);
                    if(pEl!= undefined){
                        
                    // otherPlayers[indx].setAttribute('position', pos);
                    // otherPlayers[indx].setAttribute('rotation', rot);
                        pEl.pos = pos;
                        pEl.rot = rot;
                    }   
                   
        //console.log(Players);
        io.emit('Sync_Players', Players);
    });

   socket.on('up',((id, pos, rot)=>{

        pEl = Players.find(e => e.id == id);
   
        if(pEl != undefined){
            pEl.pos = pos;
            pEl.rot = rot;
        }
        //console.log(Players);
        io.emit('Player_Update', id, pos, rot);
    

    }));


    // Terminal ---------------

    this.socket.on("input", input => {
        //check input for matching command
        

    })

    

    let outputData = function(data){
        socket.emit("output", data);
    }

});

 
