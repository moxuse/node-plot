const zeros = require('zeros')

const { Limit, limit } = require('./limit.js');
const seedFill = require('./seedFill.js');

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
      raster.push([x1, y1]);
      let y = y1;
      for(let x = x1 + 1; x <= x2; x++) {
        if (d >= 0) {
          y++;
          d += 2 * (dy - dx);
        } else {
          d += 2 * dy;
        }
        raster.push([x, y]);
      }
    } else {
      const dx = x2 - x1;
      const dy = -(y2 - y1);
      let d = 2 * dy - dx;
      raster.push([x1, y1]);
      let y = y1;
      for(let x = x1 + 1; x <= x2; x++) {
        if (d >= 0) {
            y--;
            d += 2 * (dy - dx);
        } else {
            d += 2 * dy;
        }
        raster.push([x, y]);
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
      raster.push([x1, y1]);
      let x = x1;
      for(let y = y1 + 1; y <= y2; y++) {
        if (d >= 0) {
            x++;
            d += 2 * (dx - dy);
        } else {
            d += 2 * dx;
        }
        raster.push([x, y]);
      }
    } else {
      const dy = y2 - y1;
      const dx = -(x2 - x1);
      let d = 2 * dx - dy;
      raster.push([x1, y1]);
      let x = x1;
      for(let y = y1 + 1; y <= y2; y++) {
        if (d >= 0) {
          x--;
          d += 2 * (dx - dy);
        } else {
          d += 2 * dx;
        }
        raster.push([x, y]);
      }
    }
  }
  return raster;
}

const rasterLine = (stroke) => {
  let rasters = [];
  stroke.map((trail) => {
    const rounded_ = rounded(trail);
    for (let  i = 0; i < rounded_.length - 1; i++) {   
      liner(rounded_[i][0], rounded_[i][1], rounded_[i + 1][0], rounded_[i + 1][1]).map((l) =>{
        rasters.push(l);
      })
    }
  })
  return rasters;
}

const rounded = (tr) => {
  return tr.map((l) => {
    return [Math.round(l[0]), Math.round(l[1])];
  })
}

const rasterZeros = (zeros_, points) => {
  points.forEach((p) => {
    zeros_.set(p[0], p[1], 1);
  })
  return zeros_;
}

const seed = (stroke, pt) => {
  let plane = zeros([limit[0], limit[1]]);
  const f = rasterLine(stroke);
  rasterZeros(plane, f);
  return stroke.concat(seedFill.fill(plane, pt[0], pt[1]));
}

module.exports = { liner, rasterLine, seed, rounded,  seedFill };

