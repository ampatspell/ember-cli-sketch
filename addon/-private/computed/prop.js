import { A } from '@ember/array';

export const __sketch__prop__ = '__sketch__prop__';

export const hashToDeps = hash => A(Object.keys(hash).map(key => {
  let value = hash[key];
  if(value && value[__sketch__prop__]) {
    return value.key;
  }
})).compact();

export const isProp = object => object && object[__sketch__prop__] === true;

export default key => ({ [__sketch__prop__]: true, key });
