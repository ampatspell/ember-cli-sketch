import Guideline from './-base';

export default Guideline.extend({

  calculate(source, target) {
    if(source.x !== target.x) {
      return;
    }

    let x = source.x;
    let y;
    let length;

    if(source.y < target.y) {
      y = source.y;
      length = target.y - source.y + target.length;
    } else {
      y = target.y;
      length = source.y - target.y + source.length;
    }

    return {
      x,
      y,
      length,
      matches: true
    };
  }

});
