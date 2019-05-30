import Base, { node, x, y, width, height, rotation, visible, selectable, aspect, attr, edges } from './-base';

const edge = fn => frame => {
  let { x, y, width, height } = frame;
  let mid = {
    x: x + (width / 2),
    y: y + (height / 2)
  };
  let max = {
    x: x + width,
    y: y + height
  };
  return fn({ x, y, mid, max });
};

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

  edges: edges(() => ([
    // top
    edge(({ x, y })     => ({ x, y })),
    edge(({ y, mid })   => ({ x: mid.x, y })),
    edge(({ y, max })   => ({ x: max.x, y })),
    // middle
    edge(({ x, mid })   => ({ x, y: mid.y })),
    edge(({ mid })      => ({ x: mid.x, y: mid.y })),
    edge(({ mid, max }) => ({ x: max.x, y: mid.y })),
    // bottom
    edge(({ x, max })   => ({ x, y: max.y })),
    edge(({ mid, max }) => ({ x: mid.x, y: max.y })),
    edge(({ max })      => ({ x: max.x, y: max.y })),
  ])),

  hasRotation: true,
  hasFill: true,
  hasOpacity: true

});
