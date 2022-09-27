import { AuxiliaryPoint } from './lib';
import { PointAuxiliaryBase } from './PointAuxiliaryBase';

export abstract class ArrowAuxiliaryShape extends PointAuxiliaryBase {
  protected auxiliaryArcPoints = [
    new AuxiliaryPoint({ offsetRateList: [1, 1, 0, 0] }),
    new AuxiliaryPoint({ offsetRateList: [0, 0, 1, 1] }),
  ];

  protected setAuxiliaryArcCenters(): void {
    const { startPoint, endPoint } = this.computedPoints;
    if (!endPoint) return;

    const pointsList = [
      startPoint,
      endPoint,
    ];

    pointsList.forEach((point, index) => {
      this.auxiliaryArcPoints[index].setCenterPoint(point);
    });
  }
}
