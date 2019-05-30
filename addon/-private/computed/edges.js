import { computed } from '@ember/object';

const key = 'node.frame.hover';

const _fn = frame => {
  let { x, y, width, height } = frame;

  let mid = {
    x: x + (width / 2),
    y: y + (height / 2)
  };

  let max = {
    x: x + width,
    y: y + height
  };

  return [
    // top
    { x: x,     y: y },
    { x: mid.x, y: y },
    { x: max.x, y: y },
    // middle
    { x: x,     y: mid.y },
    { x: mid.x, y: mid.y },
    { x: max.x, y: mid.y },
    // bottom
    { x: x,     y: max.y },
    { x: mid.x, y: max.y },
    { x: max.x, y: max.y },
  ];
};

export default fn => computed(key, function() {
  let frame = this.get(key);
  if(frame) {
    fn = fn || _fn;
    return fn.call(this, frame);
  }
}).readOnly();
