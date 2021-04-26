/*
TLDR: Order of functions: API CALL -> Editor -> GridMaker, Animator
*/
const graph = document.getElementById("graph");
const circle = document.getElementById("circle");
const paragraph = document.getElementById("description");
const title = document.getElementById("title");

//calls api
let apiCall = async () => {
    const url = `https://www.quandl.com/api/v3/datasets/MULTPL/SP500_EARNINGS_YIELD_MONTH.json?api_key=${api_key}`; //grabs the key from my php
    const response = await fetch(url);
    if (response.ok){
        await response.json().then(editor); // then will run editor function after promise resolves, gotta love learning new things!
    }else{
        console.log("Cannot access file");
    }
};

//prepares data for animation
let editor = (file) => {
    var circlePath = []; //array with a bunch of coords in it for graph simulation
    const data = file.dataset.data;
    for (let i = 0; i<data.length; i++){
        circlePath.push(data[i][1]);
    }
    gridMaker(circlePath); //make grid
    paragraph.textContent = file.dataset.description; //get description
    title.textContent = file.dataset.name; //get name
    /* initial transformation */
    circle.style.transform = `translate(0px, ${(parseFloat(graph.offsetHeight)-50) + (-1 * circlePath[counter-1]*10)}px)`;
    circle.style.display = 'block';
    // animate 
    var change = 1;
    var counter = 0;
    setInterval(() => {
        counter += change;
        if(counter >= 1815 || counter<=0){
            change = change *-1;
        }
        animator(counter,circlePath);
    },50);
}

//animates
let animator = (counter,circlePath) => {
    //there are 1815 values to be split amongst the screen width
    var insideW = parseFloat(graph.offsetWidth);
    var insideH = parseFloat(graph.offsetHeight);

    var origCoord = [(counter-1) * (insideW/1815), (insideH-50) + (-1 * circlePath[counter-1]*10)];
    var nextCoord = [(counter) * (insideW/1815), (insideH-50) + (-1 * circlePath[counter]*10)];

    // keyframe object
    let mover = 1000000000;
    let movement = [

        {transform: `translate(${origCoord[0]}px, ${origCoord[1]}px) rotate(${Math.floor(Math.random()*mover)}deg)`, 
         background: `radial-gradient(hsl(${Math.floor(Math.random()*100)+60},100%,80%),hsl(${Math.floor(Math.random()*100)+160},100%,80%),hsl(${Math.floor(Math.random()*100)+260},100%,80%))`,
         borderRadius: `${Math.floor(Math.random()*30)+20}%`}, 

        {transform: `translate(${nextCoord[0]}px, ${nextCoord[1]}px) rotate(${Math.floor(Math.random()*mover)}deg)`, 
         background: `radial-gradient(hsl(${Math.floor(Math.random()*100)+60},100%,80%),hsl(${Math.floor(Math.random()*100)+160},100%,80%),hsl(${Math.floor(Math.random()*100)+260},100%,80%))`, 
         borderRadius: `${Math.floor(Math.random()*30)+20}%`}
    ];

    // timing object
    let timing = {duration: 50, iterations: 1};

    // put together with the animate method
    circle.animate(movement,timing);
    
}

let gridMaker = (circlePath) =>{
//Apply CSS to grid for graph
   graph.style.gridColumn = `1/${circlePath.length/5}`;
//    graph.style.gridRow = `1/2`;
    for(let i = 0; i<circlePath.length/15; i++){ //I dont know what sorcery i did but dividing by 15 reduced it enough such that I got it to work
        let temp_div = document.createElement("div");
        temp_div.classList.add("gridborder");
        graph.appendChild(temp_div);
    }
};

window.addEventListener("load", apiCall);

//graphing

//style of svg
// document.getElementById("lines").style.width = document.getElementById("graph").style.offsetWidth;
// console.log(document.getElementById("lines").style.offsetWidth);