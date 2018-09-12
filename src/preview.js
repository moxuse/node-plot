
const fs = require('fs');
const util = require('util');
const Canvas = require('canvas')
  , Image = Canvas.Image

const { Limit, limit } = require('./limit.js');
const scale = 10;

Preview = (nodes) => {
  const canvas = new Canvas(2000, 1700);
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'agb(0,0,0)';
  nodes.forEach((st, i) => {
    // ctx.beginPath();
    st.forEach((tr, j) => {
      const tr_ = Limit(tr, scale);
      if (j === 0) {
        ctx.moveTo(tr_[0] * scale,tr_[1] * scale);
      } else {
        ctx.lineTo(tr_[0] * scale,tr_[1] * scale);
      }
      console.log(tr,i ,j)
    });
    // ctx.closePath();
  })
  ctx.stroke();

  const img = canvas.toDataURL();
  const data = img.replace(/^data:image\/\w+;base64,/, "");
  const buf = new Buffer.from(data, 'base64');
  fs.writeFile(__dirname + '/../images/preview.png', buf, (err) => {
    if (err) {
      console.log("エラーが発生しました。" + err)
      throw err
    } else {
      console.log("ファイルが正常に書き出しされました")
    }
  });
  
}

module.exports = Preview;
