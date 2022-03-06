import {
  BackgroundLayer,
  BaseLayer,
  PaintingLayer,
} from './layers';

interface IMainParams {
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
  }: IMainParams) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.cHeight = window.innerHeight;
    this.cWidth = window.innerWidth;
    this.layers = this.layersClasses.map(
      (LayerClass) => 
        new LayerClass({ canvas: this.canvas, ctx: this.ctx, cHeight: this.cHeight, cWidth: this.cWidth })
    );
  }

  public init() {
    this.working = true;
    this.ctx.canvas.width = this.cWidth;
    this.ctx.canvas.height = this.cHeight
    this.draw();
    this.initListeners();
  }

  private draw = () => {
    this.layers.forEach(layer => layer.draw());
    if (this.working) {
      window.requestAnimationFrame(this.draw);
    }
  }

  private initListeners() {
    this.canvas.addEventListener('mousemove', e => {
      e.preventDefault();
      this.layers.forEach(layer => layer.mouseMove?.(e))
    });
    this.canvas.addEventListener('mousedown', e => {
      e.preventDefault();
      this.layers.forEach(layer => layer.mouseDown?.(e))
    });
    this.canvas.addEventListener('mouseup', e => {
      e.preventDefault();
      this.layers.forEach(layer => layer.mouseUp?.(e))
    });
    this.canvas.addEventListener('wheel', e => {
      e.preventDefault();
      this.layers.forEach(layer => layer.mouseWheel?.(e))
    })
  }

  get renderLayers() {
    return this.layers.reduce((pre, item) => ({...pre, [item.constructor.name.toLowerCase()]: item}), {});
  }
}

