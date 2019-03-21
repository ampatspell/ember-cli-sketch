import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { readOnly, bool } from '@ember/object/computed';
import { assert } from '@ember/debug';

export const renderer = () => computed(function() {
  return sketches(this).factory.stage.renderer(this);
}).readOnly();

export default Base.extend({

  _component: null,

  isAttached: bool('_component'),
  size: readOnly('_component.size'),

  attach(_component) {
    assert(`Stage ${this} is already attached to ${this._component}`, !this._component);
    this.setProperties({ _component });
  },

  detach() {
    this.setProperties({ _component: null });
  },

  recalculateSize() {
    let { isAttached, _component } = this;
    if(!isAttached) {
      return;
    }
    _component.recalculateSize();
  }

});
