import { A } from '@ember/array';

export const __sketch__prop__ = '__sketch__prop__';

export const hashToDeps = hash => {
  let mapping = {};

  let keys = A(Object.keys(hash).map(key => {
    let value = hash[key];
    if(value && value[__sketch__prop__]) {
      mapping[key] = value.key;
      return value.key;
    }
  })).compact();

  return {
    mapping,
    keys
  };
};

export const isProp = object => object && object[__sketch__prop__] === true;

export default key => ({ [__sketch__prop__]: true, key });
