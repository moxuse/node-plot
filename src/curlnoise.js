const Simplex = require('perlin-simplex')
const limit = require('./limit.js');

const Pnoise = (x,y) => {
    return perlin.generatePerlinNoise(x, y);
}
// const Piter = Pnoise(limit.limit[0], limit.limit[1]);

// const SamplePotential = (pos) => {
//     return Piter[Math.round(pos[1]) * limit.limit[0] + Math.round(pos[0])];
// }

// const PProcess = (p, scale) => {
//     const e = 0.09765625;
//     const pp = Pnoise(p);
//     return [(p[0] + pp) * e, (p[1] + p) * e];
// }


const computeCurl = (sinplex, x, y) => {
    var eps = 0.0098;
	var n1 = sinplex.noise(x, y + eps); 
	var n2 = sinplex.noise(x, y - eps); 
	var a = (n1 - n2)/(2 * eps);

	var n1 = sinplex.noise(x + eps, y);
	var n2 = sinplex.noise(x - eps, y); 
	var b = (n1 - n2)/(2 * eps);
    
	return [a / 100, -b / 100];
}

const Noise = (p, time, scale) => {
    const sinplex = new Simplex()
    let pp = p;
    for(let i = 0; i< time; i++) {
        const pl = computeCurl(sinplex, pp[0] / scale, pp[1] / scale);
        pp[0] = pp[0] + pl[0];
        pp[1] = pp[1] + pl[1];
    }
    return pp;
}

module.exports = { Noise };
