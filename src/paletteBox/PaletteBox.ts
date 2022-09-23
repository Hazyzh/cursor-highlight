import { EventEmitter } from 'events';

import { BrushEvents } from '../lib';
import {
  colorBoxes,
  shapeBoxes,
} from './helper';
import {
  TypeColorElements,
  TypeShapeElements,
} from './PaletteBox.interface';

export class PaletteBox {
  private _eventEmitter = new EventEmitter();
  private _colorElements: TypeColorElements = {};
  private _shapesElements: TypeShapeElements = {};

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
        console.log('ok', token);
        this._eventEmitter.emit(BrushEvents.changeShape, token);
      });
    });
  }

  get eventEmitter() {
    return this._eventEmitter;
  }
}
