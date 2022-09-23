import { IPointPosition } from '../Base.interface';
import { BaseShape } from './BaseShape';

export class CircleShape extends BaseShape {
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

    const { x: startX, y: startY } = startPoint;
    const { x: endX, y: endY } = endPoint;

    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const radiusX = Math.abs(endX - startX) / 2;
    const radiusY = Math.abs(endY - startY) / 2;

    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}
