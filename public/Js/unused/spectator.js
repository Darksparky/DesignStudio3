AFRAME.registerComponent('spectator',{
    schema: {
         canvas: {
              type: 'string',
              default: ''
         },
         // desired FPS
         fps: {
              type: 'number',
              default: 30.0
         },
         done: {
              type:'boolean',
              default: false
         }

     },

     init: function() {
          console.log(this.el.id);
          console.log('init for spect');
          var targetEl = document.querySelector(this.data.canvas);
          this.counter = 0;
          this.renderer = new THREE.WebGLRenderer( { antialias: true } );
          this.renderer.setPixelRatio( window.devicePixelRatio );
          this.renderer.setSize(640,360);
          //this.renderer.autoClear = false;
      // creates spectator canvas
          targetEl.appendChild(this.renderer.domElement);
          this.renderer.domElement.id = "canvas";
          this.renderer.domElement.crossorigin="anonymous";
          this.renderer.domElement.height=360; 
          this.renderer.domElement.width=640;
          this.el.removeAttribute('look-controls');
          this.el.removeAttribute('wasd-controls');
          console.log(this.renderer.domElement);
          this.render();
     },
            
     tick: function(time, timeDelta) {
          //var loopFPS = 1000.0 / timeDelta;
         // var hmdIsXFasterThanDesiredFPS = loopFPS / this.data.fps;
         // var renderEveryNthFrame = Math.round(hmdIsXFasterThanDesiredFPS);
          //if(this.counter % renderEveryNthFrame === 0){
         //      this.render(timeDelta);
         // }
        //  this.counter += 1;  
          if(this.data.done ==false){
               this.render();
          }
        
     },

     render: function(){
          this.renderer.render(this.el.sceneEl.object3D, this.el.object3DMap.camera);
          //this.render.clear();
          this.data.done = true;
     }
});