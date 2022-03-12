import { BaseLayer } from './Base';
import { IPointPosition } from './Base.interface';

export class BackgroundLayer extends BaseLayer{
  fillStyle = '#445760';
  cursorPosition?: IPointPosition = { x: 300, y: 300 };
  radius = 100;
  minRadius = 20;
  maxRadius = 300;

  private apertureColors = [
    'cyan', '#b3ff88', '#e9ff50', '#ff5050', '#0bf57b', '#fff',
  ];
  private apertureTransparency = 0.6;
  private apertureTheta = 0;
  private apertureRotateSpeed = 1;
  private minApertureWidth = 3;

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
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.globalAlpha = 0.7;
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillRect(0, 0, cWidth, cHeight);
    ctx.restore();
  }

  private drawCursorHighlight() {
    const { ctx, cursorPosition, radius } = this;
    if (!cursorPosition) return

    const { x, y } = cursorPosition;
    const centerX = Math.max(0, x - radius);
    const centerY = Math.max(0, y - radius);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.clearRect(centerX, centerY, radius * 2, radius * 2);
    ctx.restore();
  }

  private drawAperture() {
      const { ctx, cursorPosition, radius, apertureColors, apertureTheta, apertureRotateSpeed, minApertureWidth } = this;
      if (!cursorPosition) return

      const apertureWidth = Math.max(radius / 30, minApertureWidth);
      this.apertureTheta = (this.apertureTheta + apertureRotateSpeed) % 360;
      const { x, y } = cursorPosition;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = apertureWidth;
      const gradient = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
      const colorsLength = apertureColors.length;
      apertureColors.forEach((color, index) => {
        gradient.addColorStop((index + 1) / colorsLength, color);
      });
      ctx.arc(x, y, radius + apertureWidth / 2, 0, Math.PI * 2, false);
      ctx.translate(x, y);
      ctx.rotate(apertureTheta * Math.PI / 180);
      ctx.translate(x * -1, y * -1);
      ctx.globalAlpha = this.apertureTransparency;
      ctx.strokeStyle = gradient;
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
  }
}
