import { Dimension } from './Dimension';

export class Transform {
  angle = 0;
  rotation: Dimension = {x: 0, y: 0};
  scale: Dimension = {x: 0, y: 0};
  translate: Dimension = {x: 0, y: 0};

  clone(): Transform {
    const transform = new Transform();
    transform.angle = this.angle;
    transform.rotation = {...this.rotation};
    transform.scale = {...this.scale};
    transform.translate = {...this.translate};
    return transform;
  }
}
