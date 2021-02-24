AFRAME.registerComponent('padlock',{

    schema: {
        password: {
            type: 'string',
            default: '4545'
        },
        input: {
            type: 'string',
            default: ''
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
        }

    },

    init: function(){
        let doorEL = document.querySelector(this.data.door);
        let CONTEXT_AF = this;
        this.el.addEventListener('click', function(){
           // this.openDoor();
            if(CONTEXT_AF.data.isOpen){
                doorEL.emit('close');
                console.log('close door');
                CONTEXT_AF.data.isOpen=false;
            }else{
                doorEL.emit('open');
                console.log("open door");
                CONTEXT_AF.data.isOpen=true;
            }
           
        })
    },

    addNumber: function(inputNumber){
        if(this.data.input.length<4){
            this.data.input += inputNumber;
        } else if(this.data.input.length===4){
            this.checkPassword();
        }
    },

    checkPassword: function(){
        if(this.data.password === this.data.input){
            if(this.data.isLocked == true){
                this.data.isLocked = false;
                //reset input
                this.data.input = '';
                this.updateDisplayText();
            }else{
                this.data.isLocked = true;
                //reset input
                this.data.input = '';
                this.updateDisplayText();
            }
        }else{

        }

    },

    openDoor: function(){
      //create open event to open door\
      this.el.emit('open');
    },

    updateDisplayText: function(){
        //update text for the padlock here
    }




})