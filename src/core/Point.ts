import Dimension from './Dimension';
import Serializable from './Serializable';
import Transform from './Transform';

export default class Point implements Serializable {
  constructor(public x = 0, public y = 0) {}

  public distanceTo(other: Point): number {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
    );
  }

  public distanceToOrigin(): number {
    return Math.sqrt(this.x * this.x + this.y + this.y);
  }

  public normalize(): Point {
    const dPoint = this.clone().abs();
    const divider = dPoint.x > dPoint.y ? dPoint.x : dPoint.y;
    return this.divide(divider);
  }

  public subtract(sub: number | Point): Point {
    if (typeof sub === 'number') {
      this.x -= sub;
      this.y -= sub;
    } else if (sub instanceof Point) {
      this.x -= sub.x;
      this.y -= sub.y;
    }
    return this;
  }

  public add(acc: number | Point): Point {
    if (typeof acc === 'number') {
      this.x += acc;
      this.y += acc;
    } else if (acc instanceof Point) {
      this.x += acc.x;
      this.y += acc.y;
    }
    return this;
  }

  public divide(divider: number | Point): Point {
    if (typeof divider === 'number') {
      this.x /= divider;
      this.y /= divider;
    } else if (divider instanceof Point) {
      this.x /= divider.x;
      this.y /= divider.y;
    }
    return this;
  }

  public set(point: Point): Point {
    this.x = point.x;
    this.y = point.y;
    return this;
  }

  public multiply(multiplier: number | Point): Point {
    if (typeof multiplier === 'number') {
      this.x *= multiplier;
      this.y *= multiplier;
    } else if (multiplier instanceof Point) {
      this.x *= multiplier.x;
      this.y *= multiplier.y;
    }
    return this;
  }

  public abs(): Point {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  public cloneRotated(rotationCenter: Dimension, angle: number): Point {
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    const dx =
      (this.x - rotationCenter.x) * cos - (this.y - rotationCenter.y) * sin;
    const dy =
      (this.x - rotationCenter.x) * sin + (this.y - rotationCenter.y) * cos;
    return new Point(dx + rotationCenter.x, dy + rotationCenter.y);
  }

  public cloneRotatedByTransform(transform: Transform): Point {
    return this.cloneRotated(transform.rotation, transform.angle);
  }

  public clone(): Point {
    return new Point(this.x, this.y);
  }

  public serialize(): Dimension {
    return { x: this.x, y: this.y };
  }

  public deserialize(dim: Dimension): void {
    this.x = dim.x;
    this.y = dim.y;
  }
}
