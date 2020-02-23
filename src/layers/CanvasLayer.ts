import { Transform } from '../core/Transform';
import { Polygon } from '../elements/Polygon';

export class CanvasLayer {

    private canvas: HTMLCanvasElement = document.createElement('canvas');

    constructor(public width = 600, public height = 600, public transform: Transform, public opacity = 1) {
    }

    initLayer(presetCanvas?: HTMLCanvasElement) {
        this.canvas = presetCanvas || document.createElement('canvas');
        this.canvas.setAttribute('style', 'position: absolute; top: 0px; left: 0px;');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    ctx(): CanvasRenderingContext2D {
        return this.canvas.getContext('2d')!;
    }

    refresh() {
        let ctx = this.ctx();
        ctx.restore();
        this.clear();
        ctx.save();

        ctx.translate(this.transform.translate.x, this.transform.translate.y);
        ctx.scale(this.transform.scale.x, this.transform.scale.y);

        // rotate around
        ctx.translate(this.transform.rotation.x, this.transform.rotation.y);
        ctx.rotate(this.transform.angle * Math.PI / 180);
        ctx.translate(-this.transform.rotation.x, -this.transform.rotation.y);

        ctx.translate(this.transform.translate.x, this.transform.translate.y);

        ctx.globalAlpha = this.opacity;
    }

    clear() {
        let ctx = this.ctx();
        ctx.save();
        // use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.restore();
    };

    clone(): CanvasLayer {
        const cloneLayer = new CanvasLayer(this.width, this.height, this.transform, this.opacity);
        cloneLayer.initLayer();
        cloneLayer.ctx().drawImage(this.canvas, 0, 0);
        return cloneLayer;
    }

    cropByPolygon(polygon: Polygon, extractFromSelf = false): CanvasLayer {

        if (!polygon.points.length) {
            return this.clone();
        }

        let currentCtx = this.ctx();
        let points = polygon.points, i;

        var cropCanvas = document.createElement("canvas");
        cropCanvas.width = this.width;
        cropCanvas.height = this.height;

        let cropCtx = cropCanvas.getContext("2d")!;

        cropCtx.beginPath();
        cropCtx.moveTo(points[0].x, points[0].y);

        for (i = 1; i < points.length; i++) {
            cropCtx.lineTo(points[i].x, points[i].y);
        }

        cropCtx.closePath();
        cropCtx.clip();
        cropCtx.drawImage(this.canvas, 0, 0);

        if (!extractFromSelf) {
            currentCtx.save();
            currentCtx.beginPath();
            currentCtx.moveTo(points[0].x, points[0].y);

            for (i = 1; i < polygon.points.length; i++) {
                currentCtx.lineTo(points[i].x, points[i].y);
            }

            currentCtx.closePath();
            currentCtx.clip();
            currentCtx.clearRect(0, 0, this.width, this.height);
            currentCtx.restore();
        }
        this.refresh();
        const cropLayer = new CanvasLayer(this.width, this.height, this.transform, this.opacity);
        cropLayer.initLayer(cropCanvas);
        return cropLayer;
    };

}
