let circlemaker = function(){
    //variable declarations:
        const canvas = document.getElementById("background");
        const context = canvas.getContext("2d");
        let width, height;
        let pixelScale = window.devicePixelRatio; //set pixel ratio
        let counter = 0;
        let changeColor = false;

    function setup(){ //initialize setup
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
        draw();
    }

    function draw(){ //draw circles
        if (counter == 2000){
            context.save();
            if (changeColor){
                context.strokeStyle = "white";
                context.fillStyle= "black";
                changeColor = false;
            }else{
                context.strokeStyle = "black";
                context.fillStyle= "white";
                changeColor = true;
            }
            context.fillRect(0, 0, canvas.width, canvas.height); //clear canvas
            context.restore();
            counter = 0;
        }
        context.save();
        context.lineWidth = ".01px solid";
        context.moveTo(width/2, height/2);
        for(let i = 0; i< 200; i++){
            context.beginPath();
            let x = (Math.random()*width);
            let y = (Math.random()*height);

            let n = noise.simplex2(x,y); //woo perlin noise! 
            context.fillStyle = `rgba(${(Math.random()*255+200)*n},0,0,${Math.random()*n})`;
            
            context.arc(x*n,y*n, Math.abs(5*n), 0, 2*Math.PI);
            context.closePath();
            context.fill();
            if (counter > 1800){
                context.stroke();
            }
        }
        context.restore();
        counter+=1;
        requestAnimationFrame(draw);
    }


    setup();
};

circlemaker();