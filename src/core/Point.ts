import { Dimension } from './Dimension';
import { Serializable, SerializedObject } from './Serializable';
import { Transform } from './Transform';

export class Point implements Serializable<Point>, Dimension {
  constructor(public x = 0, public y = 0) {}

  distanceTo(other: Point | Dimension): number {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
    );
  }

  distanceToOrigin(): number {
    return Math.sqrt(this.x * this.x + this.y + this.y);
  }

  normalize(): Point {
    const dPoint = this.clone().abs();
    const divider = dPoint.x > dPoint.y ? dPoint.x : dPoint.y;
    return this.divide(divider);
  }

  subtract(sub: number | Point | Dimension): Point {
    if (typeof sub === 'number') {
      this.x -= sub;
      this.y -= sub;
    } else if (sub.x != null && sub.y != null) {
      this.x -= sub.x;
      this.y -= sub.y;
    }
    return this;
  }

  add(acc: number | Point | Dimension): Point {
    if (typeof acc === 'number') {
      this.x += acc;
      this.y += acc;
    } else if (acc.x != null && acc.y != null) {
      this.x += acc.x;
      this.y += acc.y;
    }
    return this;
  }

  divide(divider: number | Point | Dimension): Point {
    if (typeof divider === 'number') {
      this.x /= divider;
      this.y /= divider;
    } else if (divider.x != null && divider.y != null) {
      this.x /= divider.x;
      this.y /= divider.y;
    }
    return this;
  }

  set(point: Point | Dimension): Point {
    this.x = point.x;
    this.y = point.y;
    return this;
  }

  multiply(multiplier: number | Point | Dimension): Point {
    if (typeof multiplier === 'number') {
      this.x *= multiplier;
      this.y *= multiplier;
    } else if (multiplier.x != null && multiplier.y != null) {
      this.x *= multiplier.x;
      this.y *= multiplier.y;
    }
    return this;
  }

  abs(): Point {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  cloneRotated(rotationCenter: Dimension, angle: number): Point {
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    const dx =
      (this.x - rotationCenter.x) * cos - (this.y - rotationCenter.y) * sin;
    const dy =
      (this.x - rotationCenter.x) * sin + (this.y - rotationCenter.y) * cos;
    return new Point(dx + rotationCenter.x, dy + rotationCenter.y);
  }

  cloneRotatedByTransform(transform: Transform): Point {
    return this.cloneRotated(transform.rotation, transform.angle);
  }

  cloneByTransform(transform: Transform): Point {
    return this.cloneRotated(transform.rotation, transform.angle).multiply(
      transform.scale
    );
  }

  asDimension(): Dimension {
    return {
      x: this.x,
      y: this.y,
    };
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  serialize(): SerializedObject {
    return { x: this.x, y: this.y };
  }

  deserialize(so: SerializedObject): Point {
    this.x = +so.x;
    this.y = +so.y;
    return this;
  }

  static fromObject(so: SerializedObject): Point {
    return new Point(+so.x || 0, +so.y || 0);
  }
}
