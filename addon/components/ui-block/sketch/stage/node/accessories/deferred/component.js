import Component from '@ember/component';
import { getSketchComponent } from '../../../component';

export default Component.extend({
  tagName: '',

  promise: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let { promise } = this;
    if(!promise) {
      return;
    }

    let sketch = getSketchComponent(this);
    if(!sketch) {
      return;
    }

    sketch.registerRenderPromise(promise);
  }

});
