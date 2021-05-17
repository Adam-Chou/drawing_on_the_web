const boxes = document.getElementsByClassName("box");
const spans = document.querySelectorAll("span")

for (let i = 0; i<boxes.length; i++){
    let value;
    if (i == 2){value = 1;}else if(i == 1){value = 2;}else{value = i;}
    console.log(value)
    boxes[value].addEventListener("mouseover",(e)=>{
        e.currentTarget.style.width = "40%";
        e.currentTarget.style.opacity = "1";
        spans[i].style.opacity = "1";
    });
    boxes[value].addEventListener("mouseleave",(e)=>{
        e.currentTarget.style.width = "33.3%";
        e.currentTarget.style.opacity = "0.6";
        spans[i].style.opacity = "0.6";
    });
    boxes[value].addEventListener("click",(e)=>{
        window.location.href = `${e.currentTarget.dataset.link}.html`;
    });
}