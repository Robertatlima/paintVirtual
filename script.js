//inital data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;


let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')
//events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);
/*Passo a passo para desenhar no canvas
-quando o click do mouse ABAIXAR, ative o modo desenho.
-quando o mouse se mover e o modo desenho ativado, desenhe.
-quando o mouse é solto desative o modo desenho
*/ 

//function
function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    //console.log('cor clicada:', color);
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e){
    //console.log('clicou mouse')
    canDraw = true;
    // / variaveis que fazem o canvas ter o inicio da pagina no lad esquero de cima.
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e){
    //console.log('moveu mouse')
    if(canDraw){
        draw(e.pageX, e.pageY);
        
  
    }
}
function mouseUpEvent(){
    //console.log('soltou mouse')
    canDraw = false;
}
function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;
   //processo de desenhar linhas(variaos pixels) 
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();
    //desenhar(posicao anterios. continua...)
    mouseX = pointX;
    mouseY = pointY;

}

function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}