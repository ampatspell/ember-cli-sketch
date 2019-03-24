import Component from '@ember/component';

export default Component.extend({
  classNameBindings: [ ':ui-block-sketch-stage-node-implementation', 'node.type' ],
  attributeBindings: [ 'style' ]
});
