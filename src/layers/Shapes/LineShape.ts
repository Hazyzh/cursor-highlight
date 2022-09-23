import { IPointPosition } from '../Base.interface';
import { BaseShape } from './BaseShape';

export class LineShape extends BaseShape {
  private line?: IPointPosition[];

  public mouseMove(position: IPointPosition) {
    if (!this.line) {
      this.line = [this.startPoint];
    }
    this.line.push(position);
  }

  public finishShape(position: IPointPosition) {
    if (!this.line) return;

    this.line.push(position);
    return this;
  }

  public drawShape(): void {
    if (!this.line) return;

    const { ctx } = this;
    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    this.line.forEach(({ x, y }, index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.closePath();
  }
}
