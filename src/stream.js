const axios = require('axios');
const utf8 = require('utf8');
const FormData = require('form-data');
const { Limit, limit } = require('./limit.js');

const baseURL_ = 'http://127.0.0.1:4444';
const premble = [
  "G90", 
  "\nM80",
  "\nG0F1500",
  "\nG1F500",
  "\nS77"
];

const postScript = [
  "\nM81",
  "\nS0"
];

const makeGCode = (tp, i) => {
  let v = 'G1';
  if (i == 0) {
    v = 'G0';
  }
  v += 'X' + tp[0];
  v += 'Y' + tp[1];
  return v;
}

const homeJob = () => {
  return '~\nG30'
}

const makePostData = (data) => {
  let p = '';
  p += premble.reduce((p,c,i) => {return p + c}, '');
  data.forEach((st, i) => {
    st.forEach((tr, j) => {
      const tr_ = Limit(tr, 1);
      const code = makeGCode(tr_, j);
      p += '\n';
      p += code;
    });
  })
  p += postScript.reduce((p,c,i) => {return p + c}, '');
  return p;
}

const bufferFromString = (str) => {
  const buffer = Buffer.alloc(str.length)
  buffer.write(str)
  return buffer
}

const Stream = function(data) {
  const d_ = makePostData(data);
  return post(d_)
}

const Homing = () => {
  return post(homeJob())
}

const post = (d_) => {
  const params = new URLSearchParams();
  params.append('job_data' , d_);
  // console.log(params);
  const rq = axios.create({
    baseURL: baseURL_,
    timeout: 1000
  });
  return rq.post('/gcode', params);
}

const getActive = () => {
  const rq = axios.create({
    baseURL: baseURL_,
    timeout: 1000
  });
  return rq.get('/job_active');
}

module.exports = { Stream, Homing, getActive };

