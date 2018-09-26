const { getActive } = require('./stream.js');

var JobActive = function () {
  return new Promise((resolve) => {
    getActive().then((r) => {
      // console.log('then: ',r.data)
      resolve(r.data)
    })
  })
}

module.exports = JobActive;
