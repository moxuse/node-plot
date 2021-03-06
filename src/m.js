const { Noise } = require('./curlnoise.js');

const translate = (stroke, [x, y]) => {
  return stroke.map((tr) => {
    return tr.map((t) => {
      return[t[0] + x, t[1] + y];
    })
  })
}

const scale = (stroke, [x, y]) => {
  return stroke.map((tr) => {
    return tr.map((t) => {
      return[t[0] * x, t[1] * y];
    })
  })
}

const sin = (stroke, [x, y]) => {
  return stroke.map((tr) => {
    return tr.map((t, i) => {
      const v = [Math.sin(i * x) + t[0], Math.sin(i * y) + t[1]];
      return v;
    })
  })
}

const cos = (stroke, [x, y]) => {
  return stroke.map((tr) => {
    return tr.map((t, i) => {
      const v = [Math.cos(i * x) + t[0], Math.cos(i * y) + t[1]];
      return v;
    })
  })
}

const curlNoise = (stroke, time, scale) => {
  return stroke.map((tr) => {
    return tr.map((t, i) => {
      return Noise(t, time || 1, scale || 1);
    })
  })
}

module.exports = { sin, cos, translate, scale, curlNoise };

