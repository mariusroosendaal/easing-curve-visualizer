# Easing Curve Visualizer

Generate visual representations of cubic bezier easing curves.

## What it does

Creates a frame showing the control points and curve shape for any `cubic-bezier(x1, y1, x2, y2)` timing function. Useful for documenting animation specs or understanding easing behavior.

## Usage

1. Run the plugin
2. Enter the four cubic bezier values (x1, y1, x2, y2)
3. Click create

## Output

A 240×240px frame containing:
- Dashed bounding box
- Linear reference line
- Control point handles
- The bezier curve
- Start/end points and control point markers

## Development

```bash
npm install
npm run dev    # Watch mode
npm run build  # Production build
```
