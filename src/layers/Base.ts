import { BaseLayerProps } from './Base.interface';

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
  }: BaseLayerProps) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cHeight = cHeight;
    this.cWidth = cWidth;
  }

  public abstract draw(): void;
  public mouseMove?(e: MouseEvent): void;
}