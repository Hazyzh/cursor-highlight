import { IBaseLayerProps } from './Base.interface';

export abstract class BaseLayer {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public cHeight: number;
  public cWidth: number;

  constructor({
    canvas,
    ctx,
    cHeight,
    cWidth,
  }: IBaseLayerProps) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cHeight = cHeight;
    this.cWidth = cWidth;
    this.init();
  }

  public abstract draw(): void;
  public abstract init(): void;
}
