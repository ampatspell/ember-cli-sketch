import Base, { node, x, y, width, height, rotation, visible, selectable, aspect, attr, guidelines } from './-base';
import { decodeImage } from 'ember-cli-sketch/util/image';
import { task } from 'ember-cli-sketch/task';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:          x(),
  y:          y(),
  width:      width(),
  height:     height(),
  rotation:   rotation(),
  aspect:     aspect({ initial: 2/3, locked: true }),
  fit:        attr('fit', { type: 'boolean', initial: false }),

  visible:    visible(),
  selectable: selectable(),
  guidelines: guidelines(),

  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),
  url:  attr('url', { type: 'string' }),

  task: task('url', 'opacity', async function() {
    return {
      image: await decodeImage(this.url)
    };
  }).cached(model => model.url),

  hasFit: true,
  hasAspect: true,
  hasRotation: true,
  hasOpacity: true,
  hasUrl: true

});
