export function part1(input) {
  return horizontal(input) + horizontal(rotate(input)) + diagonal(input)
}

function horizontal(input) {
  return input.reduce((acc, row) => acc + [...row.matchAll(/(?=(XMAS|SAMX))/g)].length, 0)
}

function diagonal(input) {
  return input.reduce((count, row, rowI) => {
    return count + [...row].reduce((rowCount, _, colI) => {
      return rowCount + checkDiagonal(input, rowI, colI, 1) + checkDiagonal(input, rowI, colI, -1)
    }, 0)
  }, 0)
}

function checkDiagonal(input, rowI, colI, dir) {
  return ['XMAS', 'SAMX']
    .includes(Array.from({ length: 4 },(_, i) => input[rowI + i]?.[colI + i * dir]).join('')) ? 1 : 0
};

function rotate(input) {
  return Array.from({ length: input[0].length },
    (_, i) => Array.from({ length: input.length },
      (_, j) => input[j][i]).join(''))
}

export function part2(input) {
  return input.reduce((count, row, rowI) => {
    return count + [...row].reduce((rowCount, s, colI) => {
      return s === 'A' && checkDiagonal2(input, rowI, colI, 1) && checkDiagonal2(input, rowI, colI, -1)
        ? rowCount + 1
        : rowCount
    }, 0)
  }, 0)
}

function checkDiagonal2(input, rowI, colI, dir) {
  return ['SAM', 'MAS']
    .includes(input[rowI - 1]?.[colI - dir] + input[rowI]?.[colI] + input[rowI + 1]?.[colI + dir])
}
