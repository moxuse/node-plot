// const { createCanvas, loadImage } = require('canvas')
const PNGReader = require('png.js');
const fs = require('fs')
const ImageTracer = require('imagetracerjs');

trace = (srcPath, scale_) => { 
  return new Promise((resolve, reject) => {
    fs.readFile(srcPath, (err, bytes) => { 
      if(err){ console.log(err); reject (); throw err; }
      const reader = new PNGReader(bytes);
      
      reader.parse((err, png) => { // PNGReader callback
        if(err){ console.log(err);  reject (); throw err; }
        
        const imgd = { width:png.width, height:png.height, data:png.pixels };
        const options = { scale: scale_ }
        const traced = ImageTracer.imagedataToTracedata(
          imgd,
          options
        );
        const req = parseTraced(traced);
        resolve(removeFrameLine(req));
      })
    });
  })
}

parseTraced = (traced) => {
  const scale = 0.42
  let stroke_ = [];
  let max_ = [0, 0];
  traced.layers.forEach((d) => {      
    d.forEach((t) => {
      const box = t.boundingbox;
      let trail = [];
      t.segments.forEach((p) => {
        trail.push([p.x1 * scale, p.y1 * scale,]);
        trail.push([p.x2 * scale, p.y2 * scale,]);
        if (max_[0] < p.x1 * scale) {
          max_[0] = p.x1 * scale
        }
        if (max_[0] < p.x2 * scale) {
          max_[0] = p.x2 * scale
        }
        if (max_[1] < p.y1 * scale) {
          max_[1] = p.y1 * scale
        }
        if (max_[1] < p.y2 * scale) {
          max_[1] = p.y2 * scale
        }
      })
      trail.push([t.segments[t.segments.length - 1].x2 * scale, t.segments[t.segments.length - 1].y2 * scale,]);
      trail.push([t.segments[0].x1 * scale, t.segments[0] * scale,]);
      stroke_.push(trail);
    })
  })
  return { stroke: stroke_, max: max_ };
}

removeFrameLine = (st) => {

  return st.stroke.map((t) => {
    
    return t.filter((pt) => {
      console.log(pt)
      return (pt[0] > 3) && (pt[1] > 3) && (pt[0] < (st.max[0] - 3)) && (pt[1] < (st.max[1] - 3));
    })
    
    
  })
}

module.exports = { trace };

