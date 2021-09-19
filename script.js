// var declaration
var vW, vH, vX, vY;
var res;
var reg = /^\d+$/;
var can = document.getElementById("myCanvas");
var ctx = can.getContext('2d');
var coordX;
var coordY;
var vWX, vHY;

// calculates the squares area
function calcSqr() { 
    res = vW*vH;
    return res;
}

// clears the square
function clrSqr() {
    ctx.clearRect(0,0,800,600);
    document.getElementById("_res").innerHTML ='';
    document.getElementById("_mousecoord").innerHTML= '';   
}

// resets all input fields
function resetInput() {
    document.getElementById('_W').value = '';
    document.getElementById('_H').value = '';
    document.getElementById('_X').value = '';
    document.getElementById('_Y').value = '';
}

// draws the square
function drawSqr() {
    document.getElementById("_res").innerHTML = "";
    vW = document.getElementById("_W").value;
    vH = document.getElementById("_H").value;
    vX = document.getElementById("_X").value;
    vY = document.getElementById("_Y").value;
    // checks if x and y coordinates aren't blank, if they are - puts them to 0 by default.
    if (vX == "" || vY == "") {
        vX = 0;
        vY = 0;
    }
    // checks if any of the req fields are empty
    if (vW == "" || vH == "") {
        clrSqr();
        document.getElementById("_res").innerHTML = 'Width and Height inputs cannot stay empty.';
        return;
    }
    // checks if one of the req fields isnt a number
    if (!reg.test(vW) || !reg.test(vH) || !reg.test(vX) || !reg.test(vY) ){
        clrSqr();
        document.getElementById("_res").innerHTML = 'Invalid input value.';
        return;
    }
    // checks if A value is bigger than 200 (rectangle limit)
    if (vW > 200 || vW < 1) {
        clrSqr();
        document.getElementById("_res").innerHTML = `Width value is out of range. <br> Current value is: ${vW}`;
        return;
    } else if (vH > 200 || vH < 1) {
        clrSqr();
        document.getElementById("_res").innerHTML = `Height value is out of range. <br> Current value is: ${vH}`;
        return;
    }

    inCanvas();
    ctx.beginPath();
    ctx.rect(vX, vY, vW, vH);
    ctx.strokeStyle = "rgb(25, 25, 25)";
    ctx.clearRect(0, 0, 1000, 600);
    ctx.stroke();
    calcSqr();
    document.getElementById("_res").innerHTML +=`Area result: ${res}.`;   
}

// random rectangle
function rndSqr() {
    document.getElementById("_res").innerHTML = "";
    vW = Math.floor(Math.random()*200);
    vH = Math.floor(Math.random()*200);
    vX = Math.floor(Math.random()*400);
    vY = Math.floor(Math.random()*300);
    inCanvas();
    ctx.beginPath();
    ctx.rect(vX, vY, vW, vH);
    ctx.strokeStyle = "rgb(25, 25, 25)";
    ctx.clearRect(0, 0, 1000, 600);
    ctx.stroke();
    calcSqr();
    document.getElementById('_W').value = vW;
    document.getElementById('_H').value = vH;
    document.getElementById('_X').value = vX;
    document.getElementById('_Y').value = vY;
    document.getElementById("_res").innerHTML =`Area result: ${res}.`;   
}

// checks coordinates of x and y
function coordCheck(event) {
    coordX = event.offsetX;
    coordY = event.offsetY;
    document.getElementById("_X").value = coordX;
    document.getElementById("_Y").value = coordY;
    document.getElementById("_mousecoord").innerHTML= `X coords: ${coordX}. <br> Y coords: ${coordY}.`;
}

/*(-)bonus
 inits random rectangle every init load
 can be set by setInterval() to recreate a random rectangle every X milliseconds */
function _init() {
    setTimeout(rndSqr, 100);
}

// checks if drawn in canvas, if not, resets canvas x,y to 0,0.
// theres no need for negative check because regex is checking whether a number is positive or not beforehand
function inCanvas() {
    vWX = +vW + +vX;
    vHY = +vH + +vY;
    if (vWX > 800 || vHY > 600) {
        _res.innerHTML += `Out of canvas.<br>Resetting X+Y coordinates (0,0).<br>`
        vX = 0;
        vY = 0;
    }
}