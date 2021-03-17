AFRAME.registerComponent('enterkey', {

    schema: {
        parentpadlock: {
            type: 'selector',
            default: ''
        }
    },

    init: function(){
        let CONTEXT_AF = this; 
        let data = CONTEXT_AF.data; 
        let padlock = data.parentpadlock;

    //when the element is clicked on it makes the padlock attatched to it emit an 'ent' event
        this.el.addEventListener('click', function(){ 
        padlock.emit('ent');
        })
    },

    })
