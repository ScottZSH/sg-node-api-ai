/*global describe test expect*/

const { capitalize, capitalCase } = require('./string')

describe('Capitalization', () => {
  [
    ['hello', 'Hello'],
    ['HELLO', 'Hello']
  ].map(t => test(t[0], () => expect(capitalize(t[0])).toBe(t[1])))
})

describe('Capital Case', () => {
  [
    ['i_do_not_care', 'IDoNotCare'],
    ['goodevening', 'Goodevening'],
    ['nice to see you', 'NiceToSeeYou'],
  ].map((t) => {
    test(t[0] + ' => ' + t[1], () => {
      expect(capitalCase(t[0])).toBe(t[1])
    })
  })
})

