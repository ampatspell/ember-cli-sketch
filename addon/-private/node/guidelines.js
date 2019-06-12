import EmberObject, { computed } from '@ember/object';
import sketches from '../util/sketches';
import { diff } from '../util/array';
import { A } from '@ember/array';

export default EmberObject.extend({

  node: null,
  opts: null,

  pairs: computed('node', 'node.stage.recursive.@each.isVisible', function() {
    let source = this.node;
    let objects = source.stage.recursive.filter(target => target !== source && target.isVisible);

    let array = this._pairs;
    if(!array) {
      array = A();
      this._pairs = array;
    }

    let factory = sketches(this).factory;

    diff({
      array,
      objects,
      find: target => array.findBy('target', target),
      create: target => factory.guidelinesPair(this, source, target),
      destroy: pair => pair.destroy()
    });

    return array;
  }).readOnly(),

  matched: computed('pairs.@each.matched', function() {
    return this.pairs.reduce((array, pair) => {
      let matched = pair.matched;
      if(matched) {
        array.push(...matched);
      }
      return array;
    }, A());
  }).readOnly()

});
