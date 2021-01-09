import { Dimension } from '../core/Dimension';
import { Point } from '../core/Point';
import { SerializedObject } from '../core/Serializable';
import { AbstractElement } from './AbstractElement';

export class Circle extends AbstractElement<Circle> {

  typeName = 'Circle';

  constructor(public center: Point, public radius: number, public filled: false, public style?: string) {
    super();
    this.selectionOrder = 1000;
  }

  centerDistanceTo(point: Point | Dimension): number {
    return this.center.distanceTo(point);
  }

  isPointOnObject(point: Point | Dimension, tolerance = 0): boolean {
    // TODO: tolerance scaling by line width

    let distance = this.centerDistanceTo(point);

    if (this.filled) {
      this.grabbed = (this.radius + tolerance >= distance);
      return this.grabbed;
    }

    this.grabbed = (this.radius + tolerance >= distance && distance >= this.radius - tolerance);
    return this.grabbed;
  }

  clone(): Circle {
    return new Circle(this.center.clone(), this.radius, this.filled);
  }

  serialize(): SerializedObject {
    throw new Error('Method not implemented.');
  }

  deserialize(refElement: SerializedObject): Circle {
    throw new Error('Method not implemented.');
  }

}
