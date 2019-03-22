import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

const cacheKey = key => `_${key}`;
const getCached = (owner, key) => owner[cacheKey(key)];
const setCached = (owner, key, value) => owner[cacheKey(key)] = value;

const movable = constraint => computed({
  get(key) {
    return getCached(this, key);
  },
  set(key, value) {
    value = this.owner.constraints[constraint].clampPosition(value);
    setCached(this, key, value);
    return value;
  }
});

const resizable = constraint => computed({
  get(key) {
    return getCached(this, key);
  },
  set(key, value) {
    value = this.owner.constraints[constraint].clampSize(value);
    setCached(this, key, value);
    return value;
  }
});

export default Mixin.create({

  x:      movable('horizontal'),
  y:      movable('vertical'),
  width:  resizable('horizontal'),
  height: resizable('vertical')

});
