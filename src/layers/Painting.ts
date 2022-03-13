import { BaseLayer } from './Base';
import { IPointPosition } from './Base.interface';

export class PaintingLayer extends BaseLayer {
  private strokeStyle = 'red';
  private lineWidth = 5;
  private isDrawing = false;
  private lines: IPointPosition[][] = [];
  private activeLines: IPointPosition[] = [];
  private paintingKey = 0;

  public draw() {
    const { activeLines, lines, ctx, strokeStyle, lineWidth } = this;
    if (!lines.length && !activeLines.length) return;

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    lines.forEach(line => this.drawLine(line));
    this.drawLine(activeLines);
  }

  mouseMove(e: MouseEvent) {
    if (!this.isDrawing) return;

    const currentPosition = {x: e.offsetX, y: e.offsetY};
    this.activeLines.push(currentPosition);
  }

  mouseDown(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;

    this.isDrawing = true;
    if (this.activeLines.length > 1) {
      this.lines.push(this.activeLines);
    }

    this.activeLines = [];
  }

  mouseUp(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;

    this.isDrawing = false;
    // this.lines = [];
  }

  drawLine(line: IPointPosition[]) {
    const { ctx } =  this;
    ctx.beginPath();
    line.forEach(({x, y}, index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
       ctx.lineTo(x, y);
      }
    })
    ctx.stroke();
    ctx.closePath();
  }
}