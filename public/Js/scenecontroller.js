AFRAME.registerComponent('scenecontroller', {
    
    //; model: true; orientationOffset: x:90, y:0 z:0;

    init: function(){
        console.log('scenecontroller has started');
        const CONTEXT_AF = this;
        let playerEl = document.querySelector('#playercam');
        let sceneEl = CONTEXT_AF.el;
        let cameraEl = document.querySelector('#camera');
        

        let setUpVR = function(){
            console.log('setupVr');
            let leftHand = document.createElement("a-entity");
            let rightHand = document.createElement("a-entity");
            leftHand.setAttribute('id','leftHand');
            rightHand.setAttribute('id','rightHand');
            leftHand.setAttribute('tracked-controls');
            rightHand.setAttribute('tracked-controls');
            leftHand.setAttribute('sphere-collider','objects: a-box');
            //leftHand.setAttribute('super-hands');
            leftHand.setAttribute('hand-controls','hand: left');
            leftHand.setAttribute('oculus-touch-controls','hand: left; orientationOffset: 90 0 0');
            leftHand.setAttribute('laser-controls');
            //leftHand.setAttribute('thumbsticklogging');
            rightHand.setAttribute('sphere-collider','objects: a-box');
            //rightHand.setAttribute('super-hands');
            rightHand.setAttribute('oculus-touch-controls','hand: right; orientationOffset: 90 0 0');
            rightHand.setAttribute('hand-controls','hand: right');
            rightHand.setAttribute('laser-controls');
            //rightHand.setAttribute('thumbsticklogging');
            
            playerEl.appendChild(leftHand);
            playerEl.appendChild(rightHand);
            playerEl.removeAttribute('movement-controls');
            //cameraEl.removeAttribute('look-controls');
        }

        if(sceneEl.is('vr-mode')){
            setUpVR();
        };

        
        
        sceneEl.addEventListener('enter-vr', function(){
            setUpVR();
        });
        
        sceneEl.addEventListener('exit-vr', function(){
            let leftHand = document.querySelector('#leftHand');
            let rightHand = document.querySelector('#rightHand');
            playerEl.removeChild(leftHand);
            playerEl.removeChild(rightHand);
            playerEl.setAttribute('movement-controls');
            cameraEl.setAttribute('look-controls');
        });
    }





})

