// const { createCanvas, loadImage } = require('canvas')
const PNGReader = require('png.js');
const fs = require('fs')
const ImageTracer = require('imagetracerjs');

trace = (srcPath, w_, h_) => { 
  return new Promise((resolve, reject) => {
    fs.readFile(srcPath, (err, bytes) => { 
      if(err){ console.log(err); reject (); throw err; }
      const reader = new PNGReader(bytes);
      
      reader.parse(( err, png ) => { // PNGReader callback
        if(err){ console.log(err);  reject (); throw err; }
        
        const imgd = { width:png.width, height:png.height, data:png.pixels };
        const options = { scale: 0.08 }
        const traced = ImageTracer.imagedataToTracedata(
          imgd,
          options
        );
        const req = parseTraced(traced);
        resolve(req);
      })
    });
  })
}

parseTraced = (traced) => {
  const scale = 0.42
  let stroke = [];
  traced.layers.forEach((d) => {      
    d.forEach((t) => {
      const box = t.boundingbox;
      let trail = [];
      t.segments.forEach((p) => {
        // console.log(p)
        trail.push([p.x1 * scale, p.y1 * scale,]);
        trail.push([p.x2 * scale, p.y2 * scale,]);
      })
      trail.push([t.segments[t.segments.length - 1].x2 * scale, t.segments[t.segments.length - 1].y2 * scale,]);
      trail.push([t.segments[0].x1 * scale, t.segments[0] * scale,]);
      stroke.push(trail);
    })
  })
  return stroke;
}

module.exports = { trace };
