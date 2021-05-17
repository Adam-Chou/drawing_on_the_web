let illustration = async function(){
    //variable declarations:
        const canvas = document.getElementById("background");
        const context = canvas.getContext("2d");
        const image = document.querySelector("img");

        let width, height;
        let pixelScale = window.devicePixelRatio; //set pixel ratio
        let counter = 0;
        let file; //instantiate data
        const url = `https://api.carbonintensity.org.uk/intensity`; 
        file = JSON.parse(await apiCall(url));

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

        context.moveTo(0,0);
        context.drawImage(image,(width/13)/2, -1*(width/20),(width*0.8)/pixelScale,(width*0.8)/pixelScale);
        context.restore();
        
    }

    function draw(){ //draw circles
        // console.log(file);
        let disturbance = file.data[0].intensity.actual *10; //intensity of air pollution
        if (counter >= disturbance){
            context.save();
            context.fillStyle= "#000000";
            context.moveTo(0,0);
            context.drawImage(image,(width/13)/2, -1*(width/20),(width*0.8)/pixelScale,(width*0.8)/pixelScale);
            context.restore();
            context.fillRect(0, 0, canvas.width, canvas.height); //clear canvas
            context.save();
            context.moveTo(0,0);
            context.drawImage(image,(width/13)/2, -1*(width/20),(width*0.8)/pixelScale,(width*0.8)/pixelScale);
            context.restore();
            counter = 0;
        }

        else if( counter > 10){
            context.save();
            context.lineWidth = ".01px solid";
            context.moveTo(width/2, height/2);
            for(let i = 0; i< 1200; i++){
                context.beginPath();
                let x = (Math.random()*width);
                let y = (Math.random()*height);
                let n = noise.simplex2(x,y); //woo perlin noise! from https://github.com/josephg/noisejs module
                if (counter > disturbance-110){
                    context.strokeStyle= "#000000";
                    context.fillStyle= "#000000";   
                }else{
                    if ((Math.floor(Math.random()*10))%.1 == 0){
                        context.fillStyle = `rgba(0,0,0,${Math.random()*n})`;
                    }else{
                        
                        context.fillStyle = `rgba(0,0,${(Math.random()*120+20)*n},${Math.random()*n})`; 
                    }
                }
                // context.arc(x*n,y*n, Math.abs(5*n), 0, 2*Math.PI);
                context.rect(x*n,y*n, Math.abs(5*n), Math.abs(5*n));

                context.closePath();
                context.fill();
            }
            context.restore();
        }
        counter+=1;

        requestAnimationFrame(draw);
        
    }

    setup(); draw();
    window.addEventListener("resize", setup);
};

window.addEventListener("load", illustration);