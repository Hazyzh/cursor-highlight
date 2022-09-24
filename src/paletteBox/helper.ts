import {
  BrushColors,
  BrushShapes,
} from '../lib';

const ColorSelectRed = 'brushColorRed';
const ColorSelectYellow = 'brushColorYellow';
const ColorSelectGray = 'brushColorGray';

export const colorBoxes = [
  { token: BrushColors.red, id: ColorSelectRed },
  { token: BrushColors.yellow, id: ColorSelectYellow },
  { token: BrushColors.gray, id: ColorSelectGray },
];

const ShapeSelectPen = 'brushShapePen';
const ShapeSelectCircle = 'brushShapeCircle';
const ShapeSelectRectangle = 'brushShapeRectangle';

export const shapeBoxes = [
  { token: BrushShapes.pen, id: ShapeSelectPen },
  { token: BrushShapes.circle, id: ShapeSelectCircle },
  { token: BrushShapes.rectangle, id: ShapeSelectRectangle },
];
