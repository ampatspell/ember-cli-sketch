import { A } from '@ember/array';

const {
  keys
} = Object;

export const __sketch__prop__ = '__sketch__prop__';

export const hashToDeps = hash => A(keys(hash).map(key => {
  let value = hash[key];
  if(value[__sketch__prop__]) {
    return value.key;
  }
})).compact();

export const isProp = object => object && object[__sketch__prop__] === true;

export default key => ({ [__sketch__prop__]: true, key });
