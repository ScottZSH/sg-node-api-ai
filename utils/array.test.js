/*global describe test expect*/

const { first } = require('./array')

describe('First', () => {
  [
    [['First', 'second'], 'First'],
    ['First', 'First'],
    [[], null]
  ].map(t => test(t[0], () => expect(first(t[0])).toBe(t[1])))
})
