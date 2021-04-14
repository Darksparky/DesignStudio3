AFRAME.registerComponent('scenecontroller', {
    
    //; model: true; orientationOffset: x:90, y:0 z:0;

    init: function(){
        console.log('scenecontroller has started');
        const CONTEXT_AF = this;
        let playerEl = document.querySelector('#playercam');
        let sceneEl = CONTEXT_AF.el;
        let cameraEl = document.querySelector('#camera');
        
        let setUpMobile = function(){
            console.log('setUpMobile');
            playerEl.removeAttribute('movement-controls');
            playerEl.setAttribute('look-controls');
            let button = document.createElement("a-circle");
            button.setAttribute('id','mobileButton');
            button.setAttribute('overlay');
            button.setAttribute('position', '-0.2 -0.2 -0.1');
            button.setAttribute('rotation','0 0 0');
            button.setAttribute('radius', 0.08);
            button.setAttribute('color', '#00FFFF');
            button.setAttribute('shadow', 'receive: false; castShadow: false;');
            button.setAttribute('mobile-controls', 'mobileButton: #mobileButton;');
            button.setAttribute('class','interactive');
            cameraEl.appendChild(button);
        }
        let setUpVR = function(){
            console.log('setupVr');
            let leftHand = document.createElement("a-entity");
            let rightHand = document.createElement("a-entity");
            leftHand.setAttribute('id','leftHand');
            rightHand.setAttribute('id','rightHand');
            leftHand.setAttribute('tracked-controls');
            rightHand.setAttribute('tracked-controls');
            leftHand.setAttribute('sphere-collider','objects: a-box');
            leftHand.setAttribute('hand-controls','hand: left');
            leftHand.setAttribute('laser-controls');
            rightHand.setAttribute('sphere-collider','objects: a-box');
            rightHand.setAttribute('hand-controls','hand: right');
            rightHand.setAttribute('laser-controls');
            playerEl.appendChild(leftHand);
            playerEl.appendChild(rightHand);
            playerEl.removeAttribute('movement-controls');
            //cameraEl.removeAttribute('look-controls');
        }

        if( AFRAME.utils.device.isMobile()){
            setUpMobile();
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

