import { BaseLayer } from './Base';

class ImageItem {
  private src: string;

  public ready: boolean = false;
  public img: HTMLImageElement;
  constructor(file: File) {
    this.img = new Image();
    this.src = URL.createObjectURL(file);
    this.loadFile();
  }

  loadFile() {
    this.img.addEventListener('load', () => {
      this.ready = true;
    });
    this.img.src = this.src;
  }
}

export class PastingContent extends BaseLayer {
  private imagesList: ImageItem[] = [];

  public init(): void {
    document.addEventListener('paste', (e) => {
      const file = e.clipboardData?.files[0];
      if (!file) return;

      if (file.type.startsWith('image')) {
        const imgItem = new ImageItem(file);
        this.imagesList.push(imgItem);
      }
    });
  }

  draw() {
    // console.log('pasting content');
    const { imagesList, ctx } = this;

    if (imagesList.filter(({ ready }) => ready).length) {
      imagesList.forEach((item) => {
        ctx.drawImage(item.img, 0, 0);
      });
    }
  }
}
