import { IPointPosition } from '../Base.interface';
import { IBaseShapeProps } from './BaseShape.interface';

const initOffset = { x: 0, y: 0 };
export abstract class BaseShape {
  protected startPoint: IBaseShapeProps['startPoint'];
  protected ctx: IBaseShapeProps['ctx'];
  protected lineWidth: IBaseShapeProps['lineWidth'];
  protected strokeStyle: IBaseShapeProps['strokeStyle'];

  protected auxiliaryStrokeStyle = 'black';
  protected auxiliaryLineWidth = 1;
  protected auxiliaryFillStyle = '#fff';
  public modifying = false;

  protected modifyStartPoint?: IPointPosition;
  protected modifyingOffset = initOffset;
  protected currentPath!: Path2D;

  constructor({ startPoint, ctx, lineWidth, strokeStyle }: IBaseShapeProps) {
    this.startPoint = startPoint;
    this.ctx = ctx;
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
  }

  protected abstract mouseMove(position: IPointPosition): void;
  public abstract drawShape(): void;

  protected abstract drawAuxiliaryShape(): void;
  protected abstract finishShape(
    position: IPointPosition
  ): undefined | BaseShape;

  public finishDraw(position: IPointPosition) {
    const res = this.finishShape(position);
    this.modifying = false;
    this.modifyingOffset = initOffset;
    this.modifyStartPoint = undefined;
    return res;
  }

  public onMouseMove(position: IPointPosition) {
    if (this.modifying && this.modifyStartPoint) {
      const {
        modifyStartPoint: { x, y },
      } = this;
      this.modifyingOffset = { x: position.x - x, y: position.y - y };
    } else {
      this.mouseMove(position);
    }
  }

  public setModifyStartPoint(position: IPointPosition) {
    this.modifying = true;
    this.modifyStartPoint = position;
  }

  public drawActiveShape() {
    this.drawShape();
    this.drawAuxiliaryShape();
  }

  public checkIsTapStroke({ x, y }: IPointPosition): boolean {
    this.ctx.lineWidth = this.lineWidth;
    return this.ctx.isPointInStroke(this.currentPath, x, y);
  }
}
