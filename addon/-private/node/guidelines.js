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

  stage: readOnly('node.stage'),
  zoom: readOnly('stage.zoom'),

  approx: 5,

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
      horizontal: 0,
      vertical: 0
    };

    matched.forEach(guideline => {
      let { direction, approx, delta } = guideline;
      if(approx) {
        resolved[direction] = Math.min(resolved[direction], delta);
      } else {
        resolved[direction] = 0;
      }
    });

    let props;
    let snap = (direction, prop) => {
      let delta = resolved[direction];
      if(delta) {
        props = props || {};
        props[prop] = delta;
      }
    }

    snap('horizontal', 'y');
    snap('vertical',   'x');

    return props;
  }

});
