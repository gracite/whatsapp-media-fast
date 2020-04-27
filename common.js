const intervalLoad = setInterval( startLoad, 700)

function startLoad(){

    const header = document.querySelector("._3auIg")

    if(header){
        clearInterval(intervalLoad)
        startWMF(header)
    }
}

function startWMF(header){

    var audios = []
    var mediaRate = 1
    var btMediaFast, panelMessag, loadMessag
    var loadMessagStatus = false

    
    header.innerHTML += '<button id="bt-media-fast"><span>1.0x</span> \
    <div id="range-media-fast"><input type="range" min="1" max="3" step="0.1" value="1"><div> </button>'

    btMediaFast = header.querySelector('#bt-media-fast')
    const slideRange = header.querySelector('#range-media-fast')
    
    btMediaFast.addEventListener("mouseover",() => {
      // slideRange.style.opacity = 1;
      // slideRange.classList.add("bt-fast-over")
    })
    btMediaFast.addEventListener("mouseout",() => {
      // slideRange.classList.remove("bt-fast-over")
      // slideRange.style.opacity = 0;
      // setTimeout(()=>{
      //   slideRange.css.display = 'none';
      // },500)
    })

    slideRange.addEventListener("change",(event) => {
      setMediaRate(event.target.value)
    })

    function setMediaRate(newRate){

        mediaRate = newRate

        btMediaFast.querySelector('span').innerText = newRate+'x'

        if(newRate>1){
          btMediaFast.classList.add("fast-on")
        }else{
          btMediaFast.classList.remove("fast-on")
        }

        modAudio()
    }


    const panelSide = document.querySelector('#pane-side ._21sW0._1ecJY')
    panelSide.addEventListener("click", panelMessageLoad)

    function panelMessageLoad(){
        console.log('click')
        
        setTimeout(()=>{
          panelMessag = document.querySelector("._3zJZ2")
          console.log(panelMessag)
          checkNewMessag()
          listenerMouseWhell()
        },350)
    }
 
    function modAudio(){
        console.log('modAudio')
        if(panelMessag){

          setTimeout(()=>{

            audios = panelMessag.querySelectorAll("audio")

            if(audios){
              audios.forEach(audio => {
                  audio.playbackRate = mediaRate
              })
            }
          },1000)

        }
    }

    function checkNewMessag(){

        if(!loadMessag){
          console.log('checkNewMessag')
          loadMessagStatus = panelMessag.querySelector("._3dGYA").getAttribute('title')  //Carregar mensagens recentes
        
            if(loadMessagStatus == "Carregando mensagens..."){
                loadMessag = true
                console.log('Loading Messag')

                const interv = setInterval(() => {
                    loadMessagStatus = panelMessag.querySelector("._3dGYA").getAttribute('title')
                    console.log('new checkLoadMessag')

                    if(loadMessagStatus != "Carregando mensagens..."){
                        console.log("Messag Loaded")
                        loadMessag = false
                        modAudio()
                        clearInterval(interv)
                    }
                },100)
            }
        }
    }

    function listenerMouseWhell(){
        console.log('listener MouseWhell')
        panelMessag.addEventListener("wheel", event => {
    
            const deltaY = Math.sign(event.deltaY);
        
            if(deltaY === -1){
                checkNewMessag()                
            }
        });
    }

}





// aplicar o range escolhido no inicio
// Stilizar Range


/*target.playbackRate = storedSpeed;
event.target.playbackRate = storedSpeed;
var speed = this.video.playbackRate.toFixed(2),

document.body.addEventListener(
    "ratechange",
    function(event) {
      if (coolDown) {
        log("Speed event propagation blocked", 4);
        event.stopImmediatePropagation();
      }
      var controller = event.target.parentElement.querySelector(
        ".vsc-controller"
      );
      var speedIndicator = controller.shadowRoot.querySelector("span");
      var video = controller.parentElement.querySelector("video");
      var src = video.currentSrc;
      var speed = video.playbackRate.toFixed(2);

      log("Playback rate changed to " + speed, 4);

      log("Updating controller with new speed", 5);
      speedIndicator.textContent = speed;
      tc.settings.speeds[src] = speed;
      log("Storing lastSpeed in settings for the rememberSpeed feature", 5);
      tc.settings.lastSpeed = speed;
      log("Syncing chrome settings for lastSpeed", 5);
      chrome.storage.sync.set({ lastSpeed: speed }, function() {
        log("Speed setting saved: " + speed, 5);
      });
      // show the controller for 1000ms if it's hidden.
      runAction("blink", document, null, null);
    },
    true
  );
  function setSpeed(controller, video, speed) {
    log("setSpeed started: " + speed, 5);
    var speedvalue = speed.toFixed(2);
    video.playbackRate = Number(speedvalue);
    refreshCoolDown();
    log("setSpeed finished: " + speed, 5);
  }
  function resetSpeed(v, controller, target) {
    if (v.playbackRate === target) {
      if (v.playbackRate === getKeyBindings("reset")) {
        if (target !== 1.0) {
          log("Resetting playback speed to 1.0", 4);
          setSpeed(controller, v, 1.0);
        } else {
          log('Toggling playback speed to "fast" speed', 4);
          setSpeed(controller, v, getKeyBindings("fast"));
        }
      } else {
        log('Toggling playback speed to "reset" speed', 4);
        setSpeed(controller, v, getKeyBindings("reset"));
      }
    } else {
      log('Toggling playback speed to "reset" speed', 4);
      setKeyBindings("reset", v.playbackRate);
      setSpeed(controller, v, target);
    }
  }
*/