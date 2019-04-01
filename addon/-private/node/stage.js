import create, { frame } from './-base';
import { zoom, model } from '../util/computed';
import { readOnly } from '@ember/object/computed';

export default opts => create(opts).extend({

  stage: readOnly('model'),

  frame: frame('stage'),
  zoom: zoom('model.zoom'),

  renderer: model('stage/renderer', stage => ({ stage })),
  interactions: model('stage/interactions', stage => ({ stage })),

  //

  attach() {
    this.renderer.attach(...arguments);
  },

  detach() {
    let { renderer, interactions, hover, selection, dragging, resizing } = this;
    renderer.detach(...arguments);
    interactions.reset();
    // hover.reset();
    // selection.reset();
    // dragging.reset();
    // resizing.reset();
  }

});
