import { computed } from '@ember/object';

const key = 'node.frame.hover';

export default fn => computed(key, function() {
  let frame = this.get(key);
  if(frame) {
    return fn.call(this, frame);
  }
}).readOnly();
