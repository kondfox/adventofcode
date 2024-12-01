export function part1(input) {
  const [list1, list2] = parse(input).map(list => list.sort((a, b) => a - b))
  return list1.reduce((diffs, num1, i) => diffs + Math.abs(num1 - list2[i]), 0)
}

export function part2(input) {
  const [list1, list2] = parse(input)
  return list1.reduce((similarity, n1) => similarity + n1 * list2.filter(n2 => n1 === n2).length, 0)
}

function parse(input) {
  return input
    .map(row => row.split('   '))
    .reduce((lists, row) => {
      lists[0].push(row[0])
      lists[1].push(row[1])
      return lists
    }, [[], []])
}
