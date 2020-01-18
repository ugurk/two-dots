import { Dimension } from '../core/Dimension';
import { Point } from '../core/Point';
import { Serializable, SerializedObject } from '../core/Serializable';

export abstract class AbstractElement<T> implements Serializable<T> {
  selectionOrder = -1;
  grabbed = false;
  selected = false;
  selectable = true;
  locked = false;
  abstract typeName: string;

  abstract isPointOnObject(
    point: Point | Dimension,
    tolerance: number
  ): boolean;

  abstract clone(): T;

  abstract serialize(): SerializedObject;

  abstract deserialize(refElement: SerializedObject): T;
}
