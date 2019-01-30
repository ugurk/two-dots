import Dimension from './Dimension';

export default class Transform {
  public angle = 0;
  public rotation: Dimension = { x: 0, y: 0 };
  public scale: Dimension = { x: 0, y: 0 };
  public translate: Dimension = { x: 0, y: 0 };

  public clone(): Transform {
    const transform = new Transform();
    transform.angle = this.angle;
    transform.rotation = { ...this.rotation };
    transform.scale = { ...this.scale };
    transform.translate = { ...this.translate };
    return transform;
  }
}
