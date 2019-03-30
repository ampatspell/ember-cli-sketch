import { addObserver, removeObserver } from '@ember/object/observers';

const withKeys = (keys, cb) => {
  if(!keys || keys.length === 0) {
    return;
  }
  keys.map(key => cb(key));
}

export const startObservingObject = (object, keys, target, method) => {
  withKeys(keys, key => addObserver(object, key, target, method));
}

export const stopObservingObject = (object, keys, target, method) => {
  withKeys(keys, key => removeObserver(object, key, target, method));
}

export const startObservingObjects = (objects, keys, target, method) => {
  objects.map(object => startObservingObject(object, keys, target, method));
}

export const stopObservingObjects = (objects, keys, target, method) => {
  objects.map(object => stopObservingObject(object, keys, target, method));
}
