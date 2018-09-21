
const rect = (st, x, y, x1, y1) => {
  return st.map((tr) => {
    return tr.filter((t) => {
      return (
        t[0] >= x
        && t[0] <= x1
        && t[1] >= y 
        && t[1] <= y1
      )
    })
  })
}

const circle = (st, x, y, rad) => {
  return st.map((tr) => {
    return tr.filter((t) => {
      const dx = t[0] - x;
      const dy = t[1] - y;
      return rad > Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    }) 
  })
}

module.exports = { circle, rect }
