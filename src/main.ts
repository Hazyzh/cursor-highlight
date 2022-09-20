import './style.less';

import { PaletteBox } from './paletteBox';
import { Main } from './program';

const myPics = <HTMLCanvasElement>document.getElementById('cursorHighlight');
const paletteBox = new PaletteBox();

const program = new Main({ canvas: myPics, paletteBoxEmitter: paletteBox.eventEmitter });
program.init();

window.app = program;
window.paletteBox = paletteBox;
