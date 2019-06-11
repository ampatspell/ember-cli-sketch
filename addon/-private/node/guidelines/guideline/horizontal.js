import Guideline from './-base';

export default Guideline.extend({

  calculate(source, target) {
    if(source.y === target.y) {
      return {
        x: source.x,
        y: source.y,
        length: source.length,
        matches: true
      };
    }
  }

});
