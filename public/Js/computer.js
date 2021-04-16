AFRAME.registerComponent('computer',{
    schema: {
        isUsed:{
            type: 'boolean',
            default: false
        }
    },
    init: function(){
        const CONTEXT_AF = this; 
        
        CONTEXT_AF.el.addEventListener('click', function(){
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
        const CONTEXT_AF = this;
        let sceneEl = document.querySelector('a-scene');
        sceneEl.style.display = 'none';
        let computer = document.querySelector('#computerOverlay');
        let setupcomp = function(){
            let quitButton = document.createElement('button');
            quitButton.innerText = "Close PC";
            quitButton.setAttribute('class','pcbutton');
            let commandPromptHeader = document.createElement('header');
            commandPromptHeader.appendChild(quitButton);
            quitButton.addEventListener('click', function(){
            CONTEXT_AF.closeView();
            })
            let commandPromptButton = document.createElement('button');
            commandPromptButton.setAttribute('class','pcbutton');
            commandPromptHeader.appendChild(commandPromptButton);
            commandPromptButton.innerText ="Open Command Prompt";
            commandPromptButton.addEventListener('click', function() {
                //open up command prompt
            })
            computer.appendChild(commandPromptHeader);
            let taskbarDiv = document.createElement('div');
            let taskbar = document.createElement('img');
            taskbar.setAttribute('src','fakeTaskbar.png');
            taskbar.setAttribute('class','image-responsive');
            taskbarDiv.appendChild(taskbar);
            computer.appendChild(taskbarDiv);
        }
        if(AFRAME.utils.device.isMobile()){
            let scontroller = document.querySelector('a-scene').getAttribute('scenecontroller');
            scontroller.data.moveActive = false;
            let cameraEl = document.querySelector('#camera');
            cameraEl.setAttribute('look-controls', 'enabled: false');
            let mobileHud = document.querySelector('#mobileOverlay');
            mobileHud.setAttribute('style','opacity: 1');
            //the type of display style may need to be changed but the point is it is not none;
            computer.style.display = 'block';
            setupcomp();
        }else{
            let playerEl = document.querySelector('#playercam');
            let cameraEl = document.querySelector('#camera');
            playerEl.setAttribute('movement-controls', 'enabled: false');
            cameraEl.setAttribute('look-controls', 'enabled: false');
            //the type of display style may need to be changed but the point is it is not none;
            computer.style.display = 'block';
            setupcomp();
        }


    },
    closeView: function(){
        let sceneEl = document.querySelector('a-scene');
        sceneEl.style.display = '';
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