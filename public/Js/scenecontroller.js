AFRAME.registerComponent('scenecontroller', {
    
    //; model: true; orientationOffset: x:90, y:0 z:0;
    schema:{
        moveActive:{
            type: 'boolean',
            default: true,
        }
    },

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
           
            let forwardButton = document.createElement('button');
            let backwardButton = document.createElement('button');
            let mobileHud = document.querySelector('#mobileOverlay');
            forwardButton.setAttribute('id', 'fowardButton');
            forwardButton.setAttribute('class', 'mobileHudButton');
            backwardButton.setAttribute('id', 'backwardButton');
            backwardButton.setAttribute('class', 'mobileHudButton');
            forwardButton.innerText = "MOVE";
            backwardButton.innerText = "BACK";
           
        // I didn't have time to figure out how to get this to work while holding the button down but the way i have it, it works
        // provided you tap the button every time you want to move a bit

            forwardButton.addEventListener('click', function(){
                if(CONTEXT_AF.data.moveActive){
                    console.log('forward button clicked');
                    var angle = cameraEl.getAttribute("rotation");
                    var x = 1 * Math.cos(angle.y * Math.PI / 180);
                    var y = 1 * Math.sin(angle.y * Math.PI / 180);
                    var pos = playerEl.getAttribute("position");
                    pos.x -= y*0.3;
                    pos.z -= x*0.3;
                    playerEl.setAttribute("position", pos);
                }
                


            })
            backwardButton.addEventListener('click', function(){
                if(CONTEXT_AF.data.moveActive){
                    console.log('backward button clicked');
                    var angle = cameraEl.getAttribute("rotation");
                    var x = 1 * Math.cos(angle.y * Math.PI / 180);
                    var y = 1 * Math.sin(angle.y * Math.PI / 180);
                    var pos = playerEl.getAttribute("position");
                    pos.x += y*0.3;
                    pos.z += x*0.3;
                    playerEl.setAttribute("position", pos);
                }

            })
            mobileHud.appendChild(forwardButton);
            mobileHud.appendChild(backwardButton);
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

