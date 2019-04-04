import EmberObject from '@ember/object';
import { factory } from '../util/computed';

const medium = type => factory((factory, interactions) => factory.interactionMedium(type, interactions));
const mouse = () => medium('mouse');
const keyboard = () => medium('keyboard');

const handlers = () => factory((factory, interactions) => factory.interactionHandlers(interactions));

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
