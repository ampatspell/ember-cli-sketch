import Handler from './-base';
import { readOnly } from '@ember/object/computed';

export default Handler.extend({

  tools: readOnly('stage.tools'),

  onKeyDown(key) {
    if(key.isSpace) {
      this.tools.activate('stage/drag');
    }
  },

  onKeyUp(key) {
    if(key.isSpace) {
      this.tools.deactivate('stage/drag');
    }
  },

  onMouseMove() {
    return this.tools.selected.onMouseMove(...arguments);
  },

  onMouseWheel() {
    return this.tools.selected.onMouseWheel(...arguments);
  }

});
