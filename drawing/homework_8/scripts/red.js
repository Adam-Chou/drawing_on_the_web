let facemaker = async function(){
    // const nameplate = document.getElementById("name");
    const url = `https://randomuser.me/api`; 
    let file = JSON.parse( await apiCall(url)); //from general script, parse json file
    let gender = file.results[0].gender; //get gender
    let name = `${file.results[0].name.title} ${file.results[0].name.first} ${file.results[0].name.last}`;
    // console.log(file, gender, name);

    const face = document.querySelector(`.${gender}`)
    const person = document.querySelector(`#${gender}`)
    person.style.display = "block";
    // nameplate.innerHTML = name; variates name

    if(face){ //only if image works
    //variable declarations:
        const canvas = document.getElementById("background");
        const context = canvas.getContext("2d");

        let width, height;
        let pixelScale = window.devicePixelRatio; //set pixel ratio
        let counter = 1;

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
    }

    function draw(){ 

        if (counter >= 4){
            counter = 1;
        }
        
        context.save();
        context.lineWidth = ".01px solid";
        context.moveTo(width/2, height/2);
        for(let i = 0; i< Math.floor(Math.random()*4); i++){
            context.beginPath();
            let x = (Math.random()*width);
            let y = (Math.random()*height);
            let n = noise.simplex2(x,y); //woo perlin noise! from https://github.com/josephg/noisejs module
            // context.arc(x*n,y*n, Math.abs(5*n), 0, 2*Math.PI);
            context.globalAlpha = 0.6; //global alpha 
            // variation 1
            context.drawImage(face, x*n,y*n,200*n,200*n);
            
            //variation 2
            //context.drawImage(face, x*n,y*n,30,30);

            //variation 3
            // face.style.transform = `scale(${5*n})`;
            //context.drawImage(face, x*n,y*n,30,30);

            context.closePath();
            context.fill();
        }
        context.restore();
        counter+=0.01;

        requestAnimationFrame(draw);
    }
    setup(); draw();
    window.addEventListener("resize", setup);
    }
};

window.addEventListener("load",facemaker);