import Guidelines from '../guidelines';

export default Guidelines.extend({

  _approx(a, b, approx) {
    return a - approx < b && a + approx > b;
  },

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

  _delta(source, target) {
    let { zoom } = this;
    return (target - source) / zoom;
  },

  _recompute(source, target, direction, positionKey, sizeKey, approx) {
    let points = this._buildPoints(source, target, positionKey, sizeKey);
    let lines = [];
    points.source.forEach(sourcePoint => {
      points.target.forEach(targetPoint => {
        if(sourcePoint === targetPoint) {
          lines.push({ direction, [positionKey]: sourcePoint });
        } else if(approx && this._approx(sourcePoint, targetPoint, approx)) {
          let delta = this._delta(sourcePoint, targetPoint);
          lines.push({ direction, [positionKey]: targetPoint, delta, approx: true });
        }
      });
    });
    return lines;
  },

  recompute(source, target, approx) {
    return [
      ...this._recompute(source, target, 'horizontal', 'y', 'height', approx),
      ...this._recompute(source, target, 'vertical',   'x', 'width',  approx)
    ];
  }

});
