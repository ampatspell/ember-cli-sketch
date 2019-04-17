import Action from './-center-fit';
import { assign } from '@ember/polyfills';

export default Action.extend({

  perform(stage, opts) {
    opts = assign({}, opts);

    let { renderer: { size }, zoom } = stage;

    if(!size) {
      return;
    }

    let frame = this.frameForOptions(stage, opts);
    if(!frame) {
      return;
    }

    let bounds = frame.hover;
    if(!bounds) {
      return;
    }

    let dimension = (dimensionKey, sizeKey) => {
      let value = opts[dimensionKey];
      if(value) {
        return value;
      }
      let base = stage.frame[dimensionKey] - (bounds[dimensionKey] / zoom);
      let offset = (size[sizeKey] - (bounds[sizeKey])) / 2 / zoom;
      return base + offset;
    }

    let position = {
      x: dimension('x', 'width'),
      y: dimension('y',  'height')
    };

    stage.update(position);
  }

});
