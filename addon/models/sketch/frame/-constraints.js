import { computed } from '@ember/object';
import { numberContraints } from '../../../util/math';

const cacheKey = key => `__${key}`;
const getCached = (owner, key) => owner[cacheKey(key)];
const setCached = (owner, key, value) => owner[cacheKey(key)] = value;

export const position = numberConstraintDefinition => constraintKey => {
  let numberConstraint = numberContraints(numberConstraintDefinition);
  return computed({
    get(key) {
      return getCached(this, key);
    },
    set(key, value) {
      value = this.owner.constraints[constraintKey].clampPosition(value);
      value = numberConstraint(value);
      setCached(this, key, value);
      return value;
    }
  });
};

export const size = numberConstraintDefinition => constraintKey => {
  let numberConstraint = numberContraints(numberConstraintDefinition);
  return computed({
    get(key) {
      return getCached(this, key);
    },
    set(key, value) {
      value = this.owner.constraints[constraintKey].clampSize(value);
      value = numberConstraint(value);
      setCached(this, key, value);
      return value;
    }
  });
};
