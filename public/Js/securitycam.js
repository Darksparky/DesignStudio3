AFRAME.registerComponent('securitycam', {
    schema: {
        canvas: {
            type: 'string',
            default: ''
        },
        fps: {
            type: 'number',
            default: 90.0
        }
    },

    init: function(){
        this.data.canvas = document.querySelector(this.data.canvas);
        var tvEl = this.data.canvas;
        this.renderer = new THREE.WebGLRenderer({
            antialias: true});

        //might need to change this to set it as 16:9 because the TV is 16:9 in the room
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(tvEl.offsetWidth, tvEl.offsetHeight);
        
        tvEl.appendChild(this.renderer.domElement);
        this.renderer.domElement.id="canvas";
        this.renderer.domElement.crossorigin="anonymous";
        //definitely will need to change h and w so they are at least 16:9
        this.renderer.domElement.height=300;
        this.renderer.domElement.width=400;
        
        //might not need this if the cam isn't set up with them in the first place
        this.el.removeAttribute('look-controls');
        this.el.removeAttribute('wasd-controls');
        
        //REMOVE THESE AFTER CHECKING
        console.log(this.renderer.domElement);
        console.log(document.querySelector('a-scene'));
    },

    tick: function(time, timeDelta){
        var frameCycle = 1000.0/timeDelta;
        var deviceframesratio = frameCycle/this.data.fps;
        var renderedFrames = Math.round(deviceframesratio);
        if(this.counter % renderedFrames === 0){
            this.render(timeDelta);
        }
        this.counter += 1;
    },

    render: function(){
        //will likely need to mess with this
        this.renderer.render(this.el.object3D, this.el.object3DMap.camera);

    }

})

//This is based off of https://wirewhiz.com/how-to-use-a-cameras-output-as-a-texture-in-aframe/
//I expect that I will need to change it significantly, but if not I will cite the source

