import './style.css';

const myPics = <HTMLCanvasElement>document.getElementById('mouse-highlight');
const toolBar = <HTMLButtonElement>document.getElementById('toolBar');
const context = myPics.getContext('2d');
// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

if (context && myPics) {
  toolBar.onclick = () => {
    context.clearRect(0, 0, myPics.width, myPics.height);
  }

  context.canvas.width  = window.innerWidth;
  context.canvas.height = window.innerHeight;
  // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

  // Add the event listeners for mousedown, mousemove, and mouseup
  myPics.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
  });

  myPics.addEventListener('mousemove', e => {
    if (isDrawing === true) {
      drawLine(context, x, y, e.offsetX, e.offsetY);
      x = e.offsetX;
      y = e.offsetY;
    }
  });

  window.addEventListener('mouseup', e => {
    if (isDrawing === true) {
      drawLine(context, x, y, e.offsetX, e.offsetY);
      x = 0;
      y = 0;
      isDrawing = false;
    }
  });
}

function drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 10;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}