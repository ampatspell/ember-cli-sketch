import Action from './-center-fit';
import { assign } from '@ember/polyfills';

export default Action.extend({

  perform(stage, opts) {
    opts = assign({ offset: 0 }, opts);

    let { renderer: { size } } = stage;

    if(!size) {
      return;
    }

    let frame = this.frameForOptions(stage, opts);
    if(!frame) {
      return;
    }

    let bounds = frame.absoluteBounds;
    if(!bounds) {
      return;
    }

    let value = dimension => (size[dimension] - (opts.offset * 2)) / bounds[dimension];

    let zoom = Math.min(value('width'), value('height'));

    if(opts.zoom) {
      zoom = Math.min(zoom, opts.zoom);
    }

    stage.update({ zoom });
    stage.perform('center', { type: opts.type });
  }

});
