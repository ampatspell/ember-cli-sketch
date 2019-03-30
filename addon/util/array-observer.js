import { A } from '@ember/array';
import { startObservingObjects, stopObservingObjects } from './object-observer';

const keys = [ 'type', 'parent' ];

export default class ArrayObserver {

  constructor(array, delegate) {
    this.array = array;
    this.delegate = delegate;
    this.startObserving();
  }

  //

  objectValueForKeyDidChange(object, key) {
    this.delegate.updated(object, key);
  }

  startObservingObjects(objects) {
    startObservingObjects(objects, keys, this, this.objectValueForKeyDidChange);
  }

  stopObservingObjects(objects) {
    stopObservingObjects(objects, keys, this, this.objectValueForKeyDidChange);
  }

  //

  arrayWillChange(array, start, removeCount) {
    if(removeCount) {
      let removing = A(array.slice(start, start + removeCount));
      this.delegate.removed(removing, start, removeCount);
      this.stopObservingObjects(removing);
    }
  }

  arrayDidChange(array, start, removeCount, addCount) {
    if(addCount) {
      let adding = A(array.slice(start, start + addCount));
      this.delegate.added(adding, start, addCount);
      this.startObservingObjects(adding);
    }
  }

  get arrayObserverOptions() {
    return {
      willChange: this.arrayWillChange,
      didChange:  this.arrayDidChange
    };
  }

  startObserving() {
    let { array } = this;
    array.addArrayObserver(this, this.arrayObserverOptions);
    this.startObservingObjects(array);
    this.delegate.added(array, 0, array.length);
  }

  stopObserving() {
    let { array } = this;
    array.removeArrayObserver(this, this.arrayObserverOptions);
    this.stopObservingObjects(array);
  }

  destroy() {
    this.stopObserving();
  }

}
