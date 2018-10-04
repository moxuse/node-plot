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

const initiatePresent = async (offset) => {
  const scale = Math.random() * 0.01 + 0.05
  return await tracer.trace(getMotif(), scale)
}

const test = async () => {
  const d = await initiatePresent([0,0])
  return d
}

const basicRect = (offset) => {
  return new Promise((resolve) => {
    const fillType = g.stripe()
    const st = m.sin(f.rect(fillType, 0, 0, 70, 70) ,[Math.random()* 0.5,  Math.random()* 0.9])
    resolve(st);
  })
}

const basicCircle = (offset) => {
  return new Promise((resolve) => {
    const fillType = g.stripe()
    const st = m.sin(f.circle(fillType, 0, 0, 70) ,[Math.random()* 0.5,  Math.random()* 0.9])
    resolve(st);
  })
}

const fill = (st, pt) => {
  return filler.seed(st, pt)
}

const getPointForFiller = (st) => {
  
}

module.exports = { test, initiatePresent, basicRect, basicCircle, fill }
