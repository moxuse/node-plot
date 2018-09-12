
translate = (stroke, [x, y]) => {
  return stroke.map((tr) => {
    return[tr[0] + x, tr[1] + y];
  })
}

scale = (stroke, [x, y]) => {
  return stroke.map((tr) => {
    return[tr[0] * x, tr[1] * y];
  })
}

sin = (stroke, [x, y]) => {
  let i = 0;
  return stroke.map((tr) => {
    const v = [Math.sin(i * x) + tr[0], Math.sin(i * y) + tr[1]];
    i++;
    return v;
  })
}

cos = (stroke, [x, y]) => {
  return stroke.map((tr) => {
    let i = 0;
    const v = [Math.cos(i * x) + tr[0], Math.cos(i * y) + tr[1]];
    i++;
    return v;
  })
}

module.exports = { sin, cos, translate, scale };
