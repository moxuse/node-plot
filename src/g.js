const { Limit, limit } = require('./limit.js');

line = (x) => {
  let v = Array.apply(null, new Array(x)).map((p, i) => {
    return [0.001, i];
  });
  return v;
}

rand = (x) => {
  let v = Array.apply(null, new Array(x)).map((p, i) => {
    return [Math.random(), Math.random()];
  });
  return v;
}

stripe = () => {
  let all = [];
  let i = 0;
  let j = 0;
  Array.apply(null, new Array(limit[1])).forEach((y) => {
    Array.apply(null, new Array(limit[0])).forEach((x) => {
      if (i%2 == 0) {
        all.push([j, i]);
      } else {
        all.push([limit[0] - (j), i]);
      }
      j++;
      if (j >= limit[0]) {j = 0};
    })
    if (i%2 == 0) {
      all.push([limit[0], i]);
    } else {
      all.push([0, i]);
    }
    i++;
  })
  return all;
}

module.exports = { line, rand, stripe };