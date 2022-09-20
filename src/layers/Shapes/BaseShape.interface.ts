import type { BrushColors } from '../../lib';
import { IPointPosition } from '../Base.interface';

export interface IBaseShapeProps {
  startPoint: IPointPosition;
  ctx: CanvasRenderingContext2D;
  strokeStyle: BrushColors;
  lineWidth: number;
}
