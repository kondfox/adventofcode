export function part1(input) {
  const rules = [
    n => n === '0',
    n => n.length % 2 === 0,
    n => true,
  ]
  const actions = [
    n => '1',
    n => [n.substring(0, n.length / 2), n.substring(n.length / 2)].map(Number).map(n => n.toString()),
    n => (Number(n) * 2024).toString(),
  ]
  let numbers = parse(input)
  for (let i = 0; i < 25; i++) {
    numbers = numbers.flatMap(n => actions[rules.findIndex(rule => rule(n))](n))
  }
  return numbers.length
}

export function part2(input) {

}

function parse(input) {
  return input[0].split(' ')
}
