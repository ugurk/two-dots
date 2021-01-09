import { CanvasLayer } from './layers/CanvasLayer';
import { Transform } from './core/Transform';

export class ArfDrawer {

  private layers: CanvasLayer[] = [];
  private defaultLayer: CanvasLayer | null = null;

  constructor(private container: HTMLElement, private initDefaultLayer = true) {
    if (initDefaultLayer) {
      this.defaultLayer = new CanvasLayer(600, 600, new Transform(), 1);
      this.layers.push(this.defaultLayer);
    }
  }

}
