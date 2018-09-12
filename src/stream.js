const axios = require('axios');
const utf8 = require('utf8');
const FormData = require('form-data');
const { Limit, limit } = require('./limit.js');

const premble = [
  "G90", 
  "\nM80",
  "\nG0F5000",
  "\nG1F1200",
  "\nS77"
];

const postScript = [
  "\nM81",
  "\nS0"
];

const makeGCode = (tp, i) => {
  let v = 'G1';
  if (i == 0) {
    // v = 'G0';
  }
  v += 'X' + tp[0];
  v += 'Y' + tp[1];
  return v;
}

const makePostData = (data) => {
  let p = '';
  p += premble.reduce((p,c,i) => {return p + c}, '');
  data.forEach((st, i) => {
    st.forEach((tr) => {
      const tr_ = Limit(tr);
      const code = makeGCode(tr_, i);
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
  const params = new URLSearchParams();
  params.append('job_data' , d_);
  console.log(params);
  const rq = axios.create({
    baseURL: 'http://localhost:4444',
    timeout: 1000
  });
  return rq.post('/gcode', params);
}

module.exports = Stream;
