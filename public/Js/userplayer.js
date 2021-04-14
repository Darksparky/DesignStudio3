AFRAME.registerComponent('userplayer', {
    schema: {
        oldPos: {
            x: 0,
            y: 0,
            z: 0,
        },
        oldRot: {
            x: 0,
            y: 0,
            z: 0,
        },
        socket: {
            type: 'string',
            default: ''
        }
    },

    init: function(){
        const CONTEXT_AF = this;
        let plyr = document.querySelector('#playercam');
        CONTEXT_AF.data.oldPos = plyr.getAttribute('position');
        CONTEXT_AF.data.oldRot = plyr.getAttribute('rotation');
        console.log('userplayer initiated');
    },
    /*tick: function(){
        
        const CONTEXT_AF = this;
        let plyr = document.querySelector('#playercam');
        let oldRotation = CONTEXT_AF.data.oldRot;
        let oldPosition = CONTEXT_AF.data.oldPos;
        if(oldRotation != plyr.getAttribute('rotation') || oldPosition != plyr.getAttribute('position')){
            console.log('updating player');
            let socket = io();
            CONTEXT_AF.data.oldRot = plyr.getAttribute('rotation');
            CONTEXT_AF.data.oldPos = plyr.getAttribute('position');
            let pos = plyr.getAttribute('position');
            let rot = plyr.getAttribute('rotation');
            if(pos==undefined){
                pos = {x: 0, y: 1, z: 0};
            }
            if(rot==undefined){
                rot = {x: 0, y: 0, z: 0};
            }
            socket.emit('Player_Update', socket.id, pos, rot);
       }
    }*/
});
