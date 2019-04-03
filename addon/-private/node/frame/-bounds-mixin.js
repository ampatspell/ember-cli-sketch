import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';

const keys = [ 'x', 'y', 'width', 'height', 'rotation' ];

const property = (frameKey, propertyKey) => computed(frameKey, function() {
  return this[frameKey][propertyKey];
}).readOnly();

const frame = (ownerNodesKey, sourceKey) => computed(`${ownerNodesKey}.@each.${sourceKey}`, function() {
  let nodes = this.get(ownerNodesKey);

  if(!nodes.length) {
    return;
  }

  let box = {
    min: {
      x: Number.POSITIVE_INFINITY,
      y: Number.POSITIVE_INFINITY,
    },
    max: {
      x: Number.NEGATIVE_INFINITY,
      y: Number.NEGATIVE_INFINITY,
    }
  };

  nodes.forEach(node => {
    let frame = node[sourceKey];
    box.min.x = Math.min(box.min.x, frame.x);
    box.min.y = Math.min(box.min.y, frame.y);
    box.max.x = Math.max(box.max.x, frame.x + frame.width);
    box.max.y = Math.max(box.max.y, frame.y + frame.height);
  });

  return {
    x:      box.min.x,
    y:      box.min.y,
    width:  box.max.x - box.min.x,
    height: box.max.y - box.min.y,
    rotation: 0
  };
}).readOnly();

export default (framePropertyKey, ownerNodesKey, sourceKey) => Mixin.create(assign({
  [framePropertyKey]: frame(ownerNodesKey, sourceKey)
}, keys.reduce((hash, key) => {
  hash[key] = property(framePropertyKey, key);
  return hash;
}, {})));
