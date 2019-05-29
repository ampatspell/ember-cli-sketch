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
    let half = {
      width:  width / 2,
      height: height / 2
    };
    return [
      // top
      { x: x,              y: y },
      { x: x + half.width, y: y },
      { x: x + width,      y: y },
      // middle
      { x: x,              y: y + half.height },
      { x: x + half.width, y: y + half.height },
      { x: x + width,      y: y + half.height },
      // bottom
      { x: x,              y: y + height },
      { x: x + half.width, y: y + height },
      { x: x + width,      y: y + height },
    ];
  }),

  hasRotation: true,
  hasFill: true,
  hasOpacity: true

});
