import { example } from './helper.js'

const day = process.argv[2]
import(`./dec_${day}/dec${day}.js`).then((module) => {
  const exampleInput = example(`./dec_${day}/example.txt`)
  const input = example(`./dec_${day}/input.txt`)

  const { part1, part2 } = module
  console.log('=== Part 1 ===')
  console.log('On example:', part1(exampleInput))
  console.log('On input:', part1(input))
  
  console.log('=== Part 2 ===')
  console.log('On example:', part2(exampleInput))
  console.log('On input:', part2(input))
})
