import {
  BackgroundLayer,
  BaseLayer,
  PaintingLayer,
  PastingContent,
} from './layers';

interface IMainParams {
  canvas: HTMLCanvasElement;
}

export class Main {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cWidth: number;
  private cHeight: number;

  private layersClasses = [BackgroundLayer, PastingContent, PaintingLayer];
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
    this.ctx.canvas.height = this.cHeight;
    this.draw();
  }

  private draw = () => {
    this.layers.forEach(layer => {
      this.ctx.save();
      layer.draw();
      this.ctx.restore();
    });
    if (this.working) {
      window.requestAnimationFrame(this.draw);
    }
  };

  clean() {
    const { cWidth, cHeight } = this;
    this.ctx.clearRect(0, 0, cWidth, cHeight);
  }

  get renderLayers() {
    return this.layers.reduce((pre, item) => ({ ...pre, [item.constructor.name.toLowerCase()]: item }), {});
  }
}
