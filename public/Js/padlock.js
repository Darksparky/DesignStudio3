
AFRAME.registerComponent('padlock',{

    schema: {
        password: {
            type: 'string',
            default: '0000'
        },
        input: {
            type: 'string',
            default: '----'
        },
        isLocked: {
            type: 'boolean',
            default: true
        },
        door: {
            type: 'string',
            default: ''
        },
        isOpen: {
            type: 'boolean',
            default: false
        },
        lcd: {
            type: 'selector',
            default: ''
        },
        padID: {
            type: 'string',
            default: ''
        },
        
    },

    init: function(){
  
        var CONTEXT_AF = this;
        
        //ent used to be click
        
        this.el.addEventListener('del', function(){
            CONTEXT_AF.data.input = '----';
            CONTEXT_AF.updateDisplayText();
        })
    },

    addNumber: function(inputNumber){
        if(this.data.input.length<4){
            this.data.input += inputNumber;
            this.updateDisplayText();
        } else if(this.data.input.length===4){
           this.data.input = ''+ inputNumber;
           this.updateDisplayText();
        }
    },
    

    checkPassword: function(socket){
        if(this.data.password === this.data.input){
            if(this.data.isLocked == true){
                this.data.isLocked = false;
                //reset input
                
                this.updateDisplayText();
                this.openDoor(socket);
            }else{
                this.data.isLocked = true;
                //reset input
                this.data.input = '----';
                this.updateDisplayText();
            }
        }else{

        }

    },

    openDoor: function(socket){
        
      //create open event to open door\
        let doorEL = document.querySelector(this.data.door);
        
        if(this.data.isOpen){
            doorEL.emit('close');
            console.log('close door');
            this.data.isOpen=false;
        }else{
            doorEL.emit('open');
            console.log("open door");
            this.data.isOpen=true;
        }
        socket.emit('openDoor', this.data.padID, this.data.isOpen);
    },

    //sync door is only to be called by the socket
    syncDoor: function(){
        let doorEL = document.querySelector(this.data.door);
        
        if(this.data.isOpen){
            doorEL.emit('close');
            console.log('close door');
            this.data.isOpen=false;
        }else{
            doorEL.emit('open');
            console.log("open door");
            this.data.isOpen=true;
        }
    },

//update text for the padlock here
    
    updateDisplayText: function(){
        console.log("updateDisplayText has been called.");
        let lcdEL = this.data.lcd; 
        lcdEL.setAttribute('text', {
            value: this.data.input,
            color: 'white',
            width: 1,
            align:'center'
        });  
    },

    getIsOpen: function(){
        return this.data.isOpen;
    }



})