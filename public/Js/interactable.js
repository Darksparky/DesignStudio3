AFRAME.registerComponent('interactable', {

    schema: {},
    init: function(){
        console.log('interactable init');
        const CONTEXT_AF = this;
        let sceneEl = document.querySelector('a-scene');
        let cameraEl = document.querySelector('#playercam');
        CONTEXT_AF.defaultPosition = CONTEXT_AF.el.getAttribute('position');
        CONTEXT_AF.defaultParent = CONTEXT_AF.el.parentElement;
        CONTEXT_AF.isHeld = false;
        CONTEXT_AF.el.addEventListener('click', function(){
            if(CONTEXT_AF.isHeld === false){
                console.log('isHeld true');
                CONTEXT_AF.isHeld = true;
                CONTEXT_AF.defaultParent.removeChild(CONTEXT_AF.el);
                cameraEl.appendChild(CONTEXT_AF.el);
                CONTEXT_AF.el.setAttribute('position', {
                    x: 0,
                    y: 1,
                    z: -1
                })
                CONTEXT_AF.el.setAttribute('scale', '0.5 0.5 0.5');
            } else {
                CONTEXT_AF.isHeld = false;
                console.log('isHeld false');
                cameraEl.removeChild(CONTEXT_AF.el);
                CONTEXT_AF.defaultParent.appendChild(CONTEXT_AF.el);
                CONTEXT_AF.el.setAttribute('position', CONTEXT_AF.defaultPosition);
                CONTEXT_AF.el.setAttribute('scale', '1 1 1');
            }
    
        } )
        
    
    }
    })
    
    