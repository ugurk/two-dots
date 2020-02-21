import { Rectangle } from '../elements/Rectangle';
import { AbstractRenderer } from './AbstractRenderer';

class RectangleRenderer extends AbstractRenderer<Rectangle> {

    render(rectangle: Rectangle): Rectangle {
        // TODO: styling

        var rCenterPoint = rectangle.center.cloneRotatedByTransform(this.transform).multiply(this.transform.scale);
        this.ctx[rectangle.filled ? "fillRect" : "strokeRect"](rCenterPoint.x - (rectangle.width / 2), rCenterPoint.y - (rectangle.height / 2), rectangle.width, rectangle.height);

        return rectangle;
    }

}
