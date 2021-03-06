import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { factory } from '../util/computed';

const medium = type => factory((factory, interactions) => factory.interactionMedium(type, interactions));
const mouse = () => medium('mouse');
const keyboard = () => medium('keyboard');

const handlers = () => factory((factory, interactions) => factory.interactionHandlers(interactions));

export default EmberObject.extend({

  stage: null,
  isEnabled: readOnly('stage.isSelectable'),

  mouse: mouse(),
  keyboard: keyboard(),
  handlers: handlers(),

  invokeHandlers() {
    this.handlers.onEvent(...arguments);
  },

  onMouseOver() {
    this.mouse.onMouseOver(...arguments);
    this.invokeHandlers('onMouseOver', ...arguments);
  },

  onMouseOut() {
    this.mouse.onMouseOut(...arguments);
    this.invokeHandlers('onMouseOut', ...arguments);
  },

  onMouseDown() {
    this.mouse.onMouseDown(...arguments);
    this.invokeHandlers('onMouseDown', ...arguments);
  },

  onMouseMove() {
    this.mouse.onMouseMove(...arguments);
    this.invokeHandlers('onMouseMove', ...arguments);
  },

  onMouseClick() {
    this.mouse.onMouseClick(...arguments);
    this.invokeHandlers('onMouseClick', ...arguments);
  },

  onMouseDoubleClick() {
    this.mouse.onMouseDoubleClick(...arguments);
    this.invokeHandlers('onMouseDoubleClick', ...arguments);
  },

  onMouseUp() {
    this.mouse.onMouseUp(...arguments);
    this.invokeHandlers('onMouseUp', ...arguments);
  },

  onMouseWheel() {
    this.mouse.onMouseWheel(...arguments);
    this.invokeHandlers('onMouseWheel', ...arguments);
  },

  _keyboardMetaWorkaround(opts) {
    let meta = opts._metaKey;
    delete opts._metaKey;

    // OSX doesn't fire meta if window is not in focus
    // so, fake it on next key down
    if(!meta && this.keyboard.isMeta) {
      this.onKeyUp({ key: 'Meta', keyCode: 91 });
    }

    return opts;
  },

  onKeyDown(opts) {
    opts = this._keyboardMetaWorkaround(opts);
    let key = this.keyboard.onKeyDown(opts);
    if(key) {
      this.invokeHandlers('onKeyDown', key);
    }
  },

  onKeyUp(opts) {
    let key = this.keyboard.onKeyUp(opts);
    if(key) {
      this.invokeHandlers('onKeyUp', key);
    }
  },

  onBlur() {
  },

  onFocus() {
  },

  reset() {
    this.mouse.reset(),
    this.keyboard.reset();
    this.invokeHandlers('reset');
  },

});
