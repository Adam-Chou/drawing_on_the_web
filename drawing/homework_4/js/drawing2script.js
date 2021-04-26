/*
Part 2: A new web page with a custom animation using JavaScript’s requestAnimationFrame() method or Web Animation API (2 points)
Part 2: For the requestAnimationFrame() method, the drawing function should be called recursively to change some aspect of CSS over time;
 for the Web Animations API, the animate() method should be used with keyframe objects and a timing object. (1 point)
*/
//grab what we need to manipulate
const innerCircles = document.getElementsByClassName("innercircle");
const outerCircles = document.getElementsByClassName("outercircle");
const gotoPart1 = document.getElementById("pageturner");
const cursor = document.getElementById("pointer");

gotoPart1.onclick = function(e){
    window.location.href='index.html';
}
//Scrapped Idea, couldn't get it to work
// function customCursor(e){
//     let posX = e.clientX;
//     let posY = e.clientY;
//     cursor.style.top = `${posY}px`;
//     cursor.style.left = `${posX}px`;
//     // console.log(posX, posY);
// }

function bugOut(){
    // keyframe objects, two arrays in an array.
    let eyeSize = [
        [{width: '50%', height: '50%'}, 
        {width: '60%', height: '60%'}]
        ,
        [{width: '50%', height: '50%'}, 
        {width: '40%', height: '40%'}]
    ];
    // timing object, couldn't get animationDirection to work properly
    let eyeDuration = {duration: 5000, iterations: Infinity,direction: "alternate-reverse"};

        for(let i = 0; i<innerCircles.length; i++){
            if (i%2 == 0){
                innerCircles[i].animate(eyeSize[0], eyeDuration);
            }else{
                innerCircles[i].animate(eyeSize[1], eyeDuration);
            }
        }
}

function eyeMovement(e){
    //ratio client movement to % change
    let moveX = (e.clientX/window.innerWidth *100);
    let moveY = (e.clientY/window.innerHeight * 100);

    for(let i = 0; i<innerCircles.length; i++){
        if (i%2 == 0){
            innerCircles[i].style.transform = `translate(${String(moveX)}%,${String(moveY)}%)`;
            // console.log("okay")
        }else{
            innerCircles[i].style.transform = `translate(${String(moveY)}%,${String(moveX)}%)`;
        }
}};
//honestly this boolean doesnt really work, but oh well.
var bowlean = false;
window.addEventListener("mousemove", (e) => {if(bowlean != true){ colorPicker(e)};});

//calls backgroundChange
function colorPicker(e){
    clearTimeout(colorPicker);
    var colors  = [(e.clientX/window.innerHeight * 180),
                (e.clientY/window.innerHeight * 180)];
    setInterval(backgroundChange(colors), 5000);
}


function backgroundChange(colors){
    bowlean = true;
    //random picker
    let randomPicker = Math.floor(Math.random()*120);
    
    // keyframe objects, two arrays in an array.
    let keyframecolors = [
                            [{backgroundColor: `hsl(${String(colors[1]+randomPicker)},50%,50%)`}, 
                            {backgroundColor: `hsl(${String(colors[0]+randomPicker)},50%,50%)`}]
                            ,
                            [{backgroundColor: `hsl(${String(colors[0]+randomPicker)},50%,50%)`}, 
                            {backgroundColor: `hsl(${String(colors[1]+randomPicker)},50%,50%)`}]
                        ];
    // timing object
    let colorTiming = {duration: 2000, iterations: Infinity, direction: "alternate-reverse"}; //animation-direction

        for(let i = 0; i<outerCircles.length; i++){
            if(Math.floor(colors[1])%8 == 0 && Math.floor(colors[0])%8 == 0){
                if (i%2 == 0){
                    outerCircles[i].animate(keyframecolors[0], colorTiming);
                    //  outerCircles[i].style.backgroundColor = `hsl(${String(color1+randomPicker)},50%,50%)`;
                }else{
                    outerCircles[i].animate(keyframecolors[1], colorTiming);
                    //  outerCircles[i].style.backgroundColor = `hsl(${String(color2+randomPicker)},50%,50%)`;
                }
            }
        }
    bowlean = false;
    console.log(bowlean)
}

//Start at center - I dont really know why it doesnt work in my css
for(let i = 0; i<innerCircles.length; i++){
    innerCircles[i].style.transform = "translate(50%,50%)"; 
}
for(let i = 0; i<outerCircles.length; i++){
    outerCircles[i].style.backgroundColor = "grey";
}


window.addEventListener("mousemove", eyeMovement);
setTimeout(bugOut(), 1000);
