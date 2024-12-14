export function part1(input) {
  return solve(input, 0, 100)
}

export function part2(input) {
  return solve(input, 10_000_000_000_000, null)
}

function solve(input, prizeMod, limit) {
  return parse(input)
    .map(({ a, b, prize }) => ({ a, b, prize: { x: prize.x + prizeMod, y: prize.y + prizeMod } }))
    .reduce((t, { prize, a, b }) => {
      const c = prize.y - b.y / b.x * prize.x
      const x = c / (a.y / a.x - b.y / b.x)
      const an = x / a.x
      const bn = (prize.x - x) / b.x
      return t + ((isValid(an, limit) && isValid(bn, limit)) ? an * 3 + bn : 0)
    }, 0)
}

function isValid(n, limit) {
  return n >= 0 && Math.abs(n - Math.round(n)) < 0.001 && (!limit || Math.round(n) <= limit)
}

function parse(input) {
  return input.join('\n').split('\n\n')
    .map(m => m.split('\n')
      .map(d => [d.split(': ')[0].replace('Button ', ''), ...d.split(': ')[1].split(', ')])
      .map(([label, xOp, yOp]) => ({ label, x: xOp.substring(2), y: yOp.substring(2) }))
      .reduce((machine, { label, x, y }) => {
        machine[label.toLowerCase()] = { x: Number(x), y: Number(y) }
        return machine
      }, {}))
}
