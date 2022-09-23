import { IPointPosition } from '../Base.interface';
import { BaseShape } from './BaseShape';

export class RectangleShape extends BaseShape {
  private endPoint?: IPointPosition;

  public mouseMove(position: IPointPosition) {
    this.endPoint = position;
  }

  public finishShape(position: IPointPosition) {
    if (!this.endPoint) return;

    this.endPoint = position;
    return this;
  }

  public drawShape(): void {
    const { ctx, endPoint, startPoint } = this;
    if (!endPoint) return;

    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.rect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
    ctx.stroke();
    ctx.closePath();
  }
}
