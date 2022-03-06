import { BaseLayer } from './Base';
import { IPointPosition } from './Base.interface';

interface ILineItem {
  start: IPointPosition;
  end: IPointPosition;
}
export class PaintingLayer extends BaseLayer {
  private strokeStyle = 'red';
  private lineWidth = 10;
  private isDrawing = false;
  private lines: ILineItem[] = [];
  private startPosition: IPointPosition = { x: 0, y: 0 };
  private paintingKey = 0;

  public draw() {
    const { lines, ctx, strokeStyle, lineWidth } = this;
    if (!lines.length) return;

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    lines.forEach(line => this.drawLine(line));
  }

  mouseMove(e: MouseEvent) {
    if (!this.isDrawing) return;

    const currentPosition = {x: e.offsetX, y: e.offsetY};
    const lineItem: ILineItem = {
      start: this.startPosition,
      end: currentPosition,
    }
    this.startPosition = currentPosition;
    this.lines.push(lineItem);
  }

  mouseDown(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;

    this.isDrawing = true;
    this.startPosition = {x: e.offsetX, y: e.offsetY};
  }

  mouseUp(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;

    this.isDrawing = false;
    // this.lines = [];
  }

  drawLine(line: ILineItem) {
    const { start, end } = line;
    const { ctx } =  this;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }
}