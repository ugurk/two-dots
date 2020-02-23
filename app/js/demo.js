
const container = document.querySelector('.container');

const drawBasicShapes = () => {

    let transform = new TwoDots.Transform();
    let layer = new TwoDots.CanvasLayer(600, 600, transform);
    layer.initLayer();
    console.log(layer.canvas);

    container.appendChild(layer.canvas);

    var rectangle = new TwoDots.Rectangle(new TwoDots.Point(300, 300), 80, 80);
    var rectangleRenderer = new TwoDots.RectangleRenderer(layer.ctx(), transform);

    rectangleRenderer.render(rectangle);

}

drawBasicShapes();
