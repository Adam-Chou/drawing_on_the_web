//grab what we need to manipulate
let innerCircles = document.getElementsByClassName("innercircle");
let outerCircles = document.getElementsByClassName("outercircle");
let gotoPart2 = document.getElementById("pageturner");
let cursor = document.getElementById("pointer")

gotoPart2.onclick = function(e){
    window.location.href='drawing2.html'
}

// console.log(innerCircles)
function eyeMovement(e){
    //ratio client movement to % change
    let moveX = (e.clientX/window.innerWidth *100);
    let moveY = (e.clientY/window.innerHeight * 100);

    for(let i = 0; i<innerCircles.length; i++){
        if (i%2 == 0){
            innerCircles[i].style.transform = `translate(${String(moveX)}%,${String(moveY)}%)`;
            // console.log("okay")
        }else{
            innerCircles[i].style.transform = `translate(${String(moveX)}%,${String(moveY)}%)`;
        }
}};

for(let i = 0; i<innerCircles.length; i++){
    innerCircles[i].style.transform = "translate(50%,50%)"; 
}

window.addEventListener("mousemove", eyeMovement);