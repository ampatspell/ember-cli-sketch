import Handler from './-base';
import { readOnly } from '@ember/object/computed';

const mapping = {
  isSpace: 'stage/drag',
  isAlt:   'stage/zoom'
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
    // TODO: isSpace and isAlt should be handled in selected tool instead of this sticky thing
    if(!this.tools.selected.sticky) {
      let tool = map(key);
      if(tool) {
        this.tools.activate(tool);
      }
    }

    this.tools.selected.onKeyDown(key);
  },

  onKeyUp(key) {
    if(!this.tools.selected.sticky) {
      let tool = map(key);
      if(tool) {
        this.tools.deactivate(tool);
      }
    }

    if(key.isEscape) {
      this.tools.activate(this.tools.default.type);
    }

    this.tools.selected.onKeyUp(key);
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

  onMouseDoubleClick() {
    return this.tools.selected.onMouseDoubleClick(...arguments);
  },

  onMouseMove() {
    return this.tools.selected.onMouseMove(...arguments);
  },

  onMouseWheel() {
    return this.tools.selected.onMouseWheel(...arguments);
  },

});
