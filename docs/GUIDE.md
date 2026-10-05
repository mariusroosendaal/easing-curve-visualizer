# Easing Curve Visualizer

Easing Curve Visualizer draws the curve of a CSS `cubic-bezier()` timing function on the canvas, with its control points, for your animation specs.

## Create a curve

![](easing-curve-create.svg)

Enter the four values of `cubic-bezier()`, separated by commas: `P1.x, P1.y, P2.x, P2.y`. For the CSS `ease` curve, enter `0.25, 0.1, 0.25, 1`. The x values must be between 0 and 1. The y values can go outside it, for an overshoot.

Click **Create curve**, or press Enter, to place the frame in the middle of the view. Press Ctrl/Cmd+Z to undo.

### The curve frame

![](easing-curve-output.svg)

The frame is 240 × 240px, named after its values: `Easing: cubic-bezier(0.25, 0.1, 0.25, 1)`.

1. **The curve** — from start (bottom left) to end (top right). Time runs left to right, progress bottom to top.
2. **The control points** — P1, joined to the start, and P2, joined to the end. Each pulls the curve toward it.
3. **The linear line** — a linear easing, for reference. Above it, the animation is further along than a linear one.
4. **The dashed box** — the range from 0 to 1 on both axes.
