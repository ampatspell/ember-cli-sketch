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
  return fn({ x, y, width, height, mid, max });
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

  edges: edges({
    horizontal: () => ([
      edge(({ x, y, width })    => ({ x, y,        length: width })),
      edge(({ x, mid, width })  => ({ x, y: mid.y, length: width })),
      edge(({ x, max, width })  => ({ x, y: max.y, length: width })),
    ]),
    vertical: () => ([
      edge(({ x, y, height })   => ({ x, y, length: height })),
      edge(({ mid, y, height }) => ({ x: mid.x, y, length: height })),
      edge(({ max, y, height }) => ({ x: max.x, y, length: height })),
    ])
  }),

  hasRotation: true,
  hasFill: true,
  hasOpacity: true

});
