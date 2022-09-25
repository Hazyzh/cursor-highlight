import { EventEmitter } from 'events';

import { BrushEvents } from '../lib';
import {
  colorBoxes,
  shapeBoxes,
  shapeSizes,
} from './helper';
import {
  TypeColorElements,
  TypeShapeElements,
  TypeSizeElements,
} from './PaletteBox.interface';

export class PaletteBox {
  private _eventEmitter = new EventEmitter();
  private _colorElements: TypeColorElements = {};
  private _shapesElements: TypeShapeElements = {};
  private _sizesElements: TypeSizeElements = {};

  constructor() {
    this.init();
  }

  private init() {
    this.initDomsAndEvents();
  }

  private initDomsAndEvents() {
    colorBoxes.forEach(({ token, id }) => {
      this._colorElements[token] = document.getElementById(id)!;
      this._colorElements[token]?.addEventListener('click', () => {
        this._eventEmitter.emit(BrushEvents.changeColor, token);
      });
    });

    shapeBoxes.forEach(({ token, id }) => {
      this._shapesElements[token] = document.getElementById(id)!;
      this._shapesElements[token]?.addEventListener('click', () => {
        this._eventEmitter.emit(BrushEvents.changeShape, token);
      });
    });

    shapeSizes.forEach(({ token, id }) => {
      this._sizesElements[token] = document.getElementById(id)!;
      this._sizesElements[token]?.addEventListener('click', () => {
        this._eventEmitter.emit(BrushEvents.changeSize, token);
      });
    });
  }

  get eventEmitter() {
    return this._eventEmitter;
  }
}
