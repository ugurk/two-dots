import { Transform } from '../core/Transform';

export abstract class AbstractRenderer<T> {
  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected transform: Transform
  ) {}

  abstract render(t: T): T;
}
