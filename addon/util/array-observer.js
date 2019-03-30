import { A } from '@ember/array';

export default class ArrayObserver {

  constructor(array, delegate) {
    this.array = array;
    this.delegate = delegate;
    this.start();
  }

  _arrayWillChange(array, start, removeCount) {
    if(removeCount) {
      let removing = A(array.slice(start, start + removeCount));
      this.delegate.removed(removing, start, removeCount);
    }
  }

  _arrayDidChange(array, start, removeCount, addCount) {
    if(addCount) {
      let adding = A(array.slice(start, start + addCount));
      this.delegate.added(adding, start, addCount);
    }
  }

  get _arrayObserverOptions() {
    return {
      willChange: this._arrayWillChange,
      didChange:  this._arrayDidChange
    };
  }

  start() {
    let { array } = this;
    array.addArrayObserver(this, this._arrayObserverOptions);
    this.delegate.added(array, 0, array.length);
  }

  stop() {
    let { array } = this;
    array.removeArrayObserver(this, this._arrayObserverOptions);
  }

  destroy() {
    this.stop();
  }

}
