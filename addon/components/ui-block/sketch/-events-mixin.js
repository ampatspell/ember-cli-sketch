import Mixin from '@ember/object/mixin';
import { readOnly } from '@ember/object/computed';
import { run } from '@ember/runloop';

export default Mixin.create({

  interactions: readOnly('stage.node.interactions'),

  _withEvents(cb) {
    let events = this._handlers;
    if(!events) {
      let wrap = fn => e => run(() => {
        if(!this.interactions || this.isDestroying) {
          return;
        }
        return fn(e);
      });
      events = {
        blur:        wrap(e => this.onBlur(e)),
        focus:       wrap(e => this.onFocus(e)),
        resize:      wrap(e => this.onWindowResize(e)),
        mouseover:   wrap(e => this.onMouseOver(e)),
        mouseout:    wrap(e => this.onMouseOut(e)),
        mousemove:   wrap(e => this.onMouseMove(e)),
        mousedown:   wrap(e => this.onMouseDown(e)),
        click:       wrap(e => this.onMouseClick(e)),
        mouseup:     wrap(e => this.onMouseUp(e)),
        wheel:       wrap(e => this.onMouseWheel(e)),
        keydown:     wrap(e => this.onKeyDown(e)),
        keyup:       wrap(e => this.onKeyUp(e)),
        selectstart: wrap(e => this.onSelectStart(e)),
      };
      this._handlers = events;
    }
    for(let key in events) {
      cb(window, key, events[key]);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.elementSizeDidChange();
    this._withEvents((window, key, fn) => window.addEventListener(key, fn));
  },

  willDestroyElement() {
    this._super(...arguments);
    this._withEvents((window, key, fn) => window.removeEventListener(key, fn));
  },

  setDeltaMouse(e) {
    let { screenX: x, screenY: y } = e;
    this._deltaMouse = { x, y };
  },

  deltaMouse() {
    return this._deltaMouse || { x: 0, y: 0 };
  },

  keysHashFromMouseEvent(e) {
    let { altKey: alt, ctrlKey: ctrl, metaKey: meta } = e;
    return { alt, ctrl, meta };
  },

  elementSizeDidChange() {
    let { element } = this;
    if(!element) {
      return;
    }
    let { width, height } = element.getBoundingClientRect();
    this.set('size', { width, height });
  },

  onWindowResize() {
    this.elementSizeDidChange();
  },

  onMouseDown(e) {
    let { button } = e;
    this.interactions.onMouseDown({ button });
  },

  onMouseMove(e) {
    let { screenX, screenY, clientX, clientY } = e;

    let rect = this.element.getBoundingClientRect();
    let stage = {
      x: clientX - rect.left + window.scrollX,
      y: clientY - rect.top  + window.scrollX
    };

    let delta = this.deltaMouse();
    delta = {
      x: screenX - delta.x,
      y: screenY - delta.y
    };

    let keys = this.keysHashFromMouseEvent(e);

    this.interactions.onMouseMove({ stage, delta, keys });

    this.setDeltaMouse(e);
  },

  onMouseUp() {
    this.interactions.onMouseUp();
  },

  overFromMouseEvent(e) {
    let { element } = this;
    let { target } = e;
    let stage = target === element || element.contains(e.target);
    if(stage) {
      return 'stage';
    }
    return 'body';
  },

  onMouseOver(e) {
    let over = this.overFromMouseEvent(e);
    this.interactions.onMouseOver({ over });
  },

  onMouseOut(e) {
    let window = e.toElement === null;
    this.interactions.onMouseOut({ window });
  },

  onMouseClick(e) {
    let { button } = e;
    this.interactions.onMouseClick({ button });
  },

  onMouseWheel(e) {
    let { deltaX, deltaY } = e;

    let direction;
    let value;

    if(deltaX) {
      direction = 'x';
      value = Math.sign(deltaX);
    } else if(deltaY) {
      direction = 'y';
      value = Math.sign(deltaY);
    } else {
      return;
    }

    let keys = this.keysHashFromMouseEvent(e);

    this.interactions.onMouseWheel({ direction, value, keys });
  },

  keysHashFromKeyboardEvent(e) {
    let { keyCode, key } = e;
    let body = document.activeElement === document.body;
    let hash = { keyCode, key, body };
    return hash;
  },

  onKeyDown(e) {
    this.interactions.onKeyDown(this.keysHashFromKeyboardEvent(e));
  },

  onKeyUp(e) {
    this.interactions.onKeyUp(this.keysHashFromKeyboardEvent(e));
  },

  onBlur() {
    this.interactions.onBlur();
  },

  onFocus() {
    this.interactions.onFocus();
  },

  onSelectStart() {
    return false;
  }

});
