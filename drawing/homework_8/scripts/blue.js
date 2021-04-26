let circlemaker = function(){
    //variable declarations:
        const canvas = document.getElementById("background");
        const context = canvas.getContext("2d");

        let width, height;
        let pixelScale = window.devicePixelRatio; //set pixel ratio
        let counter = 0;
        let changeColor = true; //boolean to set color change

    async function setup(){ //initialize setup
        const url = `https://api.carbonintensity.org.uk/intensity`; 
        let file = await apiCall(url);
        console.log(file);
        width = window.innerWidth;
        height = window.innerHeight;

        //scale - must include everything
        canvas.style.width = width;
        canvas.style.height = height;
        canvas.width = width;
        canvas.height = height;

        context.scale(pixelScale, pixelScale);

        context.save();
        context.fillStyle= "black";
        context.fillRect(0, 0, canvas.width, canvas.height); //clear canvas
        context.restore();
        
    }

    function draw(){ //draw circles
        //With help from https://stackoverflow.com/questions/58333678/draw-heart-using-javascript-in-any-postionx-y
        
        if (counter >= 400){
            context.save();
            context.fillStyle= "#000000";
            changeColor = false;  
            context.fillRect(0, 0, canvas.width, canvas.height); //clear canvas
            context.restore();
            counter = 0;
        }
        
        context.save();
        context.lineWidth = ".01px solid";
        context.moveTo(width/2, height/2);
        for(let i = 0; i< 9600; i++){
            context.beginPath();
            let x = (Math.random()*width);
            let y = (Math.random()*height);
            let n = noise.simplex2(x,y); //woo perlin noise! from https://github.com/josephg/noisejs module
            if (counter > 300){
                context.strokeStyle= "#000000";
                context.fillStyle= "#000000";   
            }else{
                if ((Math.floor(Math.random()*10))%.1 == 0){
                    context.fillStyle = `rgba(0,0,0,${Math.random()*n})`;
                }else{
                    
                    context.fillStyle = `rgba(0,0,${(Math.random()*120+20)*n},${Math.random()*n})`; 
                }
            }
            context.arc(x*n,y*n, Math.abs(5*n), 0, 2*Math.PI);
            // flower.style.transform = `scale(${5*n})`;
            // context.drawImage(flower, x*n,y*n,10,20);

            context.closePath();
            context.fill();
        }
        context.restore();
        counter+=1;

        requestAnimationFrame(draw);
    }

    setup(); draw();
    window.addEventListener("resize", setup);
};

window.addEventListener("load", circlemaker);