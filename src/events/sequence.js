const events = require('events')
const g1 = require('../g1.js');
const p1 = require('../p1.js');
const represent = require('./represent.js')
const home = require('../home.js')
const getActive = require('../getActive.js')
const Detector  =  require('../detector.js')
const { Limit } = require('../limit.js')
const m = require('../m.js')
const f = require('../f.js')

const space_threshold = 100;
let step = 0;

const randomWalk = async (current, threshold) => {
  const detector = new Detector(threshold);
  const next_ = walkGenerator(current, detector)
}

const walkGenerator = async (current, detector) => {
  let next = nextPos(current);
  
  console.log('next cycle:', current, next)
  g1([[next]]);
  next = await waitForDistance(current, next);

  await waitSec(8);
  console.log(next, avalableSpace(detector))
  if (avalableSpace(detector)) {
    await checkActive();
    const st = await drawRepresents(next);
    console.log('do stroke!!', st);
    g1(st);
  }
  step++;
  if (step%12 == 0)  {
    home();
    await waitSec(25);
  }
  await waitSec(15);
  await checkActive();
  walkGenerator(next, detector);
}

const drawRepresents = async (offset) => {
  const seed = Math.round(Math.random() * 4)
  let skil;
  if (seed === 0) {
    await represent.initiatePresentFill()
      .then(t => {skil = m.translate(m.scale(f.circle(m.curlNoise(t, 8, 50), 50, 50, 60), [0.25, 0.25]), offset)})
  } else if (seed === 1) {
    await represent.initiatePresentFill()
      .then(t => {skil = m.translate(m.scale(f.circle(m.curlNoise(t, 14, 40), 50, 50, 60), [0.25, 0.25]), offset)})
  } else if (seed === 2) {
    await represent.initiatePresentFill()
      .then(t => {skil = m.translate(m.scale(f.circle(m.curlNoise(t, 0, 0), 50, 50, 60), [0.25, 0.25]), offset)})
  } else {
    await represent.initiatePresent([0,0])
      .then(t => {skil = m.translate(m.scale(t, [0.25, 0.25]), offset)})
  }
  return skil;
}

const checkActive = async () => {
  const b_ = await getActive();
  if ('True' === b_) {
    await waitSec(10)
    await checkActive()
  }
}

const nextPos = (current) => {
  const maxLengthX = 130;
  const maxLengthY = 550;
  const d_ = Limit([Math.random() * maxLengthX + current[0], Math.random() * maxLengthY + current[1]])
  const seedX = Math.floor(Math.random() * 2)
  const factX = seedX == 1 ? -1 : 1
  const seedY = Math.floor(Math.random() * 2)
  const factY = seedY == 1 ? -1 : 1
  let xx_ = d_[0] * factX;
  if (xx_ > 140) { xx_ = 140 }
  return Limit([xx_, d_[1] * factY], 1);
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
  return (detector.numPoints(true) < space_threshold);
}

module.exports = { randomWalk , checkActive }
