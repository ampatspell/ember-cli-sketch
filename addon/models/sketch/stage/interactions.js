import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';

export const interactions = () => computed(function() {
  return sketches(this).factory.stage.interactions.create(this);
}).readOnly();

const medium = type => computed(function() {
  return sketches(this).factory.stage.interactions.medium(type, this);
}).readOnly();

const mouse = () => medium('mouse');
const keyboard = () => medium('keyboard');

const handlers = () => computed(function() {
  return sketches(this).factory.stage.interactions.handlers(this);
}).readOnly();

export default Base.extend({

  owner: null,

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
    this.mouse.onMouseClick();
    this.invokeHandlers('onMouseClick', ...arguments);
  },

  onMouseUp() {
    this.mouse.onMouseUp();
    this.invokeHandlers('onMouseUp', ...arguments);
  },

  onMouseWheel() {
    this.mouse.onMouseWheel(...arguments);
    this.invokeHandlers('onMouseWheel', ...arguments);
  },

  onKeyDown() {
    this.keyboard.onKeyDown(...arguments);
    this.invokeHandlers('onKeyDown', ...arguments);
  },

  onKeyPress() {
    this.keyboard.onKeyPress(...arguments);
    this.invokeHandlers('onKeyPress', ...arguments);
  },

  onKeyUp() {
    this.keyboard.onKeyUp(...arguments);
    this.invokeHandlers('onKeyUp', ...arguments);
  },

  reset() {
    this.mouse.reset(),
    this.keyboard.reset();
    this.invokeHandlers('reset');
  },

});
