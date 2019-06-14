import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
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

  zoom: readOnly('node.stage.zoom'),

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
  }).readOnly(),

  snapping() {
    let { matched } = this;

    let resolved = {
      horizontal: {},
      vertical:   {}
    };

    matched.forEach(guideline => {
      let { direction, approx } = guideline;
      let hash = resolved[direction];
      if(approx) {
        hash.approx = hash.approx || guideline;
      } else {
        hash.snapped = true;
      }
    });

    let props;
    let snap = (direction, prop) => {
      let hash = resolved[direction];
      if(hash.snapped) {
        return;
      }

      let { approx: guideline } = hash;
      if(!guideline) {
        return;
      }

      let { delta } = guideline;

      props = props || {};
      props[prop] = delta;
    }

    snap('horizontal', 'y');
    snap('vertical',   'x');

    return props;
  }

});
