import { IPointPosition } from '../Base.interface';
import { BaseShape } from './BaseShape';

export abstract class RectAuxiliaryShape extends BaseShape {
  protected abstract visibleAuxiliaryPath: boolean;
  protected endPoint!: IPointPosition;

  protected getAuxiliaryArcCenters(): IPointPosition[] {
    const { startPoint, endPoint } = this;
    if (!endPoint) return [];

    const { x: startX, y: startY } = startPoint;
    const { x: endX, y: endY } = endPoint;
    const middleX = (startX + endX) / 2;
    const middleY = (startY + endY) / 2;

    return [
      // horizontal start line
      startPoint,
      { x: middleX, y: startY },
      { x: endX, y: startY },
      // vertical middle
      { x: startX, y: middleY },
      { x: endX, y: middleY },
      // horizontal end line
      { x: startX, y: endY },
      { x: middleX, y: endY },
      endPoint,
    ];
  }

  protected drawAuxiliaryShape(): void {
    const { ctx, endPoint, startPoint } = this;
    if (!endPoint) return;

    ctx.strokeStyle = this.auxiliaryStrokeStyle;
    ctx.lineWidth = this.auxiliaryLineWidth;
    ctx.fillStyle = this.auxiliaryFillStyle;

    const points = this.getAuxiliaryArcCenters();
    points.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });

    if (this.visibleAuxiliaryPath) {
      ctx.beginPath();
      ctx.rect(
        startPoint.x,
        startPoint.y,
        endPoint.x - startPoint.x,
        endPoint.y - startPoint.y
      );
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.closePath();
    }
  }

  get middleXOrdinate() {
    const { startPoint, endPoint } = this;
    const middleX = (startPoint.x + endPoint.x) / 2;
    return middleX;
  }

  get middleYOrdinate() {
    const { startPoint, endPoint } = this;
    const middleY = (startPoint.y + endPoint.y) / 2;
    return middleY;
  }
}
