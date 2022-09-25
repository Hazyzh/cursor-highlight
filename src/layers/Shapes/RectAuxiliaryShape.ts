import { IPointPosition } from '../Base.interface';
import { BaseShape } from './BaseShape';

type OffsetRate = 0 | 1;
type RectOffsetRateList = [OffsetRate, OffsetRate, OffsetRate, OffsetRate];

class RectAuxiliaryPoint {
  public currentPath!: Path2D;
  public centerPoint!: IPointPosition;
  public offsetRateList: RectOffsetRateList;
  public active = false;

  constructor({ offsetRateList }: { offsetRateList: RectOffsetRateList }) {
    this.offsetRateList = offsetRateList;
  }

  public setCenterPoint(position: IPointPosition) {
    this.centerPoint = position;
  }

  public setCurrentPath(currentPath: Path2D) {
    this.currentPath = currentPath;
  }

  public setActive(isActive: boolean) {
    this.active = isActive;
  }
}

const initialOffsetRateList: RectOffsetRateList = [1, 1, 1, 1];
export abstract class RectAuxiliaryShape extends BaseShape {
  protected abstract visibleAuxiliaryPath: boolean;
  protected auxiliaryFillStyleActive = 'green';
  private offsetRateList: RectOffsetRateList = initialOffsetRateList;

  protected endPoint!: IPointPosition;
  private auxiliaryArcPoints = [
    // horizontal start line
    new RectAuxiliaryPoint({ offsetRateList: [1, 1, 0, 0] }),
    new RectAuxiliaryPoint({ offsetRateList: [0, 1, 0, 0] }),
    new RectAuxiliaryPoint({ offsetRateList: [0, 1, 1, 0] }),
    // vertical middle
    new RectAuxiliaryPoint({ offsetRateList: [1, 0, 0, 0] }),
    new RectAuxiliaryPoint({ offsetRateList: [0, 0, 1, 0] }),
    // horizontal end line
    new RectAuxiliaryPoint({ offsetRateList: [1, 0, 0, 1] }),
    new RectAuxiliaryPoint({ offsetRateList: [0, 0, 0, 1] }),
    new RectAuxiliaryPoint({ offsetRateList: [0, 0, 1, 1] }),
  ];

  protected getAuxiliaryArcCenters() {
    const { startPoint, endPoint } = this.computedPoints;
    if (!endPoint) return [];

    const { x: startX, y: startY } = startPoint;
    const { x: endX, y: endY } = endPoint;
    const middleX = (startX + endX) / 2;
    const middleY = (startY + endY) / 2;

    const pointsList = [
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

    pointsList.forEach((point, index) => {
      this.auxiliaryArcPoints[index].setCenterPoint(point);
    });

    return this.auxiliaryArcPoints;
  }

  protected drawAuxiliaryShape(): void {
    const {
      ctx,
      computedPoints: { endPoint, startPoint },
    } = this;

    if (!endPoint) return;

    ctx.strokeStyle = this.auxiliaryStrokeStyle;
    ctx.lineWidth = this.auxiliaryLineWidth;

    const points = this.getAuxiliaryArcCenters();
    points.forEach((auxiliaryPoint) => {
      const currentPath = new Path2D();
      const { centerPoint } = auxiliaryPoint;
      currentPath.arc(centerPoint.x, centerPoint.y, 5, 0, 2 * Math.PI);
      auxiliaryPoint.setCurrentPath(currentPath);

      ctx.fillStyle = auxiliaryPoint.active
        ? this.auxiliaryFillStyleActive
        : this.auxiliaryFillStyle;

      ctx.fill(currentPath);
      ctx.stroke(currentPath);
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

  protected get middleXOrdinate() {
    const { startPoint, endPoint } = this.computedPoints;
    const middleX = (startPoint.x + endPoint.x) / 2;
    return middleX;
  }

  protected get middleYOrdinate() {
    const { startPoint, endPoint } = this.computedPoints;
    const middleY = (startPoint.y + endPoint.y) / 2;
    return middleY;
  }

  public checkIsTapStroke({ x, y }: IPointPosition): boolean {
    const { ctx } = this;
    for (const item of this.auxiliaryArcPoints) {
      if (ctx.isPointInPath(item.currentPath, x, y)) {
        this.offsetRateList = item.offsetRateList;
        item.setActive(true);
        return true;
      }
    }
    return super.checkIsTapStroke({ x, y });
  }

  protected finishShape(position: IPointPosition) {
    if (!this.endPoint) return;
    if (!this.modifying) {
      this.endPoint = position;
    } else {
      const { startPoint, endPoint } = this.computedPoints;
      this.startPoint = startPoint;
      this.endPoint = endPoint;
      this.resetAuxiliaryActive();
      this.offsetRateList = initialOffsetRateList;
    }

    return this;
  }

  protected mouseMove(position: IPointPosition) {
    if (!this.modifying) {
      this.endPoint = position;
    }
  }

  private resetAuxiliaryActive() {
    this.auxiliaryArcPoints.forEach((item) => item.setActive(false));
  }

  protected get modifyingStartPoint() {
    const {
      startPoint: { x, y },
      modifyingOffset,
    } = this;
    const [startXRate, startYRate] = this.offsetRateList;
    return {
      x: x + modifyingOffset.x * startXRate,
      y: y + modifyingOffset.y * startYRate,
    };
  }

  protected get modifyingEndPoint() {
    const {
      endPoint: { x, y },
      modifyingOffset,
    } = this;
    const [, , endXRate, endYRate] = this.offsetRateList;

    return {
      x: x + modifyingOffset.x * endXRate,
      y: y + modifyingOffset.y * endYRate,
    };
  }

  protected get computedPoints() {
    if (this.modifying) {
      const { modifyingStartPoint, modifyingEndPoint } = this;
      return {
        startPoint: { ...modifyingStartPoint },
        endPoint: { ...modifyingEndPoint },
      };
    }

    const { startPoint, endPoint } = this;
    return {
      startPoint,
      endPoint,
    };
  }
}
