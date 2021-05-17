let drawing = async () => {
    const data = await stockCall();
    console.log(data);

    const canvas = document.getElementById("stock");
    const context = canvas.getContext("2d");

    let width, height;
    let pixelScale = window.devicePixelRatio; //set pixel ratio

    function setup(){ //initialize setup
        width = window.innerWidth;
        height = window.innerHeight;

        //scale - must include everything
        canvas.style.width = width;
        canvas.style.height = height;
        canvas.width = width;
        canvas.height = height;

        context.scale(pixelScale, pixelScale);
    }
    let count = 0;
    setup();
    
    function draw(){
        context.save();
        context.beginPath();
        context.moveTo(0, (height/4));
        context.strokeStyle= '#00A36C';
        context.fillStyle= "green";

        if (count >=10){
            context.save();
            context.fillStyle= "black";
            context.fillRect(0, 0, canvas.width, canvas.height); //clear canvas
            context.restore();
            let x = 0;
            let y = height/4
            // for(let i =0; i<width/pixelScale; i+=1){
            //     x = i;
            //     y = data[i];
            //         //version 1
            //     context.lineTo(i,(data[i])+height/4);
            //         //version 2
            //     // context.lineTo(i,((data[i]+height/2)+Math.random()*150)*noise.simplex2(x,y));
                
            // }
            for(let i =0; i<width/pixelScale; i+=Math.floor(Math.random()*40)+10){
                x = i;
                y = data[i];
                    //version 1
                // context.lineTo(i,(data[i])+height/4);
                    //version 2
                context.lineTo(i,((data[i]+height/2)+Math.random()*150)*noise.simplex2(x,y));
                
            }
            count = 0;
        }else{ count+=Math.floor(Math.random()*5); }
        context.stroke();
        context.restore();

        context.save();
            context.lineWidth = ".01px solid";
            context.moveTo(width/2, height/2);
            for(let i = 0; i< 100; i++){
                context.beginPath();
                let x = (Math.random()*width);
                let y = (Math.random()*height);
                let n = noise.simplex2(x,y); //woo perlin noise! from https://github.com/josephg/noisejs module
                
                if ((Math.floor(Math.random()*10))%.1 == 0){
                    context.fillStyle = `rgba(0,0,0,${Math.random()*n})`;
                }else{ 
                    context.fillStyle = `rgba(0,${(Math.random()*120+20)*n},0,${Math.random()*n})`; 
                }
                context.arc(x*n,y*n, Math.abs(5*n), 0, 2*Math.PI);
                context.save();
                // context.rotate(45 * Math.PI / 180);
                // context.rect(x,y, Math.abs(5*n), Math.abs(5*n));
                context.restore();

                context.closePath();
                context.fill();
            }
        context.restore();
        // console.log(count)
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", setup);
};


window.addEventListener("load", drawing);