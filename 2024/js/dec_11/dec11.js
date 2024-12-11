export function part1(input) {
  return solve(input, 25)
}

export function part2(input) {
  return solve(input, 75)
}

function solve(input, limit) {
  const memo = parse(input).reduce((mem, n) => {
    mem[n] = node(n, 0)
    return mem
  }, {})

  for (let i = 1; i <= limit; i++) {
    Object.values(memo)
      .filter(({ visited }) => visited[i - 1])
      .forEach(({ next, visited }) => {
        next.forEach(n => visit(n, i, visited[i - 1], memo))
      })
  }

  return Object.values(memo)
    .filter(node => node.visited[limit])
    .reduce((acc, node) => acc + node.visited[limit], 0)
}

function next(n) {
  const rules = [
    n => n === '0',
    n => n.length % 2 === 0,
    n => true,
  ]
  const actions = [
    n => ['1'],
    n => [n.substring(0, n.length / 2), n.substring(n.length / 2)].map(Number).map(n => n.toString()),
    n => [(Number(n) * 2024).toString()],
  ]
  return actions[rules.findIndex(rule => rule(n))](n)
}

function node(n, i, inc = 1) {
  return { n, next: next(n), visited: { [i]: inc } }
}

function visit(n, i, inc, memo) {
  if (!memo[n]) {
    memo[n] = node(n, i, inc)
  } else {
    if (memo[n].visited[i]) {
      memo[n].visited[i] += inc
    } else {
      memo[n].visited[i] = inc
    }
  }
}

function parse(input) {
  return input[0].split(' ')
}
