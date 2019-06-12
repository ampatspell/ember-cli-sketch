import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { node, attr, prop, edges as _edges } from '../-node';
import { A } from '@ember/array';
import { guidFor } from '@ember/object/internals';

export const edges = arg => {
  if(arg) {
    return _edges(arg);
  }
  return _edges((source, target) => {
    let lines = [];

    // horizontal

    // TODO: this needs top-middle, top-bottom and so on permutations

    // top - top
    if(source.y === target.y) {
      lines.push({ direction: 'horizontal', y: source.y });
    }

    // middle - middle
    if(source.y + (source.height / 2) === target.y + (target.height / 2)) {
      lines.push({ direction: 'horizontal', y: source.y + (source.height / 2) });
    }

    // bottom - bottom
    if(source.y + source.height === target.y + target.height) {
      lines.push({ direction: 'horizontal', y: source.y + source.height });
    }

    // vertical

    // left - left
    if(source.x === target.x) {
      lines.push({ direction: 'vertical', x: source.x });
    }

    // middle - middle
    if(source.x + (source.width / 2) === target.x + (target.width / 2)) {
      lines.push({ direction: 'vertical', x: source.x + (source.width / 2) });
    }

    // right - right
    if(source.x + source.width === target.x + target.width) {
      lines.push({ direction: 'vertical', x: source.x + source.width });
    }

    return lines;
  });
}

export {
  node,
  attr,
  prop
};

export const position = (target, opts) => attr(target, assign({ type: 'number', decimals: 2 }, opts));
export const x = opts => position('x', opts);
export const y = opts => position('y', opts);

export const size = (target, opts) => attr(target, assign({ type: 'number', min: 0, decimals: 2 }, opts));
export const width = opts => size('width', opts);
export const height = opts => size('height', opts);

export const rotation = opts => attr('rotation', assign({ type: 'number', min: -360, max: 360, decimals: 2, initial: 0 }, opts));
export const aspect = opts => attr('aspect', assign({ type: 'number', min: 0, decimals: 3 }, opts));
export const visible = () => attr('visible', { type: 'boolean', initial: true });
export const selectable = () => attr('selectable', { type: 'boolean', initial: true });

export default EmberObject.extend({

  doc: null,
  id: readOnly('doc.id'),
  type: readOnly('doc.type'),
  position: readOnly('doc.position'),
  identifier: attr('identifier', { type: 'string' }),

  description: computed('fill', 'color', 'visible', 'selectable', function() {
    let { fill, color, visible, selectable } = this;
    let arr = [];
    if(fill) {
      arr.push(fill);
    }
    if(color) {
      arr.push(color);
    }
    if(!visible) {
      arr.push('[hidden]');
    }
    if(!selectable) {
      arr.push('[not selectable]');
    }
    return arr.join(' ');
  }).readOnly(),

  info: computed('type', 'description', 'guid', function() {
    let { type, description, guid } = this;
    let arr = [ type ];
    if(description) {
      arr.push(description);
    }
    arr.push(`(${guid})`);
    return arr.join(' ');
  }).readOnly(),

  guid: computed(function() {
    return guidFor(this);
  }).readOnly(),

  parent: computed('doc.parent', 'stage.content.models.@each.id', function() {
    let id = this.doc.parent;
    let stage = this.stage;
    if(id === null) {
      return stage;
    }
    return stage.content.models.findBy('id', id);
  }).readOnly(),

  nodes: computed('stage.content.models.@each.{parent,position}', function() {
    return A(A(this.stage.content.models.filterBy('parent', this)).sortBy('position'));
  }).readOnly(),

  remove() {
    this.stage.removeNode(this);
    this.set('doc.parent', undefined);
    this.doc.delete();
  },

  update(props) {
    this.setProperties(props);
    this.doc.scheduleSave();
  },

  move(target) {
    this.set('doc.parent', target && target.id);
    this.set('doc.position', this.parent.nodes.lastObject.position + 1);
    this.doc.scheduleSave();
  },

  replace(model, next) {
    this.parent.replace(model, next);
  },

  toStringExtension() {
    let { doc: { id } } = this;
    return id;
  }

});
