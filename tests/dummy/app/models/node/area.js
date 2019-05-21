import Base, { node, x, y, width, height, visible, selectable, aspect, attr } from './-base';

export default Base.extend({

  node: node({ type: 'sized', container: true }),

  x:       x(),
  y:       y(),
  width:   width({ min: 100, max: 500 }),
  height:  height({ min: 100, max: 300 }),
  aspect:  aspect(),

  visible:    visible(),
  selectable: selectable(),

  fill: attr('fill', { type: 'string', initial: '#fff' }),

  hasFill: true

});
