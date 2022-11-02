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
  private _containerInitTopRate = 0.7;
  private _dragging = false;
  private _dragOffsetY?: number;
  private _safeSpace = 15;

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
    this.initializeContainerTranslate();
    this._container.addEventListener('mousedown', (event) => {
      this._dragging = true;
      this._dragOffsetY = event.offsetY;
    });
    this._container.addEventListener('mouseup', () => {
      this._dragging = false;
      this._renderDraggingClass();
    });

    window.addEventListener('mousemove', (evt) => {
      if (!this._dragging) return;

      if (evt.buttons === 0) {
        this._dragging = false;
      }

      this._renderDraggingClass();

      const currentY = evt.clientY - this._dragOffsetY!;
      const translateNumber = Math.min(
        Math.max(this._safeSpace, currentY),
        this.positionMaxHeight,
      );
      this._container.style.transform = `translateY(${translateNumber}px)`;
    });

    window.addEventListener('resize', () => {
      const { y } = this._container.getBoundingClientRect();
      if (y >= this.positionMaxHeight) {
        this.initializeContainerTranslate();
      }
    });
    this.initDomsAndEvents();
    document.body.appendChild(this._container);
  }

  private initializeContainerTranslate() {
    const defaultTranslate = window.innerHeight * this._containerInitTopRate;
    this._container.style.transform = `translateY(${defaultTranslate}px)`;
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

  private _renderDraggingClass() {
    const fixedClass = 'palette-box';
    const draggingClass = `dragging ${fixedClass}`;

    const classnames = this._dragging ? draggingClass : fixedClass;
    this._container.setAttribute(
      'class',
      classnames,
    );
  }

  get eventEmitter() {
    return this._eventEmitter;
  }

  get positionMaxHeight() {
    return window.innerHeight - this._container.clientHeight - this._safeSpace;
  }
}
