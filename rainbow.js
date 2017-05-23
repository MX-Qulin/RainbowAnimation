(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());




(function () {

let rainbowImage = new Image();
rainbowImage.src = "rainbow.png";
let active;
let sound = true;

function runRainbow () {
    console.log("running");
    var audio = new Audio('rainbowSound.wav');
    if(sound){
            sound = false;
            audio.playbackRate = .5;
            audio.play();
    }

    active = true;
    gameLoop();
}



function gameLoop () {

    
    


    if(active){
         window.requestAnimationFrame(gameLoop);
        
    }
     rainbow.update();
    rainbow.render();


}

   function sprite (options) {

    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0;
        numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function () {
                
                    tickCount += 1;
                    if (tickCount > ticksPerFrame) {
                     tickCount = 0;
                        if(frameIndex < numberOfFrames - 1 ) {
                            frameIndex += 1;
                        } 
                        else{
                            active = false;
                            frameIndex = 0;
                            
                        }
                            
                 }
    };

    that.render = function () {
                    

                    
                   
                    

                    that.context.drawImage(
                        that.image,
                        frameIndex * that.width / numberOfFrames,
                        0,
                        that.width / numberOfFrames,
                        that.height,
                        0,
                        0,
                        that.width / numberOfFrames,
                        that.height
                        );                   
                };
                
            return that;
    }

let canvas = document.getElementById("rainbowAnimation");
canvas.width = 168;
canvas.height = 96;

let rainbow = sprite({
    context: canvas.getContext("2d"),
    width: 3192,
    height: 96,
    image: rainbowImage,
    numberOfFrames: 19,
    ticksPerFrame: 1.1
});

let magicButton = document.getElementById("startRainbow");
let clearButton = document.getElementById("clearRainbow");

magicButton.addEventListener('click', runRainbow);

clearButton.addEventListener('click', clear )


function clear () {
    rainbow.context.clearRect(0, 0, 3192, 96);
    sound = true;
}


} ());

