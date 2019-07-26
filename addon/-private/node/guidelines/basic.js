import Guidelines, { points } from '../guidelines';

export {
  points
}

export default Guidelines.extend({

  points: points(function({ x, y, width, height }) {
    return {
      vertical: [
        x,
        x + (width / 2),
        x + width - 1
      ],
      horizontal: [
        y,
        y + (height / 2),
        y + height - 1
      ]
    };
  }),

});
