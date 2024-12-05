export function part1(input) {
  return solve(input, true)
}

export function part2(input) {
  return solve(input, false)
}

function solve(input, areCorrectPages) {
  const { rules, pages } = parse(input)
  const ruleMap = constructRuleMap(rules)
  return pages
    .map(page => [...page].sort((a, b) => ruleMap[a]?.has(b) ? -1 : 1))
    .filter((sorted, i) => (sorted.toString() === pages[i].toString()) === areCorrectPages)
    .reduce((acc, sorted) => acc + sorted[Math.floor(sorted.length / 2)], 0)
}

function constructRuleMap(rules) {
  return rules.reduce((ruleMap, [from, to]) => {
    ruleMap[from] = ruleMap[from] ? ruleMap[from].add(to) : new Set([to])
    return ruleMap
  }, {})
}

function parse(input) {
  const divider = input.indexOf('')
  return {
    rules: input.slice(0, divider).map(r => r.split('|').map(Number)),
    pages: input.slice(divider + 1).map(p => p.split(',').map(Number)),
  }
}
