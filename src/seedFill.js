equalsColors = (a) => {
  return a === 0;
}

beFilled = (zeros_, x, y) => {
  return zeros_.get(x, y);
}

scanLine = (zeros_, xLeft, xRight, y, yParent) => {
  const width = zeros_.shape[0];
  let new_stack = [];

  while (xLeft <= xRight) {
    // 非領域色を飛ばす
    for (; xLeft < xRight; xLeft++) {
      if (equalsColors(beFilled(zeros_, xLeft, y))) {
        break;       
      }
    }

    // 既に塗ってあったら飛ばす
    if (!equalsColors(beFilled(zeros_, xLeft, y))) {
      break;
    }

    let data = {};
    data.xLeft = xLeft;

    // 領域色を飛ばす
    for (; xLeft <= xRight ; xLeft++) {
      if (!equalsColors(beFilled(zeros_, xLeft, y))) {
        break;
      }
    }

    data.xRight = xLeft - 1;
    data.y = y;
    data.yParent = yParent;

    new_stack.push(data);
  }
  return new_stack;
};

fill = (zeros_, x, y) => {
  // const stroke = [];
  const strokeAll = []
  const width = zeros_.shape[0];
  const height = zeros_.shape[1];
  let count = 0;
  let segCount = 0;

  let stack = [];
  let trail = [];
  let seed = {};
  seed.xLeft = seed.xRight  = x;
  seed.y     = seed.yParent = y;
  let prevY = seed.y;
  stack.push(seed);
  // console.log(stack)
  let currentUp, prevUp = 'a'
  let currentDown, prevDown = 'a'

  do {
    seed = stack.pop();

    let xLeft = seed.xLeft;
    let xRight = seed.xRight;
    const y = seed.y;
    const yParent = seed.yParent;

    const nextLeft  = xLeft  - 1;
    const nextRight = xRight + 1;
    // seed
    
    if (!equalsColors(beFilled(zeros_, xLeft, y))) {
      continue;
    }
    
    // search right
    while (xRight < width) {
      if (!equalsColors(beFilled(zeros_, xRight + 1, y))) {
        break;
      }
      xRight++;
    }

    // search left
    while (xLeft > 0) {
      if (!equalsColors(beFilled(zeros_, xLeft - 1, y))) {
        break;
      }
      xLeft--;
    }

    // draw left to right
    // console.log('paint..R',xRight, y);

    // search up
    if (y - 1 >= 0) {
      if (y - 1 === yParent) {
        stack = stack.concat(scanLine(zeros_,  xLeft, nextLeft,  y - 1, y));        
        stack = stack.concat(scanLine(zeros_, nextRight, xRight, y - 1, y));
        currentUp = 'a';
        // console.log('search up a')
      } else {
        stack = stack.concat(scanLine(zeros_, xLeft, xRight, y - 1, y));
        currentUp = 'b';
        // console.log('search up b')
      }
    }

    // search down
    if (y + 1 < height) {
      if (y + 1 === yParent) {
        stack = stack.concat(scanLine(zeros_, xLeft, nextLeft,  y + 1, y));
        stack = stack.concat(scanLine(zeros_, nextRight, xRight, y + 1, y));
        currentDown = 'a';
        // console.log('search down a')
      } else {
        stack = stack.concat(scanLine(zeros_, xLeft, xRight, y + 1, y));
        // console.log('search down b')
        currentDown = 'b';
      }
    }
    
    if (currentDown != prevDown || currentUp != prevUp || Math.abs(prevY - y) > 1) {
      strokeAll.push(trail)
      trail = []
      console.log('new trail')
    }
    
    prevDown = currentDown;
    prevUp = currentUp;
    
    if (count%2 === 0) {
      for (let j = 0; j <= (xRight - xLeft); ++j) {
        trail.push([j + xLeft, y]);
      }
    } else {
      for (let j = 0; j <= (xRight - xLeft); ++j) {
        trail.push([xRight - j, y]);
      }
    }

    for (i = xLeft; i <= xRight; ++i) {
      zeros_.set(i, y, 1);
    }

    prevY = y;

    count++;
  } while (stack.length > 0);
  
  strokeAll.push(trail) // last section

  return strokeAll;
};

module.exports = { scanLine, fill };

