import './style.css';

import { Main } from './program';

const myPics = <HTMLCanvasElement>document.getElementById('cursor-highlight');

const program = new Main({ canvas: myPics })
program.init();

window.app = program;
