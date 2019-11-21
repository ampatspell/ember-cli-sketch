import Component from '../-component';
import { observer } from '@ember/object';
import layout from './template';
import { style, className, fontLoader, editing } from '../-computed';
import { readOnly } from '@ember/object/computed';
import { round } from '../../../../../../-private/util/math';
import { later, cancel } from '@ember/runloop';

const px = (value, zoom) => {
  if(!value) {
    return;
  }
  value = round(value * zoom, 4);
  return `${value}px`;
};

export default Component.extend({
  layout,
  classNameBindings: [ 'align', 'verticalAlign', 'fontStyle', 'isLoading:loading:loaded', 'isEditing:editing' ],

  loader: fontLoader('model.fontFamily', function() {
    let { model: { fontFamily } } = this;
    if(!fontFamily) {
      return;
    }
    return {
      google: {
        families: [ fontFamily ]
      }
    };
  }),

  isLoading: readOnly('loader.isLoading'),
  isEditing: editing('model'),

  align:         className('model.align', 'align'),
  verticalAlign: className('model.verticalAlign', 'vertical'),
  fontStyle:     className('model.fontStyle', 'style'),

  text: readOnly('model.text'),

  style: style('model.{fill,color,opacity,fontFamily,fontWeight,fontSize,padding}', 'zoom', function() {
    let { model: { fill: background, color, opacity, fontFamily, fontWeight, fontSize, padding }, zoom } = this;
    return {
      background,
      opacity,
      color,
      fontWeight,
      fontFamily: `"${fontFamily}"`,
      fontSize: px(fontSize, zoom),
      padding: px(padding, zoom)
    };
  }),

  didInsertElement() {
    this._super(...arguments);
    this._editingDidChange();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.cancelEditingDidChange();
  },

  cancelEditingDidChange() {
    cancel(this.__editingDidChange);
  },

  editingDidChange() {
    if(this.isEditing) {
    } else {
      window.getSelection().removeAllRanges();
    }
  },

  _editingDidChange: observer({
    dependentKeys: [ 'isEditing'],
    fn() {
      this.cancelEditingDidChange();
      this.__editingDidChange = later(() => this.editingDidChange(), 100);
    },
    sync: false
  }),

});
