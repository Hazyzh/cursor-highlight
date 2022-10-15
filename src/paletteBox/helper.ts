import {
  BrushColors,
  BrushShapes,
  BrushSizes,
} from '../lib';
import arrowIcon from './icons/arrow.png';
import circleIcon from './icons/circle.png';
import paletteIcon from './icons/palette.png';
import pencilIcon from './icons/pencil.png';
import rectangleIcon from './icons/rectangle.png';

console.log('icon', paletteIcon);

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

export const getPaletteContentDOM = () => {
  return `
    <div class="palette-icon">
      <img src="${paletteIcon}" />
    </div>
    <div class="palette-tools">
      <div id="${ShapeSelectArrow}" class="shape">
        <img src="${arrowIcon}" />
      </div>
      <div id="${ShapeSelectPen}" class="shape">
        <img src="${pencilIcon}" />
      </div>
      <div id="${ShapeSelectCircle}" class="shape">
        <img src="${circleIcon}" />
      </div>
      <div id="${ShapeSelectRectangle}" class="shape">
        <img src="${rectangleIcon}" />
      </div>
      <p></p>
      <div id="${ColorSelectRed}" class="red color"></div>
      <div id="${ColorSelectYellow}" class="yellow color"></div>
      <div id="${ColorSelectGray}" class="gray color"></div>
      <p></p>
      <div id="${ShapeSizeThin}" class="thin size"></div>
      <div id="${ShapeSizeMedium}" class="medium size"></div>
      <div id="${ShapeSizeThick}" class="thick size"></div>
    </div>
    <div></div>
  `;
};
