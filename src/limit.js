// const limit = [200, 170]; //short
const limit = [200, 650]; //long
const Limit = (tr, scale) => {
  let tr_ = tr;
  if (tr[0] < 0) {
    tr_[0] = 0;
    console.log('x limit zero.')
  }
  if (tr[1] < 0) {
    tr_[1] = 0;
    console.log('y limit zero.')
  }
  if (tr[0] > limit[0] * scale) {
    tr_[0] = limit[0] * scale;
    console.log('x limit max.')
  }
  if (tr[1] > limit[1] * scale) {
    tr_[1] = limit[1] * scale;
    console.log('y limit max.')
  }
  return tr_;
}

module.exports = { Limit, limit };
