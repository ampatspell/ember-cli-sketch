import Guidelines from '../guidelines';

export default Guidelines.extend({

  calculatePointsForFrame({ x, y, width, height }) {
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
  }

});
