import Guidelines from '../guidelines';

const isApprox = (a, b, diff) => a - diff < b && a + diff > b;

export default Guidelines.extend({

  _buildPointsForFrame(frame, positionKey, sizeKey) {
    let position = frame[positionKey];
    let size = frame[sizeKey];
    return [
      position,
      position + (size / 2),
      position + size
    ];
  },

  _buildPoints(source, target, positionKey, sizeKey) {
    return {
      source: this._buildPointsForFrame(source, positionKey, sizeKey),
      target: this._buildPointsForFrame(target, positionKey, sizeKey)
    };
  },

  _recompute(source, target, direction, positionKey, sizeKey, approx) {
    let points = this._buildPoints(source, target, positionKey, sizeKey);
    let lines = [];
    points.source.forEach(sourcePoint => {
      points.target.forEach(targetPoint => {
        if(sourcePoint === targetPoint) {
          lines.push({ direction, [positionKey]: sourcePoint });
        } else if(approx && isApprox(sourcePoint, targetPoint, approx)) {
          lines.push({ direction, [positionKey]: sourcePoint, approx: true });
          lines.push({ direction, [positionKey]: targetPoint, approx: true });
        }
      });
    });
    return lines;
  },

  recompute(source, target) {
    let approx = 10;
    return [
      ...this._recompute(source, target, 'horizontal', 'y', 'height', approx),
      ...this._recompute(source, target, 'vertical', 'x', 'width', approx)
    ];
  }

});
