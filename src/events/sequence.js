const events = require('events')

const represent = require('./represent.js')
const home = require('../home.js')
const getActive = require('../getActive.js')
const Detector  =  require('../detector.js')
const { Limit } = require('../limit.js')
console.log(Detector)
const space_threshold = 10;

const randomWalk = async (current) => {
  const detector = new Detector();
  const next_ = walkGenerator(current, detector)
}

const walkGenerator = async (current, detector) => {
  let next = nextPos(current);
  next = Limit(next);
  
  console.log('next cycle:', current, next)
  next = await waitForDistance(current, next);
  
  await waitSec(1);
  if (avalableSpace(detector)) {
    // await checkActive(); // for debubg 一時的に
    console.log(represent.dry());
  }
  
  await waitSec(1);
  walkGenerator(next, detector);
}

const checkActive = () => {
  return new Promise(async () => {
    if (await getActive()) {
      await waitSec(1)
      await checkActive()
    }  else {
      resolve()
    }
  })
}

const nextPos = (current) => {
  const maxLength = 40;
  const d_ = Limit([Math.random() * maxLength + current[0], Math.random() * maxLength + current[1]])
  const seedX = Math.floor(Math.random() * 2)
  const factX = seedX == 1 ? -1 : 1
  const seedY = Math.floor(Math.random() * 2)
  const factY = seedY == 1 ? -1 : 1
  return [d_[0] * factX, d_[1] * factY];
}

 const waitForDistance = async (from, to) => {
  return new Promise((resolve) => {
    const fact = 100;
    const time = Math.sqrt( Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2) ) * fact
    setTimeout(() =>  {
      resolve(to)
    },time)
  })
}

const waitSec = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() =>  {
      resolve()
    }, sec * 1000)
  })
}

const avalableSpace = (detector) => {
  return (detector.numPoints() < space_threshold);
}

module.exports = { randomWalk }
