const fs = require('fs');
const m = require('../m.js')
const g = require('../g.js')
const f = require('../f.js')
const filler = require('../filler.js')
const tracer = require('../tracer.js')
const { scale, rotate, translate, compose, applyToPoint } = require('transformation-matrix')

const getMotif = () => {
  const path = process.cwd();
  const filenames = fs.readdirSync(path + '/motif');
  const index = Math.floor(Math.random() * filenames.length)
  return path + '/motif/' + filenames[index];
}

const initiatePresent = (offset) => {
  return new Promise(resolve => {
    const scale = Math.random() * 0.01 + 0.05 
    const trace_ = tracer.trace(getMotif(), scale).then(st => {
      resolve(st);
    })
  })
}

const initiatePresentFill = () => {
  return new Promise(resolve => {
    initiatePresent([0,0]).then((st) => {
      const pt = getPointForFiller(st);
      resolve(seedFiller(st, pt))
    })
  })
}

const basicRect = (size, offset) => { // not work
  return new Promise(resolve => {
    const fillType = [g.stripe()]
    const st = m.translate(m.sin(f.rect(fillType, 0, 0, size, size) ,[0,  0.125]), [offset[0], offset[1]])
    resolve(st);
  })
}

const basicCircle = (size, offset) => {
  return new Promise(resolve => {
    const fillType = [g.stripe()]
    const st = m.translate(m.sin(f.circle(fillType, 0, 0, size) ,[Math.random()* 0.5,  Math.random()* 0.9]), [offset[0], offset[1]])
    resolve(st);
  })
}

const seedFiller = (st, pt) => {
  // console.log('pt: ', st.length,pt)
  return filler.seed(st, pt)
}

const getPointForFiller = (st) => {
  let maxLen = 0;
  let maxId = 0;
  st.map((tr, i) => {
    const cur = tr.length
    if(cur > maxLen) {
      maxLen = cur;
      maxId = i;
    }
  })
  const trail = st[maxId];
  return centralPointForTrail(trail)  
}

const centralPointForTrail = (tr) => {
  const mid = Math.floor(tr.length / 2);
  const x = (tr[0][0] + tr[mid][0]) * 0.5
  const y = (tr[0][1] + tr[mid][1]) * 0.5
  return [Math.round(x), Math.round(y)];
}

module.exports = { initiatePresentFill, initiatePresent, basicRect, basicCircle, fill }
