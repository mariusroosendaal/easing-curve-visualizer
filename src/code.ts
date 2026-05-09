const GRAPH_SIZE = 200;
const PADDING = 20;

figma.showUI(__html__, {
  themeColors: true,
  width: 200,
  height: 160,
  title: "Easing Curve Visualizer",
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === "generate-curve") {
    try {
      if (
        !Array.isArray(msg.values) ||
        msg.values.length !== 4 ||
        msg.values.some((v: unknown) => !Number.isFinite(v))
      ) {
        figma.notify("Invalid bezier values.");
        return;
      }

      const [x1, y1, x2, y2] = msg.values as number[];

      if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
        figma.notify("x1 and x2 must be between 0 and 1.");
        return;
      }

      const wrapperFrame = figma.createFrame();
      wrapperFrame.name = `Easing: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
      wrapperFrame.resize(GRAPH_SIZE + PADDING * 2, GRAPH_SIZE + PADDING * 2);
      wrapperFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

      const graphFrame = figma.createFrame();
      graphFrame.name = "Graph";
      graphFrame.resize(GRAPH_SIZE, GRAPH_SIZE);
      graphFrame.fills = [];
      graphFrame.clipsContent = false;
      graphFrame.x = PADDING;
      graphFrame.y = PADDING;

      const p0 = { x: 0, y: GRAPH_SIZE };
      const p1 = { x: x1 * GRAPH_SIZE, y: (1 - y1) * GRAPH_SIZE };
      const p2 = { x: x2 * GRAPH_SIZE, y: (1 - y2) * GRAPH_SIZE };
      const p3 = { x: GRAPH_SIZE, y: 0 };

      const nodes: SceneNode[] = [];

      // 1. Dashed Bounding Box
      const box = figma.createRectangle();
      box.resize(GRAPH_SIZE, GRAPH_SIZE);
      box.fills = [];
      box.strokes = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
      box.strokeWeight = 1;
      box.dashPattern = [4, 4];
      nodes.push(box);

      // 2. Linear Ease Line
      const linearLine = figma.createVector();
      linearLine.vectorPaths = [
        { windingRule: "NONE", data: `M ${p0.x} ${p0.y} L ${p3.x} ${p3.y}` },
      ];
      linearLine.strokes = [
        { type: "SOLID", color: { r: 0.75, g: 0.75, b: 0.75 } },
      ];
      linearLine.strokeWeight = 1;
      nodes.push(linearLine);

      // 3. Control Point Handles
      const handle1 = figma.createVector();
      handle1.vectorPaths = [
        { windingRule: "NONE", data: `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y}` },
      ];
      handle1.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      handle1.strokeWeight = 1;
      nodes.push(handle1);

      const handle2 = figma.createVector();
      handle2.vectorPaths = [
        { windingRule: "NONE", data: `M ${p3.x} ${p3.y} L ${p2.x} ${p2.y}` },
      ];
      handle2.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      handle2.strokeWeight = 1;
      nodes.push(handle2);

      // 4. The Bezier Curve
      const curve = figma.createVector();
      curve.vectorPaths = [
        {
          windingRule: "NONE",
          data: `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`,
        },
      ];
      curve.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      curve.strokeWeight = 2;
      nodes.push(curve);

      // 5. Circles for Points
      const controlPointRadius = 5;
      const endPointRadius = 3;
      const createCircle = (x: number, y: number, radius: number) => {
        const circle = figma.createEllipse();
        circle.resize(radius * 2, radius * 2);
        circle.x = x - radius;
        circle.y = y - radius;
        circle.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
        return circle;
      };

      nodes.push(createCircle(p0.x, p0.y, endPointRadius));
      nodes.push(createCircle(p3.x, p3.y, endPointRadius));
      nodes.push(createCircle(p1.x, p1.y, controlPointRadius));
      nodes.push(createCircle(p2.x, p2.y, controlPointRadius));

      nodes.forEach((node) => graphFrame.appendChild(node));
      wrapperFrame.appendChild(graphFrame);

      figma.currentPage.appendChild(wrapperFrame);
      wrapperFrame.x = figma.viewport.center.x - wrapperFrame.width / 2;
      wrapperFrame.y = figma.viewport.center.y - wrapperFrame.height / 2;

      figma.currentPage.selection = [wrapperFrame];
      figma.viewport.scrollAndZoomIntoView([wrapperFrame]);

      figma.closePlugin("Curve generated.");
    } catch {
      figma.notify("Something went wrong. Please try again.");
    }
  }
};
