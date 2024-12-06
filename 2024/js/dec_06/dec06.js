export function part1(input) {
  const { start, obstacles, fieldSize } = parse(input)
  return visit(start, obstacles, fieldSize)
}

export function part2(input) {
  const { start, obstacles, fieldSize, emptyFields } = parse(input)
  return emptyFields
    .filter(pos => visit(start, new Set(obstacles).add(pos.toString()), fieldSize) === null)
    .length
}

function visit(start, obstacles, fieldSize) {
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  let dir = 0
  let current = start
  const visitedFrom = {}
  while (validPos(current, fieldSize)) {
    if (visitedFrom[current.toString()] && visitedFrom[current.toString()].includes(dir)) return null // infinite loop
    visitedFrom[current.toString()] = visitedFrom[current.toString()] ? [...visitedFrom[current.toString()], dir] : [dir]
    let next = move(current, dirs[dir])
    while (obstacles.has(next.toString())) {
      dir = (dir + 1) % 4
      next = move(current, dirs[dir])
    }
    current = next
  }
  return Object.keys(visitedFrom).length
}

function validPos(pos, fieldSize) {
  return pos[0] >= 0 && pos[0] < fieldSize.height && pos[1] >= 0 && pos[1] < fieldSize.width
}

function move(pos, dir) {
  return [pos[0] + dir[0], pos[1] + dir[1]]
}

function parse(input) {
  return input.reduce((field, line, i) => {
    line.split('').forEach((cell, j) => {
      if (cell === '.') {
        field.emptyFields.push([i, j])
        return
      } else if (cell === '#') {
        field.obstacles.add(`${i},${j}`)
      } else {
        field.start = [i, j]
      }
    })
    return field
  }, {
    start: undefined,
    obstacles: new Set(),
    emptyFields: [],
    fieldSize: { width: input[0].length, height: input.length }
  });
}
