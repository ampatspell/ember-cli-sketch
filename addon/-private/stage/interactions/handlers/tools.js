import Handler from './-base';
import { readOnly } from '@ember/object/computed';

const mapping = {
  isSpace: 'stage/drag',
  isMeta:  'stage/zoom'
};

const map = key => {
  for(let prop in mapping) {
    if(key[prop] === true) {
      return mapping[prop];
    }
  }
};

export default Handler.extend({

  tools: readOnly('stage.tools'),

  onKeyDown(key) {
    let tool = map(key);
    if(tool) {
      this.tools.activate(tool);
    }
  },

  onKeyUp(key) {
    let tool = map(key);
    if(tool) {
      this.tools.deactivate(tool);
    } else if(key.isEscape) {
      this.tools.activate(this.tools.default.type);
    }
  },

  onMouseDown() {
    return this.tools.selected.onMouseDown(...arguments);
  },

  onMouseUp() {
    return this.tools.selected.onMouseUp(...arguments);
  },

  onMouseClick() {
    return this.tools.selected.onMouseClick(...arguments);
  },

  onMouseMove() {
    return this.tools.selected.onMouseMove(...arguments);
  },

  onMouseWheel() {
    return this.tools.selected.onMouseWheel(...arguments);
  }

});
