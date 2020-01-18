import { AbstractRenderer } from "./AbstractRenderer";
import { Line } from "../elements/Line";

export class LineRenderer extends AbstractRenderer<Line> {

  render(line: Line): Line {
    // TODO: style
    // ctx.lineWidth = currentStyle.lineWidth;
    // ctx.strokeStyle = currentStyle.color;

    const rStart = line.pointStart.cloneRotatedByTransform(this.transform);
    const rEnd = line.pointEnd.cloneRotatedByTransform(this.transform);

    this.ctx.beginPath();
    this.ctx.moveTo(rStart.x * this.transform.scale.x, rStart.y * this.transform.scale.y);
    this.ctx.lineTo(rEnd.x * this.transform.scale.x, rEnd.y * this.transform.scale.y);
    this.ctx.closePath();
    this.ctx.stroke();
    return line;
  }

}
