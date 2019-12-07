import { pi } from './math';

// http://math.hws.edu/graphicsbook/source/webgl/AffineTransform2D.js
export default class AffineTransform2D {

  constructor(a, b, c, d, e, f) {
    if(a instanceof AffineTransform2D) {
      this.a = a.a;
      this.b = a.b;
      this.c = a.c;
      this.d = a.d;
      this.e = a.e;
      this.f = a.f;
    } else {
      this.a = a === undefined ? 1 : a;
      this.b = b === undefined ? 0 : b;
      this.c = c === undefined ? 0 : c;
      this.d = d === undefined ? 1 : d;
      this.e = e === undefined ? 0 : e;
      this.f = f === undefined ? 0 : f;
    }
  }

  getMat3() {
    let { a, b, c, d, e, f } = this;
    return [
      a, b, 0,
      c, d, 0,
      e, f, 1
    ];
  }

  rotateRad(radians) {
    let sin = Math.sin(radians);
    let cos = Math.cos(radians);
    let t = this.a * cos + this.c * sin;
    this.c = this.a * (-sin) + this.c * cos;
    this.a = t;
    t = this.b * cos + this.d * sin;
    this.d = this.b * (-sin) + this.d * cos;
    this.b = t;
    return this;
  }

  rotateDeg(deg) {
    let rad = deg * pi.div_180;
    return this.rotateRad(rad);
  }

  translate(dx, dy) {
    this.e += this.a * dx + this.c * dy;
    this.f += this.b * dx + this.d * dy;
    return this;
  }

  scale(sx, sy) {
    if (sy === undefined) {
      sy = sx;
    }
    this.a *= sx;
    this.b *= sx;
    this.c *= sy;
    this.d *= sy;
    return this;
  }

  transformRect(rect) {
    let { a, b, c, d, e, f } = this;

    let ol = rect.x;
    let ob = rect.y;
    let or = ol + rect.width;
    let ot = ob + rect.height;

    let lbx = a * ol + c * ob + e;
    let lby = b * ol + d * ob + f;
    let rbx = a * or + c * ob + e;
    let rby = b * or + d * ob + f;
    let ltx = a * ol + c * ot + e;
    let lty = b * ol + d * ot + f;
    let rtx = a * or + c * ot + e;
    let rty = b * or + d * ot + f;

    let minX = Math.min(lbx, rbx, ltx, rtx);
    let maxX = Math.max(lbx, rbx, ltx, rtx);
    let minY = Math.min(lby, rby, lty, rty);
    let maxY = Math.max(lby, rby, lty, rty);

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

}
