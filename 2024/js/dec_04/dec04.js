export function part1(input) {
  const h = input.reduce((acc, row) => acc + horizontal(row), 0)
  const v = rotate(input).reduce((acc, row) => acc + horizontal(row), 0)
  const d = diagonal(input)
  return h + v + d
}

// M.S  S.S  M.M  S.M
// .A.  .A.  .A.  .A.
// M.S  M.M  S.S  S.M

export function part2(input) {
  let count = 0
  for (let rowI = 1; rowI < input.length - 1; rowI++) {
    for (let colI = 1; colI < input[rowI].length - 1; colI++) {
      if (input[rowI][colI] === 'A') {
        const main = mainDiagonal3(input, rowI, colI)
        const secondary = secondaryDiagonal3(input, rowI, colI)
        if ((main === 'SAM' || main === 'MAS') && (secondary === 'SAM' || secondary === 'MAS')) {
          console.log(`[${rowI}, ${colI}]`)
          count++
        }
      }
    }
  }
  return count
}

function mainDiagonal3(input, rowI, colI) {
  return input[rowI - 1][colI - 1] + input[rowI][colI] + input[rowI + 1][colI + 1]
}

function secondaryDiagonal3(input, rowI, colI) {
  return input[rowI - 1][colI + 1] + input[rowI][colI] + input[rowI + 1][colI - 1]
}

function horizontal(input) {
  let count = 0
  for (let i = 0; i < input.length - 3; i++) {
    const word = input.slice(i, i + 4)
    if (word === 'XMAS' || word === 'SAMX') count++
  }
  return count
}

function diagonal(input) {
  let count = 0
  for (let rowI = 0; rowI < input.length; rowI++) {
    for (let colI = 0; colI < input[rowI].length; colI++) {
      if (rowI < input.length - 3 && colI < input[rowI].length - 3) {
        let mainDiagonal = ''
        for (let i = 0; i < 4; i++) {
          mainDiagonal += input[rowI + i][colI + i]
        }
        if (mainDiagonal === 'XMAS' || mainDiagonal === 'SAMX') count++
      }
      if (rowI < input.length - 3 && colI >= 3) {
        let secondaryDiagonal = ''
        for (let i = 0; i < 4; i++) {
          secondaryDiagonal += input[rowI + i][colI - i]
        }
        if (secondaryDiagonal === 'XMAS' || secondaryDiagonal === 'SAMX') count++
      }
    }
  }
  return count
}

function rotate(input) {
  const rotated = new Array(input[0].length).fill(null).map(() => new Array(input.length).fill(null))
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      rotated[j][i] = input[i][j]
    }
  }
  return rotated.map(row => row.join(''))
}
