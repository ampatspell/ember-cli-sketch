import Guideline from './-base';

export default Guideline.extend({

  calculate(source, target) {
    if(source.y !== target.y) {
      return;
    }

    let x;
    let y = source.y;
    let length;

    if(source.x < target.x) {
      x = source.x;
      length = target.x - source.x + target.length;
    } else if (source.x + source.length < target.x + target.length) {
      x = target.x;
      length = target.length;
    } else {
      x = target.x;
      length = source.x - target.x + source.length;
    }

    return {
      x,
      y,
      length,
      matches: true
    };
  }

});
