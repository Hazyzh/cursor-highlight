import {
  BrushColors,
  BrushEvents,
  BrushShapes,
  BrushSizes,
} from '../lib';
import { BaseLayer } from './Base';
import {
  ArrowShape,
  BaseShape,
  CircleShape,
  LineShape,
  RectangleShape,
} from './Shapes';

const ShapesMap = {
  [BrushShapes.pen]: LineShape,
  [BrushShapes.circle]: CircleShape,
  [BrushShapes.rectangle]: RectangleShape,
  [BrushShapes.arrow]: ArrowShape,
};

export class PaintingLayer extends BaseLayer {
  private strokeStyle = BrushColors.red;
  private strokeShape: BrushShapes = BrushShapes.arrow;
  private lineWidth: BrushSizes = BrushSizes.medium;
  private isDrawing = false;
  private paintingKey = 0;

  private shapesSet: Set<BaseShape> = new Set();
  private activeShape?: BaseShape;

  public init(): void {
    this.initEvents();
    this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.mouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.mouseUp(e));
    this.canvas.addEventListener('keydown', (e) => this.keydown(e));
  }

  private initEvents() {
    this.paletteBoxEmitter.on(BrushEvents.changeShape, (value: BrushShapes) => {
      this.strokeShape = value;
    });

    this.paletteBoxEmitter.on(BrushEvents.changeColor, (value: BrushColors) => {
      this.strokeStyle = value;
    });

    this.paletteBoxEmitter.on(BrushEvents.changeSize, (value: BrushSizes) => {
      this.lineWidth = value;
    });
  }

  public draw() {
    const { activeShape, shapes } = this;
    if (!shapes.length && !activeShape) return;

    shapes.forEach((shape) => shape.drawShape());
    activeShape?.drawActiveShape();
  }

  mouseDown(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;
    this.isDrawing = true;

    const currentPosition = this.getPointFromEvent(e);
    for (const shape of this.shapes) {
      console.log(shape.checkIsTapStroke(currentPosition));
      if (shape.checkIsTapStroke(currentPosition)) {
        shape.setModifyStartPoint(currentPosition);
        this.activeShape = shape;
        return;
      }
    }

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
    this.activeShape?.onMouseMove(currentPosition);
  }

  mouseUp(e: MouseEvent) {
    if (e.button !== this.paintingKey) return;

    this.isDrawing = false;
    if (this.activeShape) {
      const putActive = this.activeShape.modifying;
      const currentPosition = this.getPointFromEvent(e);
      const shapeItem = this.activeShape.finishDraw(currentPosition);
      if (shapeItem) {
        this.shapesSet.delete(shapeItem);
        this.shapesSet.add(shapeItem);
      }
      this.activeShape = putActive ? shapeItem : undefined;
    }
  }

  keydown(e: KeyboardEvent) {
    if (this.activeShape && e.key === 'Backspace') {
      this.shapesSet.delete(this.activeShape);
      this.activeShape = undefined;
    }
  }

  getPointFromEvent(e: MouseEvent) {
    return { x: e.offsetX, y: e.offsetY };
  }

  private get shapes() {
    return [...this.shapesSet];
  }
}
