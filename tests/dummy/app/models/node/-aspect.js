import { width as _width, height as _height, aspect as _aspect, prop } from './-base';

export const aspect = () => _aspect({
  changed(value, _, model) {
    let width = model.height / value;
    let height = width * value;
    return { height, width };
  }
});

export const width = () => _width({
  inverse: prop('height'),
  aspect: prop('aspect'),
  changed(value, { aspect }) {
    let height = value * aspect;
    return { height };
  }
});

export const height = () => _height({
  inverse: prop('width'),
  aspect: prop('aspect'),
  changed(value, { aspect }) {
    let width = value / aspect;
    return { width };
  }
});
