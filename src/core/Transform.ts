import Dimension from './Dimension';

export default class Transform {
  public angle = 0;
  public rotation: Dimension = { x: 0, y: 0 };
  public scale: Dimension = { x: 0, y: 0 };
  public translate: Dimension = { x: 0, y: 0 };

  public clone(): Transform {
    const transform = new Transform();
    transform.angle = this.angle;
    transform.rotation.x = this.rotation.x;
    transform.rotation.y = this.rotation.y;
    transform.scale.x = this.scale.x;
    transform.scale.y = this.scale.y;
    transform.translate.x = this.translate.x;
    transform.translate.x = this.translate.y;
    return transform;
  }
}
