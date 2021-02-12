AFRAME.registerComponent('numberkey', {
    schema: {
        value:{
            type: 'string',
            default: ''
        },
        parentPadlock: {
            type: 'asset',
            default: ''
        }
    },

    //When you press the number key it needs to send it to the padlock assigned to it

    init: function(){
    
    this.el.addEventListener('click', function(){
         let padlockComponent = parentPadlock.components.padlock;
            padlockComponent.addNumber(this.data.value);
    } )

    },


})