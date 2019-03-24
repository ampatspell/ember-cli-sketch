import Node from './-base';
import { computed } from '@ember/object';
import { frame } from '../frame/-base';
import { nodes } from '../nodes';

export default Node.extend({

  isArea: true,

  area: computed(function() {
    return this;
  }).readOnly(),

  frame: frame('node/sized'),
  nodes: nodes()

});
