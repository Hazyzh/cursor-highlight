import {
  BackgroundLayer,
  BaseLayer,
  PaintingLayer,
} from './layers';

interface MainParams {
  canvas: HTMLCanvasElement;
}

export class Main {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cWidth: number;
  private cHeight: number;

  private layersClasses = [ BackgroundLayer, PaintingLayer ];
  private layers: BaseLayer[];
  private working: boolean = false;



  constructor({
    canvas
  }: MainParams) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.cHeight = window.innerHeight;
    this.cWidth = window.innerWidth;
    this.layers = this.layersClasses.map(
      (LayerClass) => 
        new LayerClass({ canvas: this.canvas, ctx: this.ctx, cHeight: this.cHeight, cWidth: this.cWidth })
    );
    this.init();
  }

  private init() {
    // this.working = true;
    this.ctx.canvas.width = this.cWidth;
    this.ctx.canvas.height = this.cHeight
    this.draw();
  }

  private draw = () => {
    console.log('123');
    this.layers.forEach(layer => layer.draw());
    if (this.working) {
      window.requestAnimationFrame(this.draw);
    }
  }
}

