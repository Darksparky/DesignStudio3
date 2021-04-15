AFRAME.registerComponent('objectmanager', {
    schema: {
        isHolding: {type:'boolean', default: false},
        defaultParent: {type: 'asset'},
        defaultPosition: {type: 'vec3'},
        focus: {type: 'asset'}

    },
    
    

    deselect: function(){
      var scene = document.querySelector('a-scene');
      this.data.focus.object3D.updateMatrixWorld();
      this.data.focus.object3D.matrix.copy(this.data.focus.object3D.matrixWorld);
      //var mat = new THREE.Matrix4()
      this.data.focus.object3D.applyMatrix4(new THREE.Matrix4().copy(scene.object3D.matrixWorld).invert());
      scene.object3D.add(this.data.focus.object3D); 
      this.data.focus = ''; 
      this.data.isHolding = false;
      this.data.defaultParent = '';
      document.querySelector('#left-rotate-button').style.display = 'none';
      document.querySelector('#right-rotate-button').style.display = 'none';
    },

    interact: function(elem){
        if(this.data.focus===''){
            this.select(elem);
        }else if(this.data.focus!=elem){
            this.deselect(this.data.focus);
            this.select(elem);
        }else if(this.data.focus === elem){
            this.deselect(elem);
        }
        
    },

    rotateLeft: function(){
        if(this.data.isHolding){
            console.log('left');
            this.data.focus.object3D.rotation.y -= THREE.Math.degToRad(20);
        }
    },

    rotateRight: function(){
        if(this.data.isHolding){
            console.log('right');
            this.data.focus.object3D.rotation.y += THREE.Math.degToRad(20);
        }
    },

    select: function(elem){
        
        
        console.log('selected');
        console.log(this.data.isHolding);
        if(this.data.isHolding===false){
            this.data.defaultPosition = elem.getAttribute('position');
            this.data.defaultParent = elem.parentElement;
            this.data.focus = elem;
            //this.el.appendChild(elem);
            this.el.object3D.add(elem.object3D);
            elem.setAttribute('position', {x: 0, y: 0.5, z: -3});
            //elem.setAttribute('scale', '0.5 0.5 0.5');
            this.data.isHolding = true;
            console.log(elem.parentElement)
            document.querySelector('#left-rotate-button').style.display = 'block';
            document.querySelector('#right-rotate-button').style.display = 'block';
        }

        

    },    


    updateFocus: function(socket){

        let focus = this.data.focus;
        //send socket info to 
        if(focus != undefined && focus != null){

            let pos = focus.getAttribute('position');
            let rot = focus.getAttribute('rotation');
            socket.emit('objectUpdate', socket.id, pos, rot);
        }
    }



})