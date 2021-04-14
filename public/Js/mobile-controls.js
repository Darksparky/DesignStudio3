AFRAME.registerComponent('mobile-controls', {

    schema:{
        CLAMP_VELOCITY: {
            type: 'number',
            default: 0.00001
        },
        MAX_DELTA:{
            type: 'number',
            default: 0.2
        },
        mobileButton:{
            type: 'selector',
            default: ''
        },
        isDown:{
            type: 'boolean',
            default: false
        }
    },
    
    init: function(){
        let camera = document.querySelector('#camera');
        var player = document.querySelector('#playercam');    
        var direction = new THREE.Vector3();
        var button = this.data.mobileButton;
        var isDown = this.data.isDown;
        button.addEventListener('touchend', function(){
            isDown = false;
        });
        button.addEventListener('touchstart', function(){
            isDown = true;
        // get the cameras world direction
        });

        button.addEventListener('click', function(){
            var angle = camera.getAttribute("rotation")
            var x = 1 * Math.cos(angle.y * Math.PI / 180)
            var y = 1 * Math.sin(angle.y * Math.PI / 180)
            var pos = player.getAttribute("position")
            pos.x -= y;
            pos.z -= x;
            player.setAttribute("position", pos)
        });
           


    },

    tick: function(){
        if(this.data.isDown){
            var angle = camera.getAttribute("rotation")
            var x = 1 * Math.cos(angle.y * Math.PI / 180)
            var y = 1 * Math.sin(angle.y * Math.PI / 180)
            var pos = player.getAttribute("position")
            pos.x -= y;
            pos.z -= x;
            player.setAttribute("position", pos)
        }
    }

    
        
    

});