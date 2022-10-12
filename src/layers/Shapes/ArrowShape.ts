import { IPointPosition } from '../Base.interface';
import { ArrowAuxiliaryShape } from './AuxiliaryBase';

export class ArrowShape extends ArrowAuxiliaryShape {
  protected visibleAuxiliaryPath: boolean = false;
  private maxArrowInsidePointOffsetX = 60;
  private maxArrowOutsidePointOffsetX = 75;

  private maxArrowInsidePointOffsetY = 15;
  private maxArrowOutsidePointOffsetY = 45;

  public drawShape(): void {
    if (!this.endPoint) return;

    const { ctx, distance, lineWidth, lineSlope } = this;
    const { startPoint } = this.computedPoints;
    const { x, y } = startPoint;

    const insidePointOffsetX = Math.max(distance * 0.833, distance - this.maxArrowInsidePointOffsetX);
    const insidePointOffsetY = Math.min(distance * 0.042, this.maxArrowInsidePointOffsetY);

    const outsidePointOffsetX = Math.max(distance * 0.792, distance - this.maxArrowOutsidePointOffsetX);
    const outsidePointOffsetY = Math.min(distance * 0.125, this.maxArrowOutsidePointOffsetY);

    ctx.save();
    ctx.translate(x, y);
    const arrowOffset = lineWidth / 3;
    const currentPath = new Path2D();
    currentPath.moveTo(arrowOffset, -arrowOffset);
    currentPath.lineTo(insidePointOffsetX, -insidePointOffsetY);
    currentPath.lineTo(outsidePointOffsetX, -outsidePointOffsetY);
    currentPath.lineTo(distance, 0);
    currentPath.lineTo(outsidePointOffsetX, outsidePointOffsetY);
    currentPath.lineTo(insidePointOffsetX, insidePointOffsetY);
    currentPath.lineTo(arrowOffset, arrowOffset);
    currentPath.arc(arrowOffset, 0, arrowOffset, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.rotate(lineSlope);
    ctx.fillStyle = this.strokeStyle;
    ctx.lineWidth = 1;
    ctx.fill(currentPath);
    ctx.stroke(currentPath);
    ctx.restore();
    this.currentPath = currentPath;
  }

  protected checkIsTapShape({ x, y }: IPointPosition): boolean {
    const { ctx, lineSlope, currentPath } = this;
    const { startPoint } = this.computedPoints;
    ctx.save();
    ctx.translate(startPoint.x, startPoint.y);
    ctx.rotate(lineSlope);
    const isTap = ctx.isPointInPath(currentPath, x, y);
    ctx.restore();
    return isTap;
  }

  get distance() {
    const { startPoint, endPoint } = this.computedPoints;
    return Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
  }

  get lineSlope() {
    const { startPoint, endPoint } = this.computedPoints;

    const offsetX = endPoint.x - startPoint.x;
    const offsetY = startPoint.y - endPoint.y;
    return -Math.atan2(offsetY, offsetX);
  }
}
