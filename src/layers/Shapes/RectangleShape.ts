import { IPointPosition } from '../Base.interface';
import { RectAuxiliaryShape } from './RectAuxiliaryShape';

export class RectangleShape extends RectAuxiliaryShape {
  protected visibleAuxiliaryPath: boolean = false;

  protected mouseMove(position: IPointPosition) {
    this.endPoint = position;
  }

  protected finishShape(position: IPointPosition) {
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
    ctx.rect(
      startPoint.x,
      startPoint.y,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y
    );
    ctx.stroke();
    ctx.closePath();
  }
}
