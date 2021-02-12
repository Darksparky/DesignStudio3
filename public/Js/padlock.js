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
        }

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
      //create open event to open door
    },

    updateDisplayText: function(){
        //update text for the padlock here
    }




})