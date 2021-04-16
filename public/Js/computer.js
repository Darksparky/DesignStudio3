AFRAME.registerComponent('computer',{
    schema: {
        isUsed:{
            type: 'boolean',
            default: 'false'
        }
    },
    init: function(){
        const CONTEXT_AF = this; 
        
        CONTEXT_AF.addEventListener('click', function(){
        if(CONTEXT_AF.data.isUsed == false){
            CONTEXT_AF.data.isUsed = true;
            CONTEXT_AF.openView();
        }else{
            CONTEXT_AF.data.isUsed = false;
            CONTEXT_AF.closeView();
        }   
        });

    },
    openView: function(){
        let computer = document.querySelector('#computerOverlay');
        if(AFRAME.utils.device.isMobile()){
            let scontroller = document.querySelector('a-scene').getAttribute('scenecontroller');
            scontroller.data.moveActive = false;
            let cameraEl = document.querySelector('#camera');
            cameraEl.removeAttribute('look-controls');
            let mobileHud = document.querySelector('#mobileOverlay');
            mobileHud.setAttribute('style','opacity: 0');
            //the type of display style may need to be changed but the point is it is not none;
            computer.style.display = 'block';

        }else{
            let playerEl = document.querySelector('#playercam');
            let cameraEl = document.querySelector('#camera');
            playerEl.removeAttribute('movement-controls');
            cameraEl.removeAttribute('look-controls');
            //the type of display style may need to be changed but the point is it is not none;
            computer.style.display = 'block';
        }


    },
    closeView: function(){
        let computer = document.querySelector('#computerOverlay');  
        if(AFRAME.utils.device.isMobile()){
            let scontroller = document.querySelector('a-scene').getAttribute('scenecontroller');
            scontroller.data.moveActive = true;
            let cameraEl = document.querySelector('#camera');
            cameraEl.setAttribute('look-controls');
            //remove the computer hud element via css
            computer.style.display = 'none';
        }else{
            let playerEl = document.querySelector('#playercam');
            let cameraEl = document.querySelector('#camera');
            playerEl.setAttribute('movement-controls');
            cameraEl.setAttribute('look-controls');
            let mobileHud = document.querySelector('#mobileOverlay');
            mobileHud.setAttribute('style','opacity: 1');
            //remove the computer hud element via css
            computer.style.display = 'none';
        }
    }


})