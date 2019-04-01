import Frame, { model } from './-base';
import { serialized } from '../../util/computed';
import { zoomed } from './-computed';
import { readOnly } from '@ember/object/computed';

const keys = [ 'x', 'y' ];

export default Frame.extend({

  x: model('x'),
  y: model('y'),

  properties: serialized(keys),
  absolute: readOnly('properties'),
  zoomed: zoomed('properties'),

});
