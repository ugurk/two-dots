import { Dimension } from '../core/Dimension';
import { Point } from '../core/Point';
import { Serializable } from '../core/Serializable';

export abstract class AbstractElement<T> implements Serializable<T> {
  selectionOrder = -1;
  grabbed = false;
  selected = false;
  selectable = true;
  locked = false;

  abstract isPointOnObject(
    point: Point | Dimension,
    tolerance: number
  ): boolean;

  abstract serialize(): object;

  abstract deserialize(refElement: object): T;
}
