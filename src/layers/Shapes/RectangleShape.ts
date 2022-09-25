import { RectAuxiliaryShape } from './RectAuxiliaryShape';

export class RectangleShape extends RectAuxiliaryShape {
  protected visibleAuxiliaryPath: boolean = false;

  public drawShape(): void {
    const {
      ctx,
      computedPoints: { startPoint, endPoint },
    } = this;
    if (!endPoint) return;

    const currentPath = new Path2D();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    currentPath.rect(
      startPoint.x,
      startPoint.y,
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y
    );
    ctx.stroke(currentPath);
    this.currentPath = currentPath;
  }
}
