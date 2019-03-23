import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { numberContraints } from '../../../util/math';
import { constraints } from '../frame';

const position = numberContraints(constraints.position);
const size = numberContraints(constraints.size);

const cacheKey = key => `__constraints__${key}`;
const getCached = (owner, key) => owner[cacheKey(key)];
const setCached = (owner, key, value) => owner[cacheKey(key)] = value;

const movable = constraint => computed({
  get(key) {
    return getCached(this, key);
  },
  set(key, value) {
    value = this.owner.constraints[constraint].clampPosition(value);
    value = position(value);
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
    value = size(value);
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
