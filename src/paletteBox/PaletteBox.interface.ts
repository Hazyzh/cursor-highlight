import {
  BrushColors,
  BrushShapes,
  BrushSizes,
} from '../lib';

export type TypeColorElements = Partial<Record<BrushColors, HTMLElement>>;

export type TypeShapeElements = Partial<Record<BrushShapes, HTMLElement>>;

export type TypeSizeElements = Partial<Record<BrushSizes, HTMLElement>>;
