const { Limit, limit } = require('./limit.js');
const fs = require('fs');
const window = require('svgdom');
const SVG = require('svg.js')(window);
const document = window.document;

const SVGStream = (st) => {
  
  const draw = SVG(document.documentElement).size(limit[0], limit[1]);
  st.forEach(tl => {
    const polyline = draw.polyline(tl).attr({
      'fill': 'none',
      'stroke-width': 1
    });
  });
  console.log('draw..', draw.svg());

  fs.writeFile(__dirname + '/../images/preview.svg', draw.svg(), 'utf-8',  (err) => {
    if (err) {
      console.log("エラーが発生しました。" + err)
      throw err
    } else {
      console.log("ファイルが正常に書き出しされました")
    }
  });

  draw.clear()
}

module.exports = { SVGStream }
