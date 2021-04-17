AFRAME.registerComponent('computer',{
    schema: {
        isUsed:{
            type: 'boolean',
            default: false
        },
        commandIsOpen:{
            type: 'boolean',
            default: false
        }
    },
    init: function(){
        console.log('running init for comp');
        const CONTEXT_AF = this; 
        let sidebutton1 = document.querySelector('#return');
       // let computerOverlay = document.querySelector('#computerOverlay');
        
        let command = document.querySelector('#command');

        sidebutton1.addEventListener('click', function(){
            if(commandIsOpen){
                command.style.display = 'none'; 
                commandIsOpen = false;
                  command.style.zIndex = -1;
            }   
        });

       let commandIsOpen = CONTEXT_AF.data.commandIsOpen;
        CONTEXT_AF.el.addEventListener('click', function(){
        if(CONTEXT_AF.data.isUsed == false){
            CONTEXT_AF.data.isUsed = true;
            CONTEXT_AF.openView();
        }else{
            CONTEXT_AF.data.isUsed = false;
            CONTEXT_AF.closeView();
        }   
        });
        let commandPromptButton = document.querySelector("#openCommandPrompt");
        commandPromptButton.addEventListener('click', function() {
            //open up command prompt
            
             if(!commandIsOpen){
                 command.style.zIndex = 999;
                command.style.display = 'block'; 
                commandIsOpen = true;
                console.log(command.style);    
            } else {
                command.style.display = 'none'; 
                commandIsOpen = false;
                command.style.zIndex = -1;
            }
        });
        let quitButton = document.querySelector('#closeComputer');
        quitButton.addEventListener('click', function(){
            CONTEXT_AF.closeView();
        });

    },
    openView: function(){
        const CONTEXT_AF = this;
        
        let sceneEl = document.querySelector('a-scene');
        sceneEl.style.display = 'none';
        let computer = document.querySelector('#computerOverlay');
        

        let setupcomp = function(){
            computer.style.display = 'block';
            let cameraEl = document.querySelector('#camera');
            cameraEl.setAttribute('look-controls', 'enabled: false');
            let taskbar = document.querySelector('.img-tbar1');
            taskbar.style.display= 'block';
        }

        if(AFRAME.utils.device.isMobile()){
            let scontroller = document.querySelector('a-scene').getAttribute('scenecontroller');
            scontroller.data.moveActive = false;
            let mobileHud = document.querySelector('#mobileOverlay');
            mobileHud.setAttribute('style','opacity: 1');
            //the type of display style may need to be changed but the point is it is not none;
            setupcomp();
        }else{
            let playerEl = document.querySelector('#playercam');
            playerEl.setAttribute('movement-controls', 'enabled: false');
            
            //the type of display style may need to be changed but the point is it is not none;
            
            setupcomp();
        }


    },
    closeView: function(){
        let sceneEl = document.querySelector('a-scene');
        sceneEl.style.display = 'inherit';
        let computer = document.querySelector('#computerOverlay');  
        if(AFRAME.utils.device.isMobile()){
            console.log('closing pc for mobile');
            let scontroller = document.querySelector('a-scene').getAttribute('scenecontroller');
            scontroller.data.moveActive = true;
            let cameraEl = document.querySelector('#camera');
            cameraEl.setAttribute('look-controls', 'enabled: true');
            //remove the computer hud element via css
            computer.style.display = 'none';
        }else{
            console.log('closing pc for pc');
            let playerEl = document.querySelector('#playercam');
            let cameraEl = document.querySelector('#camera');
            playerEl.setAttribute('movement-controls', 'enabled: true');
            cameraEl.setAttribute('look-controls', 'enabled: true');
            let mobileHud = document.querySelector('#mobileOverlay');
            mobileHud.setAttribute('style','opacity: 0');
            //remove the computer hud element via css
            computer.style.display = 'none';
        }
    }


})