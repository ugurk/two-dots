import Dimension from '../core/Dimension';
import Point from '../core/Point';
import Serializable from '../core/Serializable';

abstract class AbstractElement implements Serializable {
  constructor(
    public selectionOrder = -1,
    public grabbed = false,
    public selected = false,
    public selectable = true,
    public locked = false
  ) {}

  public abstract isPointOnObject(
    point: Point | Dimension,
    tolerance: number
  ): boolean;

  public abstract serialize(): any;

  public abstract deserialize(refElement: any): any;
}
