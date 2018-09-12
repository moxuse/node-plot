const fill = require('flood-fill')
const zero = require('zeros')

const { Limit, limit } = require('./limit.js');


const liner = (x1, y1, x2, y2) => {
  let raster  = [];
  if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
    if (x1 > x2) {
      x2 = [x1, x1 = x2][0];
      y2 = [y1, y1 = y2][0];
    }
    if (y1 < y2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      let d = 2 * dy - dx;
      raster.push({x: x1, y: y1});
      let y = y1;
      for(let x = x1 + 1; x <= x2; x++) {
        if (d >= 0) {
          y++;
          d += 2 * (dy - dx);
        } else {
          d += 2 * dy;
        }
        raster.push({x: x, y: y});
      }
    } else {
      const dx = x2 - x1;
      const dy = -(y2 - y1);
      let d = 2 * dy - dx;
      raster.push({x: x1, y: y1});
      let y = y1;
      for(let x = x1 + 1; x <= x2; x++) {
        if (d >= 0) {
            y--;
            d += 2 * (dy - dx);
        } else {
            d += 2 * dy;
        }
        raster.push({x: x, y: y});
      }
    }
  } else {
    if (y1 > y2) {
      y2 = [y1, y1 = y2][0];
      x2 = [x1, x1 = x2][0];
    }
    if (x1 < x2) {
      const dy = y2 - y1;
      const dx = x2 - x1;
      let d = 2 * dx - dy;
      raster.push({x: x1, y: y1});
      let x = x1;
      for(let y = y1 + 1; y <= y2; y++) {
        if (d >= 0) {
            x++;
            d += 2 * (dx - dy);
        } else {
            d += 2 * dx;
        }
        raster.push({x: x, y: y});
      }
    } else {
      const dy = y2 - y1;
      const dx = -(x2 - x1);
      let d = 2 * dx - dy;
      raster.push({x: x1, y: y1});
      let x = x1;
      for(let y = y1 + 1; y <= y2; y++) {
        if (d >= 0) {
          x--;
          d += 2 * (dx - dy);
        } else {
          d += 2 * dx;
        }
        raster.push({x: x, y: y});
      }
    }
  }
  return raster;
}

const raserLine = (trail) => {
  const rounded = rounder(trail);
  return rounded.map((p, i) => {
    if (i >= 1) {
      return liner(p[0], p[1], rounded[i - 1][0], rounded[i - 1][1]);
    }
  })
}

const rounder = (tr) => {
  return tr.map((l) => {
    return [Math.round(l[0]), Math.round(l[1])];
  })
}

const floodFill = () => {
  
}

module.exports = { liner, raserLine, floodFill };