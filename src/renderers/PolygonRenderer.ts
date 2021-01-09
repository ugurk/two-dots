import { Polygon } from '../elements/Polygon';
import { AbstractRenderer } from './AbstractRenderer';

export class PolygonRenderer extends AbstractRenderer<Polygon> {

  render(polygon: Polygon): Polygon {
    // TODO: styling

    if (polygon.points.length === 0) return polygon;

    var rPoint0 = polygon.points[0].cloneByTransform(this.transform);

    this.ctx.beginPath();
    this.ctx.moveTo(rPoint0.x, rPoint0.y);

    for (var i = 0; i < polygon.points.length; i++) {
      let rPointN = polygon.points[i].cloneByTransform(this.transform);
      this.ctx.lineTo(rPointN.x, rPointN.y);
    }

    this.ctx.lineTo(rPoint0.x, rPoint0.y);
    this.ctx.closePath();
    this.ctx[polygon.filled ? 'fill' : 'stroke']();

    return polygon;
  }

}
