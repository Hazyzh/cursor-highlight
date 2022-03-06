import { BaseLayer } from './Base';
import { IPointPosition } from './Base.interface';

export class BackgroundLayer extends BaseLayer{
  fillStyle = '#3E5463';
  cursorPosition?: IPointPosition;
  radius = 200;
  minRadius = 20;
  maxRadius = 500;

  private apertureStyle = '#fff';

  mouseMove(e: MouseEvent) {
    this.cursorPosition = { x: e.offsetX, y: e.offsetY };
  }

  mouseWheel(e: WheelEvent) {
    const { deltaY } = e;
    const radius = deltaY + this.radius
    this.radius = deltaY > 0 ? Math.min(this.maxRadius, radius) : Math.max(this.minRadius, radius);
  }

  public draw() {
    this.drawBackground();
    this.drawAperture();
    this.drawCursorHighlight();
  }

  private drawBackground() {
    const { ctx, fillStyle, cHeight, cWidth } = this;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, cWidth, cHeight);
  }

  private drawCursorHighlight() {
    const { ctx, cursorPosition, radius } = this;
    if (!cursorPosition) return

    const { x, y } = cursorPosition;
    const offset = radius / 2;
    const centerX = Math.max(0, x - offset);
    const centerY = Math.max(0, y - offset);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.clearRect(centerX, centerY, radius, radius);
    ctx.restore();
  }

  private drawAperture() {
      const { ctx, cursorPosition, radius } = this;
      if (!cursorPosition) return

      const { x, y } = cursorPosition;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(x, y, radius / 2 + 5, 0, Math.PI * 2, false);
      ctx.strokeStyle = this.apertureStyle;
      ctx.stroke();
  }
}
