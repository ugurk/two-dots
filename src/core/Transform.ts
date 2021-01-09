import { Dimension } from './Dimension';
import { Point } from './Point';

export class Transform {
  angle = 0;
  rotation: Dimension = {x: 0, y: 0};
  scale: Dimension = {x: 1, y: 1};
  translate: Dimension = {x: 0, y: 0};

  clone(): Transform {
    const transform = new Transform();
    transform.angle = this.angle;
    transform.rotation = {...this.rotation};
    transform.scale = {...this.scale};
    transform.translate = {...this.translate};
    return transform;
  }

  scaleAsPoint(): Point {
    return new Point(this.scale.x, this.scale.y);
  }

  translateAsPoint(): Point {
    return new Point(this.translate.x, this.translate.y);
  }

}
