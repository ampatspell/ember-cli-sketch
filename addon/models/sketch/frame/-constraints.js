import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

const movable = constraint => computed({
  get(key) {
    return this[`_${key}`];
  },
  set(key, value) {
    value = this.owner.constraints[constraint].clampPosition(value);
    this[`_${key}`] = value;
    return value;
  }
});

const resizable = constraint => computed({
  get(key) {
    return this[`_${key}`];
  },
  set(key, value) {
    value = this.owner.constraints[constraint].clampSize(value);
    this[`_${key}`] = value;
    return value;
  }
});

export default Mixin.create({

  x: movable('width'),
  y: movable('height'),
  width:  resizable('width'),
  height: resizable('height')

});
