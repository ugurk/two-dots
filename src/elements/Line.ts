import { AbstractElement } from './AbstractElement';
import { Point } from '../core/Point';
import { Dimension } from '../core/Dimension';
import { SerializedObject } from '../core/Serializable';

export class Line extends AbstractElement<Line> {
  typeName = 'Line';

  constructor(public pointStart: Point, public pointEnd: Point, public style?: string) {
    super();
    this.selectionOrder = 1000;
  }

  get length(): number {
    return this.pointStart.distanceTo(this.pointEnd);
  }

  get midX(): number {
    return (this.pointStart.x + this.pointEnd.x) / 2.0;
  };

  get midY(): number {
    return (this.pointStart.y + this.pointEnd.y) / 2.0;
  };

  get midPoint(): Point {
    return this.pointStart.clone().add(this.pointEnd).divide(2.0);
  };

  clone(): Line {
    return new Line(this.pointStart.clone(), this.pointEnd.clone(), this.style);
  }

  angleTo(other: Line, lookPoint?: Dimension): number {

    const thisClone = this.clone();
    const otherClone = other.clone();

    const distanceSS = thisClone.pointStart.distanceTo(otherClone.pointStart);
    const distanceSF = thisClone.pointStart.distanceTo(otherClone.pointEnd);
    const distanceFS = thisClone.pointEnd.distanceTo(otherClone.pointStart);
    const distanceFF = thisClone.pointEnd.distanceTo(otherClone.pointEnd);

    let minDistanceValue = distanceSS;
    let minDistanceNo = 1;
    if (minDistanceValue > distanceSF) {
      minDistanceValue = distanceSF;
      minDistanceNo = 2;
    }
    if (minDistanceValue > distanceFS) {
      minDistanceValue = distanceFS;
      minDistanceNo = 3;
    }
    if (minDistanceValue > distanceFF) {
      minDistanceValue = distanceFF;
      minDistanceNo = 4;
    }

    let point = new Point();

    if (minDistanceNo === 1) {

      point = thisClone.pointStart.clone();
      thisClone.pointStart = thisClone.pointEnd.clone();
      thisClone.pointEnd = point.clone();

    } else if (minDistanceNo === 2) {

      point = thisClone.pointStart.clone();
      thisClone.pointStart = thisClone.pointEnd.clone();
      thisClone.pointEnd = point.clone();

      point = new Point();
      point = otherClone.pointStart.clone();
      otherClone.pointStart = otherClone.pointEnd.clone();
      otherClone.pointEnd = point.clone();

    } else if (minDistanceNo === 3) {

    } else if (minDistanceNo === 4) {

      point = thisClone.pointStart.clone();
      thisClone.pointStart = thisClone.pointEnd.clone();
      thisClone.pointEnd = point.clone();

      point = new Point();
      point = otherClone.pointStart.clone();
      otherClone.pointStart = otherClone.pointEnd.clone();
      otherClone.pointEnd = point.clone();

    }

    const angle1 = Math.atan2(thisClone.pointStart.y - thisClone.pointEnd.y, thisClone.pointStart.x - thisClone.pointEnd.x) * 180 / Math.PI;
    const angle2 = Math.atan2(otherClone.pointEnd.y - otherClone.pointStart.y, otherClone.pointEnd.x - otherClone.pointStart.x) * 180 / Math.PI;

    const angleTo = Math.abs(Math.round(angle1 - angle2));

    if (lookPoint) {

      const angle3 = Math.atan2(lookPoint.y - otherClone.pointStart.y, lookPoint.x - otherClone.pointStart.x) * 180 / Math.PI;

      if (!((angle3 >= angle1 && angle3 <= angle2) || (angle3 >= angle2 && angle3 <= angle1))) {

        // angleTo = 360 - angleTo;
        // TODO: need to test

      }

    }

    return angleTo;
  }

  intersectionTo(other: Line): Point | null {

    let p1, p2, p3, p4;
    p1 = this.pointStart.clone();
    p2 = this.pointEnd.clone();
    p3 = other.pointStart.clone();
    p4 = other.pointEnd.clone();

    // calculate differences
    let xD1 = p2.x - p1.x;
    let xD2 = p4.x - p3.x;
    let yD1 = p2.y - p1.y;
    let yD2 = p4.y - p3.y;
    const xD3 = p1.x - p3.x;
    const yD3 = p1.y - p3.y;

    // calculate the lengths of the two lines
    const len1 = Math.sqrt(xD1 * xD1 + yD1 * yD1);
    const len2 = Math.sqrt(xD2 * xD2 + yD2 * yD2);

    // calculate angle between the two lines.
    const dot = (xD1 * xD2 + yD1 * yD2); // dot product
    const deg = dot / (len1 * len2);

    // if abs(angle)==1 then the lines are parallel, so no intersection is possible
    if (Math.abs(deg) === 1) {
      return null;
    }

    // find intersection Pt between two lines
    const pt = new Point();
    const div = yD2 * xD1 - xD2 * yD1;
    const ua = (xD2 * yD3 - yD2 * xD3) / div;
    const ub = (xD1 * yD3 - yD1 * xD3) / div;
    pt.x = p1.x + ua * xD1;
    pt.y = p1.y + ua * yD1;

    // calculate the combined length of the two segments
    // between Pt-p1 and Pt-p2
    xD1 = pt.x - p1.x;
    xD2 = pt.x - p2.x;
    yD1 = pt.y - p1.y;
    yD2 = pt.y - p2.y;
    const segmentLen1 = Math.sqrt(xD1 * xD1 + yD1 * yD1) + Math.sqrt(xD2 * xD2 + yD2 * yD2);

    // calculate the combined length of the two segments
    // between Pt-p3 and Pt-p4
    xD1 = pt.x - p3.x;
    xD2 = pt.x - p4.x;
    yD1 = pt.y - p3.y;
    yD2 = pt.y - p4.y;
    const segmentLen2 = Math.sqrt(xD1 * xD1 + yD1 * yD1) + Math.sqrt(xD2 * xD2 + yD2 * yD2);

    // TODO: check logic
    // if the lengths of both sets of segments are the same as the lengths of the two lines
    // the point is actually on the line segment.

    //    // if the point isn’t on the line, return null
    //    if (Math.abs(len1 - segmentLen1) > 0.01 || Math.abs(len2 - segmentLen2) > 0.01) {
    //        return null;
    //    }

    return pt;
  };

  perpendicularLineAt(point: Point, length: number): Line {
    const dir = this.pointStart.clone().subtract(this.pointEnd).clone().normalize();
    const perPoint = new Point(-dir.y, dir.x);
    const startPoint = perPoint.clone().multiply(length).add(point);
    const endPoint = perPoint.clone().multiply(-length).add(point);

    return new Line(startPoint, endPoint);
  };

  pointProjection(point: Point): Point {
    const m = (this.pointEnd.y - this.pointStart.y) / (this.pointEnd.x - this.pointStart.x);
    if (m === Infinity) return new Point(this.pointStart.x, point.y);
    const b = this.pointStart.y - m * this.pointStart.x;
    const x = (m * point.y + point.x - m * b) / (m * m + 1);
    const y = (m * m * point.y + m * point.x + b) / (m * m + 1);

    return new Point(x, y);
  };

  isPointOnObject(point: Point | Dimension, tolerance = 0): boolean {
    // TODO: tolerance depends on line width

    const diffStartX = point.x - this.pointStart.x;
    const diffStartY = point.y - this.pointStart.y;
    const diffX = this.pointEnd.x - this.pointStart.x;
    const diffY = this.pointEnd.y - this.pointStart.y;

    const dot = diffStartX * diffX + diffStartY * diffY;
    const lenSq = diffX * diffX + diffY * diffY;
    const param = dot / lenSq;

    let pointTemp = new Point();

    if (param < 0) {
      pointTemp = this.pointStart.clone();
    } else if (param > 1) {
      pointTemp = this.pointEnd.clone();
    } else {
      pointTemp.x = this.pointStart.x + param * diffX;
      pointTemp.y = this.pointStart.y + param * diffY;
    }

    const distance = pointTemp.distanceTo(point);

    return distance <= tolerance;
  }

  deserialize(refElement: SerializedObject): Line {
    throw new Error('Method not implemented.');
  }

  serialize(): SerializedObject {
    throw new Error('Method not implemented.');
  }

}
