//variable declarations
const television = document.querySelector(".container");
const display = document.querySelector("#outerCanvas");

//functions
let changeText = () => {display.style.display = "flex"; television.style.opacity = "100%";};
let revertText = () => {display.style.display = "None"; television.style.opacity = "60%";};
let goHome = () => window.location.href = "index.html";

//event listeners
window.addEventListener("load", ()=> {television.style.opacity = "60%";});
television.addEventListener("mouseover", changeText); //change display to flex
television.addEventListener("mouseleave", revertText); //change display to nonw
display.addEventListener("click", goHome); //go back to index