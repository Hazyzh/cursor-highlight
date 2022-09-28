import {
  BrushColors,
  BrushShapes,
  BrushSizes,
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
const ShapeSelectArrow = 'brushShapeArrow';

export const shapeBoxes = [
  { token: BrushShapes.pen, id: ShapeSelectPen },
  { token: BrushShapes.circle, id: ShapeSelectCircle },
  { token: BrushShapes.rectangle, id: ShapeSelectRectangle },
  { token: BrushShapes.arrow, id: ShapeSelectArrow },
];

const ShapeSizeThin = 'brushShapeSizeThin';
const ShapeSizeMedium = 'brushShapeSizeMedium';
const ShapeSizeThick = 'brushShapeSizeThick';

export const shapeSizes = [
  { token: BrushSizes.thin, id: ShapeSizeThin },
  { token: BrushSizes.medium, id: ShapeSizeMedium },
  { token: BrushSizes.thick, id: ShapeSizeThick },
];
