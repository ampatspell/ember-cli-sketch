import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { array, findBy } from '../util/computed';

const mapping = {
  'drag': 'pointer'
};

export default EmberObject.extend({

  stage: null,

  _edge: findBy('stage.selection.attached', '_hasEdge', true),

  edge: computed('_edge.edge.serialized', function() {
    let edge = this.get('_edge.edge.serialized');
    if(!edge) {
      return;
    }

    let { horizontal, vertical } = edge;

    if((horizontal === 'right' && vertical === 'bottom') || (horizontal === 'left' && vertical === 'top')) {
      return 'nwse-resize';
    } else if((horizontal === 'right' && vertical === 'top') || (horizontal === 'left' && vertical === 'bottom')) {
      return 'nesw-resize';
    } else if(horizontal === 'middle') {
      return 'ns-resize';
    } else if(vertical === 'middle') {
      return 'ew-resize';
    }
  }).readOnly(),

  cursors: array(),

  value: computed('edge', 'cursors.lastObject.value', function() {
    let edge = this.edge;
    if(edge) {
      return edge;
    }
    return this.get('cursors.lastObject.value');
  }).readOnly(),

  push(type) {
    let value = mapping[type];
    let token = { value };
    this.cursors.pushObject(token);
    return {
      cancel: () => this.cursors.removeObject(token)
    };
  }

});
