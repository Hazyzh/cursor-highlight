import { BaseLayer } from './Base';

export class BackgroundLayer extends BaseLayer{
  fillStyle: string = '#3E5463';
  cursorPosition?: {x: number, y: number};
  radius: number = 200;

  mouseMove(e: MouseEvent) {
    this.cursorPosition = { x: e.offsetX, y: e.offsetY };
  }

  public draw() {
    const { cursorPosition, ctx, radius, fillStyle, cHeight, cWidth } = this;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, cWidth, cHeight);

    if(cursorPosition) {
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
  }
}
