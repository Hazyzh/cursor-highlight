import { EventEmitter } from 'events';

import { BrushEvents } from '../lib';
import {
  colorBoxes,
  getPaletteContentDOM,
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
  private _container: HTMLElement;

  constructor() {
    const container = document.createElement('div');
    container.setAttribute('id', 'paletteBox');
    container.setAttribute('class', 'palette-box');
    this._container = container;

    this.init();
  }

  private init() {
    this._generateContentDOM();
  }

  private _generateContentDOM() {
    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        this._appendDOM();
      });
    } else {
      this._appendDOM();
    }
  }

  private _appendDOM() {
    this._container.innerHTML = getPaletteContentDOM();
    this.initDomsAndEvents();
    document.body.appendChild(this._container);
  }

  private initDomsAndEvents() {
    colorBoxes.forEach(({ token, id }) => {
      this._colorElements[token] = this._container.querySelector<HTMLElement>(`#${id}`)!;
      this._colorElements[token]?.addEventListener('click', () => {
        this._eventEmitter.emit(BrushEvents.changeColor, token);
      });
    });

    shapeBoxes.forEach(({ token, id }) => {
      this._shapesElements[token] = this._container.querySelector<HTMLElement>(`#${id}`)!;
      this._shapesElements[token]?.addEventListener('click', () => {
        this._eventEmitter.emit(BrushEvents.changeShape, token);
      });
    });

    shapeSizes.forEach(({ token, id }) => {
      this._sizesElements[token] = this._container.querySelector<HTMLElement>(`#${id}`)!;
      this._sizesElements[token]?.addEventListener('click', () => {
        this._eventEmitter.emit(BrushEvents.changeSize, token);
      });
    });
  }

  get eventEmitter() {
    return this._eventEmitter;
  }
}
