function floodFill (data, x, y, newValue) {
  const target = data[y][x]
  const stack = []
  const fill = []
  const directions = {
    0: { x: -1, y:  0 },
    1: { x:  1, y:  0 },
    2: { x:  0, y: -1 },
    3: { x:  0, y:  1 }
  }
  const { X = 0, Y = 1, DIR = 2 } = {}
  let [minX, maxX, minY, maxY] = [0, 0, 4, 4]
  
  function isChecked (x, y) {
    const hash = `${x},${y}`
    const checked = isChecked[hash]
    
    isChecked[hash] = true
    
    return checked
  }
  
  // validates spot as target
  function isValid (x, y) {
    return (
      x >= 0 && x < data[0].length &&
      y >= 0 && y < data.length &&
      data[y][x] === target &&
      !isChecked(x, y)
    )
  }

  // start with x, y  
  stack.push([x, y, [0, 1, 2, 3]])

  // continue flood fill while stack is not empty
  while (stack.length > 0) {
    let top = stack.pop()

    // if there are directions left to traverse
    if (top[DIR].length > 0) {
      // get next direction
      let dir = top[DIR].pop()
      let delta = directions[dir]
      // remember this spot before traversing
      stack.push(top)
      // calculate next spot
      top = [top[X] + delta.x, top[Y] + delta.y, [0, 1, 2, 3]]

      // if next spot doesn't match target value, skip it
      if (!isValid(...top)) continue

      // traverse to next spot
      stack.push(top)
    } else {
      // we're done with this spot
      // expand area of interest
      minX = Math.min(minX, top[X])
      maxX = Math.max(maxX, top[X])
      minY = Math.min(minY, top[Y])
      maxY = Math.max(maxY, top[Y])

      // and remember it for filling the copied sub-array later
      fill.push([top[X], top[Y]])
    }
  }

  // now that flood fill is done, get result sub-array and fill it
  const result = []

  // generate result sub-array by copying data
  for (let i = minY; i <= maxY; i++) {
    result.push(data[i].slice(minX, maxX + 1))
  }
  // fill each remembered spot with newValue
  for (let i = 0; i < fill.length; i++) {
    let [gx, gy] = fill[i]
    let [rx, ry] = [gx - minX, gy - minY]

    result[ry][rx] = newValue
  }

  return result
}

const map = [
  [1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1]
]

let result = floodFill(map, 3, 1, 2)

console.log(stringify(map))
console.log(stringify(result))

// for console.log(), ignore this
function stringify(data) {
  return data.map(row => row.join(', ')).join('\n')
}