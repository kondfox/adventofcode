export function part1(input) {
  return parse(input).reduce((acc, rotation) => {
    const inc = (acc.current + rotation) % 100
    const current = inc < 0 ? 100 + inc : inc
    return { current, zeros: acc.zeros + (current === 0 ? 1 : 0) }
  }, { current: 50, zeros: 0 }).zeros
}

export function part2(input) {
  return parse(input).reduce((acc, rotation) => {
    const inc = acc.current + (rotation % 100)
    const mod = inc % 100
    const current = mod < 0 ? 100 + mod : mod
    return {
      current,
      zeros: acc.zeros +
        Math.floor(Math.abs(rotation) / 100) +
        ((inc <= 0 || inc >= 100) && acc.current !== 0 ? 1 : 0)
    }
  }, { current: 50, zeros: 0 }).zeros
}

function parse(input) {
  return input
    .map(row => (row[0] === 'L' ? -1 : 1) * Number(row.slice(1)))
}
