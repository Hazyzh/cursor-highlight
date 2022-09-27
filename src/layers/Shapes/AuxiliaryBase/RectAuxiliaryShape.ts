import { AuxiliaryPoint } from './lib';
import { PointAuxiliaryBase } from './PointAuxiliaryBase';

export abstract class RectAuxiliaryShape extends PointAuxiliaryBase {
  protected auxiliaryArcPoints = [
    // horizontal start line
    new AuxiliaryPoint({ offsetRateList: [1, 1, 0, 0] }),
    new AuxiliaryPoint({ offsetRateList: [0, 1, 0, 0] }),
    new AuxiliaryPoint({ offsetRateList: [0, 1, 1, 0] }),
    // vertical middle
    new AuxiliaryPoint({ offsetRateList: [1, 0, 0, 0] }),
    new AuxiliaryPoint({ offsetRateList: [0, 0, 1, 0] }),
    // horizontal end line
    new AuxiliaryPoint({ offsetRateList: [1, 0, 0, 1] }),
    new AuxiliaryPoint({ offsetRateList: [0, 0, 0, 1] }),
    new AuxiliaryPoint({ offsetRateList: [0, 0, 1, 1] }),
  ];

  protected setAuxiliaryArcCenters(): void {
    const { startPoint, endPoint } = this.computedPoints;
    if (!endPoint) return;

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
}
