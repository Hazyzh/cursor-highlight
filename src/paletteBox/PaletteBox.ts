import { EventEmitter } from 'events';

import {
  BrushEvents,
  BrushShapes,
} from '../lib';
import { colorBoxes } from './helper';
import { TypeColorElements } from './PaletteBox.interface';

export class PaletteBox {
  private _circlePen!: HTMLElement;
  private _eventEmitter = new EventEmitter();
  private _colorElements: TypeColorElements = {};

  constructor() {
    this.init();
  }

  private init() {
    this.initDomsAndEvents();
  }

  private initDomsAndEvents() {
    this._circlePen = document.querySelector('#circlePen')!;
    this._circlePen.addEventListener('click', () => {
      this._eventEmitter.emit(BrushEvents.changeShape, BrushShapes.circle);
    });
    colorBoxes.forEach(({ token, id }) => {
      this._colorElements[token] = document.getElementById(id)!;
      this._colorElements[token]?.addEventListener('click', () => {
        this._eventEmitter.emit(BrushEvents.changeColor, token);
      });
    });
  }

  get eventEmitter() {
    return this._eventEmitter;
  }
}
