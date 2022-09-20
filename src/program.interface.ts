import type { EventEmitter } from 'events';

export interface IInitializeProps {}

export interface IMainProps {
  canvas: HTMLCanvasElement;
  paletteBoxEmitter: EventEmitter;
}
