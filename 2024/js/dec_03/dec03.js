export function part1(input) {
  return parse(input)
    .match(/mul\(\d{1,3},\d{1,3}\)/g)
    .reduce((acc, mul) => acc + mul.match(/\d{1,3}/g).map(Number).reduce((a, b) => a * b), 0)
}

export function part2(input) {
  return part1(`do()${parse(input)}don't()`.match(/do\(\).*?don't\(\)/g))
}

function parse(input) {
  return input.flat().join('')
}
