import Action from '../-base';

export default Action.extend({

  perform(node) {
    let guidelines = node.guidelines.matched;

    let resolved = {
      horizontal: null,
      vertical: null
    };

    guidelines.forEach(guideline => {
      let { direction, approx } = guideline;
      resolved[direction] = approx ? guideline : null;
    });

    // TODO: delta should not be zoomed
    let zoom = node.frame.zoom;

    let props = {};
    let snap = (direction, prop) => {
      let guideline = resolved[direction];
      if(!guideline) {
        return;
      }
      let { delta } = guideline;
      props[prop] = delta / zoom;
      return true;
    }

    snap('horizontal', 'y');
    snap('vertical', 'x');

    if(Object.keys(props).length) {
      node.update(props, { delta: true });
    }

  }

});
