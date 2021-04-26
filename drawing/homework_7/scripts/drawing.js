function backgroundDraw(){
    const canvas = document.getElementById("background");
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

        context.save();
        context.fillStyle= "black";
        context.fillRect(0, 0, canvas.width, canvas.height); //clear canvas
        context.restore();
        
    }

    function draw(){ //draw circles
        context.save();
        context.lineWidth = ".01px solid";
        context.moveTo(width/2, height/2);

        for(let i = 0; i< 450; i++){ //draw 450 shapes
            context.beginPath();
            let x = (Math.random()*width); //random x
            let y = (Math.random()*height); //random y
            let n = noise.simplex2(x,y); //woo perlin noise! from https://github.com/josephg/noisejs module
            
            context.arc(x*n,y*n, Math.abs(5*n), 0, 2*Math.PI);
            context.drawImage(flower, x*n,y*n,300*n,300*n);

            context.closePath();
            context.fill();
        }
        context.restore();

        requestAnimationFrame(draw);
    }
    

    const flower = document.querySelector('img');

    if(flower){setup(); draw();} //only run if image works run setup 

    window.addEventListener("resize", setup);
}

function foregroundDraw(){
    let camera, scene, renderer, controls, model;
    let material, sphereGeometry, sphere;

    function textureCreator(){
        let textureLoader = new THREE.TextureLoader();

        textureLoader.load('img/moon.jpeg', function(texture) {
            material = new THREE.MeshStandardMaterial({map: texture});

            sphereGeometry = new THREE.SphereGeometry(100, 50, 50);
            sphere = new THREE.Mesh(sphereGeometry, material);
            sphere.position.y = 600;
            sphere.position.x = 600;
            sphere.castShadow = true;
            scene.add(sphere);

        });
    }

    function setup() {
        scene = new THREE.Scene();
        let width = window.innerWidth;
        let height = window.innerHeight;

        camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000); // FOV, aspect ration, near, far
        camera.position.set(0, 1000, 2000); // x, y (move up), back out on the z-axis
        scene.add(camera); // add camera to scene

        textureCreator();

        // instantiate a GL Transmission Format loader
        let loader = new THREE.GLTFLoader();

            // load a glTF resource
            loader.load(
            // resource URL
            'media/scene.gltf',
            // called when the resource is loaded
            function(gltf) {
                model = gltf.scene; //get model
                scene.add(model); //add model
            }
        );

        renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
        renderer.setSize(width, height);
        controls = new THREE.OrbitControls(camera, renderer.domElement); // new orbit controls

        document.body.appendChild(renderer.domElement);
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate); //recursion

        if (model) {
            model.rotation.y += 0.001;
        }
        if (sphere) {
            sphere.rotation.y -= 0.01;
            sphere.rotation.x -= 0.01;
        }

        renderer.setClearColor( 0xffffff, 0); //set color to clear
        renderer.render(scene, camera); //render scene
        controls.update(); //update controls
    }
    function windowResize() {
        camera.aspect = (window.innerWidth / window.innerHeight); //update camera
        camera.updateProjectionMatrix(); // update camera
      
        renderer.setSize(window.innerWidth, window.innerHeight); //update renderer size
    }

    setup();
    animate(); 
    window.addEventListener("resize", windowResize);
}

window.addEventListener("load", ()=>{
    foregroundDraw();
    backgroundDraw(); 
});

