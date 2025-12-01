const parse = input => input.map(row => (row[0] === 'L' ? -1 : 1) * Number(row.slice(1)))

const solve = (input, scoreFn) =>
  parse(input).reduce(({ current, zeros }, rotation) => {
    const next = (((current + rotation) % 100) + 100) % 100
    return {
      current: next,
      zeros: zeros + scoreFn(current, rotation, next)
    }
  }, { current: 50, zeros: 0 }).zeros

export const part1 = input => solve(input, (_c, _r, next) => next === 0 ? 1 : 0)

export const part2 = input =>
  solve(input, (current, rotation) => {
    const partial = current + (rotation % 100)
    return Math.floor(Math.abs(rotation) / 100) +
      ((partial <= 0 || partial >= 100) && current !== 0 ? 1 : 0)
  })
