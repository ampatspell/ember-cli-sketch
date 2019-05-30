import Base, { node, x, y, width, height, rotation, visible, selectable, aspect, attr, edges } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:          x(),
  y:          y(),
  width:      width(),
  height:     height(),
  rotation:   rotation(),
  aspect:     aspect({ initial: null }),

  visible:    visible(),
  selectable: selectable(),

  fill:     attr('fill'),
  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),

  edges: edges(frame => {
    // TODO: have this as a default
    let { x, y, width, height } = frame;
    let mid = {
      x: x + (width / 2),
      y: y + (height / 2)
    };
    let max = {
      x: x + width,
      y: y + height
    };
    return [
      // top
      { x: x,     y: y },
      { x: mid.x, y: y },
      { x: max.x, y: y },
      // middle
      { x: x,     y: mid.y },
      { x: mid.x, y: mid.y },
      { x: max.x, y: mid.y },
      // bottom
      { x: x,     y: max.y },
      { x: mid.x, y: max.y },
      { x: max.x, y: max.y },
    ];
  }),

  hasRotation: true,
  hasFill: true,
  hasOpacity: true

});
