const container = document.querySelector('.container');

const drawBasicShapes = () => {

  let transform = new ArfJS.Transform();
  let layer = new ArfJS.CanvasLayer(600, 600, transform);
  layer.initLayer();

  layer.canvas.classList.add('shadow');
  container.appendChild(layer.canvas);

  var rectangle = new ArfJS.Rectangle(new ArfJS.Point(300, 300), 80, 80);
  var rectangleRenderer = new ArfJS.RectangleRenderer(layer.ctx, transform);

  rectangleRenderer.render(rectangle);

}

drawBasicShapes();
