import { Dimension } from '../core/Dimension';
import { Point } from '../core/Point';
import { SerializedObject } from '../core/Serializable';
import { AbstractElement } from './AbstractElement';

export class Rectangle extends AbstractElement<Rectangle> {

    typeName = 'Rectangle';

    constructor(public center: Point, public width: number, public height: number, public filled = false, public style?: string) {
        super();
        this.selectionOrder = 1000;
    }

    isPointOnObject(point: Point | Dimension, tolerance = 0): boolean {
        var dx = Math.abs(point.x - this.center.x);
        var dy = Math.abs(point.y - this.center.y);

        if (this.filled) {
            this.grabbed = (dx <= this.width / 2 + tolerance && dy <= tolerance + this.height / 2);
            return this.grabbed;
        }

        this.grabbed = (dx >= (this.width / 2) - tolerance && dx <= (this.width / 2) + tolerance)
            || (dy >= (this.height / 2) - tolerance && dy <= (this.height / 2) + tolerance);
        return this.grabbed;
    }

    clone(): Rectangle {
        throw new Error('Method not implemented.');
    }

    serialize(): SerializedObject {
        throw new Error('Method not implemented.');
    }

    deserialize(refElement: SerializedObject): Rectangle {
        throw new Error('Method not implemented.');
    }

}
