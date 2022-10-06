import { IPointPosition } from '../../Base.interface';
import { BaseShape } from '../ShapeBase/BaseShape';
import {
  AuxiliaryPoint,
  initialOffsetRateList,
  RectOffsetRateList,
} from './lib';

export abstract class PointAuxiliaryBase extends BaseShape {
  protected abstract visibleAuxiliaryPath: boolean;
  protected auxiliaryFillStyleActive = 'green';
  protected auxiliaryStrokeStyleActive = '#52dcbc';
  private offsetRateList: RectOffsetRateList = initialOffsetRateList;
  protected abstract auxiliaryArcPoints: AuxiliaryPoint[];
  protected endPoint!: IPointPosition;

  protected abstract setAuxiliaryArcCenters(): void;

  protected drawAuxiliaryShape(): void {
    const {
      ctx,
      computedPoints: { endPoint, startPoint },
    } = this;

    if (!endPoint) return;

    ctx.lineWidth = this.auxiliaryLineWidth;
    this.setAuxiliaryArcCenters();
    this.auxiliaryArcPoints.forEach((auxiliaryPoint) => {
      const currentPath = new Path2D();
      const { centerPoint } = auxiliaryPoint;
      currentPath.arc(centerPoint.x, centerPoint.y, 5, 0, 2 * Math.PI);
      auxiliaryPoint.setCurrentPath(currentPath);
      ctx.strokeStyle = auxiliaryPoint.active
        ? this.auxiliaryStrokeStyleActive
        : this.auxiliaryStrokeStyle;

      ctx.fillStyle = auxiliaryPoint.active
        ? this.auxiliaryFillStyleActive
        : this.auxiliaryFillStyle;

      ctx.fill(currentPath);
      ctx.stroke(currentPath);
    });

    if (this.visibleAuxiliaryPath) {
      ctx.strokeStyle = this.auxiliaryStrokeStyle;
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

  public checkIsTapPath({ x, y }: IPointPosition): boolean {
    const { ctx } = this;
    for (const item of this.auxiliaryArcPoints) {
      if (ctx.isPointInPath(item.currentPath, x, y)) {
        this.offsetRateList = item.offsetRateList;
        item.setActive(true);
        return true;
      }
    }
    return super.checkIsTapPath({ x, y });
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
