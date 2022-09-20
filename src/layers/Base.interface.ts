import type { EventEmitter } from 'events';

export interface IBaseLayerProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  paletteBoxEmitter: EventEmitter;
  cWidth: number;
  cHeight: number;
}

export interface IPointPosition {
  x: number;
  y: number;
}
