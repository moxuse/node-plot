const { getActive } = require('./stream.js');

var JobActive = function () {
  getActive().then((r) => {
    console.log('then: ',r.data)
  });
}

module.exports = JobActive;
