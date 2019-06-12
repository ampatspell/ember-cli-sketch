import EmberObject, { computed } from '@ember/object';
import sketches from '../util/sketches';
import { diff } from '../util/array';
import { A } from '@ember/array';

export default EmberObject.extend({

  node: null,

  pairs: computed('node.edges', 'node.stage.recursive.@each.edges', function() {
    let source = this.node;
    let objects = source.stage.recursive.filter(target => target !== source)

    let array = this._pairs;
    if(!array) {
      array = A();
      this._pairs = array;
    }

    let factory = sketches(this).factory;

    diff({
      array,
      objects,
      find: target => array.findBy('target', target.edges),
      create: target => factory.guidelinesEdgesPair(source.edges, target.edges),
      destroy: pair => pair.destroy()
    });

    return array;
  }).readOnly(),

  matched: computed('pairs.@each.guidelines', function() {
    // console.log('matched', this+'');
    return this.pairs.reduce((array, pair) => {
      let guidelines = pair.guidelines;
      if(guidelines) {
        array.push(...guidelines);
      }
      return array;
    }, A());
  }).readOnly()

});
