import { RectAuxiliaryShape } from './AuxiliaryBase';

export class CircleShape extends RectAuxiliaryShape {
  protected visibleAuxiliaryPath: boolean = true;

  public drawShape(): void {
    const { ctx, computedPoints: { startPoint, endPoint }, } = this;
    if (!endPoint) return;

    const { x: startX, y: startY } = startPoint;
    const { x: endX, y: endY } = endPoint;

    const radiusX = Math.abs(endX - startX) / 2;
    const radiusY = Math.abs(endY - startY) / 2;
    ctx.beginPath();
    const currentPath = new Path2D();

    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    currentPath.ellipse(this.middleXOrdinate, this.middleYOrdinate, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke(currentPath);
    this.currentPath = currentPath;
  }
}
