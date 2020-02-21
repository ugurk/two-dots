import { Circle } from '../elements/Circle';
import { AbstractRenderer } from './AbstractRenderer';

class CircleRenderer extends AbstractRenderer<Circle> {

    render(circle: Circle): Circle {
        // TODO: styling

        let scaledCenter = circle.center.cloneByTransform(this.transform);
        let scaledRadius = circle.radius * (this.transform.scale.x + this.transform.scale.y) / 2;
        this.ctx.beginPath();
        this.ctx.arc(scaledCenter.x, scaledCenter.y, scaledRadius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx[circle.filled ? "fill" : "stroke"]();
        return circle;
    }

}
