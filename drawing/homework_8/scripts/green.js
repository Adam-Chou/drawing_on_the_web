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
        // console.log(count)
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", setup);
};


window.addEventListener("load", drawing);