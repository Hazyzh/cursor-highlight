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
      <div class="shape-box">
        <div id="${ShapeSelectArrow}" class="shape active">
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
      </div>

      <p></p>

      <div class="color-box">
        <div id="${ColorSelectRed}" class="red color active"></div>
        <div id="${ColorSelectYellow}" class="yellow color"></div>
        <div id="${ColorSelectGray}" class="gray color"></div>
      </div>

      <p></p>

      <div class="size-box">
        <div id="${ShapeSizeThin}" class="thin size active"></div>
        <div id="${ShapeSizeMedium}" class="medium size"></div>
        <div id="${ShapeSizeThick}" class="thick size"></div>
      </div>
    </div>
    <div></div>
  `;
};

export const addActiveClass = <T extends Record<string, HTMLElement>>(elements: T, token: keyof T) => {
  Object.values(elements).forEach((ele) => {
    ele.className = ele.className.split(' ').filter(i => i !== 'active').join(' ');
  });

  const element = elements[token];
  element.className = [...new Set([...element.className.split(' '), 'active'])].join(' ');
};
