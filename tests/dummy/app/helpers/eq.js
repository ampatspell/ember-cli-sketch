import { helper } from '@ember/component/helper';

export function eq(params) {
  let [ a, b ] = params;
  return a === b;
}

export default helper(eq);
