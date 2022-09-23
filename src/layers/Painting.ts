import {
  BrushColors,
  BrushEvents,
  BrushShapes,
} from '../lib';
import { BaseLayer } from './Base';
import {
  BaseShape,
  LineShape,
  RectangleShape,
} from './Shapes';

const ShapesMap = {
  [BrushShapes.pen]: RectangleShape,
  [BrushShapes.circle]: LineShape,
  [BrushShapes.rectangle]: LineShape,
};

export class PaintingLayer extends BaseLayer {
  private strokeStyle = BrushColors.red;
  private strokeShape: BrushShapes = BrushShapes.pen;
  private lineWidth = 5;
  private isDrawing = false;
  private paintingKey = 0;

  private shapes: BaseShape[] = [];
  private activeShape?: BaseShape;

  public init(): void {
    this.initEvents();
    this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.mouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.mouseUp(e));
  }

  private initEvents() {
    this.paletteBoxEmitter.on(BrushEvents.changeShape, (value) =>
      console.log(value)
    );

    this.paletteBoxEmitter.on(BrushEvents.changeColor, (value: BrushColors) => {
      this.strokeStyle = value;
    });
  }

  public draw() {
    const { activeShape, shapes } = this;
    if (!shapes.length && !activeShape) return;

    shapes.forEach((shape) => shape.drawShape());
    activeShape?.drawShape();
  }

  mouseDown(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;

    this.isDrawing = true;
    const currentPosition = this.getPointFromEvent(e);
    const ShapeClass = ShapesMap[this.strokeShape];
    this.activeShape = new ShapeClass({
      startPoint: currentPosition,
      ctx: this.ctx,
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
    });
  }

  mouseMove(e: MouseEvent) {
    if (!this.isDrawing) return;

    const currentPosition = this.getPointFromEvent(e);
    this.activeShape?.mouseMove(currentPosition);
  }

  mouseUp(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;

    this.isDrawing = false;
    if (this.activeShape) {
      const currentPosition = this.getPointFromEvent(e);
      const shapeItem = this.activeShape?.finishShape(currentPosition);
      shapeItem && this.shapes.push(shapeItem);
      this.activeShape = undefined;
    }
  }

  getPointFromEvent(e: MouseEvent) {
    return { x: e.offsetX, y: e.offsetY };
  }
}
