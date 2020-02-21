import { Dimension } from '../core/Dimension';
import { Point } from '../core/Point';
import { SerializedObject } from '../core/Serializable';
import { AbstractElement } from './AbstractElement';

export class Polygon extends AbstractElement<Polygon> {

    typeName = 'Polygon';

    constructor(public points: Point[], public filled = false, public style?: string) {
        super();
        this.selectionOrder = 1000;
    }

    isPointOnObject(point: Point | Dimension, tolerance = 0): boolean {
        var i, j = 0;
        var c = false;

        for (i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            if (((this.points[i].y > point.y) != (this.points[j].y > point.y)) &&
                (point.x < (this.points[j].x - this.points[i].x) * (point.y - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x)) {

                c = !c;

            }
        }

        this.grabbed = c;
        return this.grabbed;
    }

    clone(): Polygon {
        throw new Error('Method not implemented.');
    }

    serialize(): SerializedObject {
        throw new Error('Method not implemented.');
    }

    deserialize(refElement: SerializedObject): Polygon {
        throw new Error('Method not implemented.');
    }

}
