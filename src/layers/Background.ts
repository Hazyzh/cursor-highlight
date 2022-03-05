import { BaseLayer } from './Base';

export class BackgroundLayer extends BaseLayer{
  color: string = '#eee';

  public draw() {
    console.log('background layer draw!');
  }
}
