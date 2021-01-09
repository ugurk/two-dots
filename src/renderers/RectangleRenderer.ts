import { Rectangle } from '../elements/Rectangle';
import { AbstractRenderer } from './AbstractRenderer';

export class RectangleRenderer extends AbstractRenderer<Rectangle> {
  render(rectangle: Rectangle): Rectangle {
    // TODO: styling

    const rCenterPoint = rectangle.center.cloneByTransform(this.transform);
    this.ctx[rectangle.filled ? 'fillRect' : 'strokeRect'](
      rCenterPoint.x - rectangle.width / 2,
      rCenterPoint.y - rectangle.height / 2,
      rectangle.width,
      rectangle.height
    );

    return rectangle;
  }
}
