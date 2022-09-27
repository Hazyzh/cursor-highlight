import { ArrowAuxiliaryShape } from './AuxiliaryBase';

export class ArrowShape extends ArrowAuxiliaryShape {
  protected visibleAuxiliaryPath: boolean = false;

  public drawShape(): void {
    if (!this.endPoint) return;

    const { ctx } = this;
    const { startPoint, endPoint } = this.computedPoints;

    const currentPath = new Path2D();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    currentPath.moveTo(startPoint.x, startPoint.y);
    currentPath.lineTo(endPoint.x, endPoint.y);
    ctx.stroke(currentPath);
    this.currentPath = currentPath;
  }
}
