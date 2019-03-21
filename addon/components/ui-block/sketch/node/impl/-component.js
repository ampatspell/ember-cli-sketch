import Component from '@ember/component';

export default Component.extend({
  classNameBindings: [ ':implementation' ],
  attributeBindings: [ 'style' ],

  node: null

});
