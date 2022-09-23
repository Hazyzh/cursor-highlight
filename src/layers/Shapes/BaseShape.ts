import { IPointPosition } from '../Base.interface';
import { IBaseShapeProps } from './BaseShape.interface';

export abstract class BaseShape {
  public startPoint: IBaseShapeProps['startPoint'];
  public ctx: IBaseShapeProps['ctx'];
  public lineWidth: IBaseShapeProps['lineWidth'];
  public strokeStyle: IBaseShapeProps['strokeStyle'];

  constructor({ startPoint, ctx, lineWidth, strokeStyle }: IBaseShapeProps) {
    this.startPoint = startPoint;
    this.ctx = ctx;
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
  }

  public abstract mouseMove(position: IPointPosition): void;
  public abstract finishShape(position: IPointPosition): undefined | BaseShape;
  public abstract drawShape(): void;
}
