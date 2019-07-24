import { node as _node, prop, guidelines, attrs as _attrs } from 'ember-cli-sketch/computed';
import { assign } from '@ember/polyfills';

export const node = opts => _node(assign({ identifier: 'dummy' }, opts));

const { attr, position, size } = _attrs(target => `doc.${target}`);

export {
  attr,
  position,
  size,
  prop,
  guidelines
}
