AFRAME.registerComponent('numberkey', {
    schema: {
        value:{
            type: 'string',
            default: ''
        },
        parentpadlock: {
            type: 'selector'
        }
    },

    //When you press the number key it needs to send it to the padlock assigned to it

    init: function(){
    let data = this.data;
    this.el.addEventListener('click', function(){
        let padlockComponent = data.parentpadlock.components.padlock;
        console.log("listened to keypad click.");
        padlockComponent.addNumber(data.value);
    } )

    },


})