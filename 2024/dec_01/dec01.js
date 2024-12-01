export function part1(input) {
  const [list1, list2] = input
    .map(row => row.split('   '))
    .reduce((lists, row) => {
      lists[0].push(row[0])
      lists[1].push(row[1])
      return lists
    }, [[], []])
    .map(list => list.sort((a, b) => a - b))
  return list1.reduce((diffs, num1, i) => diffs + Math.abs(num1 - list2[i]), 0)
}

export function part2(input) {
  const [list1, list2] = input
    .map(row => row.split('   '))
    .reduce((lists, row) => {
      lists[0].push(row[0])
      lists[1].push(row[1])
      return lists
    }, [[], []])
  return list1.reduce((similarity, num1) => similarity + num1 * list2.filter(num2 => num1 === num2).length, 0)
}
