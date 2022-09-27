import { IPointPosition } from '../Base.interface';
import { BaseShape } from './ShapeBase/BaseShape';

export class LineShape extends BaseShape {
  private initialLine?: IPointPosition[];

  protected mouseMove(position: IPointPosition) {
    if (!this.initialLine) {
      this.initialLine = [this.startPoint];
    }
    this.initialLine.push(position);
  }

  protected finishShape(position: IPointPosition) {
    if (!this.initialLine) return;
    if (this.modifying) {
      this.initialLine = this.modifyingLine;
    } else {
      this.initialLine.push(position);
    }
    return this;
  }

  public drawShape(): void {
    if (!this.line) return;

    const { ctx } = this;

    const currentPath = new Path2D();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    this.line.forEach(({ x, y }, index) => {
      if (index === 0) {
        currentPath.moveTo(x, y);
      } else {
        currentPath.lineTo(x, y);
      }
    });
    ctx.stroke(currentPath);
    this.currentPath = currentPath;
  }

  protected drawAuxiliaryShape(): void {
    if (!this.line) return;

    const { ctx } = this;
    ctx.beginPath();
    ctx.strokeStyle = this.auxiliaryStrokeStyle;
    ctx.lineWidth = this.auxiliaryLineWidth;

    this.line.forEach(({ x, y }, index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.closePath();
  }

  private get modifyingLine() {
    const { initialLine, modifyingOffset } = this;
    return initialLine?.map(({ x, y }) => ({
      x: x + modifyingOffset.x,
      y: y + modifyingOffset.y,
    }));
  }

  private get line() {
    return this.modifying ? this.modifyingLine : this.initialLine;
  }
}
