export function part1(input) {
  const { rules, pages } = parse(input)
  return pages
    .filter(page => areCorrectPages(page, constructRuleMap(rules)))
    .map(correct => correct[Math.floor(correct.length / 2)])
    .reduce((acc, n) => acc + n, 0)
}

export function part2(input) {
  const { rules, pages } = parse(input)
  const ruleMap = constructRuleMap(rules)
  return pages
    .filter(page => !areCorrectPages(page, ruleMap))
    .map(incorrect => fix(incorrect, ruleMap))
    .map(correct => correct[Math.floor(correct.length / 2)])
    .reduce((acc, n) => acc + n, 0)
}

function constructRuleMap(rules) {
  return rules.reduce((ruleMap, [from, to]) => {
    ruleMap[from] = ruleMap[from] ? ruleMap[from].add(to) : new Set([to])
    return ruleMap
  }, {})
}

function areCorrectPages(pages, ruleMap) {
  const visited = new Set()
  for (const page of pages) {
    if (ruleMap[page]?.intersection(visited).size) return false
    visited.add(page)
  }
  return true
}

function fix(incorrect, ruleMap) {
  const visited = new Set()
  let fixed = []
  for (const page of incorrect) {
    const conflict = ruleMap[page]?.intersection(visited).values().next().value
    if (conflict) {
      const i = fixed.indexOf(conflict)
      fixed.push(fixed[i])
      fixed[i] = page
      if (!areCorrectPages(fixed, ruleMap)) {
        fixed = fix(fixed, ruleMap)
      }
    } else {
      fixed.push(page)
    }
    visited.add(page)
  }
  return fixed
}

function parse(input) {
  const divider = input.indexOf('')
  return {
    rules: input.slice(0, divider).map(r => r.split('|').map(Number)),
    pages: input.slice(divider + 1).map(p => p.split(',').map(Number)),
  }
}