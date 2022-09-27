import { IPointPosition } from '../../Base.interface';

export type OffsetRate = 0 | 1;
export type RectOffsetRateList = [OffsetRate, OffsetRate, OffsetRate, OffsetRate];

export const initialOffsetRateList: RectOffsetRateList = [1, 1, 1, 1];

export class AuxiliaryPoint {
  public currentPath!: Path2D;
  public centerPoint!: IPointPosition;
  public active = false;
  public offsetRateList: RectOffsetRateList;

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
