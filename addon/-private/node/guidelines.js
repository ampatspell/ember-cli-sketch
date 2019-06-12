import EmberObject, { computed } from '@ember/object';
import sketches from '../util/sketches';
import { diff } from '../util/array';
import { A } from '@ember/array';

const _array = (owner, key) => {
  let array = owner[key];
  if(!array) {
    array = A();
    owner[key] = array;
  }
  return array;
}

export default EmberObject.extend({

  node: null,
  opts: null,

  pairs: computed('node', 'node.stage.recursive.@each.isVisible', function() {
    let source = this.node;
    let objects = source.stage.recursive.filter(target => target !== source && target.isVisible);

    let array = _array(this, '_pairs');
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
    let array = [];
    this.pairs.forEach(pair => {
      let matched = pair.matched;
      if(!matched) {
        return;
      }
      array.push(...matched);
    });
    return array;
  }).readOnly()

});
