import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { later, cancel } from '@ember/runloop';
import { compact } from 'ember-cli-sketch/-private/util/object';

export default EmberObject.extend({

  ref: null,

  id: readOnly('ref.id'),
  exists: false,

  start() {
    return new Promise(resolve => {
      let first = true;
      this.ref.onSnapshot(snapshot => {
        this.onSnapshot(snapshot);
        if(first) {
          first = false;
          resolve(this);
        }
      });
    });
  },

  onSnapshot(snapshot) {
    let data = snapshot.data();
    // console.log('change', this.ref.path, data, snapshot.exists);
    this.setProperties(data);
    this.set('exists', snapshot.exists);
  },

  async save() {
    let { exists, keys } = this;
    if(!exists) {
      return;
    }
    let data = compact(this.getProperties(keys));
    // console.log('save', this.ref.path, data);
    await this.ref.set(data, { merge: true });
  },

  async delete() {
    // console.log('delete', this.ref.path);
    if(!this.exists) {
      return;
    }
    this.set('exists', false);
    await this.ref.delete();
  },

  scheduleSave() {
    cancel(this._save);
    this._save = later(() => this.save(), 50);
  },

  toStringExtension() {
    let { id, type } = this;
    return `${id}:${type}`;
  }

});
