import { Line } from '../elements/Line';
import { AbstractRenderer } from './AbstractRenderer';

export class LineRenderer extends AbstractRenderer<Line> {
  render(line: Line): Line {
    // TODO: styling

    const rStart = line.pointStart.cloneByTransform(this.transform);
    const rEnd = line.pointEnd.cloneByTransform(this.transform);

    this.ctx.beginPath();
    this.ctx.moveTo(rStart.x, rStart.y);
    this.ctx.lineTo(rEnd.x, rEnd.y);
    this.ctx.closePath();
    this.ctx.stroke();
    return line;
  }
}
