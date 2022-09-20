import { IBaseLayerProps } from './Base.interface';

export abstract class BaseLayer {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public cHeight: number;
  public cWidth: number;
  public paletteBoxEmitter: IBaseLayerProps['paletteBoxEmitter'];

  constructor({
    canvas,
    ctx,
    cHeight,
    cWidth,
    paletteBoxEmitter,
  }: IBaseLayerProps) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cHeight = cHeight;
    this.cWidth = cWidth;
    this.paletteBoxEmitter = paletteBoxEmitter;
    this.init();
  }

  public abstract draw(): void;
  public abstract init(): void;
}
