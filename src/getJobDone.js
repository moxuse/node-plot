const { getActive } = require('./stream.js');

var JobActive = function () {
  return new Promise((resolve) => {
    getActive().then((r) => {
      resolve(r.data)
    });
  })
}

module.exports = JobActive;
