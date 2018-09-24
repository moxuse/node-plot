const events = require('events')

const represent = require('./represent.js')
const home = require('../home.js')
const getActive = require('getActive.js')
const detector  =require('../detector.js')
const limit = require('../limit.js')

const space_threshold = 10;

const randomWalk = () => {
  const next_ = co(nextPos())
    .catch(function(err) {
      console.log('error on randomWalk: ', err.message);
    });
}

const walkGenerator = function*() {
  next = nextPos();
  // yield
}

const nextPos = (x,y) => {
  const maxLength = 40;
  return [Math.random() * maxLength + x, Math.random() * maxLength + y]
}

const avalableSpace = () => {
  return (detector.numPoints() < space_threshold)
}

module.exports = { randomWalk }
