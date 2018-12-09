const Simplex = require('perlin-simplex')
const limit = require('./limit.js');

const snoise = new Simplex();

const simpNoiseVec3 = (p, r) => {    
    const s   = snoise.noise3d(p[0], p[1], p[2]);
    const s1  = snoise.noise3d(
        p[1] + 0.12 + r.x,
        p[2] + 0.37 + r.y,
        p[0] - 0.023 + r.z
    );
    const s2  = snoise.noise3d(
        p[2] + (0.17),
        p[0] + (0.345),
        p[1] - (0.0123)
    );
    return { x: s , y: s1 , z: s2 };
  }

  const normalize = ({ x, y, z }) => {
    const length = Math.sqrt( x * x + y * y + z * z );
    return { x: x * (1 / length), y: y * (1 / length), z: z * (1 / length) };
  }

const CNoise = (p, r) => {
    const e = 0.00009765625;
    const e2 = 2.0 * e;

    const dx = { x:e   , y:0.0 , z:0.0 };
    const dy = { x:0.0 , y:e   , z:0.0 };
    const dz = { x:0.0 , y:0.0 , z:e   };
    
    const p_x0 = simpNoiseVec3([ p.x - dx.x, p.y - dx.y, p.z - dx.z ], r);
    const p_x1 = simpNoiseVec3([ p.x + dx.x, p.y + dx.y, p.z + dx.z ], r);
    const p_y0 = simpNoiseVec3([ p.x - dy.x, p.y - dy.y, p.z - dy.z ], r);
    const p_y1 = simpNoiseVec3([ p.x + dy.x, p.y + dy.y, p.z + dy.z ], r);
    const p_z0 = simpNoiseVec3([ p.x - dz.x, p.y - dz.y, p.z - dz.z ], r);
    const p_z1 = simpNoiseVec3([ p.x + dz.x, p.y + dz.y, p.z + dz.z ], r);
    
    const x_ = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
    const y_ = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
    const z_ = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

	return [x_ / e2 , y_ / e2, z_ / e2];
}

const Noise = (t, time, scale) => {
    let pp = t;
    const r = { x: Math.random()* 0.01, y: Math.random()* 0.03, z: Math.random()* 0.12}
    for (let i = 0; i < time; i++) {
        const v_ = CNoise({ x: pp[0] / scale / 1.5, y: pp[1] / scale / 1.5, z: 1.0 / scale / 1.5}, r);
        pp = [pp[0] + v_[0] * 0.25,  pp[1] + v_[1] * 0.25]
    }
    return pp;
}

module.exports = { Noise };
