import './style.css';

import { Main } from './program';

const myPics = <HTMLCanvasElement>document.getElementById('mouse-highlight');

window.program = new Main({ canvas: myPics })