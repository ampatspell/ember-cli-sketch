import EmberObject, { computed } from '@ember/object';
import sketches from '../util/sketches';

const medium = type => computed(function() {
  return sketches(this).factory.interactionMedium(type, this);
}).readOnly();

const mouse = () => medium('mouse');
const keyboard = () => medium('keyboard');

const handlers = () => computed(function() {
  return sketches(this).factory.interactionHandlers(this);
}).readOnly();

export default EmberObject.extend({

  stage: null,

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

  onMouseUp() {
    this.mouse.onMouseUp(...arguments);
    this.invokeHandlers('onMouseUp', ...arguments);
  },

  onMouseWheel() {
    this.mouse.onMouseWheel(...arguments);
    this.invokeHandlers('onMouseWheel', ...arguments);
  },

  onKeyDown(opts) {
    let key = this.keyboard.onKeyDown(opts);
    if(opts.body && key) {
      this.invokeHandlers('onKeyDown', key);
    }
  },

  onKeyUp(opts) {
    let key = this.keyboard.onKeyUp(opts);
    if(opts.body && key) {
      this.invokeHandlers('onKeyUp', key);
    }
  },

  reset() {
    this.mouse.reset(),
    this.keyboard.reset();
    this.invokeHandlers('reset');
  },

});
