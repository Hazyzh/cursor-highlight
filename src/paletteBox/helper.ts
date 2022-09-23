import {
  BrushColors,
  BrushShapes,
} from '../lib';

const ColorSelectRed = 'brushColorRed';
const ColorSelectYellow = 'brushColorYellow';
const ColorSelectBlack = 'brushColorBlack';

export const colorBoxes = [
  { token: BrushColors.red, id: ColorSelectRed },
  { token: BrushColors.yellow, id: ColorSelectYellow },
  { token: BrushColors.black, id: ColorSelectBlack },
];

const ShapeSelectPen = 'brushShapePen';
const ShapeSelectCircle = 'brushShapeCircle';
const ShapeSelectRectangle = 'brushShapeRectangle';

export const shapeBoxes = [
  { token: BrushShapes.pen, id: ShapeSelectPen },
  { token: BrushShapes.circle, id: ShapeSelectCircle },
  { token: BrushShapes.rectangle, id: ShapeSelectRectangle },
];
