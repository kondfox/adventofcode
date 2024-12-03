export function part1(input) {
  return parse(input)
    .match(/mul\(\d{1,3},\d{1,3}\)/g)
    .map(mul => mul.match(/\d{1,3}/g).map(n => parseInt(n)))
    .map(([a, b]) => a * b)
    .reduce((acc, cur) => acc + cur, 0)
}

export function part2(input) {
  return part1(`do()${parse(input)}don't()`.match(/do\(\).*?don't\(\)/g))
}

function parse(input) {
  return input.flat().join('')
}
